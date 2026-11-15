"""
AI Investment Property Finder & Portfolio Intelligence Library.

A comprehensive Python toolkit for:
- Evaluating Long-term, Short-term (Airbnb), Fix & Flip, and Multi-family properties
- Building and stress-testing multi-asset portfolios
- Demographic analysis and optimal business recommendations
- Zoning restriction checks and permissible use classification
- Soil taxonomy analysis and crop/agricultural suitability scoring
- AI-driven investment memos and natural language search
"""

from .models import (
    Property,
    PropertyType,
    InvestmentStrategy,
    FinancialMetrics,
    ZoningProfile,
    DemographicProfile,
    SoilProfile,
    CropSuitability,
    BusinessRecommendation,
)
from .finder import PropertyFinder
from .portfolio.portfolio import PropertyPortfolio
from .evaluators.long_term import LongTermEvaluator
from .evaluators.short_term import ShortTermEvaluator
from .evaluators.fix_and_flip import FixAndFlipEvaluator
from .evaluators.multi_family import MultiFamilyEvaluator
from .intelligence.zoning import ZoningAnalyzer
from .intelligence.business_matcher import BusinessDemographicMatcher
from .intelligence.soil_analyzer import SoilCropAnalyzer
from .intelligence.ai_memo import InvestmentMemoGenerator
from .scrapers import (
    MultiChannelPropertyScraper,
    FacebookMarketplaceScraper,
    ListingPortalScraper,
    US_TERRITORIES_AND_STATES,
)

__version__ = "1.0.0"
__all__ = [
    "PropertyFinder",
    "PropertyPortfolio",
    "Property",
    "PropertyType",
    "InvestmentStrategy",
    "FinancialMetrics",
    "ZoningProfile",
    "DemographicProfile",
    "SoilProfile",
    "CropSuitability",
    "BusinessRecommendation",
    "LongTermEvaluator",
    "ShortTermEvaluator",
    "FixAndFlipEvaluator",
    "MultiFamilyEvaluator",
    "ZoningAnalyzer",
    "BusinessDemographicMatcher",
    "SoilCropAnalyzer",
    "InvestmentMemoGenerator",
    "MultiChannelPropertyScraper",
    "FacebookMarketplaceScraper",
    "ListingPortalScraper",
    "US_TERRITORIES_AND_STATES",
]
