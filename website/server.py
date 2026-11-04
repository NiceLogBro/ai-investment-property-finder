"""
AI Investment Property Finder — Web Server
==========================================
Serves a colorful 3D web experience on top of the property_finder library.

The repository's package files were extracted with literal backslashes in
their names (e.g. ``property_finder\\models.py``), which Python cannot
import directly. On startup this server reconstructs a proper package tree
under ``website/.build/`` and imports it from there.

Run:  python3 website/server.py [port]     (default port 8000)
Then open http://localhost:8000
"""

import json
import os
import re
import shutil
import sys
import threading
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEB = os.path.join(ROOT, "website")
STATIC = os.path.join(WEB, "static")
BUILD = os.path.join(WEB, ".build")


def rebuild_package() -> str:
    """Copy backslash-named sources into a proper importable package tree."""
    if os.path.isdir(BUILD):
        shutil.rmtree(BUILD)
    os.makedirs(BUILD)
    for dirpath, _dirs, files in os.walk(ROOT):
        if ".git" in dirpath or dirpath.startswith(BUILD):
            continue
        for f in files:
            if not f.endswith(".py"):
                continue
            src = os.path.join(dirpath, f)
            rel = os.path.relpath(src, ROOT)
            if "\\" not in rel:
                continue
            dst = os.path.join(BUILD, *rel.split("\\"))
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copyfile(src, dst)
    return BUILD


sys.path.insert(0, rebuild_package())

from property_finder import PropertyFinder, PropertyType  # noqa: E402

finder = PropertyFinder()
_lock = threading.Lock()

# Pre-run full analysis once so every request is fast.
for p in finder.list_properties():
    finder.analyze_full(p.id)


def prop_summary(p):
    d = p.to_dict()
    f = d.get("financials") or {}
    return {
        "id": d["id"],
        "title": d["title"],
        "address": d["address"],
        "city": d["city"],
        "state": d["state"],
        "zip_code": d["zip_code"],
        "list_price": d["list_price"],
        "property_type": d["property_type"],
        "bedrooms": d["bedrooms"],
        "bathrooms": d["bathrooms"],
        "square_feet": d["square_feet"],
        "lot_size_acres": d["lot_size_acres"],
        "year_built": d["year_built"],
        "units": d["units"],
        "image_url": d["image_url"],
        "description": d["description"],
        "cap_rate": f.get("cap_rate"),
        "cash_on_cash": f.get("cash_on_cash_return"),
        "monthly_cash_flow": f.get("monthly_cash_flow"),
        "walk_score": (d.get("demographics") or {}).get("walk_score"),
        "soil_quality": (d.get("soil") or {}).get("quality_score"),
    }


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *a):  # quiet
        pass

    def _json(self, obj, code=200):
        body = json.dumps(obj, default=str).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _file(self, path):
        ctype = {".html": "text/html", ".css": "text/css", ".js": "text/javascript",
                 ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml"}.get(
            os.path.splitext(path)[1], "application/octet-stream")
        with open(path, "rb") as fh:
            body = fh.read()
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        url = urlparse(self.path)
        path = url.path
        qs = parse_qs(url.query)

        if path == "/api/properties":
            with _lock:
                props = finder.list_properties()
                if qs.get("query"):
                    props = finder.search_query(qs["query"][0])
                else:
                    min_p = float(qs["min_price"][0]) if qs.get("min_price") else None
                    max_p = float(qs["max_price"][0]) if qs.get("max_price") else None
                    min_cap = float(qs["min_cap_rate"][0]) if qs.get("min_cap_rate") else None
                    ptype = PropertyType(qs["property_type"][0]) if qs.get("property_type") else None
                    props = finder.search(min_price=min_p, max_price=max_p,
                                          property_type=ptype, min_cap_rate=min_cap)
                out = sorted((prop_summary(p) for p in props),
                             key=lambda x: (x["cap_rate"] or 0), reverse=True)
            return self._json(out)

        m = re.match(r"^/api/properties/([\w-]+)$", path)
        if m:
            with _lock:
                p = finder.get_property(m.group(1))
                if not p:
                    return self._json({"error": "not found"}, 404)
                finder.analyze_full(p.id)
                return self._json(p.to_dict())

        if path == "/api/health":
            return self._json({"status": "ok", "properties": len(finder.list_properties())})

        if path == "/" or path == "/index.html":
            return self._file(os.path.join(STATIC, "index.html"))
        if path.startswith("/static/"):
            safe = os.path.normpath(path[len("/static/"):])
            full = os.path.join(STATIC, safe)
            if full.startswith(STATIC) and os.path.isfile(full):
                return self._file(full)
        return self._json({"error": "not found"}, 404)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    srv = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"🏡 AI Investment Property Finder running at http://localhost:{port}")
    srv.serve_forever()
