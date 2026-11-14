import propertiesData from './properties_data.json';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // ── API Routes ──
    if (pathname.startsWith('/api/')) {
      return handleApi(pathname, searchParams, request, corsHeaders);
    }

    // ── Web Application UI ──
    return new Response(renderHtmlApp(), {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...corsHeaders,
      },
    });
  },
};

function handleApi(pathname, searchParams, request, corsHeaders) {
  // GET /api/properties
  if (pathname === '/api/properties') {
    const query = searchParams.get('q')?.toLowerCase() || '';
    const state = searchParams.get('state')?.toUpperCase() || '';
    const type = searchParams.get('type') || '';
    const minCap = parseFloat(searchParams.get('min_cap')) || 0;

    let filtered = propertiesData.filter((p) => {
      if (state && p.state.toUpperCase() !== state) return false;
      if (type && p.property_type !== type) return false;
      if (minCap > 0 && (!p.financials || p.financials.cap_rate < minCap)) return false;
      if (query) {
        const text = `${p.title} ${p.city} ${p.state} ${p.description}`.toLowerCase();
        return text.includes(query);
      }
      return true;
    });

    return Response.json(filtered, { headers: corsHeaders });
  }

  // GET /api/properties/:id
  if (pathname.startsWith('/api/properties/')) {
    const id = pathname.replace('/api/properties/', '');
    const prop = propertiesData.find((p) => p.id === id);
    if (!prop) {
      return new Response(JSON.stringify({ error: 'Property not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
    return Response.json(prop, { headers: corsHeaders });
  }

  // GET /api/health
  if (pathname === '/api/health') {
    return Response.json({
      status: 'healthy',
      app: 'TerraYield AI Property Finder',
      domain: 'terrayield.com',
      total_properties: propertiesData.length,
      edge_node: 'Cloudflare Global Network',
    }, { headers: corsHeaders });
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

function renderHtmlApp() {
  const propsJson = JSON.stringify(propertiesData);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TerraYield | AI Investment Property Finder</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .badge { padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  <!-- Header -->
  <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20">
          🌱
        </div>
        <div>
          <h1 class="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            TerraYield
            <span class="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-medium">LIVE ON CLOUDFLARE</span>
          </h1>
          <p class="text-xs text-slate-400">AI Real Estate, Soil Science & Up-and-Coming Area Intelligence</p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <span class="text-xs text-slate-400 font-mono hidden md:inline">terrayield.com</span>
        <a href="/api/properties" target="_blank" class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5">
          <i class="fa-solid fa-code"></i> REST API
        </a>
      </div>
    </div>
  </header>

  <!-- Hero & Filters -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold text-white tracking-tight mb-2">Find High-Yield Investment Properties</h2>
      <p class="text-slate-400 max-w-2xl text-sm">
        Deep-dive underwriting across the USA and Territories (Puerto Rico, USVI, Guam). Powered by soil science, demographic business matching, zoning verification, and upcoming infrastructure pipeline momentum.
      </p>

      <!-- Search & Filters -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800 shadow-xl">
        <div class="md:col-span-2 relative">
          <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-slate-500 text-sm"></i>
          <input type="text" id="searchInput" placeholder="Search by city, state, crop (vineyard, coffee), or keyword..."
            class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500">
        </div>
        <div>
          <select id="typeFilter" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500">
            <option value="">All Property Types</option>
            <option value="agricultural">Farmland / Agricultural</option>
            <option value="single_family">Single Family / ADU</option>
            <option value="multi_family">Multi-Family / Units</option>
            <option value="mixed_use">Commercial / Mixed-Use</option>
          </select>
        </div>
        <div>
          <select id="regionFilter" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500">
            <option value="">All Regions & Territories</option>
            <option value="PR">Puerto Rico (Territory)</option>
            <option value="VI">U.S. Virgin Islands (Territory)</option>
            <option value="GU">Guam (Territory)</option>
            <option value="TX">Texas (Austin)</option>
            <option value="CO">Colorado (Denver)</option>
            <option value="GA">Georgia (Atlanta)</option>
            <option value="OR">Oregon (Portland/Willamette)</option>
            <option value="FL">Florida (Tampa)</option>
            <option value="TN">Tennessee (Gatlinburg)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Active Count -->
    <div class="flex items-center justify-between mb-4">
      <div class="text-xs text-slate-400 font-medium">
        Showing <span id="propertyCount" class="text-white font-bold">0</span> properties
      </div>
      <div class="flex gap-2">
        <button onclick="filterByTag('farmland')" class="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg">🌾 Farmland & Soils</button>
        <button onclick="filterByTag('territory')" class="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg">🏝️ US Territories</button>
        <button onclick="filterByTag('high_cap')" class="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg">📈 High Momentum</button>
      </div>
    </div>

    <!-- Properties Grid -->
    <div id="propertiesGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Injected by JavaScript -->
    </div>
  </main>

  <!-- Modal for Full 360 Deep-Dive -->
  <div id="detailModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
      <button onclick="closeModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white text-lg w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
        ✕
      </button>
      <div id="modalContent"></div>
    </div>
  </div>

  <footer class="border-t border-slate-800/80 mt-16 py-8 text-center text-xs text-slate-500">
    TerraYield © 2026 • Live on Cloudflare Global Network • terrayield.com / terrayeild.com
  </footer>

  <script>
    const allProperties = ${propsJson};

    function renderProperties(list) {
      const grid = document.getElementById('propertiesGrid');
      document.getElementById('propertyCount').textContent = list.length;

      if (list.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-12 text-slate-500">No properties match your search criteria.</div>';
        return;
      }

      grid.innerHTML = list.map(p => {
        const fin = p.financials || {};
        const dev = p.development || {};
        const crops = p.crop_suitability || [];
        const biz = p.business_recommendations || [];
        const topCrop = crops[0];
        const topBiz = biz[0];

        return \`
          <div class="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition flex flex-col shadow-lg">
            <div class="h-48 w-full bg-slate-800 relative overflow-hidden">
              <img src="\${p.image_url}" alt="\${p.title}" class="w-full h-full object-cover">
              <div class="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                <span class="badge bg-slate-950/80 text-white backdrop-blur border border-white/10">\${p.state}</span>
                <span class="badge bg-emerald-500/90 text-slate-950 font-bold">\${p.property_type.replace('_', ' ')}</span>
              </div>
              <div class="absolute bottom-3 right-3 bg-slate-950/90 text-white font-black text-lg px-3 py-1 rounded-xl border border-white/10">
                $\${Number(p.list_price).toLocaleString()}
              </div>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-bold text-white text-base leading-tight mb-1 line-clamp-1">\${p.title}</h3>
                <p class="text-xs text-slate-400 mb-4"><i class="fa-solid fa-location-dot text-emerald-400 mr-1"></i>\${p.city}, \${p.state} \${p.zip_code}</p>

                <!-- Financial Underwriting KPIs -->
                <div class="grid grid-cols-3 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 mb-3 text-center">
                  <div>
                    <div class="text-[10px] text-slate-500 uppercase font-semibold">Cap Rate</div>
                    <div class="text-sm font-black text-emerald-400">\${fin.cap_rate || 0}%</div>
                  </div>
                  <div>
                    <div class="text-[10px] text-slate-500 uppercase font-semibold">Cash Flow</div>
                    <div class="text-sm font-black \${(fin.monthly_cash_flow >= 0) ? 'text-white' : 'text-rose-400'}">
                      $\${Math.round(fin.monthly_cash_flow || 0)}/mo
                    </div>
                  </div>
                  <div>
                    <div class="text-[10px] text-slate-500 uppercase font-semibold">10-Yr IRR</div>
                    <div class="text-sm font-black text-teal-400">\${fin.estimated_10yr_irr || 0}%</div>
                  </div>
                </div>

                <!-- Up-and-Coming Area Momentum Badge -->
                \${dev.development_momentum_score ? \`
                  <div class="bg-indigo-950/40 border border-indigo-800/40 rounded-xl p-2.5 mb-3 flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2">
                      <span class="text-base">🚀</span>
                      <div>
                        <div class="font-bold text-indigo-300">Momentum: \${dev.development_momentum_score}/100</div>
                        <div class="text-[10px] text-slate-400">5yr Forecast: +\${dev.appreciation_forecast_5yr_pct || 0}%</div>
                      </div>
                    </div>
                    \${dev.is_opportunity_zone ? '<span class="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">OZ</span>' : ''}
                  </div>
                \` : ''}

                <!-- Top Agricultural Crop & Demographic Business Fit -->
                <div class="space-y-1.5 text-xs mb-4">
                  \${topCrop ? \`
                    <div class="flex items-center text-slate-300 gap-1.5 truncate">
                      <span class="text-emerald-400 font-bold">🌾 Flourishing:</span>
                      <span class="truncate">\${topCrop.crop_name} ($' + Math.round(topCrop.estimated_net_profit_per_acre).toLocaleString() + '/ac)</span>
                    </div>
                  \` : ''}
                  \${topBiz ? \`
                    <div class="flex items-center text-slate-300 gap-1.5 truncate">
                      <span class="text-teal-400 font-bold">💡 Best Biz:</span>
                      <span class="truncate">\${topBiz.business_type} (\${topBiz.match_score}%)</span>
                    </div>
                  \` : ''}
                </div>
              </div>

              <button onclick="viewDetails('\${p.id}')" class="w-full bg-slate-800 hover:bg-emerald-600 text-white font-medium text-xs py-2.5 rounded-xl transition border border-slate-700 hover:border-emerald-500 flex items-center justify-center gap-1.5">
                <span>View Full AI Underwriting</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
            </div>
          </div>
        \`;
      }).join('');
    }

    function viewDetails(id) {
      const p = allProperties.find(item => item.id === id);
      if (!p) return;

      const fin = p.financials || {};
      const dev = p.development || {};
      const zoning = p.zoning || {};
      const soil = p.soil || {};
      const crops = p.crop_suitability || [];
      const biz = p.business_recommendations || [];

      const html = \`
        <div class="space-y-6">
          <div class="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <span class="text-xs font-mono text-emerald-400 uppercase tracking-wider">\${p.state} • \${p.property_type.replace('_', ' ')}</span>
              <h2 class="text-2xl font-black text-white mt-1">\${p.title}</h2>
              <p class="text-sm text-slate-400">\${p.address}, \${p.city}, \${p.state} \${p.zip_code}</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-black text-white">$\${Number(p.list_price).toLocaleString()}</div>
              <div class="text-xs text-slate-400">\${p.bedrooms} Beds • \${p.bathrooms} Baths • \${p.square_feet.toLocaleString()} SqFt</div>
            </div>
          </div>

          <!-- Financial Strategy Breakdown -->
          <div>
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">1. Quantitative Financial Underwriting</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <div><span class="text-xs text-slate-500">Cap Rate</span><div class="text-lg font-black text-emerald-400">\${fin.cap_rate || 0}%</div></div>
              <div><span class="text-xs text-slate-500">Cash Flow</span><div class="text-lg font-black text-white">$\${Math.round(fin.monthly_cash_flow || 0)}/mo</div></div>
              <div><span class="text-xs text-slate-500">Cash on Cash</span><div class="text-lg font-black text-teal-400">\${fin.cash_on_cash_return || 0}%</div></div>
              <div><span class="text-xs text-slate-500">DSCR</span><div class="text-lg font-black text-indigo-400">\${fin.debt_service_coverage_ratio || 0}x</div></div>
            </div>
          </div>

          <!-- Upcoming Development Pipeline -->
          \${dev.development_momentum_score ? \`
            <div>
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">2. Upcoming Development Pipeline & Growth Signals</h3>
              <div class="bg-indigo-950/20 border border-indigo-800/40 p-4 rounded-xl space-y-3">
                <div class="flex justify-between items-center">
                  <div class="text-sm font-bold text-indigo-300">Momentum Score: \${dev.development_momentum_score}/100</div>
                  <div class="text-xs text-slate-300">5-Yr Appreciation Forecast: <span class="font-bold text-emerald-400">+\${dev.appreciation_forecast_5yr_pct}%</span></div>
                </div>
                <div class="text-xs text-slate-400">Timing: <span class="text-white font-medium">\${dev.overall_investment_timing}</span></div>
                \${dev.infrastructure_projects && dev.infrastructure_projects.length > 0 ? \`
                  <div class="border-t border-indigo-900/40 pt-2 text-xs">
                    <div class="font-bold text-slate-300 mb-1">Top Infrastructure Catalyst:</div>
                    <div class="text-slate-400">\${dev.infrastructure_projects[0].name} ($' + Math.round(dev.infrastructure_projects[0].estimated_investment/1e6) + 'M investment, completion ' + dev.infrastructure_projects[0].estimated_completion_year + ')</div>
                  </div>
                \` : ''}
              </div>
            </div>
          \` : ''}

          <!-- Soil & Agriculture -->
          \${soil.soil_texture ? \`
            <div>
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">3. Soil Science & Flourishing Crops</h3>
              <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div class="flex justify-between text-slate-300">
                  <span>Soil: <strong class="text-white">\${soil.soil_series_name} (\${soil.soil_texture})</strong></span>
                  <span>pH: <strong class="text-white">\${soil.ph_level}</strong> • Drainage: <strong class="text-white">\${soil.drainage_class}</strong></span>
                </div>
                <div class="mt-2 space-y-1">
                  \${crops.slice(0, 3).map(c => \`
                    <div class="flex justify-between border-t border-slate-800/60 pt-1 text-slate-400">
                      <span class="text-slate-200">🌱 \${c.crop_name} [\${c.tier}]</span>
                      <span class="text-emerald-400 font-bold">$\${Math.round(c.estimated_net_profit_per_acre).toLocaleString()}/acre net</span>
                    </div>
                  \`).join('')}
                </div>
              </div>
            </div>
          \` : ''}

          <!-- Zoning & Permitted Commercial Uses -->
          <div>
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">4. Zoning Restrictions & Permitted Uses</h3>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div>Zoning Code: <strong class="text-white">\${zoning.code || 'N/A'} (\${zoning.name || ''})</strong></div>
              <div>Permitted Uses: <span class="text-slate-400">\${(zoning.permitted_uses || []).join(', ')}</span></div>
              <div>ADU Allowed: <strong class="\${zoning.adu_permitted ? 'text-emerald-400' : 'text-slate-500'}">\${zoning.adu_permitted ? 'YES (Density Upside)' : 'No'}</strong></div>
            </div>
          </div>
        </div>
      \`;

      document.getElementById('modalContent').innerHTML = html;
      document.getElementById('detailModal').classList.remove('hidden');
    }

    function closeModal() {
      document.getElementById('detailModal').classList.add('hidden');
    }

    function applyFilters() {
      const q = document.getElementById('searchInput').value.toLowerCase();
      const type = document.getElementById('typeFilter').value;
      const reg = document.getElementById('regionFilter').value.toUpperCase();

      const filtered = allProperties.filter(p => {
        if (type && p.property_type !== type) return false;
        if (reg && p.state.toUpperCase() !== reg) return false;
        if (q) {
          const cropsStr = (p.crop_suitability || []).map(c => c.crop_name).join(' ');
          const text = \`\${p.title} \${p.city} \${p.state} \${p.description} \${cropsStr}\`.toLowerCase();
          return text.includes(q);
        }
        return true;
      });

      renderProperties(filtered);
    }

    function filterByTag(tag) {
      if (tag === 'farmland') {
        document.getElementById('typeFilter').value = 'agricultural';
      } else if (tag === 'territory') {
        document.getElementById('regionFilter').value = 'PR';
      } else if (tag === 'high_cap') {
        document.getElementById('searchInput').value = 'momentum';
      }
      applyFilters();
    }

    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('typeFilter').addEventListener('change', applyFilters);
    document.getElementById('regionFilter').addEventListener('change', applyFilters);

    // Initial render
    renderProperties(allProperties);
  </script>
</body>
</html>`;
}
