"""
Demographic Business Recommendation Engine.
Analyzes local demographics and zoning regulations to identify top high-margin commercial opportunities.
"""

from typing import List, Dict, Any
from ..models import Property, BusinessRecommendation, ZoningProfile, DemographicProfile


class BusinessDemographicMatcher:
    """Matches properties and neighborhoods with the highest-performing business concepts."""

    CATALOG_OF_BUSINESSES = [
        {
            "business_type": "Artisanal Specialty Coffee & Remote Workspace Hub",
            "category": "Food & Beverage",
            "min_income": 65000,
            "min_foot_traffic": 60,
            "min_renter_pct": 35.0,
            "ideal_median_age_range": (24, 45),
            "allowed_zones": ["C-1", "C-2", "MU-D", "MU-1", "COMMERCIAL", "MIXED_USE"],
            "revenue_driver": "High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions",
            "recommended_sqft": 1600,
            "break_even_months": 11,
            "rev_range": "$420,000 - $680,000 / year",
            "pros": ["Captures hybrid work demographic", "High gross margin on espresso (80%+)", "Consistent daily foot traffic"],
            "risks": ["Barista labor retention", "Morning peak traffic management"],
        },
        {
            "business_type": "Boutique Reformer Pilates & Wellness Studio",
            "category": "Health & Fitness",
            "min_income": 85000,
            "min_foot_traffic": 45,
            "min_renter_pct": 25.0,
            "ideal_median_age_range": (26, 52),
            "allowed_zones": ["C-1", "C-2", "MU-D", "COMMERCIAL", "MIXED_USE"],
            "revenue_driver": "Recurring monthly membership subscriptions ($199-$279/mo) and private training packages",
            "recommended_sqft": 2200,
            "break_even_months": 9,
            "rev_range": "$360,000 - $590,000 / year",
            "pros": ["Predictable recurring MRR model", "Low inventory overhead", "High customer lifetime value"],
            "risks": ["Initial equipment capital expenditures ($40k-$60k)", "Instructor scheduling"],
        },
        {
            "business_type": "Modern Premium Laundromat & Wash-and-Fold Service",
            "category": "Personal Services",
            "min_income": 40000,
            "min_foot_traffic": 50,
            "min_renter_pct": 45.0,
            "ideal_median_age_range": (20, 60),
            "allowed_zones": ["C-1", "C-2", "MU-D", "COMMERCIAL"],
            "revenue_driver": "Coin/app laundry cycles + drop-off commercial wash-and-fold delivery for local businesses",
            "recommended_sqft": 2500,
            "break_even_months": 14,
            "rev_range": "$280,000 - $480,000 / year",
            "pros": ["Essential recession-proof utility", "Minimal staffing needed", "Excellent cash flow generation"],
            "risks": ["Water/utility rate spikes", "Commercial washer maintenance"],
        },
        {
            "business_type": "Pediatric & Family Urgent Dental / Health Clinic",
            "category": "Healthcare",
            "min_income": 60000,
            "min_foot_traffic": 40,
            "min_renter_pct": 20.0,
            "ideal_median_age_range": (28, 65),
            "allowed_zones": ["C-1", "C-2", "MU-D", "R-3 (CUP)", "COMMERCIAL"],
            "revenue_driver": "Insurance billing, hygiene preventative care, pediatric dentistry, and cash cosmetic services",
            "recommended_sqft": 3000,
            "break_even_months": 16,
            "rev_range": "$950,000 - $1,800,000 / year",
            "pros": ["High reimbursement rates", "Long lease commitment (10+ years)", "Inelastic healthcare demand"],
            "risks": ["Medical licensing and zoning permits", "High plumbing build-out costs"],
        },
        {
            "business_type": "Farm-to-Table Micro-Cidery & Tasting Orchard",
            "category": "Agri-Tourism & Craft Beverage",
            "min_income": 55000,
            "min_foot_traffic": 20,
            "min_renter_pct": 10.0,
            "ideal_median_age_range": (25, 65),
            "allowed_zones": ["AG-20", "AG", "AGRICULTURAL", "RURAL"],
            "revenue_driver": "Direct-to-consumer bottle sales ($18-$24/bottle), weekend tasting flights, and private wedding events",
            "recommended_sqft": 4500,
            "break_even_months": 18,
            "rev_range": "$520,000 - $980,000 / year",
            "pros": ["High retail margin on farm-produced cider", "Agri-tourism tax incentives", "Weekend destination draw"],
            "risks": ["Alcohol TTB licensing", "Weather dependency for outdoor event space"],
        },
        {
            "business_type": "Automated Climate-Controlled Boutique Self-Storage",
            "category": "Specialty Real Estate",
            "min_income": 50000,
            "min_foot_traffic": 30,
            "min_renter_pct": 40.0,
            "ideal_median_age_range": (25, 70),
            "allowed_zones": ["C-2", "M-1", "COMMERCIAL", "INDUSTRIAL"],
            "revenue_driver": "Automated recurring monthly unit rents ($110-$260/month per unit) + packing supply retail",
            "recommended_sqft": 10000,
            "break_even_months": 15,
            "rev_range": "$340,000 - $620,000 / year",
            "pros": ["Virtually zero staffing (keyless mobile access)", "Extremely low operating expenses", "Sticky tenant base"],
            "risks": ["Municipal opposition to storage facilities", "Initial steel/HVAC construction cost"],
        },
    ]

    @classmethod
    def match_businesses(
        cls,
        prop: Property,
        top_n: int = 3
    ) -> List[BusinessRecommendation]:
        """
        Analyzes the property's demographics and zoning to return ranked business recommendations.
        """
        demo = prop.demographics
        zoning = prop.zoning
        scored_recommendations: List[BusinessRecommendation] = []

        zone_code = zoning.code.upper() if zoning else "C-1"
        zone_category = zoning.category.upper() if zoning else "COMMERCIAL"

        for b in cls.CATALOG_OF_BUSINESSES:
            score = 70  # Baseline

            # 1. Income match
            if demo:
                if demo.median_household_income >= b["min_income"]:
                    score += 10
                else:
                    score -= 15

                # 2. Foot traffic match
                if demo.foot_traffic_score >= b["min_foot_traffic"]:
                    score += 8
                else:
                    score -= 8

                # 3. Renter proportion match
                if demo.renter_occupied_pct >= b["min_renter_pct"]:
                    score += 5

            # 4. Zoning compliance check
            is_zone_allowed = any(z in zone_code or z in zone_category for z in b["allowed_zones"])
            if is_zone_allowed:
                score += 12
                compliance_str = "Permitted By Right under current zoning"
            else:
                score -= 18
                compliance_str = "Requires Conditional Use Permit (CUP) or Rezoning"

            score = max(35, min(98, score))

            rec = BusinessRecommendation(
                business_type=b["business_type"],
                category=b["category"],
                match_score=score,
                zoning_compliance=compliance_str,
                target_demographic_fit=(
                    f"Tailored to {demo.city if demo else 'local'} population with "
                    f"${demo.median_household_income:,.0f} median income and {demo.median_age if demo else 35} median age."
                ),
                revenue_driver=b["revenue_driver"],
                estimated_break_even_months=b["break_even_months"],
                estimated_annual_revenue_range=b["rev_range"],
                recommended_sqft=b["recommended_sqft"],
                pros=b["pros"],
                risks_to_mitigate=b["risks"]
            )
            scored_recommendations.append(rec)

        scored_recommendations.sort(key=lambda x: x.match_score, reverse=True)
        top_picks = scored_recommendations[:top_n]
        prop.business_recommendations = top_picks
        return top_picks
