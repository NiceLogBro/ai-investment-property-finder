"""
Central PropertyFinder interface.
The primary high-level class for searching, evaluating, matching businesses,
analyzing soils, and building portfolios.
"""

from typing import List, Dict, Any, Optional
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
from .data.sample_properties import get_sample_properties
from .evaluators.long_term import LongTermEvaluator
from .evaluators.short_term import ShortTermEvaluator
from .evaluators.fix_and_flip import FixAndFlipEvaluator
from .evaluators.multi_family import MultiFamilyEvaluator
from .intelligence.zoning import ZoningAnalyzer
from .intelligence.demographics import DemographicAnalyzer
from .intelligence.business_matcher import BusinessDemographicMatcher
from .intelligence.soil_analyzer import SoilCropAnalyzer
from .intelligence.ai_memo import InvestmentMemoGenerator
from .intelligence.development_pipeline import DevelopmentPipelineAnalyzer
from .portfolio.portfolio import PropertyPortfolio
from .scrapers.orchestrator import MultiChannelPropertyScraper


class PropertyFinder:
    """
    Main entry point for property discovery, financial analysis,
    zoning validation, demographic business matchmaking, and agricultural soil intelligence.
    """

    def __init__(self, properties: Optional[List[Property]] = None):
        self.properties: Dict[str, Property] = {}
        self.portfolios: Dict[str, PropertyPortfolio] = {}
        self.scraper_orchestrator = MultiChannelPropertyScraper()
        
        # Load default database
        initial_props = properties if properties is not None else get_sample_properties()
        for p in initial_props:
            self.add_property(p)

    def add_property(self, prop: Property) -> None:
        """Adds a property to the search pool and runs standard financial underwriting."""
        self.properties[prop.id] = prop
        self.analyze_full(prop.id)

    def get_property(self, property_id: str) -> Optional[Property]:
        """Retrieves a property by ID."""
        return self.properties.get(property_id)

    def list_properties(self) -> List[Property]:
        """Returns all properties in the system."""
        return list(self.properties.values())

    def analyze_full(self, property_id: str) -> Optional[Property]:
        """
        Runs comprehensive 360-degree intelligence on an asset:
        - Long-term financials
        - Short-term (Airbnb) financials
        - Fix & Flip / BRRRR underwriting
        - Multi-family checks (if applicable)
        - Zoning profile enrichment
        - Demographic evaluation
        - Business matchmaker
        - Soil and crop suitability scoring
        - AI investment memo generation
        """
        prop = self.properties.get(property_id)
        if not prop:
            return None

        # 1. Underwrite across financial strategies
        LongTermEvaluator.evaluate(prop)
        ShortTermEvaluator.evaluate(prop)
        FixAndFlipEvaluator.evaluate(prop)
        if prop.property_type in [PropertyType.MULTI_FAMILY, PropertyType.MIXED_USE] or prop.units > 1:
            MultiFamilyEvaluator.evaluate(prop)

        # 2. Enrich Zoning
        ZoningAnalyzer.analyze(prop)

        # 3. Enrich Demographics
        DemographicAnalyzer.analyze(prop)

        # 4. Demographic business recommendation
        BusinessDemographicMatcher.match_businesses(prop)

        # 5. Soil & Agricultural analysis
        SoilCropAnalyzer.analyze(prop)

        # 6. Development pipeline & upcoming area intelligence
        DevelopmentPipelineAnalyzer.analyze(prop)

        # 7. Generate Executive Memo
        InvestmentMemoGenerator.generate(prop)

        return prop

    def search(
        self,
        strategy: Optional[InvestmentStrategy] = None,
        property_type: Optional[PropertyType] = None,
        max_price: Optional[float] = None,
        min_price: Optional[float] = None,
        min_cap_rate: Optional[float] = None,
        min_cash_on_cash: Optional[float] = None,
        min_dscr: Optional[float] = None,
        city: Optional[str] = None,
        state: Optional[str] = None,
    ) -> List[Property]:
        """
        Filters properties by quantitative investment criteria.
        """
        results: List[Property] = []

        for p in self.properties.values():
            if not p.financials:
                self.analyze_full(p.id)

            fin = p.financials
            if min_price and p.list_price < min_price:
                continue
            if max_price and p.list_price > max_price:
                continue
            if property_type and p.property_type != property_type:
                continue
            if city and city.lower() not in p.city.lower():
                continue
            if state and state.lower() != p.state.lower():
                continue

            # Return thresholds
            if min_cap_rate and (not fin or fin.cap_rate < min_cap_rate):
                continue
            if min_cash_on_cash and (not fin or fin.cash_on_cash_return < min_cash_on_cash):
                continue
            if min_dscr and (not fin or fin.debt_service_coverage_ratio < min_dscr):
                continue

            results.append(p)

        return results

    def search_query(self, query: str) -> List[Property]:
        """
        Natural language search across titles, descriptions, zoning, businesses, and crops.
        E.g., "vineyard", "ADU", "commercial cafe", "triplex", "fix and flip", "high cash flow".
        """
        q = query.lower()
        scored: List[tuple[Property, int]] = []

        for p in self.properties.values():
            if not p.financials:
                self.analyze_full(p.id)

            score = 0
            text_corpus = f"{p.title} {p.description} {p.city} {p.state} {p.property_type.value}".lower()
            
            # Zoning corpus
            if p.zoning:
                text_corpus += f" {p.zoning.code} {p.zoning.name} {' '.join(p.zoning.permitted_uses)}".lower()
            
            # Business recs corpus
            if p.business_recommendations:
                for b in p.business_recommendations:
                    text_corpus += f" {b.business_type} {b.category}".lower()

            # Crop corpus
            if p.crop_suitability:
                for c in p.crop_suitability:
                    text_corpus += f" {c.crop_name} {c.tier}".lower()
            if p.soil:
                text_corpus += f" {p.soil.soil_series_name} {p.soil.soil_texture}".lower()

            keywords = q.split()
            for kw in keywords:
                if kw in text_corpus:
                    score += 10

            # Semantic aliases
            if "farm" in q or "soil" in q or "crop" in q or "grape" in q or "vineyard" in q:
                if p.property_type == PropertyType.AGRICULTURAL or p.lot_size_acres >= 5.0:
                    score += 25
            if "flip" in q or "brrrr" in q or "rehab" in q:
                if p.financials and p.financials.projected_flip_roi_pct > 15:
                    score += 25
            if "cash flow" in q or "rental" in q:
                if p.financials and p.financials.monthly_cash_flow > 400:
                    score += 20
            if "airbnb" in q or "vacation" in q or "str" in q:
                if p.financials and p.financials.str_cash_on_cash > 10:
                    score += 25

            if score > 0:
                scored.append((p, score))

        scored.sort(key=lambda x: x[1], reverse=True)
        return [item[0] for item in scored]

    def deep_dive_search(
        self,
        region: str = "ALL",  # State code (e.g., "FL", "TX", "CA") or Territory ("PR", "VI", "GU", "AS", "MP")
        strategy_focus: str = "all",
        min_price: Optional[int] = None,
        max_price: Optional[int] = None,
        auto_ingest: bool = True
    ) -> Dict[str, Any]:
        """
        Executes an AI deep-dive scan across Facebook Marketplace, MLS listing portals,
        LandWatch, LoopNet, and territory boards. Automatically analyzes and ingests discoveries.
        """
        plan = self.scraper_orchestrator.generate_deep_dive_plan(
            region=region,
            strategy_focus=strategy_focus,
            min_price=min_price,
            max_price=max_price
        )

        discovered_props = self.scraper_orchestrator.fetch_simulated_live_stream(
            region=region,
            strategy_focus=strategy_focus
        )

        ingested_count = 0
        if auto_ingest:
            for prop in discovered_props:
                self.add_property(prop)
                ingested_count += 1

        return {
            "search_plan": plan,
            "discovered_properties_count": len(discovered_props),
            "ingested_into_engine_count": ingested_count,
            "properties": [p.to_dict() for p in discovered_props]
        }

    def create_portfolio(self, name: str = "My Investment Portfolio") -> PropertyPortfolio:
        """Instantiates and registers a new investment portfolio."""
        portfolio = PropertyPortfolio(name=name)
        self.portfolios[name] = portfolio
        return portfolio

    def get_portfolio(self, name: str) -> Optional[PropertyPortfolio]:
        """Gets a portfolio by name."""
        return self.portfolios.get(name)
