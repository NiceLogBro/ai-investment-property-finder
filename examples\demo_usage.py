"""
Example script demonstrating how to import and use the PropertyFinder in Python.
"""

import sys
import os

# Add root folder to sys.path so it works out of the box
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from property_finder import PropertyFinder, PropertyType

def main():
    print("\n=======================================================")
    print("   AI INVESTMENT PROPERTY FINDER — PYTHON DEMO")
    print("=======================================================\n")

    # 1. Initialize finder
    finder = PropertyFinder()
    properties = finder.list_properties()
    print(f"Loaded {len(properties)} sample properties across residential, multi-family, mixed-use, and agricultural.\n")

    # 2. Natural language query search
    query = "farmland suitable for vineyards or berries"
    print(f">> Natural Language Query: '{query}'")
    results = finder.search_query(query)
    for p in results[:2]:
        print(f"   [FOUND] {p.title} (${p.list_price:,.0f}) in {p.city}, {p.state}")

    # 3. Comprehensive Underwriting for Agricultural Farmland (prop-005)
    farm_id = "prop-005"
    farm = finder.analyze_full(farm_id)
    print("\n" + "="*60)
    print(f"DETAILED DEEP-DIVE: {farm.title}")
    print("="*60)

    # Zoning
    print("\n--- [ZONING INTELLIGENCE] ---")
    print(f"Zoning Code: {farm.zoning.code} ({farm.zoning.name})")
    print(f"Permitted Uses: {', '.join(farm.zoning.permitted_uses)}")
    print(f"Special Restrictions: {farm.zoning.special_restrictions[0]}")

    # Demographics & Business Matching
    print("\n--- [DEMOGRAPHIC BUSINESS RESEARCH] ---")
    print(f"Median Household Income: ${farm.demographics.median_household_income:,.0f}")
    print(f"Discretionary Spend Index: {farm.demographics.discretionary_spend_index} (National Avg = 100)")
    print("Top Recommended Commercial Concepts for this Demographic:")
    for biz in farm.business_recommendations:
        print(f"  * {biz.business_type} (Match: {biz.match_score}%)")
        print(f"    - Compliance: {biz.zoning_compliance}")
        print(f"    - Revenue Driver: {biz.revenue_driver}")

    # Soil & Crop Suitability
    print("\n--- [SOIL SCIENCE & SUITABLE FARMS] ---")
    print(f"Soil Series: {farm.soil.soil_series_name} | Texture: {farm.soil.soil_texture}")
    print(f"Soil pH: {farm.soil.ph_level} | Drainage: {farm.soil.drainage_class} | Hardiness: Zone {farm.soil.usda_hardiness_zone}")
    print(f"Prime Farmland Status: {farm.soil.prime_farmland_rating}")
    print("\nFlourishing Crops & Sustainable Farming Methods:")
    for crop in farm.crop_suitability:
        print(f"  * {crop.crop_name} [{crop.tier}] (Score: {crop.suitability_score}/100)")
        print(f"    - Net Profit / Acre: ${crop.estimated_net_profit_per_acre:,.0f} / year")
        print(f"    - Farming Method: {crop.recommended_farming_method}")
        print(f"    - Why it flourishes: {crop.optimal_reasons[0]}")

    # 4. View Executive Memo
    print("\n--- [EXECUTIVE INVESTMENT MEMO PREVIEW] ---")
    print(farm.ai_investment_memo[:650] + "\n...[truncated for display]...\n")

if __name__ == "__main__":
    main()
