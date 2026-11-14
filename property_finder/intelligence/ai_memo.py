"""
AI Investment Memo Generator.
Synthesizes financial analysis, zoning parameters, business opportunities, and soil science
into an executive investment committee memorandum.
"""

from typing import Optional
from ..models import Property


class InvestmentMemoGenerator:
    """Generates institutional-grade investment memos for prospective acquisitions."""

    @classmethod
    def generate(cls, prop: Property, custom_notes: str = "") -> str:
        """
        Creates a structured, executive-ready investment memorandum.
        """
        fin = prop.financials
        zoning = prop.zoning
        demo = prop.demographics
        soil = prop.soil
        biz = prop.business_recommendations or []
        crops = prop.crop_suitability or []
        dev = getattr(prop, "development", None)

        top_biz_str = (
            f"- **{biz[0].business_type}** (Match: {biz[0].match_score}%): {biz[0].revenue_driver}"
            if biz else "No commercial business assessment required."
        )

        top_crop_str = (
            f"- **{crops[0].crop_name}** (Score: {crops[0].suitability_score}%): Net yield approx ${crops[0].estimated_net_profit_per_acre:,.0f}/acre using {crops[0].recommended_farming_method}"
            if crops else "Soil analysis pending or urban site."
        )

        memo = f"""================================================================================
                    EXECUTIVE REAL ESTATE INVESTMENT MEMORANDUM
================================================================================
ASSET: {prop.title}
ADDRESS: {prop.address}, {prop.city}, {prop.state} {prop.zip_code}
LIST PRICE: ${prop.list_price:,.0f} | TYPE: {prop.property_type.value.upper()} | LOT: {prop.lot_size_acres:.2f} Acres
UNITS: {prop.units} | SQFT: {prop.square_feet:,} | YEAR BUILT: {prop.year_built}

1. EXECUTIVE UNDERWRITING SUMMARY
--------------------------------------------------------------------------------
- Monthly Gross Rent: ${fin.monthly_gross_rent:,.2f}
- Net Operating Income (NOI): ${fin.annual_noi:,.2f} / year
- Monthly Net Cash Flow: ${fin.monthly_cash_flow:,.2f}
- Unleveraged Cap Rate: {fin.cap_rate:.2f}%
- Cash-on-Cash Return: {fin.cash_on_cash_return:.2f}%
- Debt Service Coverage Ratio (DSCR): {fin.debt_service_coverage_ratio:.2f}x
- 10-Year Projected IRR: {fin.estimated_10yr_irr:.2f}%

2. ALTERNATIVE STRATEGY BENCHMARKING
--------------------------------------------------------------------------------
- Short-Term Rental (Airbnb): Projected ADR ${fin.average_daily_rate:.0f} @ {fin.occupancy_rate_pct:.0f}% occupancy
  Annual STR Net Cash Flow: ${fin.str_annual_net_cash_flow:,.2f} (CoC: {fin.str_cash_on_cash:.2f}%)
- Value-Add / Fix & Flip:
  Estimated Rehab: ${fin.estimated_rehab_costs:,.2f} | Projected ARV: ${fin.arv:,.2f}
  Max Allowable Offer (70% Rule): ${fin.maximum_allowable_offer_70pct:,.2f}
  Projected Flip Net Profit: ${fin.projected_flip_profit:,.2f} (ROI: {fin.projected_flip_roi_pct:.2f}%)
  BRRRR Refinance Cash-Out: ${fin.brrrr_refinance_cash_out:,.2f} (Capital Remaining: ${fin.capital_left_in_deal:,.2f})

3. ZONING RESTRICTIONS & DEVELOPMENT POTENTIAL
--------------------------------------------------------------------------------
- Zoning Designation: {zoning.code if zoning else 'N/A'} ({zoning.name if zoning else 'N/A'})
- Permitted Uses: {", ".join(zoning.permitted_uses[:4]) if zoning else 'Standard residential'}
- ADU Permitted: {'YES - Strong density expansion upside' if (zoning and zoning.adu_permitted) else 'No'}
- Max Height: {zoning.max_height_ft if zoning else 35} ft | FAR: {zoning.floor_area_ratio if zoning else 0.5}
- Regulatory Restrictions: {"; ".join(zoning.special_restrictions) if zoning else 'None noted'}

4. DEMOGRAPHIC MATCH & OPTIMAL LOCAL BUSINESS FIT
--------------------------------------------------------------------------------
- Median Household Income: ${demo.median_household_income:,.0f} | Median Age: {demo.median_age:.1f}
- Foot Traffic Score: {demo.foot_traffic_score}/100 | Walk Score: {demo.walk_score}/100
- Recommended Commercial Use:
  {top_biz_str}

5. AGRONOMIC & SOIL SUITABILITY (FLOURISHING CROPS)
--------------------------------------------------------------------------------
- Soil Series & Texture: {soil.soil_series_name if soil else 'Loam'} ({soil.soil_texture if soil else 'Loam'})
- Soil pH: {soil.ph_level if soil else 6.5} | Drainage: {soil.drainage_class if soil else 'Well Drained'} | Hardiness: Zone {soil.usda_hardiness_zone if soil else '7b'}
- Prime Farmland Status: {soil.prime_farmland_rating if soil else 'Prime Farmland'}
- Top Flourishing Crop:
  {top_crop_str}

6. DEVELOPMENT PIPELINE & UPCOMING AREA INTELLIGENCE
--------------------------------------------------------------------------------{f"""
- Development Momentum Score: {dev.development_momentum_score}/100
- Investment Timing: {dev.overall_investment_timing}
- 5-Year Appreciation Forecast: +{dev.appreciation_forecast_5yr_pct:.1f}%
- Population Growth (5yr): +{dev.population_growth_5yr_pct:.1f}% | Job Growth (1yr): +{dev.job_growth_1yr_pct:.1f}%
- Building Permits YoY: +{dev.building_permits_yoy_change_pct:.1f}% | Days-on-Market Trend: {dev.days_on_market_yoy_change:+d} days
- Absorption Rate: {dev.absorption_rate_months:.1f} months {'(Tight Seller Market)' if dev.absorption_rate_months < 3 else '(Balanced)'}
- Opportunity Zone: {'YES — Eligible for OZ capital gains deferral' if dev.is_opportunity_zone else 'No'}
- Overbuilding Risk: {dev.risk_of_overbuilding} | Gentrification Pressure: {dev.gentrification_pressure_index}/100""" if dev else """
- Development pipeline analysis pending."""}
{f"- Top Infrastructure Catalyst: {dev.infrastructure_projects[0].name} (${dev.infrastructure_projects[0].estimated_investment/1e6:,.0f}M investment, {dev.infrastructure_projects[0].jobs_created:,} jobs, completion {dev.infrastructure_projects[0].estimated_completion_year})" if dev and dev.infrastructure_projects else ""}
{f"- Nearest Rezoning: {dev.rezoning_proposals[0].case_number} — {dev.rezoning_proposals[0].current_zoning} → {dev.rezoning_proposals[0].proposed_zoning} (+{dev.rezoning_proposals[0].density_increase_pct:.0f}% density increase)" if dev and dev.rezoning_proposals else ""}

7. RISK MATRIX & ACQUISITION RECOMMENDATION
--------------------------------------------------------------------------------
- Stress-Test Resilience: DSCR of {fin.debt_service_coverage_ratio:.2f}x indicates {'solid debt safety buffer (>1.25x)' if fin.debt_service_coverage_ratio >= 1.25 else 'tight debt coverage, recommend larger equity down payment'}.
- Strategic Action: {'ACQUISITION TARGET - Strong fundamentals across cash flow and alternative use potential.' if (fin.cash_on_cash_return >= 8.0 or fin.cap_rate >= 6.5) else 'RENEGOTIATE PURCHASE PRICE - Offer closer to 70% MAO benchmark.'}
{custom_notes}
================================================================================
"""
        prop.ai_investment_memo = memo.strip()
        return prop.ai_investment_memo
