"""
FastAPI REST API server for the Property Finder & Portfolio Builder.
Provides HTTP endpoints for property search, full 360 analysis,
portfolio aggregation, and stress testing.
"""

from typing import List, Dict, Any, Optional
from ..finder import PropertyFinder
from ..models import Property, PropertyType, InvestmentStrategy

try:
    from fastapi import FastAPI, HTTPException, Query
    from fastapi.middleware.cors import CORSMiddleware
    FASTAPI_AVAILABLE = True
except ImportError:
    FASTAPI_AVAILABLE = False


def create_app() -> Any:
    """Creates and configures the FastAPI instance."""
    if not FASTAPI_AVAILABLE:
        raise ImportError(
            "FastAPI is required to run the HTTP server. "
            "Install it with: pip install fastapi uvicorn"
        )

    app = FastAPI(
        title="AI Investment Property Finder API",
        description="Comprehensive Real Estate Underwriting, Zoning, Demographics, and Soil Science API",
        version="1.0.0"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    finder = PropertyFinder()

    @app.get("/")
    def root():
        return {
            "name": "AI Investment Property Finder API",
            "version": "1.0.0",
            "status": "healthy",
            "properties_count": len(finder.list_properties()),
            "docs_url": "/docs"
        }

    @app.get("/api/properties")
    def list_properties(
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        property_type: Optional[str] = None,
        min_cap_rate: Optional[float] = None,
        query: Optional[str] = None,
    ):
        if query:
            props = finder.search_query(query)
        else:
            ptype = PropertyType(property_type) if property_type else None
            props = finder.search(
                min_price=min_price,
                max_price=max_price,
                property_type=ptype,
                min_cap_rate=min_cap_rate,
            )
        return [p.to_dict() for p in props]

    @app.get("/api/properties/{property_id}")
    def get_property_details(property_id: str):
        prop = finder.get_property(property_id)
        if not prop:
            raise HTTPException(status_code=404, detail="Property not found")
        finder.analyze_full(property_id)
        return prop.to_dict()

    @app.get("/api/properties/{property_id}/memo")
    def get_investment_memo(property_id: str):
        prop = finder.get_property(property_id)
        if not prop:
            raise HTTPException(status_code=404, detail="Property not found")
        finder.analyze_full(property_id)
        return {"property_id": property_id, "memo": prop.ai_investment_memo}

    @app.get("/api/portfolios")
    def list_portfolios():
        return list(finder.portfolios.keys())

    @app.post("/api/portfolios")
    def create_portfolio(name: str):
        portfolio = finder.create_portfolio(name)
        return {"name": portfolio.name, "created": True}

    @app.post("/api/portfolios/{portfolio_name}/add")
    def add_to_portfolio(portfolio_name: str, property_id: str):
        portfolio = finder.get_portfolio(portfolio_name)
        if not portfolio:
            portfolio = finder.create_portfolio(portfolio_name)
        prop = finder.get_property(property_id)
        if not prop:
            raise HTTPException(status_code=404, detail="Property not found")
        portfolio.add_property(prop)
        return {"portfolio": portfolio_name, "property_id": property_id, "total_properties": len(portfolio.properties)}

    @app.get("/api/portfolios/{portfolio_name}/metrics")
    def get_portfolio_metrics(portfolio_name: str):
        portfolio = finder.get_portfolio(portfolio_name)
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        metrics = portfolio.calculate_metrics()
        return metrics.to_dict()

    @app.get("/api/portfolios/{portfolio_name}/stress-test")
    def stress_test_portfolio(portfolio_name: str, vacancy_pct: float = 7.0, bps: int = 150):
        portfolio = finder.get_portfolio(portfolio_name)
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        result = portfolio.stress_test(vacancy_increase_pct=vacancy_pct, interest_rate_increase_bps=bps)
        return result

    return app


# Application singleton
if FASTAPI_AVAILABLE:
    app = create_app()
else:
    app = None
