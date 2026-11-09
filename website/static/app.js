const cardsEl = document.getElementById('cards');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
let threeScene = null;

const fmt$ = n => n == null ? '—' : '$' + Number(n).toLocaleString(undefined, {maximumFractionDigits: 0});
const fmtPct = n => n == null ? '—' : Number(n).toFixed(2) + '%';

async function loadProperties(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch('/api/properties' + (qs ? '?' + qs : ''));
  const props = await res.json();
  renderCards(props);
}

function renderCards(props) {
  cardsEl.innerHTML = props.length ? '' : '<p style="grid-column:1/-1;text-align:center">No properties match. Try another search.</p>';
  props.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image_url}" alt="${p.title}" loading="lazy">
      <div class="card-body">
        <h3>${p.title}</h3>
        <div class="addr">📍 ${p.address}, ${p.city}, ${p.state} ${p.zip_code}</div>
        <div class="price">${fmt$(p.list_price)}</div>
        <div class="badges">
          <span class="badge green">Cap ${fmtPct(p.cap_rate)}</span>
          <span class="badge">CoC ${fmtPct(p.cash_on_cash)}</span>
          <span class="badge pink">Walk ${p.walk_score ?? '—'}/100</span>
          ${p.soil_quality ? `<span class="badge">🌱 Soil ${p.soil_quality}/100</span>` : ''}
        </div>
        <div class="badges"><span class="badge">${p.property_type.replace('_',' ')} · ${p.bedrooms}bd · ${p.square_feet} sqft</span></div>
      </div>`;
    card.onclick = () => openDetail(p.id);
    cardsEl.appendChild(card);
  });
}

document.getElementById('search-btn').onclick = () =>
  loadProperties({ query: document.getElementById('q').value });
document.getElementById('filter-btn').onclick = () =>
  loadProperties({
    max_price: document.getElementById('f-max').value,
    min_cap_rate: document.getElementById('f-cap').value,
    property_type: document.getElementById('f-type').value,
  });
document.getElementById('q').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('search-btn').click(); });
document.getElementById('modal-close').onclick = () => { modal.classList.remove('open'); dispose3D(); };
modal.onclick = e => { if (e.target === modal) { modal.classList.remove('open'); dispose3D(); } };

/* ---------- Detail modal ---------- */
async function openDetail(id) {
  const res = await fetch('/api/properties/' + id);
  const p = await res.json();
  modal.classList.add('open');
  const demo = p.demographics || {}, soil = p.soil || {}, fin = p.financials || {}, zone = p.zoning || {};
  const fullAddr = `${p.address}, ${p.city}, ${p.state} ${p.zip_code}`;
  modalBody.innerHTML = `
    <img class="hero-img" src="${p.image_url.replace('w=800','w=1400')}" alt="${p.title}">
    <h2 style="color:#ffe600;margin:14px 0 4px">${p.title}</h2>
    <p style="opacity:.85">📍 ${fullAddr} · ${p.property_type.replace('_',' ')} · ${p.bedrooms}bd/${p.bathrooms}ba · ${p.square_feet} sqft · ${p.lot_size_acres} acres · built ${p.year_built}</p>
    <p style="margin:10px 0">${p.description}</p>
    <div class="tabs">
      <div class="tab active" data-tab="overview">📊 Overview</div>
      <div class="tab" data-tab="money">💰 Liens, Grants & Discounts</div>
      <div class="tab" data-tab="area">🏙️ Area & Careers</div>
      <div class="tab" data-tab="business">🏪 Business Ideas</div>
      <div class="tab" data-tab="soil">🌱 Soil & Farming</div>
      <div class="tab" data-tab="sat">🛰️ Satellite</div>
      <div class="tab" data-tab="3d">🎮 3D View</div>
      <div class="tab" data-tab="memo">📜 AI Memo</div>
    </div>
    <div class="tab-content" id="tab-content"></div>`;
  modalBody.querySelectorAll('.tab').forEach(t => t.onclick = () => {
    modalBody.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    renderTab(t.dataset.tab, p, fullAddr);
  });
  renderTab('overview', p, fullAddr);
}

function kpis(items) {
  return '<div class="kpi-grid">' + items.map(([v, l]) => `<div class="kpi"><b>${v}</b><span>${l}</span></div>`).join('') + '</div>';
}

function renderTab(tab, p, fullAddr) {
  const el = document.getElementById('tab-content');
  const demo = p.demographics || {}, soil = p.soil || {}, fin = p.financials || {}, zone = p.zoning || {};
  if (tab === 'overview') {
    el.innerHTML = kpis([
      [fmt$(p.list_price), 'List Price'], [fmtPct(fin.cap_rate), 'Cap Rate'],
      [fmtPct(fin.cash_on_cash_return), 'Cash-on-Cash'], [fmt$(fin.monthly_cash_flow), 'Monthly Cash Flow'],
      [fin.debt_service_coverage_ratio ? Number(fin.debt_service_coverage_ratio).toFixed(2) + 'x' : '—', 'DSCR'],
      [demo.walk_score ?? '—', 'Walk Score'], [demo.foot_traffic_score ?? '—', 'Foot Traffic'],
      [soil.quality_score ?? '—', 'Soil Quality'],
    ]) + `<h4>Zoning: ${zone.code || '—'} — ${zone.name || ''}</h4>
    <ul><li>Permitted: ${(zone.permitted_uses || []).join(', ') || '—'}</li>
    <li>Conditional: ${(zone.conditional_uses || []).join(', ') || '—'}</li>
    <li>ADU permitted: ${zone.adu_permitted ? '✅ Yes' : '❌ No'} · STR allowed: ${zone.short_term_rental_allowed ? '✅' : '❌'}</li></ul>`;
  }
  if (tab === 'money') {
    const discounts = [];
    if (zone.adu_permitted) discounts.push('🏠 <b>ADU value-add:</b> permitted accessory unit can add rental income / resale value.');
    if (zone.short_term_rental_allowed) discounts.push('🏖️ <b>Short-term rental allowed:</b> Airbnb-style income uplift possible.');
    (zone.special_restrictions || []).forEach(r => discounts.push('⚠️ Restriction (cost/risk): ' + r));
    el.innerHTML = `<h4>Liens, Grants & Discount Assessment</h4>
      <ul>
        <li>🏛️ <b>Property tax (annual lien-like carrying cost):</b> ${fmt$(p.property_tax_annual)}</li>
        <li>🛡️ Insurance: ${fmt$(p.insurance_annual)}/yr · HOA: ${fmt$(p.hoa_monthly)}/mo</li>
        <li>📉 <b>Effective discount vs. market rent:</b> estimated rent ${fmt$(p.estimated_monthly_rent)}/mo vs. price ${fmt$(p.list_price)} (GRM ${(p.list_price / (p.estimated_monthly_rent * 12)).toFixed(1)})</li>
        ${discounts.map(d => '<li>' + d + '</li>').join('')}
        <li>🎁 <b>Grant/upside opportunities:</b> check local first-time-buyer & energy-efficiency grants for ${p.city}, ${p.state}; ADU/STR permissions above are built-in upside.</li>
      </ul>` + kpis([[fmtPct(fin.cap_rate), 'Cap Rate'], [fmt$(fin.monthly_cash_flow), 'Cash Flow/mo'], [fmtPct(fin.cash_on_cash_return), 'CoC Return']]);
  }
  if (tab === 'area') {
    const careers = demo.persona ? `Area persona "${demo.persona}" suggests top local careers: tech/office roles, healthcare, skilled trades, and remote-friendly professions serving ${p.city}'s ${fmt$(demo.median_household_income)} median-income households.` : '';
    el.innerHTML = `<h4>Quality of Life & Most Profitable Careers in ${p.city}, ${p.state}</h4>
      ${kpis([[demo.walk_score ?? '—', 'Walk Score'], [demo.foot_traffic_score ?? '—', 'Foot Traffic'], [fmt$(demo.median_household_income), 'Median Income'], [demo.discretionary_spending_index ?? '—', 'Spending Index']])}
      <ul><li>${careers}</li>
      <li>👥 Age distribution skews ${demo.age_distribution || 'mixed'} — tailor rentals & businesses accordingly.</li></ul>`;
  }
  if (tab === 'business') {
    el.innerHTML = '<h4>Best Business Ideas for This Area</h4><ul>' +
      (p.business_recommendations || []).map(b =>
        `<li><b>${b.business_type}</b> — match score ${b.match_score}/100<br><small>${b.rationale}</small><br><small>Revenue drivers: ${(b.revenue_drivers || []).join(', ')}</small></li>`).join('') +
      '</ul>';
  }
  if (tab === 'soil') {
    el.innerHTML = `<h4>Soil Quality & Suitable Farms (${p.lot_size_acres} acres)</h4>
      ${kpis([[soil.quality_score ?? '—', 'Soil Quality'], [soil.soil_type || '—', 'Soil Type'], [soil.ph ?? '—', 'pH'], [soil.organic_matter_pct ?? '—', 'Organic Matter %'], [soil.drainage_class || '—', 'Drainage']])}
      <h4>🌾 Best crops for this land</h4><ul>` +
      (p.crop_suitability || []).map(c =>
        `<li><b>${c.crop}</b> — suitability ${c.suitability_score}/100 · net profit/acre ${fmt$(c.net_profit_per_acre)} · yield ${c.annual_yield_per_acre} ${c.yield_unit}/acre</li>`).join('') +
      '</ul>';
  }
  if (tab === 'sat') {
    const q = encodeURIComponent(fullAddr);
    el.innerHTML = `<h4>🛰️ Live Satellite View (most recent imagery)</h4>
      <iframe class="sat" loading="lazy" src="https://maps.google.com/maps?q=${q}&t=k&z=20&ie=UTF8&iwloc=&output=embed"></iframe>`;
  }
  if (tab === '3d') {
    el.innerHTML = `<h4>🎮 Ultra 3D Render — drag to orbit, scroll to zoom</h4><canvas id="view3d"></canvas>`;
    setTimeout(() => render3D(p), 50);
  }
  if (tab === 'memo') {
    el.innerHTML = `<h4>📜 AI Executive Investment Memorandum</h4><div class="memo">${p.ai_investment_memo || 'Generating…'}</div>`;
  }
}

/* ---------- Three.js ---------- */
function heroScene() {
  if (typeof THREE === 'undefined') return;
  const c = document.getElementById('hero-canvas');
  const r = new THREE.WebGLRenderer({ canvas: c, alpha: true });
  const s = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
  cam.position.set(0, 3, 12);
  const houses = new THREE.Group();
  const colors = [0xff00aa, 0x00e5ff, 0xffe600, 0x7b2ff7, 0x00c853];
  for (let i = 0; i < 14; i++) {
    const h = 1 + Math.random() * 2.5, w = 1 + Math.random() * 1.5;
    const geo = new THREE.BoxGeometry(w, h, w);
    const mat = new THREE.MeshStandardMaterial({ color: colors[i % colors.length], emissive: colors[i % colors.length], emissiveIntensity: 0.25, roughness: 0.4 });
    const m = new THREE.Mesh(geo, mat);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(w * 0.8, 0.7, 4), mat);
    roof.position.y = h / 2 + 0.35; roof.rotation.y = Math.PI / 4;
    const g = new THREE.Group(); g.add(m); g.add(roof);
    g.position.set((Math.random() - 0.5) * 26, h / 2 - 2, (Math.random() - 0.5) * 14 - 4);
    houses.add(g);
  }
  s.add(houses);
  s.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dl = new THREE.DirectionalLight(0xffffff, 0.9); dl.position.set(5, 10, 7); s.add(dl);
  r.setSize(innerWidth, innerHeight);
  (function anim(t) {
    requestAnimationFrame(anim);
    houses.rotation.y = t * 0.00008;
    houses.children.forEach((g, i) => { g.position.y = Math.sin(t * 0.001 + i) * 0.25 + g.userData.base ?? g.position.y; });
    r.render(s, cam);
  })(0);
  addEventListener('resize', () => { cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); r.setSize(innerWidth, innerHeight); });
}

function render3D(p) {
  dispose3D();
  if (typeof THREE === 'undefined') return;
  const canvas = document.getElementById('view3d');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(canvas.clientWidth, 420);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101030);
  scene.fog = new THREE.Fog(0x101030, 10, 30);
  const cam = new THREE.PerspectiveCamera(50, canvas.clientWidth / 420, 0.1, 100);
  cam.position.set(7, 6, 9);
  const controls = new THREE.OrbitControls(cam, canvas);
  controls.enableDamping = true;
  const W = Math.max(2, Math.sqrt(p.square_feet) / 4), H = 1.6 + p.bedrooms * 0.5, D = W * 0.8;
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xfff3d6, roughness: 0.6 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0xff2d78, roughness: 0.4, emissive: 0x550022 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), wallMat);
  body.position.y = H / 2;
  const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(W, D) * 0.75, H * 0.7, 4), roofMat);
  roof.position.y = H + H * 0.35; roof.rotation.y = Math.PI / 4;
  const winMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.8 });
  const wins = new THREE.Group();
  for (let i = 0; i < p.bedrooms; i++) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.05), winMat);
    w.position.set(-W / 2 + 0.6 + i * 0.9, H * 0.55, D / 2 + 0.03);
    wins.add(w);
  }
  const ground = new THREE.Mesh(new THREE.CircleGeometry(16, 40),
    new THREE.MeshStandardMaterial({ color: 0x1d5c2e, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -0.01;
  scene.add(body, roof, wins, ground);
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const sun = new THREE.DirectionalLight(0xffeecc, 1.1); sun.position.set(6, 12, 8); scene.add(sun);
  const back = new THREE.DirectionalLight(0x66aaff, 0.5); back.position.set(-8, 6, -6); scene.add(back);
  threeScene = { renderer, scene, cam, controls };
  (function anim() {
    if (!threeScene) return;
    threeScene._raf = requestAnimationFrame(anim);
    controls.update(); renderer.render(scene, cam);
  })();
}
function dispose3D() {
  if (threeScene && threeScene._raf) cancelAnimationFrame(threeScene._raf);
  threeScene = null;
}

heroScene();
loadProperties();
