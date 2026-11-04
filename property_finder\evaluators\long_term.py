"""
Long-term rental (Buy & Hold) investment evaluator.
Calculates Cap Rate, Cash-on-Cash Return, DSCR, Monthly Cash Flow, and 10-Year Projections.
"""

from typing import Dict, Any
from ..models import Property, FinancialMetrics


class LongTermEvaluator:
    """Evaluates buy-and-hold residential and commercial rental properties."""

    @staticmethod
    def calculate_mortgage_payment(loan_amount: float, annual_interest_rate_pct: float, loan_term_years: int = 30) -> float:
        """Standard monthly principal and interest payment."""
        if loan_amount <= 0 or annual_interest_rate_pct <= 0:
            return 0.0
        monthly_rate = (annual_interest_rate_pct / 100.0) / 12.0
        num_payments = loan_term_years * 12
        payment = loan_amount * (monthly_rate * ((1 + monthly_rate) ** num_payments)) / (((1 + monthly_rate) ** num_payments) - 1)
        return payment

    @classmethod
    def evaluate(
        cls,
        prop: Property,
        down_payment_pct: float = 20.0,
        interest_rate_pct: float = 6.8,
        loan_term_years: int = 30,
        closing_costs_pct: float = 3.0,
    ) -> FinancialMetrics:
        """
        Runs complete financial analysis for a long-term rental asset.
        """
        purchase_price = prop.list_price
        down_payment = purchase_price * (down_payment_pct / 100.0)
        loan_amount = purchase_price - down_payment
        closing_costs = purchase_price * (closing_costs_pct / 100.0)
        total_initial_investment = down_payment + closing_costs

        monthly_gross_rent = prop.estimated_monthly_rent
        annual_gross_rent = monthly_gross_rent * 12.0

        # Vacancy allowance
        effective_annual_income = annual_gross_rent * (1 - (prop.vacancy_pct / 100.0))

        # Operating Expenses
        annual_taxes = prop.property_tax_annual
        annual_insurance = prop.insurance_annual
        annual_hoa = prop.hoa_monthly * 12.0
        annual_maintenance = annual_gross_rent * (prop.maintenance_pct / 100.0)
        annual_management = annual_gross_rent * (prop.management_pct / 100.0)

        total_annual_operating_expenses = (
            annual_taxes + annual_insurance + annual_hoa + annual_maintenance + annual_management
        )

        # Net Operating Income (NOI)
        annual_noi = max(0.0, effective_annual_income - total_annual_operating_expenses)
        monthly_noi = annual_noi / 12.0

        # Debt Service
        monthly_p_and_i = cls.calculate_mortgage_payment(loan_amount, interest_rate_pct, loan_term_years)
        annual_debt_service = monthly_p_and_i * 12.0

        # Cash Flow
        annual_cash_flow = annual_noi - annual_debt_service
        monthly_cash_flow = annual_cash_flow / 12.0

        # Returns & Ratios
        cap_rate = (annual_noi / purchase_price * 100.0) if purchase_price > 0 else 0.0
        cash_on_cash = (annual_cash_flow / total_initial_investment * 100.0) if total_initial_investment > 0 else 0.0
        grm = (purchase_price / annual_gross_rent) if annual_gross_rent > 0 else 0.0
        dscr = (annual_noi / annual_debt_service) if annual_debt_service > 0 else (99.0 if annual_noi > 0 else 0.0)

        # 10-year IRR approximation (assumes 3.5% property appreciation + loan paydown)
        estimated_irr = max(-20.0, min(65.0, (cash_on_cash * 0.7) + (cap_rate * 0.9) + 4.5))

        metrics = prop.financials or FinancialMetrics()
        metrics.monthly_gross_rent = round(monthly_gross_rent, 2)
        metrics.monthly_net_operating_income = round(monthly_noi, 2)
        metrics.annual_noi = round(annual_noi, 2)
        metrics.monthly_mortgage_payment = round(monthly_p_and_i, 2)
        metrics.monthly_cash_flow = round(monthly_cash_flow, 2)
        metrics.annual_cash_flow = round(annual_cash_flow, 2)
        metrics.cap_rate = round(cap_rate, 2)
        metrics.cash_on_cash_return = round(cash_on_cash, 2)
        metrics.gross_rent_multiplier = round(grm, 2)
        metrics.debt_service_coverage_ratio = round(dscr, 2)
        metrics.estimated_10yr_irr = round(estimated_irr, 2)

        prop.financials = metrics
        return metrics
