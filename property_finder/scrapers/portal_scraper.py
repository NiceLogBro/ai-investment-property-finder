"""
Public MLS, Portal, and Land Real Estate Scraper & Aggregator.
Queries major listing aggregators, public property records, and LandWatch / LoopNet feeds.
Supports HTML parsing via BeautifulSoup4 and simulated live ingestion.
"""

from typing import List, Dict, Any, Optional
from ..models import Property, PropertyType
from .territories import US_TERRITORIES_AND_STATES

try:
    from bs4 import BeautifulSoup
    BS4_AVAILABLE = True
except ImportError:
    BS4_AVAILABLE = False


class ListingPortalScraper:
    """
    Scrapes and normalizes listings from public real estate portals,
    specialized land/farm marketplaces, and territory boards.
    """

    SUPPORTED_PORTALS = {
        "zillow": "https://www.zillow.com/homes/{query}_rb/",
        "realtor": "https://www.realtor.com/realestateandhomes-search/{query}",
        "redfin": "https://www.redfin.com/city/{query}",
        "landwatch": "https://www.landwatch.com/{query}-land-for-sale",
        "loopnet": "https://www.loopnet.com/search/commercial-real-estate/{query}/for-sale/",
        "point2homes_pr": "https://www.point2homes.com/US/Real-Estate-Listings/PR/{query}.html",
        "st_croix_mls": "https://www.stcroixrealty.com/listings/{query}",
    }

    @classmethod
    def parse_html_listings(cls, html_content: str, source_portal: str = "general") -> List[Dict[str, Any]]:
        """Parses raw HTML payload from real estate search result pages."""
        if not BS4_AVAILABLE:
            return []

        soup = BeautifulSoup(html_content, "lxml" if "lxml" in html_content else "html.parser")
        parsed_cards = []

        # Generic extraction for card layouts
        cards = soup.select(".property-card, .listing-card, article, [data-test='property-card']")
        for card in cards[:10]:
            title_el = card.select_one("h2, h3, .title, .card-title, [class*='title']")
            price_el = card.select_one(".price, [class*='price']")
            addr_el = card.select_one("address, .address, [class*='address']")

            title = title_el.get_text(strip=True) if title_el else "Property Listing"
            price_text = price_el.get_text(strip=True) if price_el else "$0"
            clean_price = "".join(c for c in price_text if c.isdigit() or c == '.')

            parsed_cards.append({
                "title": title,
                "price": float(clean_price) if clean_price else 0.0,
                "address": addr_el.get_text(strip=True) if addr_el else "",
                "source": source_portal
            })

        return parsed_cards

    @classmethod
    def get_live_search_targets(cls, state_or_territory: str) -> Dict[str, str]:
        """Returns direct query URLs for a specific state or US territory."""
        code = state_or_territory.upper()
        info = US_TERRITORIES_AND_STATES.get(code, {"name": state_or_territory})
        region_name = info["name"].lower().replace(" ", "-")

        targets = {
            "realtor": cls.SUPPORTED_PORTALS["realtor"].format(query=region_name),
            "landwatch": cls.SUPPORTED_PORTALS["landwatch"].format(query=region_name),
            "loopnet": cls.SUPPORTED_PORTALS["loopnet"].format(query=region_name),
        }
        if code == "PR":
            targets["point2homes_pr"] = cls.SUPPORTED_PORTALS["point2homes_pr"].format(query="San-Juan")
        elif code in ["VI", "GU"]:
            targets["territory_mls"] = f"https://www.flexmls.com/link.html?region={code}"

        return targets
