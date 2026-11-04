"""
Zoning and regulatory intelligence analyzer.
Parses municipal zoning codes, permitted commercial/residential uses, setbacks, and development limits.
"""

from typing import Dict, Any, List
from ..models import Property, ZoningProfile


class ZoningAnalyzer:
    """Evaluates land use zoning and identifies development and usage possibilities."""

    STANDARD_ZONING_DATABASE = {
        "R-1": {
            "name": "Single-Family Low-Density Residential",
            "category": "Residential",
            "permitted_uses": ["Single-family detached home", "Home occupation (non-retail)", "ADU (Accessory Dwelling Unit)"],
            "conditional_uses": ["Daycare (small)", "Bed & Breakfast", "Community garden"],
            "prohibited_uses": ["Retail storefront", "Automotive", "Industrial", "Multi-family 3+ units"],
            "max_height_ft": 30.0,
            "max_coverage_pct": 35.0,
            "floor_area_ratio": 0.45,
            "short_term_rental_allowed": True,
            "adu_permitted": True,
            "parking_ratio": 2.0,
        },
        "R-3": {
            "name": "Medium-Density Multi-Family Residential",
            "category": "Residential",
            "permitted_uses": ["Single-family", "Duplex", "Triplex", "Apartment complex up to 4 stories", "ADU"],
            "conditional_uses": ["Daycare center", "Assisted living facility", "Home-based business"],
            "prohibited_uses": ["Heavy commercial", "Industrial", "Nightclubs"],
            "max_height_ft": 45.0,
            "max_coverage_pct": 55.0,
            "floor_area_ratio": 1.2,
            "short_term_rental_allowed": True,
            "adu_permitted": True,
            "parking_ratio": 1.25,
        },
        "C-1": {
            "name": "Neighborhood Commercial",
            "category": "Commercial",
            "permitted_uses": ["Cafe / Coffee shop", "Boutique retail", "Medical / Dental clinic", "Professional offices", "Laundromat", "Bakery"],
            "conditional_uses": ["Drive-thru restaurant", "Fitness gym", "Veterinary clinic", "Second-story residential"],
            "prohibited_uses": ["Industrial manufacturing", "Warehousing", "Auto salvage"],
            "max_height_ft": 35.0,
            "max_coverage_pct": 60.0,
            "floor_area_ratio": 1.0,
            "short_term_rental_allowed": True,
            "adu_permitted": False,
            "parking_ratio": 3.0,
        },
        "MU-D": {
            "name": "Mixed-Use Downtown Corridor",
            "category": "Mixed-Use",
            "permitted_uses": ["Ground floor retail/restaurant", "Upper floor multi-family apartments", "Co-working space", "Art gallery", "Micro-brewery"],
            "conditional_uses": ["Event venue", "Hotel / Boutique lodge", "Rooftop lounge"],
            "prohibited_uses": ["Drive-thrus", "Heavy automotive", "Outdoor bulk storage"],
            "max_height_ft": 65.0,
            "max_coverage_pct": 80.0,
            "floor_area_ratio": 2.5,
            "short_term_rental_allowed": True,
            "adu_permitted": True,
            "parking_ratio": 1.0,
        },
        "AG-20": {
            "name": "Agricultural Exclusive (20-Acre Min)",
            "category": "Agricultural",
            "permitted_uses": ["Commercial farming & crop production", "Vineyard & winery", "Livestock grazing", "Orchard cultivation", "Farmstand (produce)", "Single farm dwelling"],
            "conditional_uses": ["Agri-tourism / Farm stay", "Agricultural processing plant", "Equine equestrian center"],
            "prohibited_uses": ["Subdivisions", "Commercial retail malls", "Multi-family complexes", "Heavy industrial"],
            "max_height_ft": 40.0,
            "max_coverage_pct": 10.0,
            "floor_area_ratio": 0.15,
            "short_term_rental_allowed": True,
            "adu_permitted": True,
            "parking_ratio": 1.0,
        },
    }

    @classmethod
    def analyze(cls, prop: Property) -> ZoningProfile:
        """Enriches and evaluates the property's zoning profile."""
        code = prop.zoning.code if prop.zoning else ("AG-20" if prop.property_type.value == "agricultural" else "R-3")
        lookup_key = next((k for k in cls.STANDARD_ZONING_DATABASE if k in code.upper()), "R-3")
        base = cls.STANDARD_ZONING_DATABASE[lookup_key]

        profile = ZoningProfile(
            code=code,
            name=base["name"],
            category=base["category"],
            permitted_uses=base["permitted_uses"],
            conditional_uses=base["conditional_uses"],
            prohibited_uses=base["prohibited_uses"],
            max_height_ft=base["max_height_ft"],
            max_coverage_pct=base["max_coverage_pct"],
            floor_area_ratio=base["floor_area_ratio"],
            short_term_rental_allowed=base["short_term_rental_allowed"],
            adu_permitted=base["adu_permitted"],
            parking_ratio_per_unit=base["parking_ratio"],
            special_restrictions=[
                "Check municipal setback buffer for adjacent rights-of-way",
                "Exterior signage subject to city design review guidelines"
            ]
        )
        prop.zoning = profile
        return profile
