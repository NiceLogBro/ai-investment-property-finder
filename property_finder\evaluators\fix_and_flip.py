"""
Fix & Flip and BRRRR (Buy, Rehab, Rent, Refinance, Repeat) evaluator.
Calculates ARV, Maximum Allowable Offer (70% Rule), Rehab Budgets, Flip Net Profit, and BRRRR Cash-Out.
"""

from typing import Dict, Any
from ..models import Property, FinancialMetrics


class FixAndFlipEvaluator:
    """Evaluates value-add renovation, fix-and-flip, and BRRRR projects."""

    REHAB_TIERS = {
        "cosmetic": 25.0,  # $25 per sqft (paint, flooring, fixtures)
        "moderate": 45.0,  # $45 per sqft (kitchen, baths, HVAC)
        "heavy": 75.0,     # $75 per sqft (gut renovation, structural, roof, MEP)
    }

    @classmethod
    def evaluate(
        cls,
        prop: Property,
        rehab_tier: str = "moderate",
        custom_rehab_budget: float = None,
        custom_arv: float = None,
        project_duration_months: int = 6,
        hard_money_rate_pct: float = 10.5,
        selling_costs_pct: float = 7.0,  # 5% realtor + 2% transfer/closing
        brrrr_refinance_ltv_pct: float = 75.0,
    ) -> FinancialMetrics:
        """
        Runs comprehensive Fix & Flip and BRRRR calculations.
        """
        purchase_price = prop.list_price
        sqft = max(500, prop.square_feet)

        # 1. Rehab budget estimation
        if custom_rehab_budget is not None:
            rehab_costs = custom_rehab_budget
        else:
            sqft_rate = cls.REHAB_TIERS.get(rehab_tier.lower(), 45.0)
            rehab_costs = sqft * sqft_rate

        # 2. ARV estimation (if not provided, estimate based on rehab uplift)
        if custom_arv is not None:
            arv = custom_arv
        else:
            # Baseline ARV: purchase price + 1.65x of rehab value created
            arv = purchase_price + (rehab_costs * 1.65)

        # 3. Maximum Allowable Offer (MAO 70% rule)
        mao_70 = max(0.0, (arv * 0.70) - rehab_costs)

        # 4. Holding costs during renovation
        monthly_holding_interest = (purchase_price + (rehab_costs * 0.5)) * ((hard_money_rate_pct / 100.0) / 12.0)
        monthly_holding_utilities = 250.0
        monthly_holding_taxes_insurance = (prop.property_tax_annual + prop.insurance_annual) / 12.0
        total_holding_costs = (
            monthly_holding_interest + monthly_holding_utilities + monthly_holding_taxes_insurance
        ) * project_duration_months

        # 5. Purchase & Disposition costs
        acquisition_closing = purchase_price * 0.02
        selling_costs = arv * (selling_costs_pct / 100.0)

        # 6. Total Project Cost & Net Flip Profit
        total_cost_basis = purchase_price + rehab_costs + total_holding_costs + acquisition_closing + selling_costs
        projected_flip_profit = arv - total_cost_basis
        total_cash_required = purchase_price + rehab_costs + total_holding_costs + acquisition_closing
        flip_roi_pct = (projected_flip_profit / total_cash_required * 100.0) if total_cash_required > 0 else 0.0

        # 7. BRRRR Refinance Analysis
        new_loan_amount = arv * (brrrr_refinance_ltv_pct / 100.0)
        refinance_closing_costs = new_loan_amount * 0.02
        net_cash_out = new_loan_amount - refinance_closing_costs
        total_money_in = purchase_price + rehab_costs + acquisition_closing + (total_holding_costs * 0.75)
        capital_left_in_deal = max(0.0, total_money_in - net_cash_out)

        metrics = prop.financials or FinancialMetrics()
        metrics.arv = round(arv, 2)
        metrics.estimated_rehab_costs = round(rehab_costs, 2)
        metrics.maximum_allowable_offer_70pct = round(mao_70, 2)
        metrics.projected_flip_profit = round(projected_flip_profit, 2)
        metrics.projected_flip_roi_pct = round(flip_roi_pct, 2)
        metrics.brrrr_refinance_cash_out = round(net_cash_out, 2)
        metrics.capital_left_in_deal = round(capital_left_in_deal, 2)

        prop.financials = metrics
        return metrics
