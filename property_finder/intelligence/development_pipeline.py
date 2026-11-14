"""
Development Pipeline Analyzer.

Evaluates upcoming infrastructure, rezoning activity, permit velocity, employer migrations,
and market momentum to produce a composite 'Development Momentum Score' and 5-year
appreciation forecast for every property.
"""

from typing import List, Dict, Any, Optional
from ..models import Property, PropertyType
from .development_models import (
    DevelopmentProfile,
    InfrastructureProject,
    InfrastructureCategory,
    ProjectPhase,
    RezoningProposal,
    EmployerMigration,
)


class DevelopmentPipelineAnalyzer:
    """
    Analyzes the development pipeline surrounding a property to quantify
    how 'up-and-coming' the neighborhood is.
    """

    # ── Regional infrastructure knowledge base ──────────────────────────
    # Keyed by (city, state) tuples; entries represent known or plausible
    # upcoming projects based on public records patterns.
    INFRASTRUCTURE_DATABASE: Dict[str, List[Dict[str, Any]]] = {
        "austin_tx": [
            {
                "name": "Project Connect Blue Line Light Rail (Downtown ↔ Airport)",
                "category": InfrastructureCategory.TRANSIT_RAIL,
                "phase": ProjectPhase.UNDER_CONSTRUCTION,
                "estimated_investment": 4_800_000_000,
                "distance_miles": 2.5,
                "estimated_completion_year": 2029,
                "jobs_created": 9500,
                "housing_units_added": 0,
                "impact_description": "28-mile light rail system connecting South Austin, Downtown, UT campus, and ABIA airport. Transit-oriented development catalyst along corridor.",
                "appreciation_catalyst_score": 92,
            },
            {
                "name": "South Central Waterfront Mixed-Use District Redevelopment",
                "category": InfrastructureCategory.WATERFRONT_REDEVELOPMENT,
                "phase": ProjectPhase.APPROVED,
                "estimated_investment": 2_100_000_000,
                "distance_miles": 1.8,
                "estimated_completion_year": 2031,
                "jobs_created": 6200,
                "housing_units_added": 4200,
                "impact_description": "118-acre lakefront master plan transforming surface parking and industrial parcels into walkable mixed-use neighborhood with parks, retail, and 4,200 housing units.",
                "appreciation_catalyst_score": 88,
            },
            {
                "name": "Tesla Gigafactory Texas Phase 2 Expansion",
                "category": InfrastructureCategory.TECH_CAMPUS_HQ,
                "phase": ProjectPhase.UNDER_CONSTRUCTION,
                "estimated_investment": 3_600_000_000,
                "distance_miles": 8.0,
                "estimated_completion_year": 2028,
                "jobs_created": 12000,
                "housing_units_added": 0,
                "impact_description": "Second phase manufacturing and engineering campus expansion in southeast Travis County. Massive workforce housing demand catalyst.",
                "appreciation_catalyst_score": 78,
            },
        ],
        "denver_co": [
            {
                "name": "National Western Center Campus Redevelopment",
                "category": InfrastructureCategory.MIXED_USE_TOWN_CENTER,
                "phase": ProjectPhase.UNDER_CONSTRUCTION,
                "estimated_investment": 1_200_000_000,
                "distance_miles": 3.2,
                "estimated_completion_year": 2028,
                "jobs_created": 3800,
                "housing_units_added": 1800,
                "impact_description": "250-acre regeneration of historic stockyards into year-round events campus, innovation district, and mixed-use neighborhood. Adjacent to RTD N-Line commuter rail.",
                "appreciation_catalyst_score": 85,
            },
            {
                "name": "I-70 Central Viaduct Reconstruction & Cap Park",
                "category": InfrastructureCategory.HIGHWAY_INTERCHANGE,
                "phase": ProjectPhase.COMPLETED_RECENT,
                "estimated_investment": 1_270_000_000,
                "distance_miles": 2.0,
                "estimated_completion_year": 2025,
                "jobs_created": 1200,
                "housing_units_added": 0,
                "impact_description": "Lowered highway segment with 4-acre freeway cap park reconnecting Globeville and Elyria-Swansea neighborhoods. Major noise reduction and land value uplift.",
                "appreciation_catalyst_score": 72,
            },
        ],
        "atlanta_ga": [
            {
                "name": "Atlanta BeltLine Westside Trail Phase 2 & Affordable TOD",
                "category": InfrastructureCategory.TRANSIT_RAIL,
                "phase": ProjectPhase.UNDER_CONSTRUCTION,
                "estimated_investment": 980_000_000,
                "distance_miles": 1.5,
                "estimated_completion_year": 2030,
                "jobs_created": 3400,
                "housing_units_added": 5600,
                "impact_description": "22-mile multi-use corridor converting rail corridor to transit, trails, parks, and 5,600 mixed-income housing units. Proven 20-40% appreciation in adjacent parcels.",
                "appreciation_catalyst_score": 95,
            },
            {
                "name": "Microsoft East Campus & Azure Data Center Hub",
                "category": InfrastructureCategory.TECH_CAMPUS_HQ,
                "phase": ProjectPhase.ANNOUNCED,
                "estimated_investment": 750_000_000,
                "distance_miles": 6.0,
                "estimated_completion_year": 2029,
                "jobs_created": 4500,
                "housing_units_added": 0,
                "impact_description": "Regional cloud campus and engineering center bringing high-income tech workforce to metro east side.",
                "appreciation_catalyst_score": 74,
            },
        ],
        "portland_or": [
            {
                "name": "Broadway Corridor Mixed-Use Master Plan (USPS Site)",
                "category": InfrastructureCategory.MIXED_USE_TOWN_CENTER,
                "phase": ProjectPhase.APPROVED,
                "estimated_investment": 1_500_000_000,
                "distance_miles": 0.8,
                "estimated_completion_year": 2032,
                "jobs_created": 5000,
                "housing_units_added": 3500,
                "impact_description": "34-acre former USPS distribution site redeveloping into Pearl District extension with 3,500 housing units, biotech labs, parks, and ground-floor retail.",
                "appreciation_catalyst_score": 90,
            },
        ],
        "tampa_fl": [
            {
                "name": "Water Street Tampa Phase 2 & USF Health Campus",
                "category": InfrastructureCategory.MIXED_USE_TOWN_CENTER,
                "phase": ProjectPhase.UNDER_CONSTRUCTION,
                "estimated_investment": 3_500_000_000,
                "distance_miles": 3.0,
                "estimated_completion_year": 2029,
                "jobs_created": 8000,
                "housing_units_added": 3800,
                "impact_description": "56-acre waterfront district adding medical campus, Class-A office towers, luxury residential, and boutique hotel. WELL-certified neighborhood transforming Channelside.",
                "appreciation_catalyst_score": 89,
            },
            {
                "name": "Ybor City Historic District Revitalization & Streetcar Expansion",
                "category": InfrastructureCategory.TRANSIT_RAIL,
                "phase": ProjectPhase.APPROVED,
                "estimated_investment": 420_000_000,
                "distance_miles": 1.2,
                "estimated_completion_year": 2030,
                "jobs_created": 2200,
                "housing_units_added": 1400,
                "impact_description": "Streetcar line extension into East Tampa with adaptive-reuse historic lofts, artisan food halls, and creative office. Strong FSBO and wholesale deal flow from transitioning parcels.",
                "appreciation_catalyst_score": 86,
            },
        ],
        "utuado_pr": [
            {
                "name": "Central Mountain Eco-Tourism Corridor (PR-10 / Ruta Panorámica)",
                "category": InfrastructureCategory.MIXED_USE_TOWN_CENTER,
                "phase": ProjectPhase.ANNOUNCED,
                "estimated_investment": 180_000_000,
                "distance_miles": 4.0,
                "estimated_completion_year": 2030,
                "jobs_created": 1200,
                "housing_units_added": 300,
                "impact_description": "Federal and territorial investment in agri-tourism trail infrastructure, boutique lodging permits, and shade-grown coffee brand designation program.",
                "appreciation_catalyst_score": 68,
            },
        ],
        "st. thomas_vi": [
            {
                "name": "Red Hook Marine Terminal & Ferry Hub Modernization",
                "category": InfrastructureCategory.WATERFRONT_REDEVELOPMENT,
                "phase": ProjectPhase.UNDER_CONSTRUCTION,
                "estimated_investment": 95_000_000,
                "distance_miles": 3.0,
                "estimated_completion_year": 2028,
                "jobs_created": 400,
                "housing_units_added": 0,
                "impact_description": "Upgraded inter-island ferry terminal with new customs facility, retail promenade, and marina expansion. Increases St. Thomas accessibility and tourism capacity.",
                "appreciation_catalyst_score": 65,
            },
        ],
        "tamuning_gu": [
            {
                "name": "Marine Corps Base Camp Blaz & Defense Housing Expansion",
                "category": InfrastructureCategory.DATA_CENTER_INDUSTRIAL,
                "phase": ProjectPhase.UNDER_CONSTRUCTION,
                "estimated_investment": 8_700_000_000,
                "distance_miles": 6.0,
                "estimated_completion_year": 2029,
                "jobs_created": 5000,
                "housing_units_added": 2400,
                "impact_description": "Massive US Marine Corps relocation from Okinawa bringing 5,000 military personnel and dependents. Unprecedented demand surge for off-base housing, retail, and services.",
                "appreciation_catalyst_score": 94,
            },
        ],
    }

    # ── Rezoning knowledge base ─────────────────────────────────────────
    REZONING_DATABASE: Dict[str, List[Dict[str, Any]]] = {
        "austin_tx": [
            {
                "case_number": "C14-2025-0087",
                "current_zoning": "SF-3 (Single Family)",
                "proposed_zoning": "MF-4 (Multi-Family Medium-High Density)",
                "status": "Approved by City Council — Effective Q1 2027",
                "acreage_affected": 42.0,
                "distance_miles": 1.2,
                "density_increase_pct": 340.0,
                "description": "Major upzoning along South Lamar Blvd corridor enabling 4-story apartment buildings and mixed-use. Former single-family lots now carry multi-family entitlements.",
            },
        ],
        "tampa_fl": [
            {
                "case_number": "REZ-2025-1142",
                "current_zoning": "CG (General Commercial)",
                "proposed_zoning": "PD-MU (Planned Development Mixed-Use)",
                "status": "Under City Planning Review — Hearing scheduled Q2 2027",
                "acreage_affected": 18.5,
                "distance_miles": 0.8,
                "density_increase_pct": 280.0,
                "description": "Proposed conversion of aging commercial strip along E Columbus Dr into walkable mixed-use with residential above retail. Ground-zero for Ybor City expansion.",
            },
        ],
        "atlanta_ga": [
            {
                "case_number": "Z-25-048",
                "current_zoning": "R-4 (Single Family Residential)",
                "proposed_zoning": "MRC-3 (Mixed Residential Commercial)",
                "status": "Approved by Zoning Review Board",
                "acreage_affected": 26.0,
                "distance_miles": 1.0,
                "density_increase_pct": 410.0,
                "description": "BeltLine-adjacent upzoning enabling 6-story mixed-use buildings. Directly increases land value of nearby residential parcels by enabling redevelopment.",
            },
        ],
    }

    # ── Employer migration database ─────────────────────────────────────
    EMPLOYER_DATABASE: Dict[str, List[Dict[str, Any]]] = {
        "austin_tx": [
            {"company_name": "Tesla, Inc.", "industry": "EV Manufacturing & AI", "announcement_type": "HQ Expansion", "estimated_employees": 12000, "avg_salary": 95000, "distance_miles": 8.0, "target_year": 2028},
            {"company_name": "Apple Inc.", "industry": "Technology", "announcement_type": "Regional Campus Expansion", "estimated_employees": 5000, "avg_salary": 145000, "distance_miles": 10.0, "target_year": 2027},
        ],
        "denver_co": [
            {"company_name": "Ball Aerospace (BAE Systems)", "industry": "Aerospace & Defense", "announcement_type": "R&D Campus", "estimated_employees": 3200, "avg_salary": 112000, "distance_miles": 7.0, "target_year": 2028},
        ],
        "atlanta_ga": [
            {"company_name": "Microsoft Corporation", "industry": "Cloud & AI", "announcement_type": "Azure Engineering Campus", "estimated_employees": 4500, "avg_salary": 138000, "distance_miles": 6.0, "target_year": 2029},
            {"company_name": "Rivian Automotive", "industry": "EV Manufacturing", "announcement_type": "Manufacturing Plant", "estimated_employees": 7500, "avg_salary": 68000, "distance_miles": 40.0, "target_year": 2028},
        ],
        "tampa_fl": [
            {"company_name": "Citigroup", "industry": "Financial Services", "announcement_type": "Regional Hub Expansion", "estimated_employees": 2800, "avg_salary": 92000, "distance_miles": 3.5, "target_year": 2027},
        ],
        "tamuning_gu": [
            {"company_name": "US Marine Corps (Camp Blaz)", "industry": "Defense", "announcement_type": "Base Activation & Relocation", "estimated_employees": 5000, "avg_salary": 65000, "distance_miles": 6.0, "target_year": 2029},
        ],
    }

    # ── Market momentum benchmarks ──────────────────────────────────────
    MARKET_MOMENTUM: Dict[str, Dict[str, Any]] = {
        "austin_tx": {
            "population_growth_1yr_pct": 2.8, "population_growth_5yr_pct": 14.2, "population_growth_10yr_projected_pct": 28.5,
            "job_growth_1yr_pct": 3.6, "unemployment_rate_pct": 3.1,
            "median_sale_price_1yr_change_pct": 5.4, "median_sale_price_3yr_change_pct": 18.2,
            "avg_days_on_market": 28, "days_on_market_yoy_change": -8,
            "absorption_rate_months": 2.4, "new_listings_yoy_change_pct": -4.2,
            "building_permits_issued_ytd": 4800, "building_permits_yoy_change_pct": 12.5,
            "new_construction_units_pipeline": 18500, "commercial_permits_ytd": 340,
            "current_walk_score": 78, "projected_walk_score_5yr": 86,
            "current_transit_score": 64, "projected_transit_score_5yr": 78,
            "is_opportunity_zone": True, "opportunity_zone_tract_id": "48453001703",
        },
        "denver_co": {
            "population_growth_1yr_pct": 1.9, "population_growth_5yr_pct": 9.8, "population_growth_10yr_projected_pct": 19.0,
            "job_growth_1yr_pct": 2.8, "unemployment_rate_pct": 3.4,
            "median_sale_price_1yr_change_pct": 4.8, "median_sale_price_3yr_change_pct": 16.5,
            "avg_days_on_market": 22, "days_on_market_yoy_change": -12,
            "absorption_rate_months": 1.8, "new_listings_yoy_change_pct": -6.1,
            "building_permits_issued_ytd": 3200, "building_permits_yoy_change_pct": 8.2,
            "new_construction_units_pipeline": 12800, "commercial_permits_ytd": 280,
            "current_walk_score": 86, "projected_walk_score_5yr": 90,
            "current_transit_score": 72, "projected_transit_score_5yr": 80,
            "is_opportunity_zone": False,
        },
        "atlanta_ga": {
            "population_growth_1yr_pct": 2.2, "population_growth_5yr_pct": 11.6, "population_growth_10yr_projected_pct": 24.0,
            "job_growth_1yr_pct": 3.2, "unemployment_rate_pct": 3.5,
            "median_sale_price_1yr_change_pct": 6.8, "median_sale_price_3yr_change_pct": 22.4,
            "avg_days_on_market": 18, "days_on_market_yoy_change": -15,
            "absorption_rate_months": 1.6, "new_listings_yoy_change_pct": -8.0,
            "building_permits_issued_ytd": 5200, "building_permits_yoy_change_pct": 18.4,
            "new_construction_units_pipeline": 22000, "commercial_permits_ytd": 420,
            "current_walk_score": 60, "projected_walk_score_5yr": 74,
            "current_transit_score": 48, "projected_transit_score_5yr": 62,
            "is_opportunity_zone": True, "opportunity_zone_tract_id": "13121008100",
        },
        "portland_or": {
            "population_growth_1yr_pct": 1.1, "population_growth_5yr_pct": 5.8, "population_growth_10yr_projected_pct": 12.0,
            "job_growth_1yr_pct": 1.8, "unemployment_rate_pct": 4.0,
            "median_sale_price_1yr_change_pct": 3.2, "median_sale_price_3yr_change_pct": 11.5,
            "avg_days_on_market": 35, "days_on_market_yoy_change": -5,
            "absorption_rate_months": 3.2, "new_listings_yoy_change_pct": 2.1,
            "building_permits_issued_ytd": 2100, "building_permits_yoy_change_pct": 4.8,
            "new_construction_units_pipeline": 8200, "commercial_permits_ytd": 180,
            "current_walk_score": 98, "projected_walk_score_5yr": 98,
            "current_transit_score": 89, "projected_transit_score_5yr": 92,
            "is_opportunity_zone": True, "opportunity_zone_tract_id": "41051010400",
        },
        "tampa_fl": {
            "population_growth_1yr_pct": 3.1, "population_growth_5yr_pct": 16.4, "population_growth_10yr_projected_pct": 32.0,
            "job_growth_1yr_pct": 4.2, "unemployment_rate_pct": 2.9,
            "median_sale_price_1yr_change_pct": 8.4, "median_sale_price_3yr_change_pct": 28.6,
            "avg_days_on_market": 14, "days_on_market_yoy_change": -18,
            "absorption_rate_months": 1.2, "new_listings_yoy_change_pct": -11.5,
            "building_permits_issued_ytd": 6800, "building_permits_yoy_change_pct": 24.0,
            "new_construction_units_pipeline": 28000, "commercial_permits_ytd": 520,
            "current_walk_score": 52, "projected_walk_score_5yr": 68,
            "current_transit_score": 34, "projected_transit_score_5yr": 52,
            "is_opportunity_zone": True, "opportunity_zone_tract_id": "12057013400",
            "has_enterprise_zone": True,
        },
        "tamuning_gu": {
            "population_growth_1yr_pct": 4.8, "population_growth_5yr_pct": 12.0, "population_growth_10yr_projected_pct": 22.0,
            "job_growth_1yr_pct": 6.5, "unemployment_rate_pct": 5.2,
            "median_sale_price_1yr_change_pct": 11.2, "median_sale_price_3yr_change_pct": 32.0,
            "avg_days_on_market": 45, "days_on_market_yoy_change": -22,
            "absorption_rate_months": 2.8, "new_listings_yoy_change_pct": -14.0,
            "building_permits_issued_ytd": 380, "building_permits_yoy_change_pct": 42.0,
            "new_construction_units_pipeline": 2400, "commercial_permits_ytd": 65,
            "current_walk_score": 35, "projected_walk_score_5yr": 48,
            "current_transit_score": 15, "projected_transit_score_5yr": 28,
            "is_opportunity_zone": True, "opportunity_zone_tract_id": "66010950200",
        },
    }

    @classmethod
    def analyze(cls, prop: Property) -> DevelopmentProfile:
        """
        Produces a comprehensive DevelopmentProfile for a property by:
        1. Loading market momentum metrics
        2. Attaching nearby infrastructure projects
        3. Attaching rezoning proposals
        4. Attaching employer migrations
        5. Computing composite Development Momentum Score and 5-year appreciation forecast
        """
        lookup_key = f"{prop.city.lower()}_{prop.state.lower()}"

        # ── 1. Market momentum ──────────────────────────────────────────
        momentum = cls.MARKET_MOMENTUM.get(lookup_key, {})
        profile = DevelopmentProfile(
            population_growth_1yr_pct=momentum.get("population_growth_1yr_pct", 1.0),
            population_growth_5yr_pct=momentum.get("population_growth_5yr_pct", 5.0),
            population_growth_10yr_projected_pct=momentum.get("population_growth_10yr_projected_pct", 10.0),
            job_growth_1yr_pct=momentum.get("job_growth_1yr_pct", 1.5),
            unemployment_rate_pct=momentum.get("unemployment_rate_pct", 4.0),
            median_sale_price_1yr_change_pct=momentum.get("median_sale_price_1yr_change_pct", 3.0),
            median_sale_price_3yr_change_pct=momentum.get("median_sale_price_3yr_change_pct", 9.0),
            avg_days_on_market=momentum.get("avg_days_on_market", 35),
            days_on_market_yoy_change=momentum.get("days_on_market_yoy_change", 0),
            absorption_rate_months=momentum.get("absorption_rate_months", 4.0),
            new_listings_yoy_change_pct=momentum.get("new_listings_yoy_change_pct", 0.0),
            building_permits_issued_ytd=momentum.get("building_permits_issued_ytd", 500),
            building_permits_yoy_change_pct=momentum.get("building_permits_yoy_change_pct", 3.0),
            new_construction_units_pipeline=momentum.get("new_construction_units_pipeline", 2000),
            commercial_permits_ytd=momentum.get("commercial_permits_ytd", 80),
            current_walk_score=momentum.get("current_walk_score", 50),
            projected_walk_score_5yr=momentum.get("projected_walk_score_5yr", 55),
            current_transit_score=momentum.get("current_transit_score", 30),
            projected_transit_score_5yr=momentum.get("projected_transit_score_5yr", 40),
            is_opportunity_zone=momentum.get("is_opportunity_zone", False),
            opportunity_zone_tract_id=momentum.get("opportunity_zone_tract_id", ""),
            has_tax_increment_financing=momentum.get("has_tax_increment_financing", False),
            has_enterprise_zone=momentum.get("has_enterprise_zone", False),
            has_historic_tax_credits=momentum.get("has_historic_tax_credits", False),
            has_new_market_tax_credits=momentum.get("has_new_market_tax_credits", False),
        )

        # ── 2. Infrastructure projects ──────────────────────────────────
        infra_data = cls.INFRASTRUCTURE_DATABASE.get(lookup_key, [])
        for item in infra_data:
            proj = InfrastructureProject(
                name=item["name"],
                category=item["category"],
                phase=item["phase"],
                estimated_investment=item["estimated_investment"],
                distance_miles=item["distance_miles"],
                estimated_completion_year=item["estimated_completion_year"],
                jobs_created=item.get("jobs_created", 0),
                housing_units_added=item.get("housing_units_added", 0),
                impact_description=item.get("impact_description", ""),
                appreciation_catalyst_score=item.get("appreciation_catalyst_score", 50),
            )
            profile.infrastructure_projects.append(proj)

        # ── 3. Rezoning proposals ───────────────────────────────────────
        rezone_data = cls.REZONING_DATABASE.get(lookup_key, [])
        for item in rezone_data:
            rz = RezoningProposal(
                case_number=item["case_number"],
                current_zoning=item["current_zoning"],
                proposed_zoning=item["proposed_zoning"],
                status=item["status"],
                acreage_affected=item["acreage_affected"],
                distance_miles=item["distance_miles"],
                density_increase_pct=item["density_increase_pct"],
                description=item.get("description", ""),
            )
            profile.rezoning_proposals.append(rz)

        # ── 4. Employer migrations ──────────────────────────────────────
        employer_data = cls.EMPLOYER_DATABASE.get(lookup_key, [])
        for item in employer_data:
            em = EmployerMigration(**item)
            profile.employer_migrations.append(em)

        # ── 5. Composite scoring ────────────────────────────────────────
        cls._compute_composite_scores(profile)

        # Attach to the property
        prop.development = profile
        return profile

    @classmethod
    def _compute_composite_scores(cls, profile: DevelopmentProfile) -> None:
        """Calculates the composite Development Momentum Score and appreciation forecast."""
        score = 40  # Base score

        # Population growth signal (max +12)
        if profile.population_growth_5yr_pct >= 12:
            score += 12
        elif profile.population_growth_5yr_pct >= 8:
            score += 9
        elif profile.population_growth_5yr_pct >= 4:
            score += 5

        # Job growth signal (max +10)
        if profile.job_growth_1yr_pct >= 4.0:
            score += 10
        elif profile.job_growth_1yr_pct >= 2.5:
            score += 7
        elif profile.job_growth_1yr_pct >= 1.5:
            score += 3

        # Market tightening: days on market shrinking (max +8)
        if profile.days_on_market_yoy_change <= -15:
            score += 8
        elif profile.days_on_market_yoy_change <= -8:
            score += 5
        elif profile.days_on_market_yoy_change < 0:
            score += 2

        # Building permit velocity (max +8)
        if profile.building_permits_yoy_change_pct >= 20:
            score += 8
        elif profile.building_permits_yoy_change_pct >= 10:
            score += 5
        elif profile.building_permits_yoy_change_pct >= 5:
            score += 3

        # Infrastructure catalyst (max +12 from top project)
        if profile.infrastructure_projects:
            top_catalyst = max(p.appreciation_catalyst_score for p in profile.infrastructure_projects)
            score += int(top_catalyst * 0.12)

        # Rezoning upside (max +5)
        if profile.rezoning_proposals:
            max_density = max(r.density_increase_pct for r in profile.rezoning_proposals)
            if max_density >= 300:
                score += 5
            elif max_density >= 150:
                score += 3

        # Employer migration (max +8)
        total_new_jobs = sum(e.estimated_employees for e in profile.employer_migrations)
        if total_new_jobs >= 10000:
            score += 8
        elif total_new_jobs >= 5000:
            score += 5
        elif total_new_jobs >= 2000:
            score += 3

        # Opportunity Zone bonus (+3)
        if profile.is_opportunity_zone:
            score += 3

        # Transit score improvement (+3)
        transit_delta = profile.projected_transit_score_5yr - profile.current_transit_score
        if transit_delta >= 10:
            score += 3

        profile.development_momentum_score = max(15, min(99, score))

        # ── 5-year appreciation forecast ────────────────────────────────
        base_appreciation = profile.median_sale_price_3yr_change_pct * 1.4  # Trend extrapolation
        infra_bonus = sum(
            p.appreciation_catalyst_score * 0.06
            for p in profile.infrastructure_projects
            if p.phase in [ProjectPhase.UNDER_CONSTRUCTION, ProjectPhase.APPROVED]
        )
        rezone_bonus = sum(
            r.density_increase_pct * 0.008
            for r in profile.rezoning_proposals
        )
        profile.appreciation_forecast_5yr_pct = round(
            min(85.0, max(5.0, base_appreciation + infra_bonus + rezone_bonus)), 1
        )

        # ── Overbuilding risk ───────────────────────────────────────────
        pipeline_per_pop_growth = (
            profile.new_construction_units_pipeline /
            max(1.0, profile.population_growth_5yr_pct)
        )
        if pipeline_per_pop_growth > 2500:
            profile.risk_of_overbuilding = "High"
        elif pipeline_per_pop_growth > 1500:
            profile.risk_of_overbuilding = "Moderate"
        else:
            profile.risk_of_overbuilding = "Low"

        # ── Gentrification pressure ─────────────────────────────────────
        gent = 30
        if profile.median_sale_price_1yr_change_pct > 7:
            gent += 20
        if profile.building_permits_yoy_change_pct > 15:
            gent += 15
        if profile.rezoning_proposals:
            gent += 10
        if profile.days_on_market_yoy_change < -10:
            gent += 10
        profile.gentrification_pressure_index = max(10, min(99, gent))

        # ── Investment timing classification ────────────────────────────
        if profile.development_momentum_score >= 82:
            if profile.median_sale_price_3yr_change_pct < 15:
                profile.overall_investment_timing = "Early Mover Advantage — High upside before price discovery"
            else:
                profile.overall_investment_timing = "Active Growth Phase — Appreciation accelerating"
        elif profile.development_momentum_score >= 65:
            profile.overall_investment_timing = "Growth Phase — Solid fundamentals with momentum"
        elif profile.development_momentum_score >= 45:
            profile.overall_investment_timing = "Emerging — Early signals present, monitor quarterly"
        else:
            profile.overall_investment_timing = "Mature / Stabilized — Limited near-term catalysts"
