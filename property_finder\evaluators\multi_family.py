"""
Multi-Family and Commercial property evaluator.
Calculates Unit Mix yields, Gross Scheduled Rent, RUBS billback, Operating Expense Ratio, and NOI.
"""

from typing import List, Dict, Any, Optional
from ..models import Property, FinancialMetrics


class MultiFamilyEvaluator:
    """Evaluates multi-unit residential buildings (duplexes up to apartment complexes)."""

    @classmethod
    def evaluate(
        cls,
        prop: Property,
        unit_rents: Optional[List[float]] = None,
        utility_billback_per_unit: float = 65.0,  # Monthly RUBS
        laundry_storage_monthly_income: float = 120.0,
        down_payment_pct: float = 25.0,
        commercial_interest_rate_pct: float = 7.1,
        loan_amortization_years: int = 30,
        operating_expense_ratio_pct: float = 38.0,  # Standard multi-family OpEx benchmark
    ) -> FinancialMetrics:
        """
        Runs multi-family financial underwriting.
        """
        num_units = max(1, prop.units)

        # 1. Gross Rental Income
        if unit_rents and len(unit_rents) > 0:
            monthly_base_rent = sum(unit_rents)
        else:
            monthly_base_rent = prop.estimated_monthly_rent

        other_monthly_income = (utility_billback_per_unit * num_units) + laundry_storage_monthly_income
        total_monthly_gross = monthly_base_rent + other_monthly_income
        annual_gross_income = total_monthly_gross * 12.0

        # Vacancy and credit loss (typically 6% for multi-family)
        vacancy_pct = max(prop.vacancy_pct, 5.0)
        effective_gross_income = annual_gross_income * (1 - (vacancy_pct / 100.0))

        # Operating Expenses (either derived from itemized or benchmark ratio)
        annual_itemized_opex = (
            prop.property_tax_annual
            + prop.insurance_annual
            + (annual_gross_income * (prop.maintenance_pct / 100.0))
            + (annual_gross_income * (prop.management_pct / 100.0))
            + (180.0 * num_units * 12.0)  # common area water/trash/lighting
        )
        benchmark_opex = effective_gross_income * (operating_expense_ratio_pct / 100.0)
        final_annual_opex = max(annual_itemized_opex, benchmark_opex)

        # Net Operating Income
        annual_noi = max(0.0, effective_gross_income - final_annual_opex)
        monthly_noi = annual_noi / 12.0

        # Commercial Financing
        purchase_price = prop.list_price
        down_payment = purchase_price * (down_payment_pct / 100.0)
        loan_amount = purchase_price - down_payment
        closing_costs = purchase_price * 0.035
        total_cash_invested = down_payment + closing_costs

        monthly_rate = (commercial_interest_rate_pct / 100.0) / 12.0
        n_periods = loan_amortization_years * 12
        monthly_debt_service = (
            loan_amount * (monthly_rate * ((1 + monthly_rate) ** n_periods)) / (((1 + monthly_rate) ** n_periods) - 1)
            if loan_amount > 0 and monthly_rate > 0
            else 0.0
        )
        annual_debt_service = monthly_debt_service * 12.0

        annual_cash_flow = annual_noi - annual_debt_service
        monthly_cash_flow = annual_cash_flow / 12.0

        # Metrics
        cap_rate = (annual_noi / purchase_price * 100.0) if purchase_price > 0 else 0.0
        cash_on_cash = (annual_cash_flow / total_cash_invested * 100.0) if total_cash_invested > 0 else 0.0
        grm = (purchase_price / (monthly_base_rent * 12.0)) if monthly_base_rent > 0 else 0.0
        dscr = (annual_noi / annual_debt_service) if annual_debt_service > 0 else (99.0 if annual_noi > 0 else 0.0)

        metrics = prop.financials or FinancialMetrics()
        metrics.monthly_gross_rent = round(total_monthly_gross, 2)
        metrics.monthly_net_operating_income = round(monthly_noi, 2)
        metrics.annual_noi = round(annual_noi, 2)
        metrics.monthly_mortgage_payment = round(monthly_debt_service, 2)
        metrics.monthly_cash_flow = round(monthly_cash_flow, 2)
        metrics.annual_cash_flow = round(annual_cash_flow, 2)
        metrics.cap_rate = round(cap_rate, 2)
        metrics.cash_on_cash_return = round(cash_on_cash, 2)
        metrics.gross_rent_multiplier = round(grm, 2)
        metrics.debt_service_coverage_ratio = round(dscr, 2)
        metrics.estimated_10yr_irr = round(max(5.0, min(40.0, cap_rate * 1.5 + cash_on_cash * 0.8 + 3.0)), 2)

        prop.financials = metrics
        return metrics
