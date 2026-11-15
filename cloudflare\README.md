# Deploying TerraYield to Cloudflare (terrayield.com / terrayeild.com)

This directory contains the production-ready **Cloudflare Worker** and **Edge Web App** for **TerraYield**.

It serves:
1. **Interactive Responsive Web App**: Property card grid, search filters (States, Territories, Property Types), modal with 360° AI Underwriting (Cap rate, Cash flow, Upcoming development pipeline momentum, USDA soil science & crops, zoning compliance).
2. **REST API**:
   - `GET /api/properties`: Search and filter properties
   - `GET /api/properties/:id`: Full single property underwriting & memo
   - `GET /api/health`: Edge node health check

---

## Step 1: Login to Cloudflare via CLI

Open PowerShell and authenticate your Cloudflare account:

```powershell
cd "c:\Users\Guest PC\Documents\antigravity\magical-hawking\cloudflare"
& "C:\Program Files\nodejs\npx.cmd" wrangler login
```
*This will open your browser to log in and authorize Wrangler with one click.*

---

## Step 2: Deploy to Cloudflare Edge Network

Deploy the worker instantly:

```powershell
& "C:\Program Files\nodejs\npx.cmd" wrangler deploy
```

You will immediately get a live Cloudflare Worker URL, such as:
`https://terrayield-app.<your-subdomain>.workers.dev`

---

## Step 3: Attach Custom Domain (`terrayield.com` & `terrayeild.com`)

### Method A: Via Cloudflare Dashboard (Easiest)
1. Go to **Cloudflare Dashboard** -> **Workers & Pages** -> Click **terrayield-app**.
2. Go to **Settings** -> **Triggers** -> **Custom Domains**.
3. Click **Add Custom Domain** and enter:
   - `terrayield.com` (and `www.terrayield.com`)
   - `terrayeild.com` (and `www.terrayeild.com`)
4. Cloudflare will automatically provision SSL/TLS certificates and point DNS traffic to your worker.

### Method B: Via `wrangler.toml`
In `cloudflare/wrangler.toml`, uncomment the routes section:
```toml
routes = [
  { pattern = "terrayield.com/*", zone_name = "terrayield.com" },
  { pattern = "www.terrayield.com/*", zone_name = "terrayield.com" },
  { pattern = "terrayeild.com/*", zone_name = "terrayeild.com" },
  { pattern = "www.terrayeild.com/*", zone_name = "terrayeild.com" }
]
```
Then run:
```powershell
& "C:\Program Files\nodejs\npx.cmd" wrangler deploy
```

---

## Updating Property Data
Whenever new properties are found or scraped:
```powershell
& "C:\Users\Guest PC\AppData\Local\Python\bin\python.exe" -c "
import json
from property_finder import PropertyFinder

finder = PropertyFinder()
finder.deep_dive_search(region='ALL', strategy_focus='all')
props = [p.to_dict() for p in finder.list_properties()]
with open('cloudflare/src/properties_data.json', 'w') as f:
    json.dump(props, f, indent=2)
"
& "C:\Program Files\nodejs\npx.cmd" wrangler deploy
```
