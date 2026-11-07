"""
Unified Multi-Channel Live Deep Dive Scraper Orchestrator.
Orchestrates parallel search across:
- Facebook Marketplace (FSBO & off-market wholesale deals)
- Major MLS Listing Portals (Realtor, Zillow, Redfin)
- Land & Farm Portals (LandWatch, LandAndFarm)
- Commercial Portals (LoopNet, Crexi)
- Territory Portals (Puerto Rico, US Virgin Islands, Guam)
"""

from typing import List, Dict, Any, Optional
from ..models import Property, PropertyType
from .facebook_scraper import FacebookMarketplaceScraper
from .portal_scraper import ListingPortalScraper
from .territories import US_TERRITORIES_AND_STATES

class MultiChannelPropertyScraper:
    """
    Coordinates simultaneous property discovery across online marketplaces,
    direct portals, and territory registries.
    """

    def __init__(self):
        self.fb_scraper = FacebookMarketplaceScraper()
        self.portal_scraper = ListingPortalScraper()

    def generate_deep_dive_plan(
        self,
        region: str,  # State code (e.g. "TX", "CA", "FL") or Territory ("PR", "VI", "GU")
        strategy_focus: str = "all",  # "farming", "fix_and_flip", "str", "cash_flow"
        min_price: Optional[int] = None,
        max_price: Optional[int] = None,
    ) -> Dict[str, Any]:
        """
        Creates a structured search plan with live query URLs for each source.
        """
        reg_code = region.upper()
        reg_info = US_TERRITORIES_AND_STATES.get(reg_code, {"name": region, "type": "State"})
        reg_name = reg_info["name"]

        fb_query = "house for sale"
        if strategy_focus == "farming":
            fb_query = "land farm ranch acreage"
        elif strategy_focus == "fix_and_flip":
            fb_query = "fixer upper handyman special wholesale distressed"
        elif strategy_focus == "multi_family":
            fb_query = "duplex triplex multi family apartments"

        # Generate target channels
        fb_url = self.fb_scraper.build_search_url(
            city=reg_name,
            query=fb_query,
            min_price=min_price,
            max_price=max_price
        )

        portal_urls = self.portal_scraper.get_live_search_targets(reg_code)

        return {
            "region_code": reg_code,
            "region_name": reg_name,
            "region_type": reg_info.get("type", "State"),
            "strategy": strategy_focus,
            "channels": {
                "facebook_marketplace": {
                    "source": "Facebook Marketplace (FSBO & Investor Deals)",
                    "query_url": fb_url,
                    "target_type": "Direct owner & local wholesale listings"
                },
                "major_portals": {
                    "source": "MLS Portals (Realtor / Zillow / Redfin)",
                    "query_url": portal_urls.get("realtor"),
                    "target_type": "Public active MLS listings"
                },
                "land_and_farm": {
                    "source": "LandWatch / LandAndFarm",
                    "query_url": portal_urls.get("landwatch"),
                    "target_type": "Acreage, timberland, agricultural parcels & farms"
                },
                "commercial_mixed_use": {
                    "source": "LoopNet / Crexi",
                    "query_url": portal_urls.get("loopnet"),
                    "target_type": "Commercial, mixed-use storefronts, multi-family 5+ units"
                },
                "territory_specific": {
                    "source": f"{reg_name} Regional Board",
                    "query_url": portal_urls.get("point2homes_pr") or portal_urls.get("territory_mls", "https://www.caribbeanmls.com"),
                    "target_type": "Territory-specific local MLS & Act 60 / tourism listings"
                } if reg_info.get("type") == "Territory" else None
            }
        }

    def fetch_simulated_live_stream(
        self,
        region: str = "PR",
        strategy_focus: str = "all"
    ) -> List[Property]:
        """
        Simulates live incoming listings scraped across channels for instant ingestion.
        Includes sample real-world territory listings (Puerto Rico, USVI, Guam) and off-market FB deals.
        """
        reg_code = region.upper()
        
        # High-value real-world simulated live discoveries across states & territories
        live_discoveries = [
            # 1. Puerto Rico (Territory) - Agro-Tourism & Coffee Plantation
            Property(
                id="live-pr-001",
                title="Hacienda Cafetalera & Eco-Lodge Estate (28 Acres)",
                address="Carretera 140 Km 12.4",
                city="Utuado",
                state="PR",
                zip_code="00641",
                list_price=575000.0,
                property_type=PropertyType.AGRICULTURAL,
                bedrooms=5,
                bathrooms=4.0,
                square_feet=3400,
                lot_size_acres=28.0,
                year_built=2008,
                units=2,
                description="[Source: Facebook Marketplace & Local PR Board] Established shade-grown specialty coffee farm in central mountain corridor with 2 guest cabins and mountain stream. Eligible for agricultural tax incentives and Act 60 incentives.",
                image_url="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
                estimated_monthly_rent=3800.0,
                property_tax_annual=850.0,
                insurance_annual=2400.0,
            ),
            # 2. U.S. Virgin Islands (Territory) - St. Thomas Short-Term Rental Villa
            Property(
                id="live-vi-002",
                title="Caribbean Sea View Dual-Villa STR Compound",
                address="14-B Peterborg Point",
                city="St. Thomas",
                state="VI",
                zip_code="00802",
                list_price=1295000.0,
                property_type=PropertyType.MULTI_FAMILY,
                bedrooms=6,
                bathrooms=6.0,
                square_feet=4200,
                lot_size_acres=0.75,
                year_built=2015,
                units=2,
                description="[Source: VI FlexMLS & Caribbean Board] Turnkey vacation rental overlooking Magens Bay. Two independent villas with private infinity plunge pool. High ADR season from Nov-May.",
                image_url="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
                estimated_monthly_rent=8500.0,
                property_tax_annual=3200.0,
                insurance_annual=6500.0,
            ),
            # 3. Guam (Territory) - Multi-Family / Defense Workforce Housing
            Property(
                id="live-gu-003",
                title="Turnkey 4-Plex Residential Income Property",
                address="218 Marine Corps Dr",
                city="Tamuning",
                state="GU",
                zip_code="96913",
                list_price=890000.0,
                property_type=PropertyType.MULTI_FAMILY,
                bedrooms=8,
                bathrooms=6.0,
                square_feet=3800,
                lot_size_acres=0.35,
                year_built=2012,
                units=4,
                description="[Source: Guam MLS & FB Marketplace] Concrete typhoon-resistant 4-unit apartment building. Consistent 100% occupancy driven by defense contractors and hospital staff.",
                image_url="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
                estimated_monthly_rent=7200.0,
                property_tax_annual=1800.0,
                insurance_annual=4200.0,
            ),
            # 4. Off-Market Facebook Marketplace Wholesale Deal (Florida)
            Property(
                id="live-fb-004",
                title="Off-Market Distressed Duplex (Handyman / Cash Deal)",
                address="1824 E Columbus Dr",
                city="Tampa",
                state="FL",
                zip_code="33605",
                list_price=225000.0,
                property_type=PropertyType.MULTI_FAMILY,
                bedrooms=4,
                bathrooms=2.0,
                square_feet=1850,
                lot_size_acres=0.18,
                year_built=1958,
                units=2,
                description="[Source: Facebook Marketplace Direct Wholesale] Motivated seller. Both units vacant. Roof 2018, needs interior cosmetics and updating. ARV comps in Ybor City are $390k+.",
                image_url="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
                estimated_monthly_rent=2600.0,
                property_tax_annual=2800.0,
                insurance_annual=1900.0,
            )
        ]

        if reg_code in ["ALL", "USA", ""]:
            return live_discoveries

        filtered = [p for p in live_discoveries if p.state.upper() == reg_code]
        return filtered if filtered else live_discoveries
