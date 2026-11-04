"""
Short-term rental (Airbnb / VRBO) investment evaluator.
Calculates ADR, Occupancy Rate, RevPAR, Host operating expenses, and STR Cash-on-Cash.
"""

from typing import Dict, Any
from ..models import Property, FinancialMetrics


class ShortTermEvaluator:
    """Evaluates short-term and vacation rental properties."""

    @classmethod
    def evaluate(
        cls,
        prop: Property,
        custom_adr: float = None,
        custom_occupancy_pct: float = None,
        down_payment_pct: float = 20.0,
        furnishing_budget: float = 15000.0,
        str_management_pct: float = 18.0,
        host_platform_fee_pct: float = 3.0,
        monthly_utilities: float = 350.0,
    ) -> FinancialMetrics:
        """
        Calculates STR performance metrics.
        """
        # Estimate ADR if not provided: usually 1.8x - 2.5x of daily equivalent long-term rent
        if custom_adr:
            adr = custom_adr
        else:
            base_daily = (prop.estimated_monthly_rent / 30.0)
            # STR premium based on bedroom capacity
            adr = max(95.0, base_daily * 2.2 + (prop.bedrooms * 25.0))

        occupancy = custom_occupancy_pct if custom_occupancy_pct is not None else 65.0
        occupied_nights_year = 365 * (occupancy / 100.0)

        # Gross Annual STR revenue
        annual_gross_str_revenue = adr * occupied_nights_year

        # Expenses
        platform_fees = annual_gross_str_revenue * (host_platform_fee_pct / 100.0)
        management_fee = annual_gross_str_revenue * (str_management_pct / 100.0)
        annual_utilities = monthly_utilities * 12.0
        annual_taxes = prop.property_tax_annual
        annual_insurance = prop.insurance_annual * 1.3  # STR insurance premium
        annual_maintenance = annual_gross_str_revenue * 0.06

        total_str_expenses = (
            platform_fees + management_fee + annual_utilities + annual_taxes + annual_insurance + annual_maintenance
        )

        str_noi = max(0.0, annual_gross_str_revenue - total_str_expenses)

        # Mortgage Debt Service
        down_payment = prop.list_price * (down_payment_pct / 100.0)
        closing_costs = prop.list_price * 0.03
        total_cash_invested = down_payment + closing_costs + furnishing_budget

        # If long-term evaluator was already run, reuse payment, otherwise estimate
        monthly_mortgage = (
            prop.financials.monthly_mortgage_payment
            if (prop.financials and prop.financials.monthly_mortgage_payment > 0)
            else (prop.list_price * 0.8 * 0.0065)
        )
        annual_debt_service = monthly_mortgage * 12.0

        annual_net_cash_flow = str_noi - annual_debt_service
        str_cash_on_cash = (annual_net_cash_flow / total_cash_invested * 100.0) if total_cash_invested > 0 else 0.0

        metrics = prop.financials or FinancialMetrics()
        metrics.average_daily_rate = round(adr, 2)
        metrics.occupancy_rate_pct = round(occupancy, 1)
        metrics.str_annual_revenue = round(annual_gross_str_revenue, 2)
        metrics.str_annual_net_cash_flow = round(annual_net_cash_flow, 2)
        metrics.str_cash_on_cash = round(str_cash_on_cash, 2)

        prop.financials = metrics
        return metrics
