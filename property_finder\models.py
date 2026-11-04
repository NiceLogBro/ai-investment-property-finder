"""
Core data models for the AI Investment Property Finder.
Built with standard Python dataclasses for zero-friction imports,
with full dictionary/JSON conversion support.
"""

from dataclasses import dataclass, field, asdict
from enum import Enum
from typing import List, Dict, Optional, Any


class PropertyType(str, Enum):
    SINGLE_FAMILY = "single_family"
    MULTI_FAMILY = "multi_family"
    CONDO = "condo"
    COMMERCIAL = "commercial"
    MIXED_USE = "mixed_use"
    AGRICULTURAL = "agricultural"
    LAND = "land"


class InvestmentStrategy(str, Enum):
    LONG_TERM_RENTAL = "long_term_rental"
    SHORT_TERM_RENTAL = "short_term_rental"
    FIX_AND_FLIP = "fix_and_flip"
    BRRRR = "brrrr"
    MULTI_FAMILY = "multi_family"
    COMMERCIAL_REDEVELOPMENT = "commercial_redevelopment"
    AGRICULTURAL_FARMING = "agricultural_farming"


@dataclass
class ZoningProfile:
    """Zoning details, restrictions, and regulatory parameters."""
    code: str  # e.g., "R-3", "C-2", "AG-20", "MU-D"
    name: str  # e.g., "Medium Density Residential", "General Commercial"
    category: str  # "Residential", "Commercial", "Agricultural", "Industrial", "Mixed-Use"
    permitted_uses: List[str] = field(default_factory=list)
    conditional_uses: List[str] = field(default_factory=list)
    prohibited_uses: List[str] = field(default_factory=list)
    max_height_ft: Optional[float] = None
    max_coverage_pct: Optional[float] = None
    floor_area_ratio: Optional[float] = None  # FAR
    setbacks: Dict[str, float] = field(default_factory=lambda: {"front": 20, "rear": 15, "side": 10})
    short_term_rental_allowed: bool = True
    adu_permitted: bool = True  # Accessory Dwelling Unit
    commercial_ground_floor_required: bool = False
    parking_ratio_per_unit: float = 1.5
    special_restrictions: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class DemographicProfile:
    """Local neighborhood demographic and foot traffic metrics."""
    zip_code: str
    city: str
    state: str
    population: int = 25000
    population_growth_5yr_pct: float = 4.2
    median_household_income: float = 78000.0
    median_age: float = 36.5
    bachelors_or_higher_pct: float = 41.0
    renter_occupied_pct: float = 44.0
    foot_traffic_score: int = 72  # 0 to 100
    walk_score: int = 68
    transit_score: int = 55
    top_employment_sectors: List[str] = field(default_factory=lambda: ["Healthcare", "Tech", "Retail", "Education"])
    discretionary_spend_index: float = 112.0  # National avg = 100
    underserved_business_types: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class SoilProfile:
    """Agronomic and soil science properties for agricultural & land analysis."""
    soil_series_name: str  # e.g., "Yolo Loam", "Clarion Loam", "Ontario Silt Loam"
    soil_texture: str  # e.g., "Silt Loam", "Sandy Loam", "Clay Loam", "Loam"
    ph_level: float = 6.5  # Optimal generally 6.0 - 7.0
    organic_matter_pct: float = 3.8
    drainage_class: str = "Well Drained"  # "Excessively", "Well Drained", "Moderately Well", "Poorly"
    water_storage_capacity_inches: float = 8.5  # per top 60 inches
    slope_pct: float = 2.0
    prime_farmland_rating: str = "Prime Farmland if Irrigated"  # "All Areas are Prime", "Statewide Importance", etc.
    frost_free_days: int = 210
    usda_hardiness_zone: str = "8b"
    irrigation_water_rights: bool = True
    depth_to_water_table_ft: float = 12.0
    depth_to_bedrock_inches: float = 72.0

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class CropSuitability:
    """Evaluation of specific crop viability and farming economics."""
    crop_name: str
    suitability_score: int  # 0 to 100
    tier: str  # "Exceptional", "High Viability", "Moderate Viability", "Not Recommended"
    optimal_reasons: List[str] = field(default_factory=list)
    risk_factors: List[str] = field(default_factory=list)
    estimated_annual_gross_yield_per_acre: float = 0.0
    estimated_cost_per_acre: float = 0.0
    estimated_net_profit_per_acre: float = 0.0
    recommended_farming_method: str = "Regenerative Drip-Irrigated"

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class BusinessRecommendation:
    """AI-derived optimal business concept for a specific demographic and zoning."""
    business_type: str  # e.g., "Specialty Third-Wave Coffee & Remote Work Hub"
    category: str  # "Food & Beverage", "Healthcare/Wellness", "Personal Services", "Specialty Retail"
    match_score: int  # 0 - 100
    zoning_compliance: str  # "Permitted By Right", "Conditional Use Permit Required", "Variance Needed"
    target_demographic_fit: str
    revenue_driver: str
    estimated_break_even_months: int
    estimated_annual_revenue_range: str
    recommended_sqft: int
    pros: List[str] = field(default_factory=list)
    risks_to_mitigate: List[str] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class FinancialMetrics:
    """Complete quantitative return indicators across strategies."""
    # Long-term / Buy & Hold
    monthly_gross_rent: float = 0.0
    monthly_net_operating_income: float = 0.0  # NOI
    annual_noi: float = 0.0
    monthly_mortgage_payment: float = 0.0
    monthly_cash_flow: float = 0.0
    annual_cash_flow: float = 0.0
    cap_rate: float = 0.0  # %
    cash_on_cash_return: float = 0.0  # %
    gross_rent_multiplier: float = 0.0  # GRM
    debt_service_coverage_ratio: float = 0.0  # DSCR
    estimated_10yr_irr: float = 0.0  # Internal Rate of Return %

    # Short-term / Airbnb
    average_daily_rate: float = 0.0  # ADR
    occupancy_rate_pct: float = 0.0
    str_annual_revenue: float = 0.0
    str_annual_net_cash_flow: float = 0.0
    str_cash_on_cash: float = 0.0

    # Fix & Flip / BRRRR
    arv: float = 0.0  # After Repair Value
    estimated_rehab_costs: float = 0.0
    maximum_allowable_offer_70pct: float = 0.0  # 70% rule
    projected_flip_profit: float = 0.0
    projected_flip_roi_pct: float = 0.0
    brrrr_refinance_cash_out: float = 0.0
    capital_left_in_deal: float = 0.0

    # Agricultural / Farm Yield
    farm_annual_net_yield: float = 0.0
    farm_cap_rate: float = 0.0

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class Property:
    """The central Property entity representing a real estate asset."""
    id: str
    title: str
    address: str
    city: str
    state: str
    zip_code: str
    list_price: float
    property_type: PropertyType
    bedrooms: int = 3
    bathrooms: float = 2.0
    square_feet: int = 1800
    lot_size_acres: float = 0.25
    year_built: int = 1995
    units: int = 1
    description: str = ""
    image_url: str = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
    
    # Financial Inputs
    estimated_monthly_rent: float = 2400.0
    property_tax_annual: float = 3800.0
    insurance_annual: float = 1200.0
    hoa_monthly: float = 0.0
    maintenance_pct: float = 5.0
    vacancy_pct: float = 5.0
    management_pct: float = 8.0

    # Contextual modules
    zoning: Optional[ZoningProfile] = None
    demographics: Optional[DemographicProfile] = None
    soil: Optional[SoilProfile] = None
    financials: Optional[FinancialMetrics] = None
    business_recommendations: List[BusinessRecommendation] = field(default_factory=list)
    crop_suitability: List[CropSuitability] = field(default_factory=list)
    ai_investment_memo: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        res = asdict(self)
        # Ensure enums serialize as raw strings
        res["property_type"] = self.property_type.value if isinstance(self.property_type, PropertyType) else self.property_type
        return res

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Property":
        data = data.copy()
        if "property_type" in data and isinstance(data["property_type"], str):
            try:
                data["property_type"] = PropertyType(data["property_type"])
            except ValueError:
                data["property_type"] = PropertyType.SINGLE_FAMILY

        if "zoning" in data and isinstance(data["zoning"], dict):
            data["zoning"] = ZoningProfile(**data["zoning"])
        if "demographics" in data and isinstance(data["demographics"], dict):
            data["demographics"] = DemographicProfile(**data["demographics"])
        if "soil" in data and isinstance(data["soil"], dict):
            data["soil"] = SoilProfile(**data["soil"])
        if "financials" in data and isinstance(data["financials"], dict):
            data["financials"] = FinancialMetrics(**data["financials"])
        if "business_recommendations" in data and isinstance(data["business_recommendations"], list):
            data["business_recommendations"] = [
                BusinessRecommendation(**b) if isinstance(b, dict) else b
                for b in data["business_recommendations"]
            ]
        if "crop_suitability" in data and isinstance(data["crop_suitability"], list):
            data["crop_suitability"] = [
                CropSuitability(**c) if isinstance(c, dict) else c
                for c in data["crop_suitability"]
            ]
        return cls(**data)
