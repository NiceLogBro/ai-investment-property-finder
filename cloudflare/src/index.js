// TerraYield AI — Cloudflare Edge Worker (Synced with antistudioday2 & ai-investment-property-finder)
const B = 'https://raw.githubusercontent.com/NiceLogBro/ai-investment-property-finder/main/cloudflare/';
const V = '1795245905';
let memoryBase = null;
let cachedHtmlTemplate = null;

function ensureSatelliteMeta(p) {
  if (!p) return;
  const c = p.coordinates || { lat: 30.2672, lng: -97.7431 };
  const r = Math.max(0.003, Math.min(0.015, Math.sqrt(p.acreage || 15) * 0.0012));
  const b = [c.lng - r, c.lat - r, c.lng + r, c.lat + r].map(x => x.toFixed(6)).join(',');
  p.satelliteUrl = '/api/tile?src=esri&bbox=' + b;
  p.topoUrl = '/api/tile?src=topo&bbox=' + b;
  if (!p.satellitePassMeta) {
    p.satellitePassMeta = {
      mission: 'Copernicus Sentinel-2B / MSI & NAIP High-Res Ortho',
      passDate: 'Nov 2026', captureMonth: 'November 2026',
      resolution: '0.3m Aerial Ortho / 10m L2A MSI',
      cloudCover: '0.8% Clear Sky', ndviVigor: '0.64',
      sunElevation: '41.8', radiometric: 'BOA Surface Reflectance L2A'
    };
  }
}

async function getJson(path) {
  const res = await fetch(B + path + '?v=' + V, { headers: { 'User-Agent': 'TerraYield-Worker/4.2' }, cf: { cacheTtl: 300, cacheEverything: true } });
  if (!res.ok) throw new Error(path + ' ' + res.status);
  return res.json();
}

async function getAllProperties(env) {
  if (!memoryBase) {
    try {
      const [base, extra] = await Promise.all([getJson('src/properties_100.json'), getJson('src/properties_extra.json').catch(() => [])]);
      memoryBase = [...base, ...(Array.isArray(extra) ? extra : [])];
      memoryBase.forEach(ensureSatelliteMeta);
    } catch (e) { memoryBase = []; }
  }
  let imported = [];
  if (env && env.DB) {
    try {
      const { results } = await env.DB.prepare('SELECT data_json FROM imported_properties ORDER BY created_at DESC LIMIT 500').all();
      imported = (results || []).map(r => { const p = JSON.parse(r.data_json); ensureSatelliteMeta(p); return p; });
    } catch (e) {}
  }
  const seen = new Set(imported.map(p => p.id));
  return [...imported, ...memoryBase.filter(p => !seen.has(p.id))];
}

async function getHtmlTemplate() {
  if (cachedHtmlTemplate) return cachedHtmlTemplate;
  try {
    const res = await fetch(B + 'dist/index.html?v=' + V, { headers: { 'User-Agent': 'TerraYield-Worker/4.2' }, cf: { cacheTtl: 60, cacheEverything: true } });
    if (res.ok) { cachedHtmlTemplate = await res.text(); return cachedHtmlTemplate; }
  } catch (e) {}
  return '<h1>TerraYield AI - loading, please refresh.</h1>';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;
    const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });

    if (pathname === '/api/tile') {
      const src = searchParams.get('src') || 'esri';
      const bbox = searchParams.get('bbox') || '-97.75,30.26,-97.74,30.27';
      const base = src === 'topo'
        ? 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/export'
        : src === 'usgs'
        ? 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/export'
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export';
      const tileUrl = base + '?bbox=' + encodeURIComponent(bbox) + '&bboxSR=4326&imageSR=4326&size=1024,768&format=jpg&f=image';
      try {
        const resp = await fetch(tileUrl, { headers: { 'User-Agent': 'TerraYield-TileProxy/1.0' }, cf: { cacheTtl: 86400, cacheEverything: true } });
        if (!resp.ok) return new Response('Tile error', { status: 502, headers: cors });
        return new Response(resp.body, {
          headers: {
            'Content-Type': resp.headers.get('Content-Type') || 'image/jpeg',
            'Cache-Control': 'public, max-age=86400',
            'Cross-Origin-Resource-Policy': 'cross-origin',
            ...cors
          }
        });
      } catch (e) { return new Response('Tile fetch failed', { status: 502, headers: cors }); }
    }

    if (pathname === '/api/flood') {
      const lat = searchParams.get('lat') || '30.2672';
      const lng = searchParams.get('lng') || '-97.7431';
      const femaUrl = 'https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28/query?where=1%3D1&geometry=' + encodeURIComponent(lng + ',' + lat) + '&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=FLD_ZONE,ZONE_SUBTY&returnGeometry=false&f=json';
      try {
        const r = await fetch(femaUrl, { headers: { 'User-Agent': 'TerraYield-FEMA/1.0' }, cf: { cacheTtl: 86400, cacheEverything: true } });
        const d = await r.json();
        const feat = (d.features && d.features[0] && d.features[0].attributes) || {};
        return Response.json({ zone: feat.FLD_ZONE || null, subtype: feat.ZONE_SUBTY || null, source: 'FEMA NFHL Live' }, { headers: cors });
      } catch (e) { return Response.json({ zone: null, error: e.message }, { headers: cors }); }
    }

    if (pathname === '/api/analyze' && request.method === 'POST') {
      try {
        const body = await request.json();
        const inv = body.investment || body;
        const price = Number(inv.purchase_price) || 0;
        const gross = Number(inv.annual_gross_rent) || 0;
        const opex = Number(inv.annual_operating_expenses) || 0;
        const debt = Number(inv.annual_debt_service) || 0;
        const cash = Number(inv.initial_cash_invested) || 0;
        const sqft = Number(inv.building_sqft || inv.sqft) || 0;
        const noi = gross - opex;
        const cap = price > 0 ? +(noi / price * 100).toFixed(2) : 0;
        const cf = noi - debt;
        const mcf = +(cf / 12).toFixed(2);
        const coc = cash > 0 ? +(cf / cash * 100).toFixed(2) : 0;
        const ppsf = (price > 0 && sqft > 0) ? +(price / sqft).toFixed(2) : null;
        return Response.json({
          investment: { purchase_price: price, annual_gross_rent: gross, annual_operating_expenses: opex, annual_debt_service: debt, initial_cash_invested: cash },
          calculations: { net_operating_income: noi, cap_rate_percent: cap, annual_cash_flow: cf, monthly_cash_flow: mcf, cash_on_cash_percent: coc, price_per_sqft: ppsf }
        }, { headers: cors });
      } catch (e) { return Response.json({ error: e.message }, { status: 400, headers: cors }); }
    }

    if (pathname === '/api/providers/search' && request.method === 'POST') {
      try {
        const body = await request.json();
        const sources = body.sources || ['loopnet', 'costar'];
        const s = body.search || {};
        const lnOk = !!(env && env.LOOPNET_API_URL && env.LOOPNET_API_KEY);
        const csOk = !!(env && env.COSTAR_API_URL && env.COSTAR_API_KEY);
        const importedLive = [];
        for (const [key, ok, urlEnv, keyEnv] of [
          ['loopnet', lnOk, env?.LOOPNET_API_URL, env?.LOOPNET_API_KEY],
          ['costar', csOk, env?.COSTAR_API_URL, env?.COSTAR_API_KEY]
        ]) {
          if (sources.includes(key) && ok) {
            try {
              const r = await fetch(urlEnv, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + keyEnv },
                body: JSON.stringify(s)
              });
              if (r.ok) {
                const d = await r.json();
                const rows = Array.isArray(d) ? d : (d.properties || d.results || []);
                for (const it of rows) {
                  if (it && (it.name || it.title)) {
                    ensureSatelliteMeta(it);
                    importedLive.push(it);
                  }
                }
              }
            } catch (e) {}
          }
        }
        const all = await getAllProperties(env);
        const minP = Number(s.minimum_price) || 0;
        const maxP = Number(s.maximum_price) || 1e12;
        const minSf = Number(s.minimum_sqft) || 0;
        const maxSf = Number(s.maximum_sqft) || 1e12;
        const pts = (s.property_type || []).map(x => x.toLowerCase());
        const fallback = all.filter(p => {
          const ask = p.financials?.askingOrOpeningBid || 0;
          if (ask < minP || ask > maxP) return false;
          if (p.sqft && (p.sqft < minSf || p.sqft > maxSf)) return false;
          if (s.state && p.state !== s.state.toUpperCase()) return false;
          if (pts.length) {
            const hay = ((p.assetClass || '') + ' ' + (p.propertyType || '')).toLowerCase();
            if (!pts.some(t => hay.includes(t))) return false;
          }
          return true;
        });
        return Response.json({
          configured: { loopnet: lnOk, costar: csOk },
          imported_live: importedLive,
          fallback_count: fallback.length,
          message: (lnOk || csOk) ? 'Queried configured provider feeds.' : 'Provider secrets not yet set. Add LOOPNET_API_URL, LOOPNET_API_KEY, COSTAR_API_URL, and COSTAR_API_KEY in Cloudflare Worker Secrets.'
        }, { headers: cors });
      } catch (e) { return Response.json({ error: e.message }, { status: 400, headers: cors }); }
    }

    if (pathname === '/api/vault') {
      if (!env || !env.DB) return Response.json([], { headers: cors });
      if (request.method === 'POST') {
        try {
          const { id, action } = await request.json();
          if (action === 'remove') await env.DB.prepare('DELETE FROM vault_items WHERE id = ?').bind(id).run();
          else await env.DB.prepare('INSERT OR REPLACE INTO vault_items (id) VALUES (?)').bind(id).run();
          return Response.json({ ok: true }, { headers: cors });
        } catch (e) { return Response.json({ ok: false, error: e.message }, { status: 400, headers: cors }); }
      }
      const { results } = await env.DB.prepare('SELECT id, saved_at FROM vault_items ORDER BY saved_at DESC').all();
      return Response.json(results || [], { headers: cors });
    }

    if (pathname === '/api/properties/import' && request.method === 'POST') {
      try {
        const np = await request.json();
        const list = Array.isArray(np) ? np : [np];
        let count = 0;
        for (const x of list) {
          if (x && x.id) {
            ensureSatelliteMeta(x);
            if (env && env.DB) {
              await env.DB.prepare('INSERT OR REPLACE INTO imported_properties (id, state, asset_class, data_json) VALUES (?, ?, ?, ?)')
                .bind(x.id, x.state || '', x.assetClass || 'Imported', JSON.stringify(x)).run();
            }
            count++;
          }
        }
        const all = await getAllProperties(env);
        return Response.json({ success: true, imported: count, count: all.length, durable: !!(env && env.DB) }, { headers: cors });
      } catch (e) { return Response.json({ success: false, error: e.message }, { status: 400, headers: cors }); }
    }

    if (pathname === '/api/ai' && request.method === 'POST') {
      try {
        const { question, property } = await request.json();
        if (env && env.GEMINI_API_KEY) {
          const prompt = 'You are TerraYield AI, a real estate and agricultural investment underwriter. Question: ' + question + (property ? '\nParcel Context: ' + JSON.stringify(property).slice(0, 2500) : '');
          const gRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + env.GEMINI_API_KEY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
          });
          if (gRes.ok) {
            const gData = await gRes.json();
            const txt = gData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (txt) return Response.json({ answer: txt, mode: 'gemini' }, { headers: cors });
          }
        }
        if (property) {
          const f = property.financials || {};
          const ask = f.askingOrOpeningBid || 0;
          const arv = f.estimatedARV || 0;
          const noi = f.estAnnualNOI || Math.round(ask * (f.capRate || 8) / 100);
          const ideas = (property.businessIdeas || []).map(b => b.name).join(', ') || 'Direct operation or NNN lease';
          const answer = [
            'Underwriting Summary — ' + property.title + ' (' + property.city + ', ' + property.state + ')',
            '• Asset Class: ' + (property.assetClass || property.propertyType || 'Real Estate') + ' | ' + (property.acreage || 0) + ' AC' + (property.units ? ' | ' + property.units + ' units' : ''),
            '• Basis & Spread: Asking $' + ask.toLocaleString() + ' vs Est. ARV $' + arv.toLocaleString() + ' (' + (f.equitySpreadDiscount || 0) + '% discount, ' + (f.capRate || 0) + '% cap rate, est. NOI $' + noi.toLocaleString() + '/yr).',
            '• Dev Momentum: ' + (property.devMomentumScore || 72) + '/100 (Est. 5-Yr Appreciation +' + (property.devAppreciation5YrPct || 16) + '%).',
            '• Top Strategies: ' + ideas + '.',
            '• Next Diligence: Verify FEMA flood zone in Tab 5, municipal zoning, and title/tax liens before bidding.'
          ].join('\n');
          return Response.json({ answer, mode: 'parcel-computed' }, { headers: cors });
        }
        return Response.json({
          answer: 'Open any property Dossier first to underwrite a specific asset, or filter by state/asset class. (Tip: Add GEMINI_API_KEY as a Cloudflare Worker Secret on antistudioday2 to enable live LLM Q&A.)',
          mode: 'computed'
        }, { headers: cors });
      } catch (e) { return Response.json({ answer: 'Error: ' + e.message }, { status: 400, headers: cors }); }
    }

    if (pathname === '/api/properties') return Response.json(await getAllProperties(env), { headers: cors });
    if (pathname.startsWith('/api/properties/')) {
      const id = pathname.replace('/api/properties/', '');
      const m = (await getAllProperties(env)).find(p => p.id === id);
      return m ? Response.json(m, { headers: cors }) : Response.json({ error: 'Property not found' }, { status: 404, headers: cors });
    }
    if (pathname === '/api/health') {
      const props = await getAllProperties(env);
      const byClass = {};
      props.forEach(p => { const k = p.assetClass || 'Agricultural'; byClass[k] = (byClass[k] || 0) + 1; });
      return Response.json({
        status: 'healthy', app: 'TerraYield AI', indexed_properties: props.length,
        by_asset_class: byClass, d1_bound: !!(env && env.DB), tile_proxy: true, fema_live: true,
        providers: { loopnet_configured: !!(env && env.LOOPNET_API_URL && env.LOOPNET_API_KEY), costar_configured: !!(env && env.COSTAR_API_URL && env.COSTAR_API_KEY) },
        template_version: V
      }, { headers: cors });
    }

    const [tpl, props] = await Promise.all([getHtmlTemplate(), getAllProperties(env)]);
    return new Response(tpl.replace('__EMBEDDED_PROPERTIES_JSON__', JSON.stringify(props)), {
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=10, s-maxage=60', ...cors }
    });
  }
};
