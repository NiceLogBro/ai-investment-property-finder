"""
Portfolio Builder and Multi-Asset Underwriting Module.
Aggregates properties, calculates blended returns, evaluates diversification, and stress-tests cash flow.
"""

from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field, asdict
from ..models import Property, PropertyType, FinancialMetrics


@dataclass
class PortfolioMetrics:
    """Aggregated portfolio-level performance indicators."""
    total_properties: int = 0
    total_portfolio_value: float = 0.0
    total_monthly_gross_rent: float = 0.0
    total_annual_gross_rent: float = 0.0
    total_monthly_noi: float = 0.0
    total_annual_noi: float = 0.0
    total_monthly_debt_service: float = 0.0
    total_monthly_cash_flow: float = 0.0
    total_annual_cash_flow: float = 0.0
    blended_cap_rate_pct: float = 0.0
    blended_cash_on_cash_pct: float = 0.0
    blended_dscr: float = 0.0
    estimated_total_equity: float = 0.0
    loan_to_value_pct: float = 0.0
    asset_class_allocation: Dict[str, float] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


class PropertyPortfolio:
    """Manages a collection of investment properties with portfolio-wide analysis."""

    def __init__(self, name: str = "Primary Real Estate Portfolio"):
        self.name = name
        self.properties: Dict[str, Property] = {}

    def add_property(self, prop: Property) -> None:
        """Adds a property to the portfolio."""
        self.properties[prop.id] = prop

    def remove_property(self, property_id: str) -> Optional[Property]:
        """Removes a property by ID."""
        return self.properties.pop(property_id, None)

    def get_properties(self) -> List[Property]:
        """Returns all properties in the portfolio."""
        return list(self.properties.values())

    def calculate_metrics(self) -> PortfolioMetrics:
        """Computes aggregate financial returns across all assets."""
        props = list(self.properties.values())
        if not props:
            return PortfolioMetrics()

        total_value = sum(p.list_price for p in props)
        total_monthly_rent = sum(p.financials.monthly_gross_rent if p.financials else p.estimated_monthly_rent for p in props)
        total_annual_rent = total_monthly_rent * 12.0
        total_annual_noi = sum(p.financials.annual_noi if p.financials else 0.0 for p in props)
        total_monthly_noi = total_annual_noi / 12.0
        total_monthly_debt = sum(p.financials.monthly_mortgage_payment if p.financials else 0.0 for p in props)
        total_annual_debt = total_monthly_debt * 12.0
        total_annual_cash_flow = total_annual_noi - total_annual_debt
        total_monthly_cash_flow = total_annual_cash_flow / 12.0

        blended_cap = (total_annual_noi / total_value * 100.0) if total_value > 0 else 0.0

        # Estimated total initial cash invested (assumes 20% down + 3% closing)
        total_invested = total_value * 0.23
        blended_coc = (total_annual_cash_flow / total_invested * 100.0) if total_invested > 0 else 0.0
        blended_dscr = (total_annual_noi / total_annual_debt) if total_annual_debt > 0 else (99.0 if total_annual_noi > 0 else 0.0)

        # Asset class distribution
        allocation: Dict[str, float] = {}
        for p in props:
            cat = p.property_type.value if hasattr(p.property_type, "value") else str(p.property_type)
            allocation[cat] = allocation.get(cat, 0.0) + p.list_price

        allocation_pct = {
            cat: round((val / total_value * 100.0), 1)
            for cat, val in allocation.items()
        } if total_value > 0 else {}

        total_equity = total_value * 0.25  # Initial estimated equity basis
        ltv = 75.0

        return PortfolioMetrics(
            total_properties=len(props),
            total_portfolio_value=round(total_value, 2),
            total_monthly_gross_rent=round(total_monthly_rent, 2),
            total_annual_gross_rent=round(total_annual_rent, 2),
            total_monthly_noi=round(total_monthly_noi, 2),
            total_annual_noi=round(total_annual_noi, 2),
            total_monthly_debt_service=round(total_monthly_debt, 2),
            total_monthly_cash_flow=round(total_monthly_cash_flow, 2),
            total_annual_cash_flow=round(total_annual_cash_flow, 2),
            blended_cap_rate_pct=round(blended_cap, 2),
            blended_cash_on_cash_pct=round(blended_coc, 2),
            blended_dscr=round(blended_dscr, 2),
            estimated_total_equity=round(total_equity, 2),
            loan_to_value_pct=round(ltv, 1),
            asset_class_allocation=allocation_pct,
        )

    def stress_test(
        self,
        vacancy_increase_pct: float = 7.0,
        interest_rate_increase_bps: int = 150,
        opex_inflation_pct: float = 10.0,
    ) -> Dict[str, Any]:
        """
        Simulates economic downturn or rate hike scenarios on portfolio cash flow.
        """
        baseline = self.calculate_metrics()
        stressed_annual_rent = baseline.total_annual_gross_rent * (1 - (vacancy_increase_pct / 100.0))
        stressed_opex = (baseline.total_annual_gross_rent - baseline.total_annual_noi) * (1 + (opex_inflation_pct / 100.0))
        stressed_noi = max(0.0, stressed_annual_rent - stressed_opex)

        # Debt rate impact
        debt_multiplier = 1 + ((interest_rate_increase_bps / 100.0) / 7.0 * 0.12)
        stressed_annual_debt = baseline.total_monthly_debt_service * 12.0 * debt_multiplier

        stressed_cash_flow = stressed_noi - stressed_annual_debt
        stressed_dscr = (stressed_noi / stressed_annual_debt) if stressed_annual_debt > 0 else 0.0

        return {
            "scenario": f"+{vacancy_increase_pct}% Vacancy, +{interest_rate_increase_bps} bps Interest, +{opex_inflation_pct}% OpEx",
            "baseline_annual_cash_flow": baseline.total_annual_cash_flow,
            "stressed_annual_cash_flow": round(stressed_cash_flow, 2),
            "cash_flow_delta": round(stressed_cash_flow - baseline.total_annual_cash_flow, 2),
            "baseline_dscr": baseline.blended_dscr,
            "stressed_dscr": round(stressed_dscr, 2),
            "solvency_status": "Resilient (DSCR >= 1.15)" if stressed_dscr >= 1.15 else ("Vulnerable (DSCR 1.0 - 1.15)" if stressed_dscr >= 1.0 else "Critical Deficit (DSCR < 1.0)"),
        }
