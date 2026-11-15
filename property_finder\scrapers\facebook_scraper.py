"""
Live Facebook Marketplace Real Estate Query & Extraction Adapter.
Builds structured search payloads and parsers for off-market, FSBO (For Sale By Owner),
and investor deals posted on Facebook Marketplace.
"""

import urllib.parse
from typing import List, Dict, Any, Optional
from ..models import Property, PropertyType

class FacebookMarketplaceScraper:
    """
    Search and parsing engine for real estate listings on Facebook Marketplace across US cities and territories.
    """

    BASE_URL = "https://www.facebook.com/marketplace"

    # Known city slugs on Facebook Marketplace for states and territories
    CITY_SLUGS = {
        "austin": "austin",
        "denver": "denver",
        "atlanta": "atlanta",
        "portland": "portland",
        "gatlinburg": "knoxville",
        "san juan": "sanjuan",
        "ponce": "ponce",
        "st thomas": "usvi",
        "st croix": "usvi",
        "guam": "guam",
        "honolulu": "honolulu",
        "miami": "miami",
        "houston": "houston",
        "dallas": "dallas",
        "phoenix": "phoenix",
    }

    @classmethod
    def build_search_url(
        cls,
        city: str = "austin",
        query: str = "house for sale",
        min_price: Optional[int] = None,
        max_price: Optional[int] = None,
        category: str = "propertyforsale"
    ) -> str:
        """Constructs direct live query URLs for Facebook Marketplace."""
        city_slug = cls.CITY_SLUGS.get(city.lower(), urllib.parse.quote(city.lower()))
        params = {
            "query": query,
            "exact": "false"
        }
        if min_price:
            params["minPrice"] = str(min_price)
        if max_price:
            params["maxPrice"] = str(max_price)

        query_str = urllib.parse.urlencode(params)
        return f"{cls.BASE_URL}/{city_slug}/{category}?{query_str}"

    @classmethod
    def parse_raw_listing(cls, listing_dict: Dict[str, Any]) -> Property:
        """
        Converts extracted Facebook listing JSON / DOM card into a normalized Property object.
        """
        title = listing_dict.get("title", "Facebook Real Estate Listing")
        price = float(listing_dict.get("price", 0.0))
        address = listing_dict.get("location", "Listing Address")
        city = listing_dict.get("city", "Austin")
        state = listing_dict.get("state", "TX")
        description = listing_dict.get("description", "")
        beds = int(listing_dict.get("bedrooms", 3))
        baths = float(listing_dict.get("bathrooms", 2.0))
        sqft = int(listing_dict.get("square_feet", 1600))
        acres = float(listing_dict.get("lot_acres", 0.25))

        # Infer property type
        text = (title + " " + description).lower()
        if "duplex" in text or "triplex" in text or "multi" in text or "units" in text:
            ptype = PropertyType.MULTI_FAMILY
        elif "farm" in text or "ranch" in text or "land" in text or "acre" in text:
            ptype = PropertyType.AGRICULTURAL
        elif "commercial" in text or "retail" in text or "mixed" in text:
            ptype = PropertyType.MIXED_USE
        else:
            ptype = PropertyType.SINGLE_FAMILY

        prop_id = f"fb-{abs(hash(title + str(price))) % 1000000:06d}"

        return Property(
            id=prop_id,
            title=title,
            address=address,
            city=city,
            state=state,
            zip_code=listing_dict.get("zip_code", "00000"),
            list_price=price,
            property_type=ptype,
            bedrooms=beds,
            bathrooms=baths,
            square_feet=sqft,
            lot_size_acres=acres,
            description=f"[Source: Facebook Marketplace] {description}",
            image_url=listing_dict.get("image_url", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"),
            estimated_monthly_rent=max(800.0, price * 0.0075)
        )
