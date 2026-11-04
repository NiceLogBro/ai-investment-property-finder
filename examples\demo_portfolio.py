"""
Example demonstrating how to build, underwrite, and stress-test a multi-asset portfolio.
"""

import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from property_finder import PropertyFinder

def main():
    print("\n=======================================================")
    print("   REAL ESTATE PORTFOLIO BUILDER & STRESS-TEST DEMO")
    print("=======================================================\n")

    finder = PropertyFinder()

    # Create a portfolio
    portfolio = finder.create_portfolio("Apex Diversified Growth Fund")

    # Add 3 diverse properties:
    # 1. Single family ADU in Austin
    # 2. High-yield Triplex in Denver
    # 3. Mixed-use commercial loft in Portland
    for pid in ["prop-001", "prop-002", "prop-004"]:
        prop = finder.get_property(pid)
        portfolio.add_property(prop)
        print(f"Added to portfolio: {prop.title} (${prop.list_price:,.0f})")

    # Calculate portfolio metrics
    metrics = portfolio.calculate_metrics()
    print("\n" + "="*50)
    print(f"PORTFOLIO AGGREGATE SUMMARY: {portfolio.name}")
    print("="*50)
    print(f"Total Portfolio Value:      ${metrics.total_portfolio_value:,.2f}")
    print(f"Total Monthly Gross Rent:   ${metrics.total_monthly_gross_rent:,.2f}")
    print(f"Total Annual Gross Rent:    ${metrics.total_annual_gross_rent:,.2f}")
    print(f"Total Annual NOI:           ${metrics.total_annual_noi:,.2f}")
    print(f"Total Annual Debt Service:  ${metrics.total_monthly_debt_service * 12:,.2f}")
    print(f"Net Annual Cash Flow:       ${metrics.total_annual_cash_flow:,.2f}")
    print(f"Blended Cap Rate:           {metrics.blended_cap_rate_pct:.2f}%")
    print(f"Blended Cash-on-Cash:       {metrics.blended_cash_on_cash_pct:.2f}%")
    print(f"Blended DSCR:               {metrics.blended_dscr:.2f}x")
    print("\nAsset Allocation by Class:")
    for asset_class, pct in metrics.asset_class_allocation.items():
        print(f"  - {asset_class.replace('_', ' ').title()}: {pct}%")

    # Stress testing
    print("\n" + "="*50)
    print("PORTFOLIO STRESS-TEST SIMULATION")
    print("="*50)
    stress = portfolio.stress_test(vacancy_increase_pct=8.0, interest_rate_increase_bps=175, opex_inflation_pct=12.0)
    print(f"Scenario:                  {stress['scenario']}")
    print(f"Baseline Annual Cash Flow: ${stress['baseline_annual_cash_flow']:,.2f}")
    print(f"Stressed Annual Cash Flow: ${stress['stressed_annual_cash_flow']:,.2f} (Delta: ${stress['cash_flow_delta']:,.2f})")
    print(f"Baseline DSCR:             {stress['baseline_dscr']:.2f}x")
    print(f"Stressed DSCR:             {stress['stressed_dscr']:.2f}x")
    print(f"Solvency Status:           {stress['solvency_status']}")
    print("="*50 + "\n")

if __name__ == "__main__":
    main()
