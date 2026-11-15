"""
Demonstration of AI Deep Dive Property Finder across US States, US Territories,
Facebook Marketplace, and Public Listing Portals.
"""

import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from property_finder import PropertyFinder

def main():
    print("\n================================================================================")
    print("   AI DEEP DIVE PROPERTY FINDER — USA & US TERRITORIES (MULTI-CHANNEL)")
    print("================================================================================\n")

    finder = PropertyFinder()

    # 1. Run nationwide deep dive across Facebook, MLS Portals, LandWatch, and Territories
    print(">> Launching nationwide AI deep dive scan across all US States & Territories...")
    result = finder.deep_dive_search(region="ALL", strategy_focus="all")
    print(f"Total Channels Scanned: 5")
    print(f"New Discoveries Auto-Ingested & Underwritten: {result['ingested_into_engine_count']}")

    print("\n--- [DISCOVERED PROPERTIES ACROSS US STATES & TERRITORIES] ---")
    for prop_dict in result["properties"]:
        pid = prop_dict["id"]
        prop = finder.get_property(pid)
        print(f"\n* [{prop.state}] {prop.title} — ${prop.list_price:,.0f}")
        print(f"  Address: {prop.address}, {prop.city}, {prop.state} {prop.zip_code}")
        print(f"  Strategy Fit: Cap Rate {prop.financials.cap_rate:.1f}% | Cash Flow ${prop.financials.monthly_cash_flow:,.0f}/mo")
        print(f"  Top Business Fit: {prop.business_recommendations[0].business_type if prop.business_recommendations else 'N/A'}")
        if prop.crop_suitability:
            print(f"  Top Flourishing Crop: {prop.crop_suitability[0].crop_name} (${prop.crop_suitability[0].estimated_net_profit_per_acre:,.0f}/acre/yr)")

    # 2. Deep dive into a specific Territory: Puerto Rico (PR)
    print("\n" + "="*80)
    print(">> TARGETED DEEP DIVE: PUERTO RICO (PR) — ECO-TOURISM & AGRI-ESTATE")
    print("="*80)
    pr_plan = finder.scraper_orchestrator.generate_deep_dive_plan("PR", strategy_focus="farming")
    print(f"Region: {pr_plan['region_name']} ({pr_plan['region_type']})")
    print("Live Scrape Channels Generated:")
    for key, channel in pr_plan["channels"].items():
        if channel:
            print(f"  [{key.upper()}]: {channel['query_url']}")

    # Inspect Puerto Rico asset underwriting
    pr_asset = finder.get_property("live-pr-001")
    if pr_asset:
        print("\nUnderwriting Preview for Puerto Rico Estate:")
        print(f"  Zoning: {pr_asset.zoning.code} ({pr_asset.zoning.name})")
        print(f"  Zoning Permitted: {', '.join(pr_asset.zoning.permitted_uses[:3])}")
        print(f"  Soil Profile: {pr_asset.soil.soil_series_name} ({pr_asset.soil.soil_texture}), pH {pr_asset.soil.ph_level}")
        print(f"  Flourishing Crops:")
        for crop in pr_asset.crop_suitability[:2]:
            print(f"    - {crop.crop_name} [{crop.tier}]: ${crop.estimated_net_profit_per_acre:,.0f}/acre net profit")

    # 3. Off-market Facebook Marketplace Wholesale Deal
    print("\n" + "="*80)
    print(">> OFF-MARKET FACEBOOK MARKETPLACE DISCOVERY (FLORIDA FIX & FLIP)")
    print("="*80)
    fb_deal = finder.get_property("live-fb-004")
    if fb_deal:
        print(f"Asset: {fb_deal.title} (${fb_deal.list_price:,.0f})")
        print(f"Rehab Estimate: ${fb_deal.financials.estimated_rehab_costs:,.2f}")
        print(f"Projected ARV:  ${fb_deal.financials.arv:,.2f}")
        print(f"70% Rule MAO:   ${fb_deal.financials.maximum_allowable_offer_70pct:,.2f}")
        print(f"Flip Net Profit:${fb_deal.financials.projected_flip_profit:,.2f} (ROI: {fb_deal.financials.projected_flip_roi_pct:.1f}%)")

    print("\n================================================================================\n")

if __name__ == "__main__":
    main()
