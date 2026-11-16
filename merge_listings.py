#!/usr/bin/env python3
"""Merge CSV listings from data/incoming/*.csv into cloudflare/src/properties_extra.json.
Real listings you add (from your own sources/exports) get dataQuality='imported'.
Required columns: title,city,state ; optional: address,zip,county,asset_class,property_type,price,arv,units,sqft,acres,cap_rate,lat,lng,distress,image_url,source_url,notes
"""
import csv, glob, json, hashlib, os
OUT = 'cloudflare/src/properties_extra.json'
data = json.load(open(OUT, encoding='utf-8')) if os.path.exists(OUT) else []
have = {p['id'] for p in data}
def f(v, d=0.0):
    try: return float(str(v).replace('$', '').replace(',', '').strip())
    except Exception: return d
added = 0
for path in sorted(glob.glob('data/incoming/*.csv')):
    for row in csv.DictReader(open(path, encoding='utf-8-sig')):
        if not row.get('title') or not row.get('state'): continue
        pid = 'imp-' + hashlib.sha1((row['title'] + row.get('address', '') + row['city']).encode()).hexdigest()[:10]
        if pid in have: continue
        price = f(row.get('price'), 250000); arv = f(row.get('arv'), price * 1.3) or price * 1.3
        cap = f(row.get('cap_rate'), 8.0); cls = row.get('asset_class') or 'Residential'
        data.append({
            'id': pid, 'title': row['title'], 'address': row.get('address', ''), 'city': row['city'], 'county': row.get('county', ''),
            'state': row['state'].upper(), 'zipCode': row.get('zip', ''), 'assetClass': cls, 'propertyType': row.get('property_type') or cls,
            'distressType': row.get('distress') or 'Listed For Sale', 'parcelIdAPN': row.get('apn', 'N/A'), 'acreage': f(row.get('acres'), 0.25),
            'units': int(f(row.get('units'), 1)), 'sqft': int(f(row.get('sqft'), 0)) or None, 'dataQuality': 'imported', 'sourceUrl': row.get('source_url', ''),
            'imageUrl': row.get('image_url') or 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
            'summaryPitch': row.get('notes') or f"Imported {cls.lower()} listing in {row['city']}, {row['state']}.",
            'tags': ['Imported', cls], 'featured': False,
            'coordinates': {'lat': f(row.get('lat'), 39.5), 'lng': f(row.get('lng'), -98.35)},
            'soil': {'soilSeries': 'Urban / Developed', 'nrcsSoilSurveyRating': 'Not Prime Farmland', 'usdaTaxonomy': 'N/A'},
            'suitableCrops': [], 'zoning': {}, 'liens': [], 'businessIdeas': [], 'eligibleLandGrants': [],
            'financials': {'askingOrOpeningBid': price, 'estimatedARV': arv, 'equitySpreadDiscount': max(0, round((1 - price / arv) * 100)),
                           'capRate': cap, 'irr5Year': round(cap * 1.9, 1), 'annualTaxes': int(arv * 0.012), 'assessedValue': int(arv * 0.9)}})
        have.add(pid); added += 1
json.dump(data, open(OUT, 'w', encoding='utf-8'), separators=(',', ':'))
print(f'added {added}, total {len(data)}')
