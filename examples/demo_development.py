"""
Demonstration of Development Pipeline Intelligence & Upcoming Area Metrics.
Shows infrastructure projects, rezoning activity, employer migrations,
and composite development momentum scoring.
"""

import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from property_finder import PropertyFinder

def main():
    print("\n" + "="*80)
    print("   UPCOMING DEVELOPMENT AREA INTELLIGENCE — AI DEEP DIVE")
    print("="*80 + "\n")

    finder = PropertyFinder()

    # Also ingest the Facebook / territory deals for full coverage
    finder.deep_dive_search(region="ALL", strategy_focus="all")

    # Analyze assets with rich development pipelines
    targets = [
        ("prop-001", "Austin, TX — Heritage Craftsman (Light Rail + Tesla Corridor)"),
        ("prop-003", "Atlanta, GA — Fix & Flip (BeltLine + Microsoft Campus)"),
        ("live-fb-004", "Tampa, FL — Off-Market Duplex (Water Street + Ybor Streetcar)"),
        ("live-gu-003", "Tamuning, GU — 4-Plex (Camp Blaz $8.7B Defense Build-Up)"),
    ]

    for prop_id, label in targets:
        prop = finder.get_property(prop_id)
        if not prop:
            continue

        dev = prop.development
        if not dev:
            continue

        print(f"\n{'─'*80}")
        print(f"  {label}")
        print(f"  ${prop.list_price:,.0f} | {prop.property_type.value.upper()} | {prop.city}, {prop.state}")
        print(f"{'─'*80}")

        # Composite Scores
        print(f"\n  ▸ DEVELOPMENT MOMENTUM SCORE:  {dev.development_momentum_score}/100")
        print(f"  ▸ INVESTMENT TIMING:           {dev.overall_investment_timing}")
        print(f"  ▸ 5-YEAR APPRECIATION FORECAST: +{dev.appreciation_forecast_5yr_pct:.1f}%")
        print(f"  ▸ OVERBUILDING RISK:           {dev.risk_of_overbuilding}")
        print(f"  ▸ GENTRIFICATION PRESSURE:     {dev.gentrification_pressure_index}/100")

        # Market Momentum
        print(f"\n  --- Market Momentum ---")
        print(f"  Population Growth (5yr): +{dev.population_growth_5yr_pct:.1f}%")
        print(f"  Job Growth (1yr):        +{dev.job_growth_1yr_pct:.1f}% | Unemployment: {dev.unemployment_rate_pct:.1f}%")
        print(f"  Median Price Δ (1yr):    +{dev.median_sale_price_1yr_change_pct:.1f}%")
        print(f"  Median Price Δ (3yr):    +{dev.median_sale_price_3yr_change_pct:.1f}%")
        print(f"  Days on Market:          {dev.avg_days_on_market} days (YoY: {dev.days_on_market_yoy_change:+d})")
        print(f"  Absorption Rate:         {dev.absorption_rate_months:.1f} months {'← TIGHT SELLER MARKET' if dev.absorption_rate_months < 3 else ''}")
        print(f"  Building Permits (YTD):  {dev.building_permits_issued_ytd:,} (YoY: +{dev.building_permits_yoy_change_pct:.1f}%)")
        print(f"  New Units in Pipeline:   {dev.new_construction_units_pipeline:,}")

        # Walk / Transit Trajectory
        print(f"\n  --- Walkability & Transit Trajectory ---")
        print(f"  Walk Score:    {dev.current_walk_score} → {dev.projected_walk_score_5yr} (5yr projected)")
        print(f"  Transit Score: {dev.current_transit_score} → {dev.projected_transit_score_5yr} (5yr projected)")

        # Tax Incentives
        if dev.is_opportunity_zone or dev.has_enterprise_zone:
            print(f"\n  --- Tax Incentive Overlays ---")
            if dev.is_opportunity_zone:
                print(f"  ★ OPPORTUNITY ZONE — Tract {dev.opportunity_zone_tract_id}")
                print(f"    Capital gains deferral and step-up basis for 10-year holds.")
            if dev.has_enterprise_zone:
                print(f"  ★ ENTERPRISE ZONE — State/local hiring and investment tax credits.")

        # Infrastructure Projects
        if dev.infrastructure_projects:
            print(f"\n  --- Major Infrastructure Projects ---")
            for proj in dev.infrastructure_projects:
                phase_label = proj.phase.value.replace("_", " ").title()
                print(f"  [{phase_label}] {proj.name}")
                print(f"    Investment: ${proj.estimated_investment/1e6:,.0f}M | {proj.distance_miles:.1f} mi away | Completion: {proj.estimated_completion_year}")
                print(f"    Jobs: {proj.jobs_created:,} | Housing: {proj.housing_units_added:,} units | Catalyst Score: {proj.appreciation_catalyst_score}/100")
                print(f"    Impact: {proj.impact_description[:120]}...")

        # Rezoning Activity
        if dev.rezoning_proposals:
            print(f"\n  --- Nearby Rezoning / Upzoning Proposals ---")
            for rz in dev.rezoning_proposals:
                print(f"  Case {rz.case_number}: {rz.current_zoning} → {rz.proposed_zoning} (+{rz.density_increase_pct:.0f}% density)")
                print(f"    Status: {rz.status} | {rz.acreage_affected:.1f} acres | {rz.distance_miles:.1f} mi away")
                print(f"    Effect: {rz.description[:120]}...")

        # Employer Migrations
        if dev.employer_migrations:
            print(f"\n  --- Employer Migration / Corporate Relocations ---")
            for em in dev.employer_migrations:
                print(f"  {em.company_name} ({em.industry}) — {em.announcement_type}")
                print(f"    {em.estimated_employees:,} employees | Avg Salary: ${em.avg_salary:,.0f} | Target: {em.target_year}")

    print("\n" + "="*80 + "\n")

if __name__ == "__main__":
    main()
