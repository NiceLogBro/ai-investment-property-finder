#!/usr/bin/env python3
"""Merge CSV and LoopnetMCP-format JSON listings from data/incoming/ into cloudflare/src/properties_extra.json.
Supports:
- data/incoming/*.csv
- data/incoming/*.json (array, single PropertyDetail dict, or SearchResult {'properties': [...]})
"""
import csv, glob, json, hashlib, os, re

OUT = 'cloudflare/src/properties_extra.json'
data = json.load(open(OUT, encoding='utf-8')) if os.path.exists(OUT) else []
have = {p['id'] for p in data}

CLASS_MAP = {
    'office': 'Commercial', 'retail': 'Commercial', 'health-care': 'Commercial',
    'special-purpose': 'Commercial', 'mixed-use': 'Commercial',
    'industrial': 'Industrial', 'multifamily': 'Multifamily',
    'hospitality': 'Hospitality', 'land': 'Land', 'residential': 'Residential'
}

def num(v, d=0.0):
    if v is None:
        return d
    m = re.search(r'[\d,.]+', str(v))
    if not m:
        return d
    try:
        return float(m.group(0).replace(',', ''))
    except Exception:
        return d

def map_class(pt):
    s = (pt or '').lower()
    for k, v in CLASS_MAP.items():
        if k in s:
            return v
    return 'Commercial'

def add_record(title, addr, city, state, zipcode, county, cls, ptype, price, arv, units, sqft, acres, cap, noi, yr, zoning, distress, img, src_url, notes, lat=39.5, lng=-98.35):
    if not title or not state:
        return False
    pid = 'imp-' + hashlib.sha1(f"{title}|{addr}|{city}|{src_url}".encode()).hexdigest()[:10]
    if pid in have:
        return False
    price = price or 250000
    arv = arv or round(price * 1.25)
    cap = cap or (round(noi / price * 100, 1) if noi and price else 7.5)
    noi = noi or round(price * cap / 100)
    data.append({
        'id': pid, 'title': title, 'address': addr, 'city': city, 'county': county or '',
        'state': state.upper()[:2], 'zipCode': zipcode or '', 'assetClass': cls, 'propertyType': ptype or cls,
        'distressType': distress or 'Listed For Sale', 'parcelIdAPN': 'IMPORTED', 'acreage': acres or 0.5,
        'units': int(units or 1), 'sqft': int(sqft) if sqft else None, 'yearBuilt': int(yr) if yr else None,
        'dataQuality': 'imported', 'sourceUrl': src_url or '',
        'imageUrl': img or 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        'summaryPitch': notes or f"Imported {cls.lower()} listing in {city}, {state}.",
        'tags': ['Imported', cls, ptype or cls], 'featured': False,
        'coordinates': {'lat': lat, 'lng': lng},
        'soil': {'soilSeries': 'Urban / Developed', 'nrcsSoilSurveyRating': 'Not Prime Farmland', 'usdaTaxonomy': 'N/A'},
        'suitableCrops': [], 'zoning': {'currentZoning': zoning or 'Verify with local planning dept'}, 'liens': [],
        'businessIdeas': [{'name': f'{cls} Operation / Lease-Up', 'estCapex': int(price * 0.08), 'estAnnualNOI': int(noi), 'paybackYears': round(100 / max(cap, 4) * 0.6, 1)}],
        'eligibleLandGrants': [],
        'financials': {
            'askingOrOpeningBid': price, 'estimatedARV': arv,
            'equitySpreadDiscount': max(0, round((1 - price / arv) * 100)),
            'capRate': cap, 'irr5Year': round(cap * 1.85, 1),
            'annualTaxes': int(arv * 0.012), 'assessedValue': int(arv * 0.9), 'estAnnualNOI': noi
        }
    })
    have.add(pid)
    return True

added = 0
for path in sorted(glob.glob('data/incoming/*.csv')):
    for row in csv.DictReader(open(path, encoding='utf-8-sig')):
        cls = row.get('asset_class') or map_class(row.get('property_type'))
        if add_record(
            row.get('title'), row.get('address', ''), row.get('city', ''), row.get('state', ''),
            row.get('zip', ''), row.get('county', ''), cls, row.get('property_type', cls),
            num(row.get('price'), 250000), num(row.get('arv'), 0), num(row.get('units'), 1),
            num(row.get('sqft'), 0), num(row.get('acres'), 0.25), num(row.get('cap_rate'), 0),
            num(row.get('noi'), 0), num(row.get('year_built'), 0), row.get('zoning', ''),
            row.get('distress', 'Listed For Sale'), row.get('image_url', ''), row.get('source_url', ''),
            row.get('notes', ''), num(row.get('lat'), 39.5), num(row.get('lng'), -98.35)
        ):
            added += 1

for path in sorted(glob.glob('data/incoming/*.json')):
    raw = json.load(open(path, encoding='utf-8-sig'))
    items = raw.get('properties', []) if isinstance(raw, dict) and 'properties' in raw else (raw if isinstance(raw, list) else [raw])
    for it in items:
        if not isinstance(it, dict):
            continue
        pt = it.get('property_subtype') or it.get('property_type') or 'Commercial'
        cls = map_class(pt)
        imgs = it.get('images') or []
        img = it.get('image_url') or (imgs[0] if imgs else '')
        broker = ' · '.join(x for x in [it.get('broker_name'), it.get('broker_company')] if x)
        desc = it.get('description') or '; '.join(it.get('highlights') or []) or (f"Broker: {broker}" if broker else '')
        if add_record(
            it.get('name') or it.get('title'), it.get('address', ''), it.get('city', ''), it.get('state', ''),
            it.get('zip_code') or it.get('zip', ''), '', cls, pt,
            num(it.get('price'), 250000), num(it.get('arv'), 0), num(it.get('units'), 1),
            num(it.get('size_sqft') or it.get('sqft'), 0), num(it.get('lot_size') or it.get('acres'), 0.5),
            num(it.get('cap_rate'), 0), num(it.get('noi'), 0), num(it.get('year_built'), 0),
            it.get('zoning', ''), it.get('listing_type') or 'For Sale', img, it.get('url', ''), desc
        ):
            added += 1

json.dump(data, open(OUT, 'w', encoding='utf-8'), separators=(',', ':'))
print(f'added {added}, total {len(data)}')
