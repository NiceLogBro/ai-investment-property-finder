"""
Upcoming Development Area Intelligence & Growth Pipeline Analyzer.

Tracks leading indicators that signal an area is poised for appreciation:
- Major infrastructure projects (transit, highways, hospitals, universities)
- Rezoning / upzoning proposals in the municipal pipeline
- Building permit velocity and YoY construction activity
- Population & job growth trajectories
- Employer migration announcements (corporate relocations / HQ expansions)
- Median sale price appreciation trends
- Days-on-market compression signals
- Opportunity Zone and tax incentive overlays
- Walk score / transit score improvement trajectories
- Development pipeline risk scoring
"""

from dataclasses import dataclass, field, asdict
from typing import List, Dict, Any, Optional
from enum import Enum


class ProjectPhase(str, Enum):
    ANNOUNCED = "announced"
    APPROVED = "approved"
    UNDER_CONSTRUCTION = "under_construction"
    COMPLETED_RECENT = "completed_recent"  # Completed within last 24 months


class InfrastructureCategory(str, Enum):
    TRANSIT_RAIL = "transit_rail"
    HIGHWAY_INTERCHANGE = "highway_interchange"
    HOSPITAL_MEDICAL = "hospital_medical_campus"
    UNIVERSITY_CAMPUS = "university_campus"
    TECH_CAMPUS_HQ = "tech_campus_hq"
    MIXED_USE_TOWN_CENTER = "mixed_use_town_center"
    WATERFRONT_REDEVELOPMENT = "waterfront_redevelopment"
    AIRPORT_EXPANSION = "airport_expansion"
    SPORTS_ENTERTAINMENT = "sports_entertainment_venue"
    DATA_CENTER_INDUSTRIAL = "data_center_industrial"
    RENEWABLE_ENERGY = "renewable_energy_facility"


@dataclass
class InfrastructureProject:
    """A single upcoming or recently completed development project near the asset."""
    name: str
    category: InfrastructureCategory
    phase: ProjectPhase
    estimated_investment: float  # Total dollar investment
    distance_miles: float  # Distance from the subject property
    estimated_completion_year: int
    jobs_created: int = 0
    housing_units_added: int = 0
    impact_description: str = ""
    appreciation_catalyst_score: int = 0  # 0-100; how strongly this project drives local appreciation

    def to_dict(self) -> Dict[str, Any]:
        d = asdict(self)
        d["category"] = self.category.value
        d["phase"] = self.phase.value
        return d


@dataclass
class RezoningProposal:
    """A pending or recently approved rezoning / upzoning action."""
    case_number: str
    current_zoning: str  # e.g. "R-1"
    proposed_zoning: str  # e.g. "MU-D" or "R-5"
    status: str  # "Pending Planning Commission", "Approved by Council", "Under Environmental Review"
    acreage_affected: float
    distance_miles: float
    density_increase_pct: float  # How much denser the new zoning allows vs. current
    description: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class EmployerMigration:
    """A corporate relocation, expansion, or HQ announcement near the property."""
    company_name: str
    industry: str
    announcement_type: str  # "New HQ", "Regional Office", "Fulfillment Center", "R&D Campus"
    estimated_employees: int
    avg_salary: float
    distance_miles: float
    target_year: int

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class DevelopmentProfile:
    """
    Comprehensive development pipeline intelligence for a property's surrounding area.
    This is the core model that quantifies how 'up-and-coming' a neighborhood is.
    """
    # --- Growth Velocity Metrics ---
    population_growth_1yr_pct: float = 0.0
    population_growth_5yr_pct: float = 0.0
    population_growth_10yr_projected_pct: float = 0.0
    job_growth_1yr_pct: float = 0.0
    unemployment_rate_pct: float = 3.8

    # --- Real Estate Market Momentum ---
    median_sale_price_1yr_change_pct: float = 0.0
    median_sale_price_3yr_change_pct: float = 0.0
    avg_days_on_market: int = 30
    days_on_market_yoy_change: int = 0  # Negative = market tightening (bullish)
    absorption_rate_months: float = 3.0  # Months of housing inventory; <3 = seller's market
    new_listings_yoy_change_pct: float = 0.0

    # --- Construction & Permit Activity ---
    building_permits_issued_ytd: int = 0
    building_permits_yoy_change_pct: float = 0.0
    new_construction_units_pipeline: int = 0
    commercial_permits_ytd: int = 0

    # --- Walk Score & Transit Trajectory ---
    current_walk_score: int = 50
    projected_walk_score_5yr: int = 55
    current_transit_score: int = 40
    projected_transit_score_5yr: int = 50

    # --- Tax Incentive Overlays ---
    is_opportunity_zone: bool = False
    opportunity_zone_tract_id: str = ""
    has_tax_increment_financing: bool = False  # TIF district
    has_enterprise_zone: bool = False
    has_historic_tax_credits: bool = False
    has_new_market_tax_credits: bool = False
    special_incentive_programs: List[str] = field(default_factory=list)

    # --- Infrastructure Pipeline ---
    infrastructure_projects: List[InfrastructureProject] = field(default_factory=list)

    # --- Rezoning Pipeline ---
    rezoning_proposals: List[RezoningProposal] = field(default_factory=list)

    # --- Employer Migration Pipeline ---
    employer_migrations: List[EmployerMigration] = field(default_factory=list)

    # --- Composite Scores ---
    development_momentum_score: int = 0  # 0-100; overall "up-and-coming" composite
    appreciation_forecast_5yr_pct: float = 0.0  # Projected 5-year total property value appreciation
    risk_of_overbuilding: str = "Low"  # "Low", "Moderate", "High"
    gentrification_pressure_index: int = 0  # 0-100
    overall_investment_timing: str = ""  # "Early Mover Advantage", "Growth Phase", "Mature / Stabilized", "Saturated"

    def to_dict(self) -> Dict[str, Any]:
        d = asdict(self)
        d["infrastructure_projects"] = [p.to_dict() if hasattr(p, "to_dict") else p for p in self.infrastructure_projects]
        d["rezoning_proposals"] = [r.to_dict() if hasattr(r, "to_dict") else r for r in self.rezoning_proposals]
        d["employer_migrations"] = [e.to_dict() if hasattr(e, "to_dict") else e for e in self.employer_migrations]
        return d
