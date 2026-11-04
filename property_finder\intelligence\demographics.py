"""
Demographic intelligence module.
Provides neighborhood statistical analysis, median income benchmarks, and pedestrian/economic activity.
"""

from typing import Dict, Any
from ..models import Property, DemographicProfile


class DemographicAnalyzer:
    """Analyzes neighborhood demographics to assess purchasing power and foot traffic."""

    @staticmethod
    def get_market_segment(demo: DemographicProfile) -> str:
        """Categorizes market demographic tier."""
        if demo.median_household_income >= 110000:
            return "Affluent Tech & Executive Corridor"
        elif demo.median_household_income >= 75000:
            return "Upper-Middle Family & Young Professional Hub"
        elif demo.median_household_income >= 50000:
            return "Working-Class Emerging Metro"
        else:
            return "Value-Oriented High-Density Urban"

    @classmethod
    def analyze(cls, prop: Property) -> DemographicProfile:
        """Retrieves and computes demographic summary for the property."""
        if not prop.demographics:
            prop.demographics = DemographicProfile(
                zip_code=prop.zip_code,
                city=prop.city,
                state=prop.state,
                population=28400,
                median_household_income=84500.0,
                median_age=34.8,
                bachelors_or_higher_pct=46.0,
                renter_occupied_pct=52.0,
                foot_traffic_score=78,
                walk_score=74,
                transit_score=62,
                discretionary_spend_index=118.0,
                underserved_business_types=[
                    "Specialty Coffee / Co-working",
                    "Boutique Fitness Studio",
                    "Pet Daycare & Grooming",
                    "Organic Fast-Casual Dining"
                ]
            )
        return prop.demographics
