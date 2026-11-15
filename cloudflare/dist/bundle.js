const propertiesData = [
  {
    "id": "prop-001",
    "title": "Heritage Craftsman with Permitted ADU Potential",
    "address": "1428 Maple Crest Ave",
    "city": "Austin",
    "state": "TX",
    "zip_code": "78704",
    "list_price": 485000.0,
    "property_type": "single_family",
    "bedrooms": 3,
    "bathrooms": 2.0,
    "square_feet": 1750,
    "lot_size_acres": 0.28,
    "year_built": 1978,
    "units": 1,
    "description": "Charming single-family home in South Austin with large rear yard zoned R-3. High rental demand from tech workforce. Huge appreciation corridor.",
    "image_url": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    "estimated_monthly_rent": 3200.0,
    "property_tax_annual": 5600.0,
    "insurance_annual": 1400.0,
    "hoa_monthly": 0.0,
    "maintenance_pct": 5.0,
    "vacancy_pct": 4.0,
    "management_pct": 8.0,
    "zoning": {
      "code": "R-3",
      "name": "Medium-Density Multi-Family Residential",
      "category": "Residential",
      "permitted_uses": [
        "Single-family",
        "Duplex",
        "Triplex",
        "Apartment complex up to 4 stories",
        "ADU"
      ],
      "conditional_uses": [
        "Daycare center",
        "Assisted living facility",
        "Home-based business"
      ],
      "prohibited_uses": [
        "Heavy commercial",
        "Industrial",
        "Nightclubs"
      ],
      "max_height_ft": 45.0,
      "max_coverage_pct": 55.0,
      "floor_area_ratio": 1.2,
      "setbacks": {
        "front": 20,
        "rear": 15,
        "side": 10
      },
      "short_term_rental_allowed": true,
      "adu_permitted": true,
      "commercial_ground_floor_required": false,
      "parking_ratio_per_unit": 1.25,
      "special_restrictions": [
        "Check municipal setback buffer for adjacent rights-of-way",
        "Exterior signage subject to city design review guidelines"
      ]
    },
    "demographics": {
      "zip_code": "78704",
      "city": "Austin",
      "state": "TX",
      "population": 46200,
      "population_growth_5yr_pct": 6.8,
      "median_household_income": 98500.0,
      "median_age": 33.2,
      "bachelors_or_higher_pct": 62.0,
      "renter_occupied_pct": 58.0,
      "foot_traffic_score": 82,
      "walk_score": 78,
      "transit_score": 64,
      "top_employment_sectors": [
        "Healthcare",
        "Tech",
        "Retail",
        "Education"
      ],
      "discretionary_spend_index": 134.0,
      "underserved_business_types": [
        "Specialty Coffee / Co-working",
        "Artisan Bakery",
        "Dog Care / Social Club"
      ]
    },
    "soil": {
      "soil_series_name": "Austin Silty Clay",
      "soil_texture": "Clay Loam",
      "ph_level": 7.6,
      "organic_matter_pct": 2.8,
      "drainage_class": "Moderately Well Drained",
      "water_storage_capacity_inches": 7.5,
      "slope_pct": 1.5,
      "prime_farmland_rating": "Farmland of Statewide Importance",
      "frost_free_days": 250,
      "usda_hardiness_zone": "8b",
      "irrigation_water_rights": false,
      "depth_to_water_table_ft": 12.0,
      "depth_to_bedrock_inches": 72.0
    },
    "financials": {
      "monthly_gross_rent": 3200.0,
      "monthly_net_operating_income": 2072.67,
      "annual_noi": 24872.0,
      "monthly_mortgage_payment": 2529.47,
      "monthly_cash_flow": -456.8,
      "annual_cash_flow": -5481.64,
      "cap_rate": 5.13,
      "cash_on_cash_return": -4.91,
      "gross_rent_multiplier": 12.63,
      "debt_service_coverage_ratio": 0.82,
      "estimated_10yr_irr": 5.68,
      "average_daily_rate": 309.67,
      "occupancy_rate_pct": 65.0,
      "str_annual_revenue": 73468.42,
      "str_annual_net_cash_flow": 11658.3,
      "str_cash_on_cash": 9.21,
      "arv": 614937.5,
      "estimated_rehab_costs": 78750.0,
      "maximum_allowable_offer_70pct": 351706.25,
      "projected_flip_profit": -34087.81,
      "projected_flip_roi_pct": -5.63,
      "brrrr_refinance_cash_out": 451979.06,
      "capital_left_in_deal": 145868.2,
      "farm_annual_net_yield": 0.0,
      "farm_cap_rate": 0.0
    },
    "business_recommendations": [
      {
        "business_type": "Artisanal Specialty Coffee & Remote Workspace Hub",
        "category": "Food & Beverage",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Austin population with $98,500 median income and 33.2 median age.",
        "revenue_driver": "High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions",
        "estimated_break_even_months": 11,
        "estimated_annual_revenue_range": "$420,000 - $680,000 / year",
        "recommended_sqft": 1600,
        "pros": [
          "Captures hybrid work demographic",
          "High gross margin on espresso (80%+)",
          "Consistent daily foot traffic"
        ],
        "risks_to_mitigate": [
          "Barista labor retention",
          "Morning peak traffic management"
        ]
      },
      {
        "business_type": "Boutique Reformer Pilates & Wellness Studio",
        "category": "Health & Fitness",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Austin population with $98,500 median income and 33.2 median age.",
        "revenue_driver": "Recurring monthly membership subscriptions ($199-$279/mo) and private training packages",
        "estimated_break_even_months": 9,
        "estimated_annual_revenue_range": "$360,000 - $590,000 / year",
        "recommended_sqft": 2200,
        "pros": [
          "Predictable recurring MRR model",
          "Low inventory overhead",
          "High customer lifetime value"
        ],
        "risks_to_mitigate": [
          "Initial equipment capital expenditures ($40k-$60k)",
          "Instructor scheduling"
        ]
      },
      {
        "business_type": "Modern Premium Laundromat & Wash-and-Fold Service",
        "category": "Personal Services",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Austin population with $98,500 median income and 33.2 median age.",
        "revenue_driver": "Coin/app laundry cycles + drop-off commercial wash-and-fold delivery for local businesses",
        "estimated_break_even_months": 14,
        "estimated_annual_revenue_range": "$280,000 - $480,000 / year",
        "recommended_sqft": 2500,
        "pros": [
          "Essential recession-proof utility",
          "Minimal staffing needed",
          "Excellent cash flow generation"
        ],
        "risks_to_mitigate": [
          "Water/utility rate spikes",
          "Commercial washer maintenance"
        ]
      }
    ],
    "crop_suitability": [
      {
        "crop_name": "Premium Organic Alfalfa & Hay Forage",
        "suitability_score": 92,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep taproot utilizes subsoil moisture effectively",
          "Builds soil nitrogen naturally, excellent cash crop for multi-acre expanses",
          "Soil texture 'Clay Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Requires timely dry windows during hay-baling cycles",
          "Soil is alkaline (pH 7.6 vs max 7.5); elemental sulfur or organic compost needed."
        ],
        "estimated_annual_gross_yield_per_acre": 4800.0,
        "estimated_cost_per_acre": 1800.0,
        "estimated_net_profit_per_acre": 3000.0,
        "recommended_farming_method": "Rotational Pivot or Linear Irrigation with Nitrogen Fixation"
      },
      {
        "crop_name": "High-Density Specialty Apple & Pear Orchard",
        "suitability_score": 86,
        "tier": "High Viability",
        "optimal_reasons": [
          "Deep loam soil provides exceptional water retention during fruit sizing periods",
          "Consistent organic matter sustains active mycorrhizal biology supporting root health",
          "Soil texture 'Clay Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Fire blight susceptibility",
          "Hail damage risk requiring netting",
          "Soil is alkaline (pH 7.6 vs max 7.0); elemental sulfur or organic compost needed."
        ],
        "estimated_annual_gross_yield_per_acre": 18200.0,
        "estimated_cost_per_acre": 8400.0,
        "estimated_net_profit_per_acre": 9800.0,
        "recommended_farming_method": "Trellised High-Density Spindle with Micro-Sprinklers"
      },
      {
        "crop_name": "Premium Wine Grapes (Pinot Noir / Cabernet)",
        "suitability_score": 64,
        "tier": "Moderate Viability",
        "optimal_reasons": [
          "Well-drained soil structure allows deep root penetration and controlled moisture stress for concentrated grape brix",
          "Favorable pH range facilitates balanced micronutrient uptake (magnesium, potassium, calcium)"
        ],
        "risk_factors": [
          "Spring budbreak frost risks",
          "Initial vineyard establishment timeline (3 years to first harvest)",
          "Soil texture 'Clay Loam' may require drainage or tilth management for Premium Wine Grapes (Pinot Noir / Cabernet)."
        ],
        "estimated_annual_gross_yield_per_acre": 14500.0,
        "estimated_cost_per_acre": 6200.0,
        "estimated_net_profit_per_acre": 8300.0,
        "recommended_farming_method": "Precision Drip Irrigation with Cover Crop Alleyways"
      },
      {
        "crop_name": "Hazelnut / Truffle Agroforestry Orchard",
        "suitability_score": 60,
        "tier": "Moderate Viability",
        "optimal_reasons": [
          "Deep well-drained profile prevents root rot and supports symbiotic truffle fungi development",
          "Low labor requirement compared to soft fruit once established",
          "Soil pH of 7.6 is right in the sweet spot (6.5 - 7.8) for nutrient availability."
        ],
        "risk_factors": [
          "Eastern filbert blight resistance selection needed",
          "5 to 6 year maturity ramp",
          "Soil texture 'Clay Loam' may require drainage or tilth management for Hazelnut / Truffle Agroforestry Orchard."
        ],
        "estimated_annual_gross_yield_per_acre": 11500.0,
        "estimated_cost_per_acre": 3800.0,
        "estimated_net_profit_per_acre": 7700.0,
        "recommended_farming_method": "Regenerative Alley Cropping with Inoculated Mycorrhizae"
      }
    ],
    "ai_investment_memo": "================================================================================\n                    EXECUTIVE REAL ESTATE INVESTMENT MEMORANDUM\n================================================================================\nASSET: Heritage Craftsman with Permitted ADU Potential\nADDRESS: 1428 Maple Crest Ave, Austin, TX 78704\nLIST PRICE: $485,000 | TYPE: SINGLE_FAMILY | LOT: 0.28 Acres\nUNITS: 1 | SQFT: 1,750 | YEAR BUILT: 1978\n\n1. EXECUTIVE UNDERWRITING SUMMARY\n--------------------------------------------------------------------------------\n- Monthly Gross Rent: $3,200.00\n- Net Operating Income (NOI): $24,872.00 / year\n- Monthly Net Cash Flow: $-456.80\n- Unleveraged Cap Rate: 5.13%\n- Cash-on-Cash Return: -4.91%\n- Debt Service Coverage Ratio (DSCR): 0.82x\n- 10-Year Projected IRR: 5.68%\n\n2. ALTERNATIVE STRATEGY BENCHMARKING\n--------------------------------------------------------------------------------\n- Short-Term Rental (Airbnb): Projected ADR $310 @ 65% occupancy\n  Annual STR Net Cash Flow: $11,658.30 (CoC: 9.21%)\n- Value-Add / Fix & Flip:\n  Estimated Rehab: $78,750.00 | Projected ARV: $614,937.50\n  Max Allowable Offer (70% Rule): $351,706.25\n  Projected Flip Net Profit: $-34,087.81 (ROI: -5.63%)\n  BRRRR Refinance Cash-Out: $451,979.06 (Capital Remaining: $145,868.20)\n\n3. ZONING RESTRICTIONS & DEVELOPMENT POTENTIAL\n--------------------------------------------------------------------------------\n- Zoning Designation: R-3 (Medium-Density Multi-Family Residential)\n- Permitted Uses: Single-family, Duplex, Triplex, Apartment complex up to 4 stories\n- ADU Permitted: YES - Strong density expansion upside\n- Max Height: 45.0 ft | FAR: 1.2\n- Regulatory Restrictions: Check municipal setback buffer for adjacent rights-of-way; Exterior signage subject to city design review guidelines\n\n4. DEMOGRAPHIC MATCH & OPTIMAL LOCAL BUSINESS FIT\n--------------------------------------------------------------------------------\n- Median Household Income: $98,500 | Median Age: 33.2\n- Foot Traffic Score: 82/100 | Walk Score: 78/100\n- Recommended Commercial Use:\n  - **Artisanal Specialty Coffee & Remote Workspace Hub** (Match: 75%): High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions\n\n5. AGRONOMIC & SOIL SUITABILITY (FLOURISHING CROPS)\n--------------------------------------------------------------------------------\n- Soil Series & Texture: Austin Silty Clay (Clay Loam)\n- Soil pH: 7.6 | Drainage: Moderately Well Drained | Hardiness: Zone 8b\n- Prime Farmland Status: Farmland of Statewide Importance\n- Top Flourishing Crop:\n  - **Premium Organic Alfalfa & Hay Forage** (Score: 92%): Net yield approx $3,000/acre using Rotational Pivot or Linear Irrigation with Nitrogen Fixation\n\n6. DEVELOPMENT PIPELINE & UPCOMING AREA INTELLIGENCE\n--------------------------------------------------------------------------------\n- Development Momentum Score: 99/100\n- Investment Timing: Active Growth Phase \u2014 Appreciation accelerating\n- 5-Year Appreciation Forecast: +43.7%\n- Population Growth (5yr): +14.2% | Job Growth (1yr): +3.6%\n- Building Permits YoY: +12.5% | Days-on-Market Trend: -8 days\n- Absorption Rate: 2.4 months (Tight Seller Market)\n- Opportunity Zone: YES \u2014 Eligible for OZ capital gains deferral\n- Overbuilding Risk: Low | Gentrification Pressure: 40/100\n- Top Infrastructure Catalyst: Project Connect Blue Line Light Rail (Downtown \u2194 Airport) ($4,800M investment, 9,500 jobs, completion 2029)\n- Nearest Rezoning: C14-2025-0087 \u2014 SF-3 (Single Family) \u2192 MF-4 (Multi-Family Medium-High Density) (+340% density increase)\n\n7. RISK MATRIX & ACQUISITION RECOMMENDATION\n--------------------------------------------------------------------------------\n- Stress-Test Resilience: DSCR of 0.82x indicates tight debt coverage, recommend larger equity down payment.\n- Strategic Action: RENEGOTIATE PURCHASE PRICE - Offer closer to 70% MAO benchmark.\n\n================================================================================",
    "development": {
      "population_growth_1yr_pct": 2.8,
      "population_growth_5yr_pct": 14.2,
      "population_growth_10yr_projected_pct": 28.5,
      "job_growth_1yr_pct": 3.6,
      "unemployment_rate_pct": 3.1,
      "median_sale_price_1yr_change_pct": 5.4,
      "median_sale_price_3yr_change_pct": 18.2,
      "avg_days_on_market": 28,
      "days_on_market_yoy_change": -8,
      "absorption_rate_months": 2.4,
      "new_listings_yoy_change_pct": -4.2,
      "building_permits_issued_ytd": 4800,
      "building_permits_yoy_change_pct": 12.5,
      "new_construction_units_pipeline": 18500,
      "commercial_permits_ytd": 340,
      "current_walk_score": 78,
      "projected_walk_score_5yr": 86,
      "current_transit_score": 64,
      "projected_transit_score_5yr": 78,
      "is_opportunity_zone": true,
      "opportunity_zone_tract_id": "48453001703",
      "has_tax_increment_financing": false,
      "has_enterprise_zone": false,
      "has_historic_tax_credits": false,
      "has_new_market_tax_credits": false,
      "special_incentive_programs": [],
      "infrastructure_projects": [
        {
          "name": "Project Connect Blue Line Light Rail (Downtown \u2194 Airport)",
          "category": "transit_rail",
          "phase": "under_construction",
          "estimated_investment": 4800000000,
          "distance_miles": 2.5,
          "estimated_completion_year": 2029,
          "jobs_created": 9500,
          "housing_units_added": 0,
          "impact_description": "28-mile light rail system connecting South Austin, Downtown, UT campus, and ABIA airport. Transit-oriented development catalyst along corridor.",
          "appreciation_catalyst_score": 92
        },
        {
          "name": "South Central Waterfront Mixed-Use District Redevelopment",
          "category": "waterfront_redevelopment",
          "phase": "approved",
          "estimated_investment": 2100000000,
          "distance_miles": 1.8,
          "estimated_completion_year": 2031,
          "jobs_created": 6200,
          "housing_units_added": 4200,
          "impact_description": "118-acre lakefront master plan transforming surface parking and industrial parcels into walkable mixed-use neighborhood with parks, retail, and 4,200 housing units.",
          "appreciation_catalyst_score": 88
        },
        {
          "name": "Tesla Gigafactory Texas Phase 2 Expansion",
          "category": "tech_campus_hq",
          "phase": "under_construction",
          "estimated_investment": 3600000000,
          "distance_miles": 8.0,
          "estimated_completion_year": 2028,
          "jobs_created": 12000,
          "housing_units_added": 0,
          "impact_description": "Second phase manufacturing and engineering campus expansion in southeast Travis County. Massive workforce housing demand catalyst.",
          "appreciation_catalyst_score": 78
        }
      ],
      "rezoning_proposals": [
        {
          "case_number": "C14-2025-0087",
          "current_zoning": "SF-3 (Single Family)",
          "proposed_zoning": "MF-4 (Multi-Family Medium-High Density)",
          "status": "Approved by City Council \u2014 Effective Q1 2027",
          "acreage_affected": 42.0,
          "distance_miles": 1.2,
          "density_increase_pct": 340.0,
          "description": "Major upzoning along South Lamar Blvd corridor enabling 4-story apartment buildings and mixed-use. Former single-family lots now carry multi-family entitlements."
        }
      ],
      "employer_migrations": [
        {
          "company_name": "Tesla, Inc.",
          "industry": "EV Manufacturing & AI",
          "announcement_type": "HQ Expansion",
          "estimated_employees": 12000,
          "avg_salary": 95000,
          "distance_miles": 8.0,
          "target_year": 2028
        },
        {
          "company_name": "Apple Inc.",
          "industry": "Technology",
          "announcement_type": "Regional Campus Expansion",
          "estimated_employees": 5000,
          "avg_salary": 145000,
          "distance_miles": 10.0,
          "target_year": 2027
        }
      ],
      "development_momentum_score": 99,
      "appreciation_forecast_5yr_pct": 43.7,
      "risk_of_overbuilding": "Low",
      "gentrification_pressure_index": 40,
      "overall_investment_timing": "Active Growth Phase \u2014 Appreciation accelerating"
    }
  },
  {
    "id": "prop-002",
    "title": "High-Yield Turnkey Triplex with RUBS Utility Split",
    "address": "812 Washington Blvd",
    "city": "Denver",
    "state": "CO",
    "zip_code": "80203",
    "list_price": 795000.0,
    "property_type": "multi_family",
    "bedrooms": 6,
    "bathrooms": 4.0,
    "square_feet": 3200,
    "lot_size_acres": 0.22,
    "year_built": 1965,
    "units": 3,
    "description": "Fully occupied 3-unit property in Capitol Hill. Separate electric meters, recent roof, on-site coin laundry generating auxiliary income.",
    "image_url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    "estimated_monthly_rent": 5700.0,
    "property_tax_annual": 6200.0,
    "insurance_annual": 2100.0,
    "hoa_monthly": 0.0,
    "maintenance_pct": 6.0,
    "vacancy_pct": 5.0,
    "management_pct": 7.0,
    "zoning": {
      "code": "R-3",
      "name": "Medium-Density Multi-Family Residential",
      "category": "Residential",
      "permitted_uses": [
        "Single-family",
        "Duplex",
        "Triplex",
        "Apartment complex up to 4 stories",
        "ADU"
      ],
      "conditional_uses": [
        "Daycare center",
        "Assisted living facility",
        "Home-based business"
      ],
      "prohibited_uses": [
        "Heavy commercial",
        "Industrial",
        "Nightclubs"
      ],
      "max_height_ft": 45.0,
      "max_coverage_pct": 55.0,
      "floor_area_ratio": 1.2,
      "setbacks": {
        "front": 20,
        "rear": 15,
        "side": 10
      },
      "short_term_rental_allowed": true,
      "adu_permitted": true,
      "commercial_ground_floor_required": false,
      "parking_ratio_per_unit": 1.25,
      "special_restrictions": [
        "Check municipal setback buffer for adjacent rights-of-way",
        "Exterior signage subject to city design review guidelines"
      ]
    },
    "demographics": {
      "zip_code": "80203",
      "city": "Denver",
      "state": "CO",
      "population": 38900,
      "population_growth_5yr_pct": 5.1,
      "median_household_income": 86000.0,
      "median_age": 32.4,
      "bachelors_or_higher_pct": 57.0,
      "renter_occupied_pct": 68.0,
      "foot_traffic_score": 88,
      "walk_score": 86,
      "transit_score": 72,
      "top_employment_sectors": [
        "Healthcare",
        "Tech",
        "Retail",
        "Education"
      ],
      "discretionary_spend_index": 124.0,
      "underserved_business_types": [
        "Laundromat Cafe",
        "Boutique Pilates",
        "Specialty Convenience"
      ]
    },
    "soil": {
      "soil_series_name": "Nunn Loam",
      "soil_texture": "Loam",
      "ph_level": 7.2,
      "organic_matter_pct": 2.4,
      "drainage_class": "Well Drained",
      "water_storage_capacity_inches": 8.8,
      "slope_pct": 1.0,
      "prime_farmland_rating": "Prime Farmland if Irrigated",
      "frost_free_days": 165,
      "usda_hardiness_zone": "6a",
      "irrigation_water_rights": false,
      "depth_to_water_table_ft": 12.0,
      "depth_to_bedrock_inches": 72.0
    },
    "financials": {
      "monthly_gross_rent": 6015.0,
      "monthly_net_operating_income": 3542.84,
      "annual_noi": 42514.02,
      "monthly_mortgage_payment": 4006.99,
      "monthly_cash_flow": -464.16,
      "annual_cash_flow": -5569.87,
      "cap_rate": 5.35,
      "cash_on_cash_return": -2.46,
      "gross_rent_multiplier": 11.62,
      "debt_service_coverage_ratio": 0.88,
      "estimated_10yr_irr": 9.05,
      "average_daily_rate": 568.0,
      "occupancy_rate_pct": 65.0,
      "str_annual_revenue": 134758.0,
      "str_annual_net_cash_flow": 35488.46,
      "str_cash_on_cash": 17.94,
      "arv": 1032600.0,
      "estimated_rehab_costs": 144000.0,
      "maximum_allowable_offer_70pct": 578820.0,
      "projected_flip_profit": -45749.5,
      "projected_flip_roi_pct": -4.55,
      "brrrr_refinance_cash_out": 758961.0,
      "capital_left_in_deal": 234314.62,
      "farm_annual_net_yield": 0.0,
      "farm_cap_rate": 0.0
    },
    "business_recommendations": [
      {
        "business_type": "Artisanal Specialty Coffee & Remote Workspace Hub",
        "category": "Food & Beverage",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Denver population with $86,000 median income and 32.4 median age.",
        "revenue_driver": "High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions",
        "estimated_break_even_months": 11,
        "estimated_annual_revenue_range": "$420,000 - $680,000 / year",
        "recommended_sqft": 1600,
        "pros": [
          "Captures hybrid work demographic",
          "High gross margin on espresso (80%+)",
          "Consistent daily foot traffic"
        ],
        "risks_to_mitigate": [
          "Barista labor retention",
          "Morning peak traffic management"
        ]
      },
      {
        "business_type": "Boutique Reformer Pilates & Wellness Studio",
        "category": "Health & Fitness",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Denver population with $86,000 median income and 32.4 median age.",
        "revenue_driver": "Recurring monthly membership subscriptions ($199-$279/mo) and private training packages",
        "estimated_break_even_months": 9,
        "estimated_annual_revenue_range": "$360,000 - $590,000 / year",
        "recommended_sqft": 2200,
        "pros": [
          "Predictable recurring MRR model",
          "Low inventory overhead",
          "High customer lifetime value"
        ],
        "risks_to_mitigate": [
          "Initial equipment capital expenditures ($40k-$60k)",
          "Instructor scheduling"
        ]
      },
      {
        "business_type": "Modern Premium Laundromat & Wash-and-Fold Service",
        "category": "Personal Services",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Denver population with $86,000 median income and 32.4 median age.",
        "revenue_driver": "Coin/app laundry cycles + drop-off commercial wash-and-fold delivery for local businesses",
        "estimated_break_even_months": 14,
        "estimated_annual_revenue_range": "$280,000 - $480,000 / year",
        "recommended_sqft": 2500,
        "pros": [
          "Essential recession-proof utility",
          "Minimal staffing needed",
          "Excellent cash flow generation"
        ],
        "risks_to_mitigate": [
          "Water/utility rate spikes",
          "Commercial washer maintenance"
        ]
      }
    ],
    "crop_suitability": [
      {
        "crop_name": "Premium Wine Grapes (Pinot Noir / Cabernet)",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Well-drained soil structure allows deep root penetration and controlled moisture stress for concentrated grape brix",
          "Favorable pH range facilitates balanced micronutrient uptake (magnesium, potassium, calcium)",
          "Soil texture 'Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Spring budbreak frost risks",
          "Initial vineyard establishment timeline (3 years to first harvest)"
        ],
        "estimated_annual_gross_yield_per_acre": 14500.0,
        "estimated_cost_per_acre": 6200.0,
        "estimated_net_profit_per_acre": 8300.0,
        "recommended_farming_method": "Precision Drip Irrigation with Cover Crop Alleyways"
      },
      {
        "crop_name": "Hazelnut / Truffle Agroforestry Orchard",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep well-drained profile prevents root rot and supports symbiotic truffle fungi development",
          "Low labor requirement compared to soft fruit once established",
          "Soil texture 'Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Eastern filbert blight resistance selection needed",
          "5 to 6 year maturity ramp"
        ],
        "estimated_annual_gross_yield_per_acre": 11500.0,
        "estimated_cost_per_acre": 3800.0,
        "estimated_net_profit_per_acre": 7700.0,
        "recommended_farming_method": "Regenerative Alley Cropping with Inoculated Mycorrhizae"
      },
      {
        "crop_name": "Premium Organic Alfalfa & Hay Forage",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep taproot utilizes subsoil moisture effectively",
          "Builds soil nitrogen naturally, excellent cash crop for multi-acre expanses",
          "Soil texture 'Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Requires timely dry windows during hay-baling cycles"
        ],
        "estimated_annual_gross_yield_per_acre": 4800.0,
        "estimated_cost_per_acre": 1800.0,
        "estimated_net_profit_per_acre": 3000.0,
        "recommended_farming_method": "Rotational Pivot or Linear Irrigation with Nitrogen Fixation"
      },
      {
        "crop_name": "High-Density Specialty Apple & Pear Orchard",
        "suitability_score": 80,
        "tier": "High Viability",
        "optimal_reasons": [
          "Deep loam soil provides exceptional water retention during fruit sizing periods",
          "Consistent organic matter sustains active mycorrhizal biology supporting root health",
          "Soil texture 'Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Fire blight susceptibility",
          "Hail damage risk requiring netting",
          "Soil is alkaline (pH 7.2 vs max 7.0); elemental sulfur or organic compost needed."
        ],
        "estimated_annual_gross_yield_per_acre": 18200.0,
        "estimated_cost_per_acre": 8400.0,
        "estimated_net_profit_per_acre": 9800.0,
        "recommended_farming_method": "Trellised High-Density Spindle with Micro-Sprinklers"
      }
    ],
    "ai_investment_memo": "================================================================================\n                    EXECUTIVE REAL ESTATE INVESTMENT MEMORANDUM\n================================================================================\nASSET: High-Yield Turnkey Triplex with RUBS Utility Split\nADDRESS: 812 Washington Blvd, Denver, CO 80203\nLIST PRICE: $795,000 | TYPE: MULTI_FAMILY | LOT: 0.22 Acres\nUNITS: 3 | SQFT: 3,200 | YEAR BUILT: 1965\n\n1. EXECUTIVE UNDERWRITING SUMMARY\n--------------------------------------------------------------------------------\n- Monthly Gross Rent: $6,015.00\n- Net Operating Income (NOI): $42,514.02 / year\n- Monthly Net Cash Flow: $-464.16\n- Unleveraged Cap Rate: 5.35%\n- Cash-on-Cash Return: -2.46%\n- Debt Service Coverage Ratio (DSCR): 0.88x\n- 10-Year Projected IRR: 9.05%\n\n2. ALTERNATIVE STRATEGY BENCHMARKING\n--------------------------------------------------------------------------------\n- Short-Term Rental (Airbnb): Projected ADR $568 @ 65% occupancy\n  Annual STR Net Cash Flow: $35,488.46 (CoC: 17.94%)\n- Value-Add / Fix & Flip:\n  Estimated Rehab: $144,000.00 | Projected ARV: $1,032,600.00\n  Max Allowable Offer (70% Rule): $578,820.00\n  Projected Flip Net Profit: $-45,749.50 (ROI: -4.55%)\n  BRRRR Refinance Cash-Out: $758,961.00 (Capital Remaining: $234,314.62)\n\n3. ZONING RESTRICTIONS & DEVELOPMENT POTENTIAL\n--------------------------------------------------------------------------------\n- Zoning Designation: R-3 (Medium-Density Multi-Family Residential)\n- Permitted Uses: Single-family, Duplex, Triplex, Apartment complex up to 4 stories\n- ADU Permitted: YES - Strong density expansion upside\n- Max Height: 45.0 ft | FAR: 1.2\n- Regulatory Restrictions: Check municipal setback buffer for adjacent rights-of-way; Exterior signage subject to city design review guidelines\n\n4. DEMOGRAPHIC MATCH & OPTIMAL LOCAL BUSINESS FIT\n--------------------------------------------------------------------------------\n- Median Household Income: $86,000 | Median Age: 32.4\n- Foot Traffic Score: 88/100 | Walk Score: 86/100\n- Recommended Commercial Use:\n  - **Artisanal Specialty Coffee & Remote Workspace Hub** (Match: 75%): High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions\n\n5. AGRONOMIC & SOIL SUITABILITY (FLOURISHING CROPS)\n--------------------------------------------------------------------------------\n- Soil Series & Texture: Nunn Loam (Loam)\n- Soil pH: 7.2 | Drainage: Well Drained | Hardiness: Zone 6a\n- Prime Farmland Status: Prime Farmland if Irrigated\n- Top Flourishing Crop:\n  - **Premium Wine Grapes (Pinot Noir / Cabernet)** (Score: 99%): Net yield approx $8,300/acre using Precision Drip Irrigation with Cover Crop Alleyways\n\n6. DEVELOPMENT PIPELINE & UPCOMING AREA INTELLIGENCE\n--------------------------------------------------------------------------------\n- Development Momentum Score: 77/100\n- Investment Timing: Growth Phase \u2014 Solid fundamentals with momentum\n- 5-Year Appreciation Forecast: +28.2%\n- Population Growth (5yr): +9.8% | Job Growth (1yr): +2.8%\n- Building Permits YoY: +8.2% | Days-on-Market Trend: -12 days\n- Absorption Rate: 1.8 months (Tight Seller Market)\n- Opportunity Zone: No\n- Overbuilding Risk: Low | Gentrification Pressure: 40/100\n- Top Infrastructure Catalyst: National Western Center Campus Redevelopment ($1,200M investment, 3,800 jobs, completion 2028)\n\n\n7. RISK MATRIX & ACQUISITION RECOMMENDATION\n--------------------------------------------------------------------------------\n- Stress-Test Resilience: DSCR of 0.88x indicates tight debt coverage, recommend larger equity down payment.\n- Strategic Action: RENEGOTIATE PURCHASE PRICE - Offer closer to 70% MAO benchmark.\n\n================================================================================",
    "development": {
      "population_growth_1yr_pct": 1.9,
      "population_growth_5yr_pct": 9.8,
      "population_growth_10yr_projected_pct": 19.0,
      "job_growth_1yr_pct": 2.8,
      "unemployment_rate_pct": 3.4,
      "median_sale_price_1yr_change_pct": 4.8,
      "median_sale_price_3yr_change_pct": 16.5,
      "avg_days_on_market": 22,
      "days_on_market_yoy_change": -12,
      "absorption_rate_months": 1.8,
      "new_listings_yoy_change_pct": -6.1,
      "building_permits_issued_ytd": 3200,
      "building_permits_yoy_change_pct": 8.2,
      "new_construction_units_pipeline": 12800,
      "commercial_permits_ytd": 280,
      "current_walk_score": 86,
      "projected_walk_score_5yr": 90,
      "current_transit_score": 72,
      "projected_transit_score_5yr": 80,
      "is_opportunity_zone": false,
      "opportunity_zone_tract_id": "",
      "has_tax_increment_financing": false,
      "has_enterprise_zone": false,
      "has_historic_tax_credits": false,
      "has_new_market_tax_credits": false,
      "special_incentive_programs": [],
      "infrastructure_projects": [
        {
          "name": "National Western Center Campus Redevelopment",
          "category": "mixed_use_town_center",
          "phase": "under_construction",
          "estimated_investment": 1200000000,
          "distance_miles": 3.2,
          "estimated_completion_year": 2028,
          "jobs_created": 3800,
          "housing_units_added": 1800,
          "impact_description": "250-acre regeneration of historic stockyards into year-round events campus, innovation district, and mixed-use neighborhood. Adjacent to RTD N-Line commuter rail.",
          "appreciation_catalyst_score": 85
        },
        {
          "name": "I-70 Central Viaduct Reconstruction & Cap Park",
          "category": "highway_interchange",
          "phase": "completed_recent",
          "estimated_investment": 1270000000,
          "distance_miles": 2.0,
          "estimated_completion_year": 2025,
          "jobs_created": 1200,
          "housing_units_added": 0,
          "impact_description": "Lowered highway segment with 4-acre freeway cap park reconnecting Globeville and Elyria-Swansea neighborhoods. Major noise reduction and land value uplift.",
          "appreciation_catalyst_score": 72
        }
      ],
      "rezoning_proposals": [],
      "employer_migrations": [
        {
          "company_name": "Ball Aerospace (BAE Systems)",
          "industry": "Aerospace & Defense",
          "announcement_type": "R&D Campus",
          "estimated_employees": 3200,
          "avg_salary": 112000,
          "distance_miles": 7.0,
          "target_year": 2028
        }
      ],
      "development_momentum_score": 77,
      "appreciation_forecast_5yr_pct": 28.2,
      "risk_of_overbuilding": "Low",
      "gentrification_pressure_index": 40,
      "overall_investment_timing": "Growth Phase \u2014 Solid fundamentals with momentum"
    }
  },
  {
    "id": "prop-003",
    "title": "Prime Fix & Flip Opportunity \u2014 Distressed Ranch with Huge Spread",
    "address": "3204 Piedmont Ridge Dr",
    "city": "Atlanta",
    "state": "GA",
    "zip_code": "30305",
    "list_price": 340000.0,
    "property_type": "single_family",
    "bedrooms": 3,
    "bathrooms": 2.0,
    "square_feet": 2100,
    "lot_size_acres": 0.4,
    "year_built": 1972,
    "units": 1,
    "description": "Estate sale requiring cosmetic + kitchen/bath overhaul. ARV comps in neighborhood consistently selling for $620k-$660k.",
    "image_url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "estimated_monthly_rent": 2900.0,
    "property_tax_annual": 4200.0,
    "insurance_annual": 1300.0,
    "hoa_monthly": 0.0,
    "maintenance_pct": 5.0,
    "vacancy_pct": 5.0,
    "management_pct": 8.0,
    "zoning": {
      "code": "R-1",
      "name": "Single-Family Low-Density Residential",
      "category": "Residential",
      "permitted_uses": [
        "Single-family detached home",
        "Home occupation (non-retail)",
        "ADU (Accessory Dwelling Unit)"
      ],
      "conditional_uses": [
        "Daycare (small)",
        "Bed & Breakfast",
        "Community garden"
      ],
      "prohibited_uses": [
        "Retail storefront",
        "Automotive",
        "Industrial",
        "Multi-family 3+ units"
      ],
      "max_height_ft": 30.0,
      "max_coverage_pct": 35.0,
      "floor_area_ratio": 0.45,
      "setbacks": {
        "front": 20,
        "rear": 15,
        "side": 10
      },
      "short_term_rental_allowed": true,
      "adu_permitted": true,
      "commercial_ground_floor_required": false,
      "parking_ratio_per_unit": 2.0,
      "special_restrictions": [
        "Check municipal setback buffer for adjacent rights-of-way",
        "Exterior signage subject to city design review guidelines"
      ]
    },
    "demographics": {
      "zip_code": "30305",
      "city": "Atlanta",
      "state": "GA",
      "population": 29800,
      "population_growth_5yr_pct": 4.4,
      "median_household_income": 112000.0,
      "median_age": 35.6,
      "bachelors_or_higher_pct": 71.0,
      "renter_occupied_pct": 42.0,
      "foot_traffic_score": 64,
      "walk_score": 60,
      "transit_score": 48,
      "top_employment_sectors": [
        "Healthcare",
        "Tech",
        "Retail",
        "Education"
      ],
      "discretionary_spend_index": 148.0,
      "underserved_business_types": [
        "High-End Interior Design",
        "Private Pilates",
        "Specialty Wine Bar"
      ]
    },
    "soil": {
      "soil_series_name": "Cecil Sandy Loam",
      "soil_texture": "Sandy Loam",
      "ph_level": 5.8,
      "organic_matter_pct": 2.1,
      "drainage_class": "Well Drained",
      "water_storage_capacity_inches": 6.8,
      "slope_pct": 4.0,
      "prime_farmland_rating": "All Areas are Prime Farmland",
      "frost_free_days": 230,
      "usda_hardiness_zone": "8a",
      "irrigation_water_rights": false,
      "depth_to_water_table_ft": 12.0,
      "depth_to_bedrock_inches": 72.0
    },
    "financials": {
      "monthly_gross_rent": 2900.0,
      "monthly_net_operating_income": 1919.67,
      "annual_noi": 23036.0,
      "monthly_mortgage_payment": 1773.24,
      "monthly_cash_flow": 146.43,
      "annual_cash_flow": 1757.16,
      "cap_rate": 6.78,
      "cash_on_cash_return": 2.25,
      "gross_rent_multiplier": 9.77,
      "debt_service_coverage_ratio": 1.08,
      "estimated_10yr_irr": 12.17,
      "average_daily_rate": 287.67,
      "occupancy_rate_pct": 65.0,
      "str_annual_revenue": 68248.92,
      "str_annual_net_cash_flow": 18452.83,
      "str_cash_on_cash": 19.8,
      "arv": 495925.0,
      "estimated_rehab_costs": 94500.0,
      "maximum_allowable_offer_70pct": 252647.5,
      "projected_flip_profit": -4670.38,
      "projected_flip_roi_pct": -1.0,
      "brrrr_refinance_cash_out": 364504.88,
      "capital_left_in_deal": 95230.59,
      "farm_annual_net_yield": 0.0,
      "farm_cap_rate": 0.0
    },
    "business_recommendations": [
      {
        "business_type": "Artisanal Specialty Coffee & Remote Workspace Hub",
        "category": "Food & Beverage",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Atlanta population with $112,000 median income and 35.6 median age.",
        "revenue_driver": "High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions",
        "estimated_break_even_months": 11,
        "estimated_annual_revenue_range": "$420,000 - $680,000 / year",
        "recommended_sqft": 1600,
        "pros": [
          "Captures hybrid work demographic",
          "High gross margin on espresso (80%+)",
          "Consistent daily foot traffic"
        ],
        "risks_to_mitigate": [
          "Barista labor retention",
          "Morning peak traffic management"
        ]
      },
      {
        "business_type": "Boutique Reformer Pilates & Wellness Studio",
        "category": "Health & Fitness",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Atlanta population with $112,000 median income and 35.6 median age.",
        "revenue_driver": "Recurring monthly membership subscriptions ($199-$279/mo) and private training packages",
        "estimated_break_even_months": 9,
        "estimated_annual_revenue_range": "$360,000 - $590,000 / year",
        "recommended_sqft": 2200,
        "pros": [
          "Predictable recurring MRR model",
          "Low inventory overhead",
          "High customer lifetime value"
        ],
        "risks_to_mitigate": [
          "Initial equipment capital expenditures ($40k-$60k)",
          "Instructor scheduling"
        ]
      },
      {
        "business_type": "Pediatric & Family Urgent Dental / Health Clinic",
        "category": "Healthcare",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Atlanta population with $112,000 median income and 35.6 median age.",
        "revenue_driver": "Insurance billing, hygiene preventative care, pediatric dentistry, and cash cosmetic services",
        "estimated_break_even_months": 16,
        "estimated_annual_revenue_range": "$950,000 - $1,800,000 / year",
        "recommended_sqft": 3000,
        "pros": [
          "High reimbursement rates",
          "Long lease commitment (10+ years)",
          "Inelastic healthcare demand"
        ],
        "risks_to_mitigate": [
          "Medical licensing and zoning permits",
          "High plumbing build-out costs"
        ]
      }
    ],
    "crop_suitability": [
      {
        "crop_name": "Premium Wine Grapes (Pinot Noir / Cabernet)",
        "suitability_score": 91,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Well-drained soil structure allows deep root penetration and controlled moisture stress for concentrated grape brix",
          "Favorable pH range facilitates balanced micronutrient uptake (magnesium, potassium, calcium)",
          "Soil texture 'Sandy Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Spring budbreak frost risks",
          "Initial vineyard establishment timeline (3 years to first harvest)",
          "Soil is acidic (pH 5.8 vs min 6.0); agricultural lime application recommended."
        ],
        "estimated_annual_gross_yield_per_acre": 14500.0,
        "estimated_cost_per_acre": 6200.0,
        "estimated_net_profit_per_acre": 8300.0,
        "recommended_farming_method": "Precision Drip Irrigation with Cover Crop Alleyways"
      },
      {
        "crop_name": "Hazelnut / Truffle Agroforestry Orchard",
        "suitability_score": 85,
        "tier": "High Viability",
        "optimal_reasons": [
          "Deep well-drained profile prevents root rot and supports symbiotic truffle fungi development",
          "Low labor requirement compared to soft fruit once established",
          "Soil texture 'Sandy Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Eastern filbert blight resistance selection needed",
          "5 to 6 year maturity ramp",
          "Soil is acidic (pH 5.8 vs min 6.5); agricultural lime application recommended."
        ],
        "estimated_annual_gross_yield_per_acre": 11500.0,
        "estimated_cost_per_acre": 3800.0,
        "estimated_net_profit_per_acre": 7700.0,
        "recommended_farming_method": "Regenerative Alley Cropping with Inoculated Mycorrhizae"
      },
      {
        "crop_name": "Organic Blueberries & Specialty Berries",
        "suitability_score": 79,
        "tier": "High Viability",
        "optimal_reasons": [
          "Thrives in lighter soil textures with high organic humus and aeration",
          "Very high wholesale and direct-to-consumer market margins",
          "Soil texture 'Sandy Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Requires sulfur amendments if soil pH is above 5.8",
          "Bird predation",
          "Soil is alkaline (pH 5.8 vs max 5.5); elemental sulfur or organic compost needed."
        ],
        "estimated_annual_gross_yield_per_acre": 22000.0,
        "estimated_cost_per_acre": 9500.0,
        "estimated_net_profit_per_acre": 12500.0,
        "recommended_farming_method": "Raised Mulched Beds with Acidifying Drip Fertigation"
      },
      {
        "crop_name": "Specialty Heirloom Vegetables & Bio-Intensive Market Garden",
        "suitability_score": 78,
        "tier": "High Viability",
        "optimal_reasons": [
          "Rich balanced loam enables multi-succession plantings per season (greens, brassicas, heirloom nightshades)",
          "High organic matter ensures resilient water-holding buffer during heatwaves",
          "Soil texture 'Sandy Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Labor-intensive harvesting",
          "Immediate cold-chain storage required post-harvest",
          "Soil is acidic (pH 5.8 vs min 6.2); agricultural lime application recommended."
        ],
        "estimated_annual_gross_yield_per_acre": 28000.0,
        "estimated_cost_per_acre": 11000.0,
        "estimated_net_profit_per_acre": 17000.0,
        "recommended_farming_method": "No-Till Permanent Beds with Composted Mulch & Low Tunnels"
      }
    ],
    "ai_investment_memo": "================================================================================\n                    EXECUTIVE REAL ESTATE INVESTMENT MEMORANDUM\n================================================================================\nASSET: Prime Fix & Flip Opportunity \u2014 Distressed Ranch with Huge Spread\nADDRESS: 3204 Piedmont Ridge Dr, Atlanta, GA 30305\nLIST PRICE: $340,000 | TYPE: SINGLE_FAMILY | LOT: 0.40 Acres\nUNITS: 1 | SQFT: 2,100 | YEAR BUILT: 1972\n\n1. EXECUTIVE UNDERWRITING SUMMARY\n--------------------------------------------------------------------------------\n- Monthly Gross Rent: $2,900.00\n- Net Operating Income (NOI): $23,036.00 / year\n- Monthly Net Cash Flow: $146.43\n- Unleveraged Cap Rate: 6.78%\n- Cash-on-Cash Return: 2.25%\n- Debt Service Coverage Ratio (DSCR): 1.08x\n- 10-Year Projected IRR: 12.17%\n\n2. ALTERNATIVE STRATEGY BENCHMARKING\n--------------------------------------------------------------------------------\n- Short-Term Rental (Airbnb): Projected ADR $288 @ 65% occupancy\n  Annual STR Net Cash Flow: $18,452.83 (CoC: 19.80%)\n- Value-Add / Fix & Flip:\n  Estimated Rehab: $94,500.00 | Projected ARV: $495,925.00\n  Max Allowable Offer (70% Rule): $252,647.50\n  Projected Flip Net Profit: $-4,670.38 (ROI: -1.00%)\n  BRRRR Refinance Cash-Out: $364,504.88 (Capital Remaining: $95,230.59)\n\n3. ZONING RESTRICTIONS & DEVELOPMENT POTENTIAL\n--------------------------------------------------------------------------------\n- Zoning Designation: R-1 (Single-Family Low-Density Residential)\n- Permitted Uses: Single-family detached home, Home occupation (non-retail), ADU (Accessory Dwelling Unit)\n- ADU Permitted: YES - Strong density expansion upside\n- Max Height: 30.0 ft | FAR: 0.45\n- Regulatory Restrictions: Check municipal setback buffer for adjacent rights-of-way; Exterior signage subject to city design review guidelines\n\n4. DEMOGRAPHIC MATCH & OPTIMAL LOCAL BUSINESS FIT\n--------------------------------------------------------------------------------\n- Median Household Income: $112,000 | Median Age: 35.6\n- Foot Traffic Score: 64/100 | Walk Score: 60/100\n- Recommended Commercial Use:\n  - **Artisanal Specialty Coffee & Remote Workspace Hub** (Match: 75%): High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions\n\n5. AGRONOMIC & SOIL SUITABILITY (FLOURISHING CROPS)\n--------------------------------------------------------------------------------\n- Soil Series & Texture: Cecil Sandy Loam (Sandy Loam)\n- Soil pH: 5.8 | Drainage: Well Drained | Hardiness: Zone 8a\n- Prime Farmland Status: All Areas are Prime Farmland\n- Top Flourishing Crop:\n  - **Premium Wine Grapes (Pinot Noir / Cabernet)** (Score: 91%): Net yield approx $8,300/acre using Precision Drip Irrigation with Cover Crop Alleyways\n\n6. DEVELOPMENT PIPELINE & UPCOMING AREA INTELLIGENCE\n--------------------------------------------------------------------------------\n- Development Momentum Score: 99/100\n- Investment Timing: Active Growth Phase \u2014 Appreciation accelerating\n- 5-Year Appreciation Forecast: +40.3%\n- Population Growth (5yr): +11.6% | Job Growth (1yr): +3.2%\n- Building Permits YoY: +18.4% | Days-on-Market Trend: -15 days\n- Absorption Rate: 1.6 months (Tight Seller Market)\n- Opportunity Zone: YES \u2014 Eligible for OZ capital gains deferral\n- Overbuilding Risk: Moderate | Gentrification Pressure: 65/100\n- Top Infrastructure Catalyst: Atlanta BeltLine Westside Trail Phase 2 & Affordable TOD ($980M investment, 3,400 jobs, completion 2030)\n- Nearest Rezoning: Z-25-048 \u2014 R-4 (Single Family Residential) \u2192 MRC-3 (Mixed Residential Commercial) (+410% density increase)\n\n7. RISK MATRIX & ACQUISITION RECOMMENDATION\n--------------------------------------------------------------------------------\n- Stress-Test Resilience: DSCR of 1.08x indicates tight debt coverage, recommend larger equity down payment.\n- Strategic Action: ACQUISITION TARGET - Strong fundamentals across cash flow and alternative use potential.\n\n================================================================================",
    "development": {
      "population_growth_1yr_pct": 2.2,
      "population_growth_5yr_pct": 11.6,
      "population_growth_10yr_projected_pct": 24.0,
      "job_growth_1yr_pct": 3.2,
      "unemployment_rate_pct": 3.5,
      "median_sale_price_1yr_change_pct": 6.8,
      "median_sale_price_3yr_change_pct": 22.4,
      "avg_days_on_market": 18,
      "days_on_market_yoy_change": -15,
      "absorption_rate_months": 1.6,
      "new_listings_yoy_change_pct": -8.0,
      "building_permits_issued_ytd": 5200,
      "building_permits_yoy_change_pct": 18.4,
      "new_construction_units_pipeline": 22000,
      "commercial_permits_ytd": 420,
      "current_walk_score": 60,
      "projected_walk_score_5yr": 74,
      "current_transit_score": 48,
      "projected_transit_score_5yr": 62,
      "is_opportunity_zone": true,
      "opportunity_zone_tract_id": "13121008100",
      "has_tax_increment_financing": false,
      "has_enterprise_zone": false,
      "has_historic_tax_credits": false,
      "has_new_market_tax_credits": false,
      "special_incentive_programs": [],
      "infrastructure_projects": [
        {
          "name": "Atlanta BeltLine Westside Trail Phase 2 & Affordable TOD",
          "category": "transit_rail",
          "phase": "under_construction",
          "estimated_investment": 980000000,
          "distance_miles": 1.5,
          "estimated_completion_year": 2030,
          "jobs_created": 3400,
          "housing_units_added": 5600,
          "impact_description": "22-mile multi-use corridor converting rail corridor to transit, trails, parks, and 5,600 mixed-income housing units. Proven 20-40% appreciation in adjacent parcels.",
          "appreciation_catalyst_score": 95
        },
        {
          "name": "Microsoft East Campus & Azure Data Center Hub",
          "category": "tech_campus_hq",
          "phase": "announced",
          "estimated_investment": 750000000,
          "distance_miles": 6.0,
          "estimated_completion_year": 2029,
          "jobs_created": 4500,
          "housing_units_added": 0,
          "impact_description": "Regional cloud campus and engineering center bringing high-income tech workforce to metro east side.",
          "appreciation_catalyst_score": 74
        }
      ],
      "rezoning_proposals": [
        {
          "case_number": "Z-25-048",
          "current_zoning": "R-4 (Single Family Residential)",
          "proposed_zoning": "MRC-3 (Mixed Residential Commercial)",
          "status": "Approved by Zoning Review Board",
          "acreage_affected": 26.0,
          "distance_miles": 1.0,
          "density_increase_pct": 410.0,
          "description": "BeltLine-adjacent upzoning enabling 6-story mixed-use buildings. Directly increases land value of nearby residential parcels by enabling redevelopment."
        }
      ],
      "employer_migrations": [
        {
          "company_name": "Microsoft Corporation",
          "industry": "Cloud & AI",
          "announcement_type": "Azure Engineering Campus",
          "estimated_employees": 4500,
          "avg_salary": 138000,
          "distance_miles": 6.0,
          "target_year": 2029
        },
        {
          "company_name": "Rivian Automotive",
          "industry": "EV Manufacturing",
          "announcement_type": "Manufacturing Plant",
          "estimated_employees": 7500,
          "avg_salary": 68000,
          "distance_miles": 40.0,
          "target_year": 2028
        }
      ],
      "development_momentum_score": 99,
      "appreciation_forecast_5yr_pct": 40.3,
      "risk_of_overbuilding": "Moderate",
      "gentrification_pressure_index": 65,
      "overall_investment_timing": "Active Growth Phase \u2014 Appreciation accelerating"
    }
  },
  {
    "id": "prop-004",
    "title": "Mixed-Use Main Street Commercial & Residential Loft",
    "address": "420 NW 11th Ave",
    "city": "Portland",
    "state": "OR",
    "zip_code": "97209",
    "list_price": 1150000.0,
    "property_type": "mixed_use",
    "bedrooms": 4,
    "bathrooms": 3.5,
    "square_feet": 4600,
    "lot_size_acres": 0.15,
    "year_built": 1924,
    "units": 3,
    "description": "Historic brick building in Pearl District. Ground floor 2,000 sqft retail/cafe storefront + 2 luxury loft apartments on the second floor.",
    "image_url": "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
    "estimated_monthly_rent": 8900.0,
    "property_tax_annual": 11500.0,
    "insurance_annual": 3600.0,
    "hoa_monthly": 0.0,
    "maintenance_pct": 7.0,
    "vacancy_pct": 5.0,
    "management_pct": 8.0,
    "zoning": {
      "code": "MU-D",
      "name": "Mixed-Use Downtown Corridor",
      "category": "Mixed-Use",
      "permitted_uses": [
        "Ground floor retail/restaurant",
        "Upper floor multi-family apartments",
        "Co-working space",
        "Art gallery",
        "Micro-brewery"
      ],
      "conditional_uses": [
        "Event venue",
        "Hotel / Boutique lodge",
        "Rooftop lounge"
      ],
      "prohibited_uses": [
        "Drive-thrus",
        "Heavy automotive",
        "Outdoor bulk storage"
      ],
      "max_height_ft": 65.0,
      "max_coverage_pct": 80.0,
      "floor_area_ratio": 2.5,
      "setbacks": {
        "front": 20,
        "rear": 15,
        "side": 10
      },
      "short_term_rental_allowed": true,
      "adu_permitted": true,
      "commercial_ground_floor_required": false,
      "parking_ratio_per_unit": 1.0,
      "special_restrictions": [
        "Check municipal setback buffer for adjacent rights-of-way",
        "Exterior signage subject to city design review guidelines"
      ]
    },
    "demographics": {
      "zip_code": "97209",
      "city": "Portland",
      "state": "OR",
      "population": 21400,
      "population_growth_5yr_pct": 3.8,
      "median_household_income": 94000.0,
      "median_age": 36.1,
      "bachelors_or_higher_pct": 68.0,
      "renter_occupied_pct": 74.0,
      "foot_traffic_score": 94,
      "walk_score": 98,
      "transit_score": 89,
      "top_employment_sectors": [
        "Healthcare",
        "Tech",
        "Retail",
        "Education"
      ],
      "discretionary_spend_index": 138.0,
      "underserved_business_types": [
        "Artisanal Specialty Coffee",
        "Wellness Dental Boutique",
        "Designer Plant Nursery"
      ]
    },
    "soil": {
      "soil_series_name": "Urban Land Complex",
      "soil_texture": "Silt Loam",
      "ph_level": 6.5,
      "organic_matter_pct": 3.0,
      "drainage_class": "Well Drained",
      "water_storage_capacity_inches": 8.0,
      "slope_pct": 1.0,
      "prime_farmland_rating": "Not Prime Farmland (Urban)",
      "frost_free_days": 210,
      "usda_hardiness_zone": "8b",
      "irrigation_water_rights": false,
      "depth_to_water_table_ft": 12.0,
      "depth_to_bedrock_inches": 72.0
    },
    "financials": {
      "monthly_gross_rent": 9215.0,
      "monthly_net_operating_income": 5427.64,
      "annual_noi": 65131.62,
      "monthly_mortgage_payment": 5796.28,
      "monthly_cash_flow": -368.64,
      "annual_cash_flow": -4423.69,
      "cap_rate": 5.66,
      "cash_on_cash_return": -1.35,
      "gross_rent_multiplier": 10.77,
      "debt_service_coverage_ratio": 0.94,
      "estimated_10yr_irr": 10.42,
      "average_daily_rate": 752.67,
      "occupancy_rate_pct": 65.0,
      "str_annual_revenue": 178570.17,
      "str_annual_net_cash_flow": 38003.7,
      "str_cash_on_cash": 13.6,
      "arv": 1491550.0,
      "estimated_rehab_costs": 207000.0,
      "maximum_allowable_offer_70pct": 837085.0,
      "projected_flip_profit": -67717.25,
      "projected_flip_roi_pct": -4.65,
      "brrrr_refinance_cash_out": 1096289.25,
      "capital_left_in_deal": 339854.81,
      "farm_annual_net_yield": 0.0,
      "farm_cap_rate": 0.0
    },
    "business_recommendations": [
      {
        "business_type": "Artisanal Specialty Coffee & Remote Workspace Hub",
        "category": "Food & Beverage",
        "match_score": 98,
        "zoning_compliance": "Permitted By Right under current zoning",
        "target_demographic_fit": "Tailored to Portland population with $94,000 median income and 36.1 median age.",
        "revenue_driver": "High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions",
        "estimated_break_even_months": 11,
        "estimated_annual_revenue_range": "$420,000 - $680,000 / year",
        "recommended_sqft": 1600,
        "pros": [
          "Captures hybrid work demographic",
          "High gross margin on espresso (80%+)",
          "Consistent daily foot traffic"
        ],
        "risks_to_mitigate": [
          "Barista labor retention",
          "Morning peak traffic management"
        ]
      },
      {
        "business_type": "Boutique Reformer Pilates & Wellness Studio",
        "category": "Health & Fitness",
        "match_score": 98,
        "zoning_compliance": "Permitted By Right under current zoning",
        "target_demographic_fit": "Tailored to Portland population with $94,000 median income and 36.1 median age.",
        "revenue_driver": "Recurring monthly membership subscriptions ($199-$279/mo) and private training packages",
        "estimated_break_even_months": 9,
        "estimated_annual_revenue_range": "$360,000 - $590,000 / year",
        "recommended_sqft": 2200,
        "pros": [
          "Predictable recurring MRR model",
          "Low inventory overhead",
          "High customer lifetime value"
        ],
        "risks_to_mitigate": [
          "Initial equipment capital expenditures ($40k-$60k)",
          "Instructor scheduling"
        ]
      },
      {
        "business_type": "Modern Premium Laundromat & Wash-and-Fold Service",
        "category": "Personal Services",
        "match_score": 98,
        "zoning_compliance": "Permitted By Right under current zoning",
        "target_demographic_fit": "Tailored to Portland population with $94,000 median income and 36.1 median age.",
        "revenue_driver": "Coin/app laundry cycles + drop-off commercial wash-and-fold delivery for local businesses",
        "estimated_break_even_months": 14,
        "estimated_annual_revenue_range": "$280,000 - $480,000 / year",
        "recommended_sqft": 2500,
        "pros": [
          "Essential recession-proof utility",
          "Minimal staffing needed",
          "Excellent cash flow generation"
        ],
        "risks_to_mitigate": [
          "Water/utility rate spikes",
          "Commercial washer maintenance"
        ]
      }
    ],
    "crop_suitability": [
      {
        "crop_name": "Premium Wine Grapes (Pinot Noir / Cabernet)",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Well-drained soil structure allows deep root penetration and controlled moisture stress for concentrated grape brix",
          "Favorable pH range facilitates balanced micronutrient uptake (magnesium, potassium, calcium)",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Spring budbreak frost risks",
          "Initial vineyard establishment timeline (3 years to first harvest)"
        ],
        "estimated_annual_gross_yield_per_acre": 14500.0,
        "estimated_cost_per_acre": 6200.0,
        "estimated_net_profit_per_acre": 8300.0,
        "recommended_farming_method": "Precision Drip Irrigation with Cover Crop Alleyways"
      },
      {
        "crop_name": "High-Density Specialty Apple & Pear Orchard",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep loam soil provides exceptional water retention during fruit sizing periods",
          "Consistent organic matter sustains active mycorrhizal biology supporting root health",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Fire blight susceptibility",
          "Hail damage risk requiring netting"
        ],
        "estimated_annual_gross_yield_per_acre": 18200.0,
        "estimated_cost_per_acre": 8400.0,
        "estimated_net_profit_per_acre": 9800.0,
        "recommended_farming_method": "Trellised High-Density Spindle with Micro-Sprinklers"
      },
      {
        "crop_name": "Hazelnut / Truffle Agroforestry Orchard",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep well-drained profile prevents root rot and supports symbiotic truffle fungi development",
          "Low labor requirement compared to soft fruit once established",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Eastern filbert blight resistance selection needed",
          "5 to 6 year maturity ramp"
        ],
        "estimated_annual_gross_yield_per_acre": 11500.0,
        "estimated_cost_per_acre": 3800.0,
        "estimated_net_profit_per_acre": 7700.0,
        "recommended_farming_method": "Regenerative Alley Cropping with Inoculated Mycorrhizae"
      },
      {
        "crop_name": "Premium Organic Alfalfa & Hay Forage",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep taproot utilizes subsoil moisture effectively",
          "Builds soil nitrogen naturally, excellent cash crop for multi-acre expanses",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Requires timely dry windows during hay-baling cycles"
        ],
        "estimated_annual_gross_yield_per_acre": 4800.0,
        "estimated_cost_per_acre": 1800.0,
        "estimated_net_profit_per_acre": 3000.0,
        "recommended_farming_method": "Rotational Pivot or Linear Irrigation with Nitrogen Fixation"
      }
    ],
    "ai_investment_memo": "================================================================================\n                    EXECUTIVE REAL ESTATE INVESTMENT MEMORANDUM\n================================================================================\nASSET: Mixed-Use Main Street Commercial & Residential Loft\nADDRESS: 420 NW 11th Ave, Portland, OR 97209\nLIST PRICE: $1,150,000 | TYPE: MIXED_USE | LOT: 0.15 Acres\nUNITS: 3 | SQFT: 4,600 | YEAR BUILT: 1924\n\n1. EXECUTIVE UNDERWRITING SUMMARY\n--------------------------------------------------------------------------------\n- Monthly Gross Rent: $9,215.00\n- Net Operating Income (NOI): $65,131.62 / year\n- Monthly Net Cash Flow: $-368.64\n- Unleveraged Cap Rate: 5.66%\n- Cash-on-Cash Return: -1.35%\n- Debt Service Coverage Ratio (DSCR): 0.94x\n- 10-Year Projected IRR: 10.42%\n\n2. ALTERNATIVE STRATEGY BENCHMARKING\n--------------------------------------------------------------------------------\n- Short-Term Rental (Airbnb): Projected ADR $753 @ 65% occupancy\n  Annual STR Net Cash Flow: $38,003.70 (CoC: 13.60%)\n- Value-Add / Fix & Flip:\n  Estimated Rehab: $207,000.00 | Projected ARV: $1,491,550.00\n  Max Allowable Offer (70% Rule): $837,085.00\n  Projected Flip Net Profit: $-67,717.25 (ROI: -4.65%)\n  BRRRR Refinance Cash-Out: $1,096,289.25 (Capital Remaining: $339,854.81)\n\n3. ZONING RESTRICTIONS & DEVELOPMENT POTENTIAL\n--------------------------------------------------------------------------------\n- Zoning Designation: MU-D (Mixed-Use Downtown Corridor)\n- Permitted Uses: Ground floor retail/restaurant, Upper floor multi-family apartments, Co-working space, Art gallery\n- ADU Permitted: YES - Strong density expansion upside\n- Max Height: 65.0 ft | FAR: 2.5\n- Regulatory Restrictions: Check municipal setback buffer for adjacent rights-of-way; Exterior signage subject to city design review guidelines\n\n4. DEMOGRAPHIC MATCH & OPTIMAL LOCAL BUSINESS FIT\n--------------------------------------------------------------------------------\n- Median Household Income: $94,000 | Median Age: 36.1\n- Foot Traffic Score: 94/100 | Walk Score: 98/100\n- Recommended Commercial Use:\n  - **Artisanal Specialty Coffee & Remote Workspace Hub** (Match: 98%): High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions\n\n5. AGRONOMIC & SOIL SUITABILITY (FLOURISHING CROPS)\n--------------------------------------------------------------------------------\n- Soil Series & Texture: Urban Land Complex (Silt Loam)\n- Soil pH: 6.5 | Drainage: Well Drained | Hardiness: Zone 8b\n- Prime Farmland Status: Not Prime Farmland (Urban)\n- Top Flourishing Crop:\n  - **Premium Wine Grapes (Pinot Noir / Cabernet)** (Score: 99%): Net yield approx $8,300/acre using Precision Drip Irrigation with Cover Crop Alleyways\n\n6. DEVELOPMENT PIPELINE & UPCOMING AREA INTELLIGENCE\n--------------------------------------------------------------------------------\n- Development Momentum Score: 63/100\n- Investment Timing: Emerging \u2014 Early signals present, monitor quarterly\n- 5-Year Appreciation Forecast: +21.5%\n- Population Growth (5yr): +5.8% | Job Growth (1yr): +1.8%\n- Building Permits YoY: +4.8% | Days-on-Market Trend: -5 days\n- Absorption Rate: 3.2 months (Balanced)\n- Opportunity Zone: YES \u2014 Eligible for OZ capital gains deferral\n- Overbuilding Risk: Low | Gentrification Pressure: 30/100\n- Top Infrastructure Catalyst: Broadway Corridor Mixed-Use Master Plan (USPS Site) ($1,500M investment, 5,000 jobs, completion 2032)\n\n\n7. RISK MATRIX & ACQUISITION RECOMMENDATION\n--------------------------------------------------------------------------------\n- Stress-Test Resilience: DSCR of 0.94x indicates tight debt coverage, recommend larger equity down payment.\n- Strategic Action: RENEGOTIATE PURCHASE PRICE - Offer closer to 70% MAO benchmark.\n\n================================================================================",
    "development": {
      "population_growth_1yr_pct": 1.1,
      "population_growth_5yr_pct": 5.8,
      "population_growth_10yr_projected_pct": 12.0,
      "job_growth_1yr_pct": 1.8,
      "unemployment_rate_pct": 4.0,
      "median_sale_price_1yr_change_pct": 3.2,
      "median_sale_price_3yr_change_pct": 11.5,
      "avg_days_on_market": 35,
      "days_on_market_yoy_change": -5,
      "absorption_rate_months": 3.2,
      "new_listings_yoy_change_pct": 2.1,
      "building_permits_issued_ytd": 2100,
      "building_permits_yoy_change_pct": 4.8,
      "new_construction_units_pipeline": 8200,
      "commercial_permits_ytd": 180,
      "current_walk_score": 98,
      "projected_walk_score_5yr": 98,
      "current_transit_score": 89,
      "projected_transit_score_5yr": 92,
      "is_opportunity_zone": true,
      "opportunity_zone_tract_id": "41051010400",
      "has_tax_increment_financing": false,
      "has_enterprise_zone": false,
      "has_historic_tax_credits": false,
      "has_new_market_tax_credits": false,
      "special_incentive_programs": [],
      "infrastructure_projects": [
        {
          "name": "Broadway Corridor Mixed-Use Master Plan (USPS Site)",
          "category": "mixed_use_town_center",
          "phase": "approved",
          "estimated_investment": 1500000000,
          "distance_miles": 0.8,
          "estimated_completion_year": 2032,
          "jobs_created": 5000,
          "housing_units_added": 3500,
          "impact_description": "34-acre former USPS distribution site redeveloping into Pearl District extension with 3,500 housing units, biotech labs, parks, and ground-floor retail.",
          "appreciation_catalyst_score": 90
        }
      ],
      "rezoning_proposals": [],
      "employer_migrations": [],
      "development_momentum_score": 63,
      "appreciation_forecast_5yr_pct": 21.5,
      "risk_of_overbuilding": "Low",
      "gentrification_pressure_index": 30,
      "overall_investment_timing": "Emerging \u2014 Early signals present, monitor quarterly"
    }
  },
  {
    "id": "prop-005",
    "title": "Willamette Valley Organic Farm & Vineyard Estate (45 Acres)",
    "address": "23400 Highway 99W",
    "city": "Dundee",
    "state": "OR",
    "zip_code": "97115",
    "list_price": 1650000.0,
    "property_type": "agricultural",
    "bedrooms": 4,
    "bathrooms": 3.0,
    "square_feet": 3100,
    "lot_size_acres": 45.0,
    "year_built": 1998,
    "units": 1,
    "description": "Prime agricultural acreage in Dundee Hills AVA. Certified deep Jory and Willamette Silt Loam soil with grandfathered senior irrigation water rights. Ideal for estate winery or specialty crops.",
    "image_url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    "estimated_monthly_rent": 4500.0,
    "property_tax_annual": 4800.0,
    "insurance_annual": 2800.0,
    "hoa_monthly": 0.0,
    "maintenance_pct": 4.0,
    "vacancy_pct": 3.0,
    "management_pct": 5.0,
    "zoning": {
      "code": "AG-20",
      "name": "Agricultural Exclusive (20-Acre Min)",
      "category": "Agricultural",
      "permitted_uses": [
        "Commercial farming & crop production",
        "Vineyard & winery",
        "Livestock grazing",
        "Orchard cultivation",
        "Farmstand (produce)",
        "Single farm dwelling"
      ],
      "conditional_uses": [
        "Agri-tourism / Farm stay",
        "Agricultural processing plant",
        "Equine equestrian center"
      ],
      "prohibited_uses": [
        "Subdivisions",
        "Commercial retail malls",
        "Multi-family complexes",
        "Heavy industrial"
      ],
      "max_height_ft": 40.0,
      "max_coverage_pct": 10.0,
      "floor_area_ratio": 0.15,
      "setbacks": {
        "front": 20,
        "rear": 15,
        "side": 10
      },
      "short_term_rental_allowed": true,
      "adu_permitted": true,
      "commercial_ground_floor_required": false,
      "parking_ratio_per_unit": 1.0,
      "special_restrictions": [
        "Check municipal setback buffer for adjacent rights-of-way",
        "Exterior signage subject to city design review guidelines"
      ]
    },
    "demographics": {
      "zip_code": "97115",
      "city": "Dundee",
      "state": "OR",
      "population": 8900,
      "population_growth_5yr_pct": 4.1,
      "median_household_income": 82000.0,
      "median_age": 41.5,
      "bachelors_or_higher_pct": 44.0,
      "renter_occupied_pct": 28.0,
      "foot_traffic_score": 42,
      "walk_score": 35,
      "transit_score": 15,
      "top_employment_sectors": [
        "Healthcare",
        "Tech",
        "Retail",
        "Education"
      ],
      "discretionary_spend_index": 115.0,
      "underserved_business_types": [
        "Farm-to-Table Cidery & Tasting",
        "Agri-Tourism Guest Cabins",
        "Specialty Mushroom & Truffle Cultivation"
      ]
    },
    "soil": {
      "soil_series_name": "Jory Silt Loam & Willamette Loam",
      "soil_texture": "Silt Loam",
      "ph_level": 6.3,
      "organic_matter_pct": 4.5,
      "drainage_class": "Well Drained",
      "water_storage_capacity_inches": 10.2,
      "slope_pct": 3.5,
      "prime_farmland_rating": "All Areas are Prime Farmland",
      "frost_free_days": 215,
      "usda_hardiness_zone": "8b",
      "irrigation_water_rights": true,
      "depth_to_water_table_ft": 18.0,
      "depth_to_bedrock_inches": 84.0
    },
    "financials": {
      "monthly_gross_rent": 4500.0,
      "monthly_net_operating_income": 3326.67,
      "annual_noi": 39920.0,
      "monthly_mortgage_payment": 8605.41,
      "monthly_cash_flow": -5278.75,
      "annual_cash_flow": -63344.95,
      "cap_rate": 2.42,
      "cash_on_cash_return": -16.69,
      "gross_rent_multiplier": 30.56,
      "debt_service_coverage_ratio": 0.39,
      "estimated_10yr_irr": -5.01,
      "average_daily_rate": 430.0,
      "occupancy_rate_pct": 65.0,
      "str_annual_revenue": 102017.5,
      "str_annual_net_cash_flow": -41432.15,
      "str_cash_on_cash": -10.5,
      "arv": 1880175.0,
      "estimated_rehab_costs": 139500.0,
      "maximum_allowable_offer_70pct": 1176622.5,
      "projected_flip_profit": -169524.12,
      "projected_flip_roi_pct": -8.84,
      "brrrr_refinance_cash_out": 1381928.62,
      "capital_left_in_deal": 512261.53,
      "farm_annual_net_yield": 373500.0,
      "farm_cap_rate": 22.64
    },
    "business_recommendations": [
      {
        "business_type": "Farm-to-Table Micro-Cidery & Tasting Orchard",
        "category": "Agri-Tourism & Craft Beverage",
        "match_score": 98,
        "zoning_compliance": "Permitted By Right under current zoning",
        "target_demographic_fit": "Tailored to Dundee population with $82,000 median income and 41.5 median age.",
        "revenue_driver": "Direct-to-consumer bottle sales ($18-$24/bottle), weekend tasting flights, and private wedding events",
        "estimated_break_even_months": 18,
        "estimated_annual_revenue_range": "$520,000 - $980,000 / year",
        "recommended_sqft": 4500,
        "pros": [
          "High retail margin on farm-produced cider",
          "Agri-tourism tax incentives",
          "Weekend destination draw"
        ],
        "risks_to_mitigate": [
          "Alcohol TTB licensing",
          "Weather dependency for outdoor event space"
        ]
      },
      {
        "business_type": "Pediatric & Family Urgent Dental / Health Clinic",
        "category": "Healthcare",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Dundee population with $82,000 median income and 41.5 median age.",
        "revenue_driver": "Insurance billing, hygiene preventative care, pediatric dentistry, and cash cosmetic services",
        "estimated_break_even_months": 16,
        "estimated_annual_revenue_range": "$950,000 - $1,800,000 / year",
        "recommended_sqft": 3000,
        "pros": [
          "High reimbursement rates",
          "Long lease commitment (10+ years)",
          "Inelastic healthcare demand"
        ],
        "risks_to_mitigate": [
          "Medical licensing and zoning permits",
          "High plumbing build-out costs"
        ]
      },
      {
        "business_type": "Automated Climate-Controlled Boutique Self-Storage",
        "category": "Specialty Real Estate",
        "match_score": 70,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Dundee population with $82,000 median income and 41.5 median age.",
        "revenue_driver": "Automated recurring monthly unit rents ($110-$260/month per unit) + packing supply retail",
        "estimated_break_even_months": 15,
        "estimated_annual_revenue_range": "$340,000 - $620,000 / year",
        "recommended_sqft": 10000,
        "pros": [
          "Virtually zero staffing (keyless mobile access)",
          "Extremely low operating expenses",
          "Sticky tenant base"
        ],
        "risks_to_mitigate": [
          "Municipal opposition to storage facilities",
          "Initial steel/HVAC construction cost"
        ]
      }
    ],
    "crop_suitability": [
      {
        "crop_name": "Premium Wine Grapes (Pinot Noir / Cabernet)",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Well-drained soil structure allows deep root penetration and controlled moisture stress for concentrated grape brix",
          "Favorable pH range facilitates balanced micronutrient uptake (magnesium, potassium, calcium)",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Spring budbreak frost risks",
          "Initial vineyard establishment timeline (3 years to first harvest)"
        ],
        "estimated_annual_gross_yield_per_acre": 14500.0,
        "estimated_cost_per_acre": 6200.0,
        "estimated_net_profit_per_acre": 8300.0,
        "recommended_farming_method": "Precision Drip Irrigation with Cover Crop Alleyways"
      },
      {
        "crop_name": "High-Density Specialty Apple & Pear Orchard",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep loam soil provides exceptional water retention during fruit sizing periods",
          "Consistent organic matter sustains active mycorrhizal biology supporting root health",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Fire blight susceptibility",
          "Hail damage risk requiring netting"
        ],
        "estimated_annual_gross_yield_per_acre": 18200.0,
        "estimated_cost_per_acre": 8400.0,
        "estimated_net_profit_per_acre": 9800.0,
        "recommended_farming_method": "Trellised High-Density Spindle with Micro-Sprinklers"
      },
      {
        "crop_name": "Specialty Heirloom Vegetables & Bio-Intensive Market Garden",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Rich balanced loam enables multi-succession plantings per season (greens, brassicas, heirloom nightshades)",
          "High organic matter ensures resilient water-holding buffer during heatwaves",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Labor-intensive harvesting",
          "Immediate cold-chain storage required post-harvest"
        ],
        "estimated_annual_gross_yield_per_acre": 28000.0,
        "estimated_cost_per_acre": 11000.0,
        "estimated_net_profit_per_acre": 17000.0,
        "recommended_farming_method": "No-Till Permanent Beds with Composted Mulch & Low Tunnels"
      },
      {
        "crop_name": "Hazelnut / Truffle Agroforestry Orchard",
        "suitability_score": 91,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep well-drained profile prevents root rot and supports symbiotic truffle fungi development",
          "Low labor requirement compared to soft fruit once established",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Eastern filbert blight resistance selection needed",
          "5 to 6 year maturity ramp",
          "Soil is acidic (pH 6.3 vs min 6.5); agricultural lime application recommended."
        ],
        "estimated_annual_gross_yield_per_acre": 11500.0,
        "estimated_cost_per_acre": 3800.0,
        "estimated_net_profit_per_acre": 7700.0,
        "recommended_farming_method": "Regenerative Alley Cropping with Inoculated Mycorrhizae"
      }
    ],
    "ai_investment_memo": "================================================================================\n                    EXECUTIVE REAL ESTATE INVESTMENT MEMORANDUM\n================================================================================\nASSET: Willamette Valley Organic Farm & Vineyard Estate (45 Acres)\nADDRESS: 23400 Highway 99W, Dundee, OR 97115\nLIST PRICE: $1,650,000 | TYPE: AGRICULTURAL | LOT: 45.00 Acres\nUNITS: 1 | SQFT: 3,100 | YEAR BUILT: 1998\n\n1. EXECUTIVE UNDERWRITING SUMMARY\n--------------------------------------------------------------------------------\n- Monthly Gross Rent: $4,500.00\n- Net Operating Income (NOI): $39,920.00 / year\n- Monthly Net Cash Flow: $-5,278.75\n- Unleveraged Cap Rate: 2.42%\n- Cash-on-Cash Return: -16.69%\n- Debt Service Coverage Ratio (DSCR): 0.39x\n- 10-Year Projected IRR: -5.01%\n\n2. ALTERNATIVE STRATEGY BENCHMARKING\n--------------------------------------------------------------------------------\n- Short-Term Rental (Airbnb): Projected ADR $430 @ 65% occupancy\n  Annual STR Net Cash Flow: $-41,432.15 (CoC: -10.50%)\n- Value-Add / Fix & Flip:\n  Estimated Rehab: $139,500.00 | Projected ARV: $1,880,175.00\n  Max Allowable Offer (70% Rule): $1,176,622.50\n  Projected Flip Net Profit: $-169,524.12 (ROI: -8.84%)\n  BRRRR Refinance Cash-Out: $1,381,928.62 (Capital Remaining: $512,261.53)\n\n3. ZONING RESTRICTIONS & DEVELOPMENT POTENTIAL\n--------------------------------------------------------------------------------\n- Zoning Designation: AG-20 (Agricultural Exclusive (20-Acre Min))\n- Permitted Uses: Commercial farming & crop production, Vineyard & winery, Livestock grazing, Orchard cultivation\n- ADU Permitted: YES - Strong density expansion upside\n- Max Height: 40.0 ft | FAR: 0.15\n- Regulatory Restrictions: Check municipal setback buffer for adjacent rights-of-way; Exterior signage subject to city design review guidelines\n\n4. DEMOGRAPHIC MATCH & OPTIMAL LOCAL BUSINESS FIT\n--------------------------------------------------------------------------------\n- Median Household Income: $82,000 | Median Age: 41.5\n- Foot Traffic Score: 42/100 | Walk Score: 35/100\n- Recommended Commercial Use:\n  - **Farm-to-Table Micro-Cidery & Tasting Orchard** (Match: 98%): Direct-to-consumer bottle sales ($18-$24/bottle), weekend tasting flights, and private wedding events\n\n5. AGRONOMIC & SOIL SUITABILITY (FLOURISHING CROPS)\n--------------------------------------------------------------------------------\n- Soil Series & Texture: Jory Silt Loam & Willamette Loam (Silt Loam)\n- Soil pH: 6.3 | Drainage: Well Drained | Hardiness: Zone 8b\n- Prime Farmland Status: All Areas are Prime Farmland\n- Top Flourishing Crop:\n  - **Premium Wine Grapes (Pinot Noir / Cabernet)** (Score: 99%): Net yield approx $8,300/acre using Precision Drip Irrigation with Cover Crop Alleyways\n\n6. DEVELOPMENT PIPELINE & UPCOMING AREA INTELLIGENCE\n--------------------------------------------------------------------------------\n- Development Momentum Score: 51/100\n- Investment Timing: Emerging \u2014 Early signals present, monitor quarterly\n- 5-Year Appreciation Forecast: +12.6%\n- Population Growth (5yr): +5.0% | Job Growth (1yr): +1.5%\n- Building Permits YoY: +3.0% | Days-on-Market Trend: +0 days\n- Absorption Rate: 4.0 months (Balanced)\n- Opportunity Zone: No\n- Overbuilding Risk: Low | Gentrification Pressure: 30/100\n\n\n\n7. RISK MATRIX & ACQUISITION RECOMMENDATION\n--------------------------------------------------------------------------------\n- Stress-Test Resilience: DSCR of 0.39x indicates tight debt coverage, recommend larger equity down payment.\n- Strategic Action: RENEGOTIATE PURCHASE PRICE - Offer closer to 70% MAO benchmark.\n\n================================================================================",
    "development": {
      "population_growth_1yr_pct": 1.0,
      "population_growth_5yr_pct": 5.0,
      "population_growth_10yr_projected_pct": 10.0,
      "job_growth_1yr_pct": 1.5,
      "unemployment_rate_pct": 4.0,
      "median_sale_price_1yr_change_pct": 3.0,
      "median_sale_price_3yr_change_pct": 9.0,
      "avg_days_on_market": 35,
      "days_on_market_yoy_change": 0,
      "absorption_rate_months": 4.0,
      "new_listings_yoy_change_pct": 0.0,
      "building_permits_issued_ytd": 500,
      "building_permits_yoy_change_pct": 3.0,
      "new_construction_units_pipeline": 2000,
      "commercial_permits_ytd": 80,
      "current_walk_score": 50,
      "projected_walk_score_5yr": 55,
      "current_transit_score": 30,
      "projected_transit_score_5yr": 40,
      "is_opportunity_zone": false,
      "opportunity_zone_tract_id": "",
      "has_tax_increment_financing": false,
      "has_enterprise_zone": false,
      "has_historic_tax_credits": false,
      "has_new_market_tax_credits": false,
      "special_incentive_programs": [],
      "infrastructure_projects": [],
      "rezoning_proposals": [],
      "employer_migrations": [],
      "development_momentum_score": 51,
      "appreciation_forecast_5yr_pct": 12.6,
      "risk_of_overbuilding": "Low",
      "gentrification_pressure_index": 30,
      "overall_investment_timing": "Emerging \u2014 Early signals present, monitor quarterly"
    }
  },
  {
    "id": "prop-006",
    "title": "Smoky Mountain Luxury Vacation Rental Cabin",
    "address": "714 Mountain Mist Trail",
    "city": "Gatlinburg",
    "state": "TN",
    "zip_code": "37738",
    "list_price": 649000.0,
    "property_type": "single_family",
    "bedrooms": 4,
    "bathrooms": 4.0,
    "square_feet": 2600,
    "lot_size_acres": 0.85,
    "year_built": 2021,
    "units": 1,
    "description": "Established high-occupancy vacation rental with hot tub, theater room, game loft, and panoramic mountain views. Generating over $90k/yr gross on Airbnb/VRBO.",
    "image_url": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    "estimated_monthly_rent": 3500.0,
    "property_tax_annual": 3900.0,
    "insurance_annual": 2400.0,
    "hoa_monthly": 85.0,
    "maintenance_pct": 6.0,
    "vacancy_pct": 5.0,
    "management_pct": 8.0,
    "zoning": {
      "code": "C-2",
      "name": "Medium-Density Multi-Family Residential",
      "category": "Residential",
      "permitted_uses": [
        "Single-family",
        "Duplex",
        "Triplex",
        "Apartment complex up to 4 stories",
        "ADU"
      ],
      "conditional_uses": [
        "Daycare center",
        "Assisted living facility",
        "Home-based business"
      ],
      "prohibited_uses": [
        "Heavy commercial",
        "Industrial",
        "Nightclubs"
      ],
      "max_height_ft": 45.0,
      "max_coverage_pct": 55.0,
      "floor_area_ratio": 1.2,
      "setbacks": {
        "front": 20,
        "rear": 15,
        "side": 10
      },
      "short_term_rental_allowed": true,
      "adu_permitted": true,
      "commercial_ground_floor_required": false,
      "parking_ratio_per_unit": 1.25,
      "special_restrictions": [
        "Check municipal setback buffer for adjacent rights-of-way",
        "Exterior signage subject to city design review guidelines"
      ]
    },
    "demographics": {
      "zip_code": "37738",
      "city": "Gatlinburg",
      "state": "TN",
      "population": 4200,
      "population_growth_5yr_pct": 2.9,
      "median_household_income": 54000.0,
      "median_age": 44.0,
      "bachelors_or_higher_pct": 26.0,
      "renter_occupied_pct": 49.0,
      "foot_traffic_score": 75,
      "walk_score": 40,
      "transit_score": 20,
      "top_employment_sectors": [
        "Healthcare",
        "Tech",
        "Retail",
        "Education"
      ],
      "discretionary_spend_index": 165.0,
      "underserved_business_types": [
        "Luxury STR Concierge Services",
        "Outdoor Adventure Equipment Rental",
        "Private Chef Delivery"
      ]
    },
    "soil": {
      "soil_series_name": "Citico Loam",
      "soil_texture": "Loam",
      "ph_level": 5.6,
      "organic_matter_pct": 3.1,
      "drainage_class": "Well Drained",
      "water_storage_capacity_inches": 7.0,
      "slope_pct": 12.0,
      "prime_farmland_rating": "Not Prime Farmland (Steep Mountain Slope)",
      "frost_free_days": 180,
      "usda_hardiness_zone": "7a",
      "irrigation_water_rights": false,
      "depth_to_water_table_ft": 12.0,
      "depth_to_bedrock_inches": 72.0
    },
    "financials": {
      "monthly_gross_rent": 3500.0,
      "monthly_net_operating_income": 2225.0,
      "annual_noi": 26700.0,
      "monthly_mortgage_payment": 3384.8,
      "monthly_cash_flow": -1159.8,
      "annual_cash_flow": -13917.55,
      "cap_rate": 4.11,
      "cash_on_cash_return": -9.32,
      "gross_rent_multiplier": 15.45,
      "debt_service_coverage_ratio": 0.66,
      "estimated_10yr_irr": 1.68,
      "average_daily_rate": 356.67,
      "occupancy_rate_pct": 65.0,
      "str_annual_revenue": 84619.17,
      "str_annual_net_cash_flow": 9934.39,
      "str_cash_on_cash": 6.05,
      "arv": 842050.0,
      "estimated_rehab_costs": 117000.0,
      "maximum_allowable_offer_70pct": 472435.0,
      "projected_flip_profit": -37667.25,
      "projected_flip_roi_pct": -4.59,
      "brrrr_refinance_cash_out": 618906.75,
      "capital_left_in_deal": 191418.56,
      "farm_annual_net_yield": 0.0,
      "farm_cap_rate": 0.0
    },
    "business_recommendations": [
      {
        "business_type": "Modern Premium Laundromat & Wash-and-Fold Service",
        "category": "Personal Services",
        "match_score": 98,
        "zoning_compliance": "Permitted By Right under current zoning",
        "target_demographic_fit": "Tailored to Gatlinburg population with $54,000 median income and 44.0 median age.",
        "revenue_driver": "Coin/app laundry cycles + drop-off commercial wash-and-fold delivery for local businesses",
        "estimated_break_even_months": 14,
        "estimated_annual_revenue_range": "$280,000 - $480,000 / year",
        "recommended_sqft": 2500,
        "pros": [
          "Essential recession-proof utility",
          "Minimal staffing needed",
          "Excellent cash flow generation"
        ],
        "risks_to_mitigate": [
          "Water/utility rate spikes",
          "Commercial washer maintenance"
        ]
      },
      {
        "business_type": "Automated Climate-Controlled Boutique Self-Storage",
        "category": "Specialty Real Estate",
        "match_score": 98,
        "zoning_compliance": "Permitted By Right under current zoning",
        "target_demographic_fit": "Tailored to Gatlinburg population with $54,000 median income and 44.0 median age.",
        "revenue_driver": "Automated recurring monthly unit rents ($110-$260/month per unit) + packing supply retail",
        "estimated_break_even_months": 15,
        "estimated_annual_revenue_range": "$340,000 - $620,000 / year",
        "recommended_sqft": 10000,
        "pros": [
          "Virtually zero staffing (keyless mobile access)",
          "Extremely low operating expenses",
          "Sticky tenant base"
        ],
        "risks_to_mitigate": [
          "Municipal opposition to storage facilities",
          "Initial steel/HVAC construction cost"
        ]
      },
      {
        "business_type": "Artisanal Specialty Coffee & Remote Workspace Hub",
        "category": "Food & Beverage",
        "match_score": 80,
        "zoning_compliance": "Permitted By Right under current zoning",
        "target_demographic_fit": "Tailored to Gatlinburg population with $54,000 median income and 44.0 median age.",
        "revenue_driver": "High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions",
        "estimated_break_even_months": 11,
        "estimated_annual_revenue_range": "$420,000 - $680,000 / year",
        "recommended_sqft": 1600,
        "pros": [
          "Captures hybrid work demographic",
          "High gross margin on espresso (80%+)",
          "Consistent daily foot traffic"
        ],
        "risks_to_mitigate": [
          "Barista labor retention",
          "Morning peak traffic management"
        ]
      }
    ],
    "crop_suitability": [
      {
        "crop_name": "Premium Wine Grapes (Pinot Noir / Cabernet)",
        "suitability_score": 89,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Well-drained soil structure allows deep root penetration and controlled moisture stress for concentrated grape brix",
          "Favorable pH range facilitates balanced micronutrient uptake (magnesium, potassium, calcium)",
          "Soil texture 'Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Spring budbreak frost risks",
          "Initial vineyard establishment timeline (3 years to first harvest)",
          "Soil is acidic (pH 5.6 vs min 6.0); agricultural lime application recommended."
        ],
        "estimated_annual_gross_yield_per_acre": 14500.0,
        "estimated_cost_per_acre": 6200.0,
        "estimated_net_profit_per_acre": 8300.0,
        "recommended_farming_method": "Precision Drip Irrigation with Cover Crop Alleyways"
      },
      {
        "crop_name": "High-Density Specialty Apple & Pear Orchard",
        "suitability_score": 89,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep loam soil provides exceptional water retention during fruit sizing periods",
          "Consistent organic matter sustains active mycorrhizal biology supporting root health",
          "Soil texture 'Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Fire blight susceptibility",
          "Hail damage risk requiring netting",
          "Soil is acidic (pH 5.6 vs min 6.0); agricultural lime application recommended."
        ],
        "estimated_annual_gross_yield_per_acre": 18200.0,
        "estimated_cost_per_acre": 8400.0,
        "estimated_net_profit_per_acre": 9800.0,
        "recommended_farming_method": "Trellised High-Density Spindle with Micro-Sprinklers"
      },
      {
        "crop_name": "Hazelnut / Truffle Agroforestry Orchard",
        "suitability_score": 83,
        "tier": "High Viability",
        "optimal_reasons": [
          "Deep well-drained profile prevents root rot and supports symbiotic truffle fungi development",
          "Low labor requirement compared to soft fruit once established",
          "Soil texture 'Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Eastern filbert blight resistance selection needed",
          "5 to 6 year maturity ramp",
          "Soil is acidic (pH 5.6 vs min 6.5); agricultural lime application recommended."
        ],
        "estimated_annual_gross_yield_per_acre": 11500.0,
        "estimated_cost_per_acre": 3800.0,
        "estimated_net_profit_per_acre": 7700.0,
        "recommended_farming_method": "Regenerative Alley Cropping with Inoculated Mycorrhizae"
      },
      {
        "crop_name": "Premium Organic Alfalfa & Hay Forage",
        "suitability_score": 83,
        "tier": "High Viability",
        "optimal_reasons": [
          "Deep taproot utilizes subsoil moisture effectively",
          "Builds soil nitrogen naturally, excellent cash crop for multi-acre expanses",
          "Soil texture 'Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Requires timely dry windows during hay-baling cycles",
          "Soil is acidic (pH 5.6 vs min 6.5); agricultural lime application recommended."
        ],
        "estimated_annual_gross_yield_per_acre": 4800.0,
        "estimated_cost_per_acre": 1800.0,
        "estimated_net_profit_per_acre": 3000.0,
        "recommended_farming_method": "Rotational Pivot or Linear Irrigation with Nitrogen Fixation"
      }
    ],
    "ai_investment_memo": "================================================================================\n                    EXECUTIVE REAL ESTATE INVESTMENT MEMORANDUM\n================================================================================\nASSET: Smoky Mountain Luxury Vacation Rental Cabin\nADDRESS: 714 Mountain Mist Trail, Gatlinburg, TN 37738\nLIST PRICE: $649,000 | TYPE: SINGLE_FAMILY | LOT: 0.85 Acres\nUNITS: 1 | SQFT: 2,600 | YEAR BUILT: 2021\n\n1. EXECUTIVE UNDERWRITING SUMMARY\n--------------------------------------------------------------------------------\n- Monthly Gross Rent: $3,500.00\n- Net Operating Income (NOI): $26,700.00 / year\n- Monthly Net Cash Flow: $-1,159.80\n- Unleveraged Cap Rate: 4.11%\n- Cash-on-Cash Return: -9.32%\n- Debt Service Coverage Ratio (DSCR): 0.66x\n- 10-Year Projected IRR: 1.68%\n\n2. ALTERNATIVE STRATEGY BENCHMARKING\n--------------------------------------------------------------------------------\n- Short-Term Rental (Airbnb): Projected ADR $357 @ 65% occupancy\n  Annual STR Net Cash Flow: $9,934.39 (CoC: 6.05%)\n- Value-Add / Fix & Flip:\n  Estimated Rehab: $117,000.00 | Projected ARV: $842,050.00\n  Max Allowable Offer (70% Rule): $472,435.00\n  Projected Flip Net Profit: $-37,667.25 (ROI: -4.59%)\n  BRRRR Refinance Cash-Out: $618,906.75 (Capital Remaining: $191,418.56)\n\n3. ZONING RESTRICTIONS & DEVELOPMENT POTENTIAL\n--------------------------------------------------------------------------------\n- Zoning Designation: C-2 (Medium-Density Multi-Family Residential)\n- Permitted Uses: Single-family, Duplex, Triplex, Apartment complex up to 4 stories\n- ADU Permitted: YES - Strong density expansion upside\n- Max Height: 45.0 ft | FAR: 1.2\n- Regulatory Restrictions: Check municipal setback buffer for adjacent rights-of-way; Exterior signage subject to city design review guidelines\n\n4. DEMOGRAPHIC MATCH & OPTIMAL LOCAL BUSINESS FIT\n--------------------------------------------------------------------------------\n- Median Household Income: $54,000 | Median Age: 44.0\n- Foot Traffic Score: 75/100 | Walk Score: 40/100\n- Recommended Commercial Use:\n  - **Modern Premium Laundromat & Wash-and-Fold Service** (Match: 98%): Coin/app laundry cycles + drop-off commercial wash-and-fold delivery for local businesses\n\n5. AGRONOMIC & SOIL SUITABILITY (FLOURISHING CROPS)\n--------------------------------------------------------------------------------\n- Soil Series & Texture: Citico Loam (Loam)\n- Soil pH: 5.6 | Drainage: Well Drained | Hardiness: Zone 7a\n- Prime Farmland Status: Not Prime Farmland (Steep Mountain Slope)\n- Top Flourishing Crop:\n  - **Premium Wine Grapes (Pinot Noir / Cabernet)** (Score: 89%): Net yield approx $8,300/acre using Precision Drip Irrigation with Cover Crop Alleyways\n\n6. DEVELOPMENT PIPELINE & UPCOMING AREA INTELLIGENCE\n--------------------------------------------------------------------------------\n- Development Momentum Score: 51/100\n- Investment Timing: Emerging \u2014 Early signals present, monitor quarterly\n- 5-Year Appreciation Forecast: +12.6%\n- Population Growth (5yr): +5.0% | Job Growth (1yr): +1.5%\n- Building Permits YoY: +3.0% | Days-on-Market Trend: +0 days\n- Absorption Rate: 4.0 months (Balanced)\n- Opportunity Zone: No\n- Overbuilding Risk: Low | Gentrification Pressure: 30/100\n\n\n\n7. RISK MATRIX & ACQUISITION RECOMMENDATION\n--------------------------------------------------------------------------------\n- Stress-Test Resilience: DSCR of 0.66x indicates tight debt coverage, recommend larger equity down payment.\n- Strategic Action: RENEGOTIATE PURCHASE PRICE - Offer closer to 70% MAO benchmark.\n\n================================================================================",
    "development": {
      "population_growth_1yr_pct": 1.0,
      "population_growth_5yr_pct": 5.0,
      "population_growth_10yr_projected_pct": 10.0,
      "job_growth_1yr_pct": 1.5,
      "unemployment_rate_pct": 4.0,
      "median_sale_price_1yr_change_pct": 3.0,
      "median_sale_price_3yr_change_pct": 9.0,
      "avg_days_on_market": 35,
      "days_on_market_yoy_change": 0,
      "absorption_rate_months": 4.0,
      "new_listings_yoy_change_pct": 0.0,
      "building_permits_issued_ytd": 500,
      "building_permits_yoy_change_pct": 3.0,
      "new_construction_units_pipeline": 2000,
      "commercial_permits_ytd": 80,
      "current_walk_score": 50,
      "projected_walk_score_5yr": 55,
      "current_transit_score": 30,
      "projected_transit_score_5yr": 40,
      "is_opportunity_zone": false,
      "opportunity_zone_tract_id": "",
      "has_tax_increment_financing": false,
      "has_enterprise_zone": false,
      "has_historic_tax_credits": false,
      "has_new_market_tax_credits": false,
      "special_incentive_programs": [],
      "infrastructure_projects": [],
      "rezoning_proposals": [],
      "employer_migrations": [],
      "development_momentum_score": 51,
      "appreciation_forecast_5yr_pct": 12.6,
      "risk_of_overbuilding": "Low",
      "gentrification_pressure_index": 30,
      "overall_investment_timing": "Emerging \u2014 Early signals present, monitor quarterly"
    }
  },
  {
    "id": "live-pr-001",
    "title": "Hacienda Cafetalera & Eco-Lodge Estate (28 Acres)",
    "address": "Carretera 140 Km 12.4",
    "city": "Utuado",
    "state": "PR",
    "zip_code": "00641",
    "list_price": 575000.0,
    "property_type": "agricultural",
    "bedrooms": 5,
    "bathrooms": 4.0,
    "square_feet": 3400,
    "lot_size_acres": 28.0,
    "year_built": 2008,
    "units": 2,
    "description": "[Source: Facebook Marketplace & Local PR Board] Established shade-grown specialty coffee farm in central mountain corridor with 2 guest cabins and mountain stream. Eligible for agricultural tax incentives and Act 60 incentives.",
    "image_url": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    "estimated_monthly_rent": 3800.0,
    "property_tax_annual": 850.0,
    "insurance_annual": 2400.0,
    "hoa_monthly": 0.0,
    "maintenance_pct": 5.0,
    "vacancy_pct": 5.0,
    "management_pct": 8.0,
    "zoning": {
      "code": "AG-20",
      "name": "Agricultural Exclusive (20-Acre Min)",
      "category": "Agricultural",
      "permitted_uses": [
        "Commercial farming & crop production",
        "Vineyard & winery",
        "Livestock grazing",
        "Orchard cultivation",
        "Farmstand (produce)",
        "Single farm dwelling"
      ],
      "conditional_uses": [
        "Agri-tourism / Farm stay",
        "Agricultural processing plant",
        "Equine equestrian center"
      ],
      "prohibited_uses": [
        "Subdivisions",
        "Commercial retail malls",
        "Multi-family complexes",
        "Heavy industrial"
      ],
      "max_height_ft": 40.0,
      "max_coverage_pct": 10.0,
      "floor_area_ratio": 0.15,
      "setbacks": {
        "front": 20,
        "rear": 15,
        "side": 10
      },
      "short_term_rental_allowed": true,
      "adu_permitted": true,
      "commercial_ground_floor_required": false,
      "parking_ratio_per_unit": 1.0,
      "special_restrictions": [
        "Check municipal setback buffer for adjacent rights-of-way",
        "Exterior signage subject to city design review guidelines"
      ]
    },
    "demographics": {
      "zip_code": "00641",
      "city": "Utuado",
      "state": "PR",
      "population": 28400,
      "population_growth_5yr_pct": 4.2,
      "median_household_income": 84500.0,
      "median_age": 34.8,
      "bachelors_or_higher_pct": 46.0,
      "renter_occupied_pct": 52.0,
      "foot_traffic_score": 78,
      "walk_score": 74,
      "transit_score": 62,
      "top_employment_sectors": [
        "Healthcare",
        "Tech",
        "Retail",
        "Education"
      ],
      "discretionary_spend_index": 118.0,
      "underserved_business_types": [
        "Specialty Coffee / Co-working",
        "Boutique Fitness Studio",
        "Pet Daycare & Grooming",
        "Organic Fast-Casual Dining"
      ]
    },
    "soil": {
      "soil_series_name": "Willamette Silt Loam",
      "soil_texture": "Silt Loam",
      "ph_level": 6.4,
      "organic_matter_pct": 3.8,
      "drainage_class": "Well Drained",
      "water_storage_capacity_inches": 9.2,
      "slope_pct": 2.5,
      "prime_farmland_rating": "All Areas are Prime Farmland",
      "frost_free_days": 205,
      "usda_hardiness_zone": "8b",
      "irrigation_water_rights": true,
      "depth_to_water_table_ft": 12.0,
      "depth_to_bedrock_inches": 72.0
    },
    "financials": {
      "monthly_gross_rent": 4050.0,
      "monthly_net_operating_income": 2385.45,
      "annual_noi": 28625.4,
      "monthly_mortgage_payment": 2898.14,
      "monthly_cash_flow": -512.69,
      "annual_cash_flow": -6152.25,
      "cap_rate": 4.98,
      "cash_on_cash_return": -3.75,
      "gross_rent_multiplier": 12.61,
      "debt_service_coverage_ratio": 0.82,
      "estimated_10yr_irr": 7.46,
      "average_daily_rate": 403.67,
      "occupancy_rate_pct": 65.0,
      "str_annual_revenue": 95769.92,
      "str_annual_net_cash_flow": 25755.72,
      "str_cash_on_cash": 17.49,
      "arv": 827450.0,
      "estimated_rehab_costs": 153000.0,
      "maximum_allowable_offer_70pct": 426215.0,
      "projected_flip_profit": -7300.25,
      "projected_flip_roi_pct": -0.94,
      "brrrr_refinance_cash_out": 608175.75,
      "capital_left_in_deal": 159320.81,
      "farm_annual_net_yield": 232400.0,
      "farm_cap_rate": 40.42
    },
    "business_recommendations": [
      {
        "business_type": "Farm-to-Table Micro-Cidery & Tasting Orchard",
        "category": "Agri-Tourism & Craft Beverage",
        "match_score": 98,
        "zoning_compliance": "Permitted By Right under current zoning",
        "target_demographic_fit": "Tailored to Utuado population with $84,500 median income and 34.8 median age.",
        "revenue_driver": "Direct-to-consumer bottle sales ($18-$24/bottle), weekend tasting flights, and private wedding events",
        "estimated_break_even_months": 18,
        "estimated_annual_revenue_range": "$520,000 - $980,000 / year",
        "recommended_sqft": 4500,
        "pros": [
          "High retail margin on farm-produced cider",
          "Agri-tourism tax incentives",
          "Weekend destination draw"
        ],
        "risks_to_mitigate": [
          "Alcohol TTB licensing",
          "Weather dependency for outdoor event space"
        ]
      },
      {
        "business_type": "Artisanal Specialty Coffee & Remote Workspace Hub",
        "category": "Food & Beverage",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Utuado population with $84,500 median income and 34.8 median age.",
        "revenue_driver": "High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions",
        "estimated_break_even_months": 11,
        "estimated_annual_revenue_range": "$420,000 - $680,000 / year",
        "recommended_sqft": 1600,
        "pros": [
          "Captures hybrid work demographic",
          "High gross margin on espresso (80%+)",
          "Consistent daily foot traffic"
        ],
        "risks_to_mitigate": [
          "Barista labor retention",
          "Morning peak traffic management"
        ]
      },
      {
        "business_type": "Modern Premium Laundromat & Wash-and-Fold Service",
        "category": "Personal Services",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Utuado population with $84,500 median income and 34.8 median age.",
        "revenue_driver": "Coin/app laundry cycles + drop-off commercial wash-and-fold delivery for local businesses",
        "estimated_break_even_months": 14,
        "estimated_annual_revenue_range": "$280,000 - $480,000 / year",
        "recommended_sqft": 2500,
        "pros": [
          "Essential recession-proof utility",
          "Minimal staffing needed",
          "Excellent cash flow generation"
        ],
        "risks_to_mitigate": [
          "Water/utility rate spikes",
          "Commercial washer maintenance"
        ]
      }
    ],
    "crop_suitability": [
      {
        "crop_name": "Premium Wine Grapes (Pinot Noir / Cabernet)",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Well-drained soil structure allows deep root penetration and controlled moisture stress for concentrated grape brix",
          "Favorable pH range facilitates balanced micronutrient uptake (magnesium, potassium, calcium)",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Spring budbreak frost risks",
          "Initial vineyard establishment timeline (3 years to first harvest)"
        ],
        "estimated_annual_gross_yield_per_acre": 14500.0,
        "estimated_cost_per_acre": 6200.0,
        "estimated_net_profit_per_acre": 8300.0,
        "recommended_farming_method": "Precision Drip Irrigation with Cover Crop Alleyways"
      },
      {
        "crop_name": "High-Density Specialty Apple & Pear Orchard",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep loam soil provides exceptional water retention during fruit sizing periods",
          "Consistent organic matter sustains active mycorrhizal biology supporting root health",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Fire blight susceptibility",
          "Hail damage risk requiring netting"
        ],
        "estimated_annual_gross_yield_per_acre": 18200.0,
        "estimated_cost_per_acre": 8400.0,
        "estimated_net_profit_per_acre": 9800.0,
        "recommended_farming_method": "Trellised High-Density Spindle with Micro-Sprinklers"
      },
      {
        "crop_name": "Specialty Heirloom Vegetables & Bio-Intensive Market Garden",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Rich balanced loam enables multi-succession plantings per season (greens, brassicas, heirloom nightshades)",
          "High organic matter ensures resilient water-holding buffer during heatwaves",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Labor-intensive harvesting",
          "Immediate cold-chain storage required post-harvest"
        ],
        "estimated_annual_gross_yield_per_acre": 28000.0,
        "estimated_cost_per_acre": 11000.0,
        "estimated_net_profit_per_acre": 17000.0,
        "recommended_farming_method": "No-Till Permanent Beds with Composted Mulch & Low Tunnels"
      },
      {
        "crop_name": "Hazelnut / Truffle Agroforestry Orchard",
        "suitability_score": 92,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep well-drained profile prevents root rot and supports symbiotic truffle fungi development",
          "Low labor requirement compared to soft fruit once established",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Eastern filbert blight resistance selection needed",
          "5 to 6 year maturity ramp",
          "Soil is acidic (pH 6.4 vs min 6.5); agricultural lime application recommended."
        ],
        "estimated_annual_gross_yield_per_acre": 11500.0,
        "estimated_cost_per_acre": 3800.0,
        "estimated_net_profit_per_acre": 7700.0,
        "recommended_farming_method": "Regenerative Alley Cropping with Inoculated Mycorrhizae"
      }
    ],
    "ai_investment_memo": "================================================================================\n                    EXECUTIVE REAL ESTATE INVESTMENT MEMORANDUM\n================================================================================\nASSET: Hacienda Cafetalera & Eco-Lodge Estate (28 Acres)\nADDRESS: Carretera 140 Km 12.4, Utuado, PR 00641\nLIST PRICE: $575,000 | TYPE: AGRICULTURAL | LOT: 28.00 Acres\nUNITS: 2 | SQFT: 3,400 | YEAR BUILT: 2008\n\n1. EXECUTIVE UNDERWRITING SUMMARY\n--------------------------------------------------------------------------------\n- Monthly Gross Rent: $4,050.00\n- Net Operating Income (NOI): $28,625.40 / year\n- Monthly Net Cash Flow: $-512.69\n- Unleveraged Cap Rate: 4.98%\n- Cash-on-Cash Return: -3.75%\n- Debt Service Coverage Ratio (DSCR): 0.82x\n- 10-Year Projected IRR: 7.46%\n\n2. ALTERNATIVE STRATEGY BENCHMARKING\n--------------------------------------------------------------------------------\n- Short-Term Rental (Airbnb): Projected ADR $404 @ 65% occupancy\n  Annual STR Net Cash Flow: $25,755.72 (CoC: 17.49%)\n- Value-Add / Fix & Flip:\n  Estimated Rehab: $153,000.00 | Projected ARV: $827,450.00\n  Max Allowable Offer (70% Rule): $426,215.00\n  Projected Flip Net Profit: $-7,300.25 (ROI: -0.94%)\n  BRRRR Refinance Cash-Out: $608,175.75 (Capital Remaining: $159,320.81)\n\n3. ZONING RESTRICTIONS & DEVELOPMENT POTENTIAL\n--------------------------------------------------------------------------------\n- Zoning Designation: AG-20 (Agricultural Exclusive (20-Acre Min))\n- Permitted Uses: Commercial farming & crop production, Vineyard & winery, Livestock grazing, Orchard cultivation\n- ADU Permitted: YES - Strong density expansion upside\n- Max Height: 40.0 ft | FAR: 0.15\n- Regulatory Restrictions: Check municipal setback buffer for adjacent rights-of-way; Exterior signage subject to city design review guidelines\n\n4. DEMOGRAPHIC MATCH & OPTIMAL LOCAL BUSINESS FIT\n--------------------------------------------------------------------------------\n- Median Household Income: $84,500 | Median Age: 34.8\n- Foot Traffic Score: 78/100 | Walk Score: 74/100\n- Recommended Commercial Use:\n  - **Farm-to-Table Micro-Cidery & Tasting Orchard** (Match: 98%): Direct-to-consumer bottle sales ($18-$24/bottle), weekend tasting flights, and private wedding events\n\n5. AGRONOMIC & SOIL SUITABILITY (FLOURISHING CROPS)\n--------------------------------------------------------------------------------\n- Soil Series & Texture: Willamette Silt Loam (Silt Loam)\n- Soil pH: 6.4 | Drainage: Well Drained | Hardiness: Zone 8b\n- Prime Farmland Status: All Areas are Prime Farmland\n- Top Flourishing Crop:\n  - **Premium Wine Grapes (Pinot Noir / Cabernet)** (Score: 99%): Net yield approx $8,300/acre using Precision Drip Irrigation with Cover Crop Alleyways\n\n6. DEVELOPMENT PIPELINE & UPCOMING AREA INTELLIGENCE\n--------------------------------------------------------------------------------\n- Development Momentum Score: 59/100\n- Investment Timing: Emerging \u2014 Early signals present, monitor quarterly\n- 5-Year Appreciation Forecast: +12.6%\n- Population Growth (5yr): +5.0% | Job Growth (1yr): +1.5%\n- Building Permits YoY: +3.0% | Days-on-Market Trend: +0 days\n- Absorption Rate: 4.0 months (Balanced)\n- Opportunity Zone: No\n- Overbuilding Risk: Low | Gentrification Pressure: 30/100\n- Top Infrastructure Catalyst: Central Mountain Eco-Tourism Corridor (PR-10 / Ruta Panor\u00e1mica) ($180M investment, 1,200 jobs, completion 2030)\n\n\n7. RISK MATRIX & ACQUISITION RECOMMENDATION\n--------------------------------------------------------------------------------\n- Stress-Test Resilience: DSCR of 0.82x indicates tight debt coverage, recommend larger equity down payment.\n- Strategic Action: RENEGOTIATE PURCHASE PRICE - Offer closer to 70% MAO benchmark.\n\n================================================================================",
    "development": {
      "population_growth_1yr_pct": 1.0,
      "population_growth_5yr_pct": 5.0,
      "population_growth_10yr_projected_pct": 10.0,
      "job_growth_1yr_pct": 1.5,
      "unemployment_rate_pct": 4.0,
      "median_sale_price_1yr_change_pct": 3.0,
      "median_sale_price_3yr_change_pct": 9.0,
      "avg_days_on_market": 35,
      "days_on_market_yoy_change": 0,
      "absorption_rate_months": 4.0,
      "new_listings_yoy_change_pct": 0.0,
      "building_permits_issued_ytd": 500,
      "building_permits_yoy_change_pct": 3.0,
      "new_construction_units_pipeline": 2000,
      "commercial_permits_ytd": 80,
      "current_walk_score": 50,
      "projected_walk_score_5yr": 55,
      "current_transit_score": 30,
      "projected_transit_score_5yr": 40,
      "is_opportunity_zone": false,
      "opportunity_zone_tract_id": "",
      "has_tax_increment_financing": false,
      "has_enterprise_zone": false,
      "has_historic_tax_credits": false,
      "has_new_market_tax_credits": false,
      "special_incentive_programs": [],
      "infrastructure_projects": [
        {
          "name": "Central Mountain Eco-Tourism Corridor (PR-10 / Ruta Panor\u00e1mica)",
          "category": "mixed_use_town_center",
          "phase": "announced",
          "estimated_investment": 180000000,
          "distance_miles": 4.0,
          "estimated_completion_year": 2030,
          "jobs_created": 1200,
          "housing_units_added": 300,
          "impact_description": "Federal and territorial investment in agri-tourism trail infrastructure, boutique lodging permits, and shade-grown coffee brand designation program.",
          "appreciation_catalyst_score": 68
        }
      ],
      "rezoning_proposals": [],
      "employer_migrations": [],
      "development_momentum_score": 59,
      "appreciation_forecast_5yr_pct": 12.6,
      "risk_of_overbuilding": "Low",
      "gentrification_pressure_index": 30,
      "overall_investment_timing": "Emerging \u2014 Early signals present, monitor quarterly"
    }
  },
  {
    "id": "live-vi-002",
    "title": "Caribbean Sea View Dual-Villa STR Compound",
    "address": "14-B Peterborg Point",
    "city": "St. Thomas",
    "state": "VI",
    "zip_code": "00802",
    "list_price": 1295000.0,
    "property_type": "multi_family",
    "bedrooms": 6,
    "bathrooms": 6.0,
    "square_feet": 4200,
    "lot_size_acres": 0.75,
    "year_built": 2015,
    "units": 2,
    "description": "[Source: VI FlexMLS & Caribbean Board] Turnkey vacation rental overlooking Magens Bay. Two independent villas with private infinity plunge pool. High ADR season from Nov-May.",
    "image_url": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    "estimated_monthly_rent": 8500.0,
    "property_tax_annual": 3200.0,
    "insurance_annual": 6500.0,
    "hoa_monthly": 0.0,
    "maintenance_pct": 5.0,
    "vacancy_pct": 5.0,
    "management_pct": 8.0,
    "zoning": {
      "code": "R-3",
      "name": "Medium-Density Multi-Family Residential",
      "category": "Residential",
      "permitted_uses": [
        "Single-family",
        "Duplex",
        "Triplex",
        "Apartment complex up to 4 stories",
        "ADU"
      ],
      "conditional_uses": [
        "Daycare center",
        "Assisted living facility",
        "Home-based business"
      ],
      "prohibited_uses": [
        "Heavy commercial",
        "Industrial",
        "Nightclubs"
      ],
      "max_height_ft": 45.0,
      "max_coverage_pct": 55.0,
      "floor_area_ratio": 1.2,
      "setbacks": {
        "front": 20,
        "rear": 15,
        "side": 10
      },
      "short_term_rental_allowed": true,
      "adu_permitted": true,
      "commercial_ground_floor_required": false,
      "parking_ratio_per_unit": 1.25,
      "special_restrictions": [
        "Check municipal setback buffer for adjacent rights-of-way",
        "Exterior signage subject to city design review guidelines"
      ]
    },
    "demographics": {
      "zip_code": "00802",
      "city": "St. Thomas",
      "state": "VI",
      "population": 28400,
      "population_growth_5yr_pct": 4.2,
      "median_household_income": 84500.0,
      "median_age": 34.8,
      "bachelors_or_higher_pct": 46.0,
      "renter_occupied_pct": 52.0,
      "foot_traffic_score": 78,
      "walk_score": 74,
      "transit_score": 62,
      "top_employment_sectors": [
        "Healthcare",
        "Tech",
        "Retail",
        "Education"
      ],
      "discretionary_spend_index": 118.0,
      "underserved_business_types": [
        "Specialty Coffee / Co-working",
        "Boutique Fitness Studio",
        "Pet Daycare & Grooming",
        "Organic Fast-Casual Dining"
      ]
    },
    "soil": {
      "soil_series_name": "Willamette Silt Loam",
      "soil_texture": "Silt Loam",
      "ph_level": 6.4,
      "organic_matter_pct": 3.8,
      "drainage_class": "Well Drained",
      "water_storage_capacity_inches": 9.2,
      "slope_pct": 2.5,
      "prime_farmland_rating": "All Areas are Prime Farmland",
      "frost_free_days": 205,
      "usda_hardiness_zone": "8b",
      "irrigation_water_rights": true,
      "depth_to_water_table_ft": 12.0,
      "depth_to_bedrock_inches": 72.0
    },
    "financials": {
      "monthly_gross_rent": 8750.0,
      "monthly_net_operating_income": 5153.75,
      "annual_noi": 61845.0,
      "monthly_mortgage_payment": 6527.11,
      "monthly_cash_flow": -1373.36,
      "annual_cash_flow": -16480.32,
      "cap_rate": 4.78,
      "cash_on_cash_return": -4.47,
      "gross_rent_multiplier": 12.7,
      "debt_service_coverage_ratio": 0.79,
      "estimated_10yr_irr": 6.59,
      "average_daily_rate": 773.33,
      "occupancy_rate_pct": 65.0,
      "str_annual_revenue": 183473.33,
      "str_annual_net_cash_flow": 37038.25,
      "str_cash_on_cash": 11.84,
      "arv": 1606850.0,
      "estimated_rehab_costs": 189000.0,
      "maximum_allowable_offer_70pct": 935795.0,
      "projected_flip_profit": -94828.25,
      "projected_flip_roi_pct": -5.97,
      "brrrr_refinance_cash_out": 1181034.75,
      "capital_left_in_deal": 388339.31,
      "farm_annual_net_yield": 0.0,
      "farm_cap_rate": 0.0
    },
    "business_recommendations": [
      {
        "business_type": "Artisanal Specialty Coffee & Remote Workspace Hub",
        "category": "Food & Beverage",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to St. Thomas population with $84,500 median income and 34.8 median age.",
        "revenue_driver": "High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions",
        "estimated_break_even_months": 11,
        "estimated_annual_revenue_range": "$420,000 - $680,000 / year",
        "recommended_sqft": 1600,
        "pros": [
          "Captures hybrid work demographic",
          "High gross margin on espresso (80%+)",
          "Consistent daily foot traffic"
        ],
        "risks_to_mitigate": [
          "Barista labor retention",
          "Morning peak traffic management"
        ]
      },
      {
        "business_type": "Modern Premium Laundromat & Wash-and-Fold Service",
        "category": "Personal Services",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to St. Thomas population with $84,500 median income and 34.8 median age.",
        "revenue_driver": "Coin/app laundry cycles + drop-off commercial wash-and-fold delivery for local businesses",
        "estimated_break_even_months": 14,
        "estimated_annual_revenue_range": "$280,000 - $480,000 / year",
        "recommended_sqft": 2500,
        "pros": [
          "Essential recession-proof utility",
          "Minimal staffing needed",
          "Excellent cash flow generation"
        ],
        "risks_to_mitigate": [
          "Water/utility rate spikes",
          "Commercial washer maintenance"
        ]
      },
      {
        "business_type": "Pediatric & Family Urgent Dental / Health Clinic",
        "category": "Healthcare",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to St. Thomas population with $84,500 median income and 34.8 median age.",
        "revenue_driver": "Insurance billing, hygiene preventative care, pediatric dentistry, and cash cosmetic services",
        "estimated_break_even_months": 16,
        "estimated_annual_revenue_range": "$950,000 - $1,800,000 / year",
        "recommended_sqft": 3000,
        "pros": [
          "High reimbursement rates",
          "Long lease commitment (10+ years)",
          "Inelastic healthcare demand"
        ],
        "risks_to_mitigate": [
          "Medical licensing and zoning permits",
          "High plumbing build-out costs"
        ]
      }
    ],
    "crop_suitability": [
      {
        "crop_name": "Premium Wine Grapes (Pinot Noir / Cabernet)",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Well-drained soil structure allows deep root penetration and controlled moisture stress for concentrated grape brix",
          "Favorable pH range facilitates balanced micronutrient uptake (magnesium, potassium, calcium)",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Spring budbreak frost risks",
          "Initial vineyard establishment timeline (3 years to first harvest)"
        ],
        "estimated_annual_gross_yield_per_acre": 14500.0,
        "estimated_cost_per_acre": 6200.0,
        "estimated_net_profit_per_acre": 8300.0,
        "recommended_farming_method": "Precision Drip Irrigation with Cover Crop Alleyways"
      },
      {
        "crop_name": "High-Density Specialty Apple & Pear Orchard",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep loam soil provides exceptional water retention during fruit sizing periods",
          "Consistent organic matter sustains active mycorrhizal biology supporting root health",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Fire blight susceptibility",
          "Hail damage risk requiring netting"
        ],
        "estimated_annual_gross_yield_per_acre": 18200.0,
        "estimated_cost_per_acre": 8400.0,
        "estimated_net_profit_per_acre": 9800.0,
        "recommended_farming_method": "Trellised High-Density Spindle with Micro-Sprinklers"
      },
      {
        "crop_name": "Specialty Heirloom Vegetables & Bio-Intensive Market Garden",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Rich balanced loam enables multi-succession plantings per season (greens, brassicas, heirloom nightshades)",
          "High organic matter ensures resilient water-holding buffer during heatwaves",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Labor-intensive harvesting",
          "Immediate cold-chain storage required post-harvest"
        ],
        "estimated_annual_gross_yield_per_acre": 28000.0,
        "estimated_cost_per_acre": 11000.0,
        "estimated_net_profit_per_acre": 17000.0,
        "recommended_farming_method": "No-Till Permanent Beds with Composted Mulch & Low Tunnels"
      },
      {
        "crop_name": "Hazelnut / Truffle Agroforestry Orchard",
        "suitability_score": 92,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep well-drained profile prevents root rot and supports symbiotic truffle fungi development",
          "Low labor requirement compared to soft fruit once established",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Eastern filbert blight resistance selection needed",
          "5 to 6 year maturity ramp",
          "Soil is acidic (pH 6.4 vs min 6.5); agricultural lime application recommended."
        ],
        "estimated_annual_gross_yield_per_acre": 11500.0,
        "estimated_cost_per_acre": 3800.0,
        "estimated_net_profit_per_acre": 7700.0,
        "recommended_farming_method": "Regenerative Alley Cropping with Inoculated Mycorrhizae"
      }
    ],
    "ai_investment_memo": "================================================================================\n                    EXECUTIVE REAL ESTATE INVESTMENT MEMORANDUM\n================================================================================\nASSET: Caribbean Sea View Dual-Villa STR Compound\nADDRESS: 14-B Peterborg Point, St. Thomas, VI 00802\nLIST PRICE: $1,295,000 | TYPE: MULTI_FAMILY | LOT: 0.75 Acres\nUNITS: 2 | SQFT: 4,200 | YEAR BUILT: 2015\n\n1. EXECUTIVE UNDERWRITING SUMMARY\n--------------------------------------------------------------------------------\n- Monthly Gross Rent: $8,750.00\n- Net Operating Income (NOI): $61,845.00 / year\n- Monthly Net Cash Flow: $-1,373.36\n- Unleveraged Cap Rate: 4.78%\n- Cash-on-Cash Return: -4.47%\n- Debt Service Coverage Ratio (DSCR): 0.79x\n- 10-Year Projected IRR: 6.59%\n\n2. ALTERNATIVE STRATEGY BENCHMARKING\n--------------------------------------------------------------------------------\n- Short-Term Rental (Airbnb): Projected ADR $773 @ 65% occupancy\n  Annual STR Net Cash Flow: $37,038.25 (CoC: 11.84%)\n- Value-Add / Fix & Flip:\n  Estimated Rehab: $189,000.00 | Projected ARV: $1,606,850.00\n  Max Allowable Offer (70% Rule): $935,795.00\n  Projected Flip Net Profit: $-94,828.25 (ROI: -5.97%)\n  BRRRR Refinance Cash-Out: $1,181,034.75 (Capital Remaining: $388,339.31)\n\n3. ZONING RESTRICTIONS & DEVELOPMENT POTENTIAL\n--------------------------------------------------------------------------------\n- Zoning Designation: R-3 (Medium-Density Multi-Family Residential)\n- Permitted Uses: Single-family, Duplex, Triplex, Apartment complex up to 4 stories\n- ADU Permitted: YES - Strong density expansion upside\n- Max Height: 45.0 ft | FAR: 1.2\n- Regulatory Restrictions: Check municipal setback buffer for adjacent rights-of-way; Exterior signage subject to city design review guidelines\n\n4. DEMOGRAPHIC MATCH & OPTIMAL LOCAL BUSINESS FIT\n--------------------------------------------------------------------------------\n- Median Household Income: $84,500 | Median Age: 34.8\n- Foot Traffic Score: 78/100 | Walk Score: 74/100\n- Recommended Commercial Use:\n  - **Artisanal Specialty Coffee & Remote Workspace Hub** (Match: 75%): High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions\n\n5. AGRONOMIC & SOIL SUITABILITY (FLOURISHING CROPS)\n--------------------------------------------------------------------------------\n- Soil Series & Texture: Willamette Silt Loam (Silt Loam)\n- Soil pH: 6.4 | Drainage: Well Drained | Hardiness: Zone 8b\n- Prime Farmland Status: All Areas are Prime Farmland\n- Top Flourishing Crop:\n  - **Premium Wine Grapes (Pinot Noir / Cabernet)** (Score: 99%): Net yield approx $8,300/acre using Precision Drip Irrigation with Cover Crop Alleyways\n\n6. DEVELOPMENT PIPELINE & UPCOMING AREA INTELLIGENCE\n--------------------------------------------------------------------------------\n- Development Momentum Score: 58/100\n- Investment Timing: Emerging \u2014 Early signals present, monitor quarterly\n- 5-Year Appreciation Forecast: +16.5%\n- Population Growth (5yr): +5.0% | Job Growth (1yr): +1.5%\n- Building Permits YoY: +3.0% | Days-on-Market Trend: +0 days\n- Absorption Rate: 4.0 months (Balanced)\n- Opportunity Zone: No\n- Overbuilding Risk: Low | Gentrification Pressure: 30/100\n- Top Infrastructure Catalyst: Red Hook Marine Terminal & Ferry Hub Modernization ($95M investment, 400 jobs, completion 2028)\n\n\n7. RISK MATRIX & ACQUISITION RECOMMENDATION\n--------------------------------------------------------------------------------\n- Stress-Test Resilience: DSCR of 0.79x indicates tight debt coverage, recommend larger equity down payment.\n- Strategic Action: RENEGOTIATE PURCHASE PRICE - Offer closer to 70% MAO benchmark.\n\n================================================================================",
    "development": {
      "population_growth_1yr_pct": 1.0,
      "population_growth_5yr_pct": 5.0,
      "population_growth_10yr_projected_pct": 10.0,
      "job_growth_1yr_pct": 1.5,
      "unemployment_rate_pct": 4.0,
      "median_sale_price_1yr_change_pct": 3.0,
      "median_sale_price_3yr_change_pct": 9.0,
      "avg_days_on_market": 35,
      "days_on_market_yoy_change": 0,
      "absorption_rate_months": 4.0,
      "new_listings_yoy_change_pct": 0.0,
      "building_permits_issued_ytd": 500,
      "building_permits_yoy_change_pct": 3.0,
      "new_construction_units_pipeline": 2000,
      "commercial_permits_ytd": 80,
      "current_walk_score": 50,
      "projected_walk_score_5yr": 55,
      "current_transit_score": 30,
      "projected_transit_score_5yr": 40,
      "is_opportunity_zone": false,
      "opportunity_zone_tract_id": "",
      "has_tax_increment_financing": false,
      "has_enterprise_zone": false,
      "has_historic_tax_credits": false,
      "has_new_market_tax_credits": false,
      "special_incentive_programs": [],
      "infrastructure_projects": [
        {
          "name": "Red Hook Marine Terminal & Ferry Hub Modernization",
          "category": "waterfront_redevelopment",
          "phase": "under_construction",
          "estimated_investment": 95000000,
          "distance_miles": 3.0,
          "estimated_completion_year": 2028,
          "jobs_created": 400,
          "housing_units_added": 0,
          "impact_description": "Upgraded inter-island ferry terminal with new customs facility, retail promenade, and marina expansion. Increases St. Thomas accessibility and tourism capacity.",
          "appreciation_catalyst_score": 65
        }
      ],
      "rezoning_proposals": [],
      "employer_migrations": [],
      "development_momentum_score": 58,
      "appreciation_forecast_5yr_pct": 16.5,
      "risk_of_overbuilding": "Low",
      "gentrification_pressure_index": 30,
      "overall_investment_timing": "Emerging \u2014 Early signals present, monitor quarterly"
    }
  },
  {
    "id": "live-gu-003",
    "title": "Turnkey 4-Plex Residential Income Property",
    "address": "218 Marine Corps Dr",
    "city": "Tamuning",
    "state": "GU",
    "zip_code": "96913",
    "list_price": 890000.0,
    "property_type": "multi_family",
    "bedrooms": 8,
    "bathrooms": 6.0,
    "square_feet": 3800,
    "lot_size_acres": 0.35,
    "year_built": 2012,
    "units": 4,
    "description": "[Source: Guam MLS & FB Marketplace] Concrete typhoon-resistant 4-unit apartment building. Consistent 100% occupancy driven by defense contractors and hospital staff.",
    "image_url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    "estimated_monthly_rent": 7200.0,
    "property_tax_annual": 1800.0,
    "insurance_annual": 4200.0,
    "hoa_monthly": 0.0,
    "maintenance_pct": 5.0,
    "vacancy_pct": 5.0,
    "management_pct": 8.0,
    "zoning": {
      "code": "R-3",
      "name": "Medium-Density Multi-Family Residential",
      "category": "Residential",
      "permitted_uses": [
        "Single-family",
        "Duplex",
        "Triplex",
        "Apartment complex up to 4 stories",
        "ADU"
      ],
      "conditional_uses": [
        "Daycare center",
        "Assisted living facility",
        "Home-based business"
      ],
      "prohibited_uses": [
        "Heavy commercial",
        "Industrial",
        "Nightclubs"
      ],
      "max_height_ft": 45.0,
      "max_coverage_pct": 55.0,
      "floor_area_ratio": 1.2,
      "setbacks": {
        "front": 20,
        "rear": 15,
        "side": 10
      },
      "short_term_rental_allowed": true,
      "adu_permitted": true,
      "commercial_ground_floor_required": false,
      "parking_ratio_per_unit": 1.25,
      "special_restrictions": [
        "Check municipal setback buffer for adjacent rights-of-way",
        "Exterior signage subject to city design review guidelines"
      ]
    },
    "demographics": {
      "zip_code": "96913",
      "city": "Tamuning",
      "state": "GU",
      "population": 28400,
      "population_growth_5yr_pct": 4.2,
      "median_household_income": 84500.0,
      "median_age": 34.8,
      "bachelors_or_higher_pct": 46.0,
      "renter_occupied_pct": 52.0,
      "foot_traffic_score": 78,
      "walk_score": 74,
      "transit_score": 62,
      "top_employment_sectors": [
        "Healthcare",
        "Tech",
        "Retail",
        "Education"
      ],
      "discretionary_spend_index": 118.0,
      "underserved_business_types": [
        "Specialty Coffee / Co-working",
        "Boutique Fitness Studio",
        "Pet Daycare & Grooming",
        "Organic Fast-Casual Dining"
      ]
    },
    "soil": {
      "soil_series_name": "Willamette Silt Loam",
      "soil_texture": "Silt Loam",
      "ph_level": 6.4,
      "organic_matter_pct": 3.8,
      "drainage_class": "Well Drained",
      "water_storage_capacity_inches": 9.2,
      "slope_pct": 2.5,
      "prime_farmland_rating": "All Areas are Prime Farmland",
      "frost_free_days": 205,
      "usda_hardiness_zone": "8b",
      "irrigation_water_rights": true,
      "depth_to_water_table_ft": 12.0,
      "depth_to_bedrock_inches": 72.0
    },
    "financials": {
      "monthly_gross_rent": 7580.0,
      "monthly_net_operating_income": 4464.62,
      "annual_noi": 53575.44,
      "monthly_mortgage_payment": 4485.81,
      "monthly_cash_flow": -21.19,
      "annual_cash_flow": -254.32,
      "cap_rate": 6.02,
      "cash_on_cash_return": -0.1,
      "gross_rent_multiplier": 10.3,
      "debt_service_coverage_ratio": 1.0,
      "estimated_10yr_irr": 11.95,
      "average_daily_rate": 728.0,
      "occupancy_rate_pct": 65.0,
      "str_annual_revenue": 172718.0,
      "str_annual_net_cash_flow": 58923.62,
      "str_cash_on_cash": 26.82,
      "arv": 1172150.0,
      "estimated_rehab_costs": 171000.0,
      "maximum_allowable_offer_70pct": 649505.0,
      "projected_flip_profit": -44414.25,
      "projected_flip_roi_pct": -3.91,
      "brrrr_refinance_cash_out": 861530.25,
      "capital_left_in_deal": 259055.06,
      "farm_annual_net_yield": 0.0,
      "farm_cap_rate": 0.0
    },
    "business_recommendations": [
      {
        "business_type": "Artisanal Specialty Coffee & Remote Workspace Hub",
        "category": "Food & Beverage",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Tamuning population with $84,500 median income and 34.8 median age.",
        "revenue_driver": "High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions",
        "estimated_break_even_months": 11,
        "estimated_annual_revenue_range": "$420,000 - $680,000 / year",
        "recommended_sqft": 1600,
        "pros": [
          "Captures hybrid work demographic",
          "High gross margin on espresso (80%+)",
          "Consistent daily foot traffic"
        ],
        "risks_to_mitigate": [
          "Barista labor retention",
          "Morning peak traffic management"
        ]
      },
      {
        "business_type": "Modern Premium Laundromat & Wash-and-Fold Service",
        "category": "Personal Services",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Tamuning population with $84,500 median income and 34.8 median age.",
        "revenue_driver": "Coin/app laundry cycles + drop-off commercial wash-and-fold delivery for local businesses",
        "estimated_break_even_months": 14,
        "estimated_annual_revenue_range": "$280,000 - $480,000 / year",
        "recommended_sqft": 2500,
        "pros": [
          "Essential recession-proof utility",
          "Minimal staffing needed",
          "Excellent cash flow generation"
        ],
        "risks_to_mitigate": [
          "Water/utility rate spikes",
          "Commercial washer maintenance"
        ]
      },
      {
        "business_type": "Pediatric & Family Urgent Dental / Health Clinic",
        "category": "Healthcare",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Tamuning population with $84,500 median income and 34.8 median age.",
        "revenue_driver": "Insurance billing, hygiene preventative care, pediatric dentistry, and cash cosmetic services",
        "estimated_break_even_months": 16,
        "estimated_annual_revenue_range": "$950,000 - $1,800,000 / year",
        "recommended_sqft": 3000,
        "pros": [
          "High reimbursement rates",
          "Long lease commitment (10+ years)",
          "Inelastic healthcare demand"
        ],
        "risks_to_mitigate": [
          "Medical licensing and zoning permits",
          "High plumbing build-out costs"
        ]
      }
    ],
    "crop_suitability": [
      {
        "crop_name": "Premium Wine Grapes (Pinot Noir / Cabernet)",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Well-drained soil structure allows deep root penetration and controlled moisture stress for concentrated grape brix",
          "Favorable pH range facilitates balanced micronutrient uptake (magnesium, potassium, calcium)",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Spring budbreak frost risks",
          "Initial vineyard establishment timeline (3 years to first harvest)"
        ],
        "estimated_annual_gross_yield_per_acre": 14500.0,
        "estimated_cost_per_acre": 6200.0,
        "estimated_net_profit_per_acre": 8300.0,
        "recommended_farming_method": "Precision Drip Irrigation with Cover Crop Alleyways"
      },
      {
        "crop_name": "High-Density Specialty Apple & Pear Orchard",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep loam soil provides exceptional water retention during fruit sizing periods",
          "Consistent organic matter sustains active mycorrhizal biology supporting root health",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Fire blight susceptibility",
          "Hail damage risk requiring netting"
        ],
        "estimated_annual_gross_yield_per_acre": 18200.0,
        "estimated_cost_per_acre": 8400.0,
        "estimated_net_profit_per_acre": 9800.0,
        "recommended_farming_method": "Trellised High-Density Spindle with Micro-Sprinklers"
      },
      {
        "crop_name": "Specialty Heirloom Vegetables & Bio-Intensive Market Garden",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Rich balanced loam enables multi-succession plantings per season (greens, brassicas, heirloom nightshades)",
          "High organic matter ensures resilient water-holding buffer during heatwaves",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Labor-intensive harvesting",
          "Immediate cold-chain storage required post-harvest"
        ],
        "estimated_annual_gross_yield_per_acre": 28000.0,
        "estimated_cost_per_acre": 11000.0,
        "estimated_net_profit_per_acre": 17000.0,
        "recommended_farming_method": "No-Till Permanent Beds with Composted Mulch & Low Tunnels"
      },
      {
        "crop_name": "Hazelnut / Truffle Agroforestry Orchard",
        "suitability_score": 92,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep well-drained profile prevents root rot and supports symbiotic truffle fungi development",
          "Low labor requirement compared to soft fruit once established",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Eastern filbert blight resistance selection needed",
          "5 to 6 year maturity ramp",
          "Soil is acidic (pH 6.4 vs min 6.5); agricultural lime application recommended."
        ],
        "estimated_annual_gross_yield_per_acre": 11500.0,
        "estimated_cost_per_acre": 3800.0,
        "estimated_net_profit_per_acre": 7700.0,
        "recommended_farming_method": "Regenerative Alley Cropping with Inoculated Mycorrhizae"
      }
    ],
    "ai_investment_memo": "================================================================================\n                    EXECUTIVE REAL ESTATE INVESTMENT MEMORANDUM\n================================================================================\nASSET: Turnkey 4-Plex Residential Income Property\nADDRESS: 218 Marine Corps Dr, Tamuning, GU 96913\nLIST PRICE: $890,000 | TYPE: MULTI_FAMILY | LOT: 0.35 Acres\nUNITS: 4 | SQFT: 3,800 | YEAR BUILT: 2012\n\n1. EXECUTIVE UNDERWRITING SUMMARY\n--------------------------------------------------------------------------------\n- Monthly Gross Rent: $7,580.00\n- Net Operating Income (NOI): $53,575.44 / year\n- Monthly Net Cash Flow: $-21.19\n- Unleveraged Cap Rate: 6.02%\n- Cash-on-Cash Return: -0.10%\n- Debt Service Coverage Ratio (DSCR): 1.00x\n- 10-Year Projected IRR: 11.95%\n\n2. ALTERNATIVE STRATEGY BENCHMARKING\n--------------------------------------------------------------------------------\n- Short-Term Rental (Airbnb): Projected ADR $728 @ 65% occupancy\n  Annual STR Net Cash Flow: $58,923.62 (CoC: 26.82%)\n- Value-Add / Fix & Flip:\n  Estimated Rehab: $171,000.00 | Projected ARV: $1,172,150.00\n  Max Allowable Offer (70% Rule): $649,505.00\n  Projected Flip Net Profit: $-44,414.25 (ROI: -3.91%)\n  BRRRR Refinance Cash-Out: $861,530.25 (Capital Remaining: $259,055.06)\n\n3. ZONING RESTRICTIONS & DEVELOPMENT POTENTIAL\n--------------------------------------------------------------------------------\n- Zoning Designation: R-3 (Medium-Density Multi-Family Residential)\n- Permitted Uses: Single-family, Duplex, Triplex, Apartment complex up to 4 stories\n- ADU Permitted: YES - Strong density expansion upside\n- Max Height: 45.0 ft | FAR: 1.2\n- Regulatory Restrictions: Check municipal setback buffer for adjacent rights-of-way; Exterior signage subject to city design review guidelines\n\n4. DEMOGRAPHIC MATCH & OPTIMAL LOCAL BUSINESS FIT\n--------------------------------------------------------------------------------\n- Median Household Income: $84,500 | Median Age: 34.8\n- Foot Traffic Score: 78/100 | Walk Score: 74/100\n- Recommended Commercial Use:\n  - **Artisanal Specialty Coffee & Remote Workspace Hub** (Match: 75%): High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions\n\n5. AGRONOMIC & SOIL SUITABILITY (FLOURISHING CROPS)\n--------------------------------------------------------------------------------\n- Soil Series & Texture: Willamette Silt Loam (Silt Loam)\n- Soil pH: 6.4 | Drainage: Well Drained | Hardiness: Zone 8b\n- Prime Farmland Status: All Areas are Prime Farmland\n- Top Flourishing Crop:\n  - **Premium Wine Grapes (Pinot Noir / Cabernet)** (Score: 99%): Net yield approx $8,300/acre using Precision Drip Irrigation with Cover Crop Alleyways\n\n6. DEVELOPMENT PIPELINE & UPCOMING AREA INTELLIGENCE\n--------------------------------------------------------------------------------\n- Development Momentum Score: 99/100\n- Investment Timing: Active Growth Phase \u2014 Appreciation accelerating\n- 5-Year Appreciation Forecast: +50.4%\n- Population Growth (5yr): +12.0% | Job Growth (1yr): +6.5%\n- Building Permits YoY: +42.0% | Days-on-Market Trend: -22 days\n- Absorption Rate: 2.8 months (Tight Seller Market)\n- Opportunity Zone: YES \u2014 Eligible for OZ capital gains deferral\n- Overbuilding Risk: Low | Gentrification Pressure: 75/100\n- Top Infrastructure Catalyst: Marine Corps Base Camp Blaz & Defense Housing Expansion ($8,700M investment, 5,000 jobs, completion 2029)\n\n\n7. RISK MATRIX & ACQUISITION RECOMMENDATION\n--------------------------------------------------------------------------------\n- Stress-Test Resilience: DSCR of 1.00x indicates tight debt coverage, recommend larger equity down payment.\n- Strategic Action: RENEGOTIATE PURCHASE PRICE - Offer closer to 70% MAO benchmark.\n\n================================================================================",
    "development": {
      "population_growth_1yr_pct": 4.8,
      "population_growth_5yr_pct": 12.0,
      "population_growth_10yr_projected_pct": 22.0,
      "job_growth_1yr_pct": 6.5,
      "unemployment_rate_pct": 5.2,
      "median_sale_price_1yr_change_pct": 11.2,
      "median_sale_price_3yr_change_pct": 32.0,
      "avg_days_on_market": 45,
      "days_on_market_yoy_change": -22,
      "absorption_rate_months": 2.8,
      "new_listings_yoy_change_pct": -14.0,
      "building_permits_issued_ytd": 380,
      "building_permits_yoy_change_pct": 42.0,
      "new_construction_units_pipeline": 2400,
      "commercial_permits_ytd": 65,
      "current_walk_score": 35,
      "projected_walk_score_5yr": 48,
      "current_transit_score": 15,
      "projected_transit_score_5yr": 28,
      "is_opportunity_zone": true,
      "opportunity_zone_tract_id": "66010950200",
      "has_tax_increment_financing": false,
      "has_enterprise_zone": false,
      "has_historic_tax_credits": false,
      "has_new_market_tax_credits": false,
      "special_incentive_programs": [],
      "infrastructure_projects": [
        {
          "name": "Marine Corps Base Camp Blaz & Defense Housing Expansion",
          "category": "data_center_industrial",
          "phase": "under_construction",
          "estimated_investment": 8700000000,
          "distance_miles": 6.0,
          "estimated_completion_year": 2029,
          "jobs_created": 5000,
          "housing_units_added": 2400,
          "impact_description": "Massive US Marine Corps relocation from Okinawa bringing 5,000 military personnel and dependents. Unprecedented demand surge for off-base housing, retail, and services.",
          "appreciation_catalyst_score": 94
        }
      ],
      "rezoning_proposals": [],
      "employer_migrations": [
        {
          "company_name": "US Marine Corps (Camp Blaz)",
          "industry": "Defense",
          "announcement_type": "Base Activation & Relocation",
          "estimated_employees": 5000,
          "avg_salary": 65000,
          "distance_miles": 6.0,
          "target_year": 2029
        }
      ],
      "development_momentum_score": 99,
      "appreciation_forecast_5yr_pct": 50.4,
      "risk_of_overbuilding": "Low",
      "gentrification_pressure_index": 75,
      "overall_investment_timing": "Active Growth Phase \u2014 Appreciation accelerating"
    }
  },
  {
    "id": "live-fb-004",
    "title": "Off-Market Distressed Duplex (Handyman / Cash Deal)",
    "address": "1824 E Columbus Dr",
    "city": "Tampa",
    "state": "FL",
    "zip_code": "33605",
    "list_price": 225000.0,
    "property_type": "multi_family",
    "bedrooms": 4,
    "bathrooms": 2.0,
    "square_feet": 1850,
    "lot_size_acres": 0.18,
    "year_built": 1958,
    "units": 2,
    "description": "[Source: Facebook Marketplace Direct Wholesale] Motivated seller. Both units vacant. Roof 2018, needs interior cosmetics and updating. ARV comps in Ybor City are $390k+.",
    "image_url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "estimated_monthly_rent": 2600.0,
    "property_tax_annual": 2800.0,
    "insurance_annual": 1900.0,
    "hoa_monthly": 0.0,
    "maintenance_pct": 5.0,
    "vacancy_pct": 5.0,
    "management_pct": 8.0,
    "zoning": {
      "code": "R-3",
      "name": "Medium-Density Multi-Family Residential",
      "category": "Residential",
      "permitted_uses": [
        "Single-family",
        "Duplex",
        "Triplex",
        "Apartment complex up to 4 stories",
        "ADU"
      ],
      "conditional_uses": [
        "Daycare center",
        "Assisted living facility",
        "Home-based business"
      ],
      "prohibited_uses": [
        "Heavy commercial",
        "Industrial",
        "Nightclubs"
      ],
      "max_height_ft": 45.0,
      "max_coverage_pct": 55.0,
      "floor_area_ratio": 1.2,
      "setbacks": {
        "front": 20,
        "rear": 15,
        "side": 10
      },
      "short_term_rental_allowed": true,
      "adu_permitted": true,
      "commercial_ground_floor_required": false,
      "parking_ratio_per_unit": 1.25,
      "special_restrictions": [
        "Check municipal setback buffer for adjacent rights-of-way",
        "Exterior signage subject to city design review guidelines"
      ]
    },
    "demographics": {
      "zip_code": "33605",
      "city": "Tampa",
      "state": "FL",
      "population": 28400,
      "population_growth_5yr_pct": 4.2,
      "median_household_income": 84500.0,
      "median_age": 34.8,
      "bachelors_or_higher_pct": 46.0,
      "renter_occupied_pct": 52.0,
      "foot_traffic_score": 78,
      "walk_score": 74,
      "transit_score": 62,
      "top_employment_sectors": [
        "Healthcare",
        "Tech",
        "Retail",
        "Education"
      ],
      "discretionary_spend_index": 118.0,
      "underserved_business_types": [
        "Specialty Coffee / Co-working",
        "Boutique Fitness Studio",
        "Pet Daycare & Grooming",
        "Organic Fast-Casual Dining"
      ]
    },
    "soil": {
      "soil_series_name": "Willamette Silt Loam",
      "soil_texture": "Silt Loam",
      "ph_level": 6.4,
      "organic_matter_pct": 3.8,
      "drainage_class": "Well Drained",
      "water_storage_capacity_inches": 9.2,
      "slope_pct": 2.5,
      "prime_farmland_rating": "All Areas are Prime Farmland",
      "frost_free_days": 205,
      "usda_hardiness_zone": "8b",
      "irrigation_water_rights": true,
      "depth_to_water_table_ft": 12.0,
      "depth_to_bedrock_inches": 72.0
    },
    "financials": {
      "monthly_gross_rent": 2850.0,
      "monthly_net_operating_income": 1585.33,
      "annual_noi": 19024.0,
      "monthly_mortgage_payment": 1134.05,
      "monthly_cash_flow": 451.28,
      "annual_cash_flow": 5415.35,
      "cap_rate": 8.46,
      "cash_on_cash_return": 8.44,
      "gross_rent_multiplier": 7.21,
      "debt_service_coverage_ratio": 1.4,
      "estimated_10yr_irr": 22.44,
      "average_daily_rate": 290.67,
      "occupancy_rate_pct": 65.0,
      "str_annual_revenue": 68960.67,
      "str_annual_net_cash_flow": 26789.65,
      "str_cash_on_cash": 40.13,
      "arv": 362362.5,
      "estimated_rehab_costs": 83250.0,
      "maximum_allowable_offer_70pct": 170403.75,
      "projected_flip_profit": 6399.31,
      "projected_flip_roi_pct": 1.94,
      "brrrr_refinance_cash_out": 266336.44,
      "capital_left_in_deal": 59799.42,
      "farm_annual_net_yield": 0.0,
      "farm_cap_rate": 0.0
    },
    "business_recommendations": [
      {
        "business_type": "Artisanal Specialty Coffee & Remote Workspace Hub",
        "category": "Food & Beverage",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Tampa population with $84,500 median income and 34.8 median age.",
        "revenue_driver": "High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions",
        "estimated_break_even_months": 11,
        "estimated_annual_revenue_range": "$420,000 - $680,000 / year",
        "recommended_sqft": 1600,
        "pros": [
          "Captures hybrid work demographic",
          "High gross margin on espresso (80%+)",
          "Consistent daily foot traffic"
        ],
        "risks_to_mitigate": [
          "Barista labor retention",
          "Morning peak traffic management"
        ]
      },
      {
        "business_type": "Modern Premium Laundromat & Wash-and-Fold Service",
        "category": "Personal Services",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Tampa population with $84,500 median income and 34.8 median age.",
        "revenue_driver": "Coin/app laundry cycles + drop-off commercial wash-and-fold delivery for local businesses",
        "estimated_break_even_months": 14,
        "estimated_annual_revenue_range": "$280,000 - $480,000 / year",
        "recommended_sqft": 2500,
        "pros": [
          "Essential recession-proof utility",
          "Minimal staffing needed",
          "Excellent cash flow generation"
        ],
        "risks_to_mitigate": [
          "Water/utility rate spikes",
          "Commercial washer maintenance"
        ]
      },
      {
        "business_type": "Pediatric & Family Urgent Dental / Health Clinic",
        "category": "Healthcare",
        "match_score": 75,
        "zoning_compliance": "Requires Conditional Use Permit (CUP) or Rezoning",
        "target_demographic_fit": "Tailored to Tampa population with $84,500 median income and 34.8 median age.",
        "revenue_driver": "Insurance billing, hygiene preventative care, pediatric dentistry, and cash cosmetic services",
        "estimated_break_even_months": 16,
        "estimated_annual_revenue_range": "$950,000 - $1,800,000 / year",
        "recommended_sqft": 3000,
        "pros": [
          "High reimbursement rates",
          "Long lease commitment (10+ years)",
          "Inelastic healthcare demand"
        ],
        "risks_to_mitigate": [
          "Medical licensing and zoning permits",
          "High plumbing build-out costs"
        ]
      }
    ],
    "crop_suitability": [
      {
        "crop_name": "Premium Wine Grapes (Pinot Noir / Cabernet)",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Well-drained soil structure allows deep root penetration and controlled moisture stress for concentrated grape brix",
          "Favorable pH range facilitates balanced micronutrient uptake (magnesium, potassium, calcium)",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Spring budbreak frost risks",
          "Initial vineyard establishment timeline (3 years to first harvest)"
        ],
        "estimated_annual_gross_yield_per_acre": 14500.0,
        "estimated_cost_per_acre": 6200.0,
        "estimated_net_profit_per_acre": 8300.0,
        "recommended_farming_method": "Precision Drip Irrigation with Cover Crop Alleyways"
      },
      {
        "crop_name": "High-Density Specialty Apple & Pear Orchard",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep loam soil provides exceptional water retention during fruit sizing periods",
          "Consistent organic matter sustains active mycorrhizal biology supporting root health",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Fire blight susceptibility",
          "Hail damage risk requiring netting"
        ],
        "estimated_annual_gross_yield_per_acre": 18200.0,
        "estimated_cost_per_acre": 8400.0,
        "estimated_net_profit_per_acre": 9800.0,
        "recommended_farming_method": "Trellised High-Density Spindle with Micro-Sprinklers"
      },
      {
        "crop_name": "Specialty Heirloom Vegetables & Bio-Intensive Market Garden",
        "suitability_score": 99,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Rich balanced loam enables multi-succession plantings per season (greens, brassicas, heirloom nightshades)",
          "High organic matter ensures resilient water-holding buffer during heatwaves",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Labor-intensive harvesting",
          "Immediate cold-chain storage required post-harvest"
        ],
        "estimated_annual_gross_yield_per_acre": 28000.0,
        "estimated_cost_per_acre": 11000.0,
        "estimated_net_profit_per_acre": 17000.0,
        "recommended_farming_method": "No-Till Permanent Beds with Composted Mulch & Low Tunnels"
      },
      {
        "crop_name": "Hazelnut / Truffle Agroforestry Orchard",
        "suitability_score": 92,
        "tier": "Exceptional Viability",
        "optimal_reasons": [
          "Deep well-drained profile prevents root rot and supports symbiotic truffle fungi development",
          "Low labor requirement compared to soft fruit once established",
          "Soil texture 'Silt Loam' matches optimal physical aeration and root development criteria."
        ],
        "risk_factors": [
          "Eastern filbert blight resistance selection needed",
          "5 to 6 year maturity ramp",
          "Soil is acidic (pH 6.4 vs min 6.5); agricultural lime application recommended."
        ],
        "estimated_annual_gross_yield_per_acre": 11500.0,
        "estimated_cost_per_acre": 3800.0,
        "estimated_net_profit_per_acre": 7700.0,
        "recommended_farming_method": "Regenerative Alley Cropping with Inoculated Mycorrhizae"
      }
    ],
    "ai_investment_memo": "================================================================================\n                    EXECUTIVE REAL ESTATE INVESTMENT MEMORANDUM\n================================================================================\nASSET: Off-Market Distressed Duplex (Handyman / Cash Deal)\nADDRESS: 1824 E Columbus Dr, Tampa, FL 33605\nLIST PRICE: $225,000 | TYPE: MULTI_FAMILY | LOT: 0.18 Acres\nUNITS: 2 | SQFT: 1,850 | YEAR BUILT: 1958\n\n1. EXECUTIVE UNDERWRITING SUMMARY\n--------------------------------------------------------------------------------\n- Monthly Gross Rent: $2,850.00\n- Net Operating Income (NOI): $19,024.00 / year\n- Monthly Net Cash Flow: $451.28\n- Unleveraged Cap Rate: 8.46%\n- Cash-on-Cash Return: 8.44%\n- Debt Service Coverage Ratio (DSCR): 1.40x\n- 10-Year Projected IRR: 22.44%\n\n2. ALTERNATIVE STRATEGY BENCHMARKING\n--------------------------------------------------------------------------------\n- Short-Term Rental (Airbnb): Projected ADR $291 @ 65% occupancy\n  Annual STR Net Cash Flow: $26,789.65 (CoC: 40.13%)\n- Value-Add / Fix & Flip:\n  Estimated Rehab: $83,250.00 | Projected ARV: $362,362.50\n  Max Allowable Offer (70% Rule): $170,403.75\n  Projected Flip Net Profit: $6,399.31 (ROI: 1.94%)\n  BRRRR Refinance Cash-Out: $266,336.44 (Capital Remaining: $59,799.42)\n\n3. ZONING RESTRICTIONS & DEVELOPMENT POTENTIAL\n--------------------------------------------------------------------------------\n- Zoning Designation: R-3 (Medium-Density Multi-Family Residential)\n- Permitted Uses: Single-family, Duplex, Triplex, Apartment complex up to 4 stories\n- ADU Permitted: YES - Strong density expansion upside\n- Max Height: 45.0 ft | FAR: 1.2\n- Regulatory Restrictions: Check municipal setback buffer for adjacent rights-of-way; Exterior signage subject to city design review guidelines\n\n4. DEMOGRAPHIC MATCH & OPTIMAL LOCAL BUSINESS FIT\n--------------------------------------------------------------------------------\n- Median Household Income: $84,500 | Median Age: 34.8\n- Foot Traffic Score: 78/100 | Walk Score: 74/100\n- Recommended Commercial Use:\n  - **Artisanal Specialty Coffee & Remote Workspace Hub** (Match: 75%): High-margin beverage sales ($6.50 avg order) + daytime remote work pastry & snack subscriptions\n\n5. AGRONOMIC & SOIL SUITABILITY (FLOURISHING CROPS)\n--------------------------------------------------------------------------------\n- Soil Series & Texture: Willamette Silt Loam (Silt Loam)\n- Soil pH: 6.4 | Drainage: Well Drained | Hardiness: Zone 8b\n- Prime Farmland Status: All Areas are Prime Farmland\n- Top Flourishing Crop:\n  - **Premium Wine Grapes (Pinot Noir / Cabernet)** (Score: 99%): Net yield approx $8,300/acre using Precision Drip Irrigation with Cover Crop Alleyways\n\n6. DEVELOPMENT PIPELINE & UPCOMING AREA INTELLIGENCE\n--------------------------------------------------------------------------------\n- Development Momentum Score: 99/100\n- Investment Timing: Active Growth Phase \u2014 Appreciation accelerating\n- 5-Year Appreciation Forecast: +52.8%\n- Population Growth (5yr): +16.4% | Job Growth (1yr): +4.2%\n- Building Permits YoY: +24.0% | Days-on-Market Trend: -18 days\n- Absorption Rate: 1.2 months (Tight Seller Market)\n- Opportunity Zone: YES \u2014 Eligible for OZ capital gains deferral\n- Overbuilding Risk: Moderate | Gentrification Pressure: 85/100\n- Top Infrastructure Catalyst: Water Street Tampa Phase 2 & USF Health Campus ($3,500M investment, 8,000 jobs, completion 2029)\n- Nearest Rezoning: REZ-2025-1142 \u2014 CG (General Commercial) \u2192 PD-MU (Planned Development Mixed-Use) (+280% density increase)\n\n7. RISK MATRIX & ACQUISITION RECOMMENDATION\n--------------------------------------------------------------------------------\n- Stress-Test Resilience: DSCR of 1.40x indicates solid debt safety buffer (>1.25x).\n- Strategic Action: ACQUISITION TARGET - Strong fundamentals across cash flow and alternative use potential.\n\n================================================================================",
    "development": {
      "population_growth_1yr_pct": 3.1,
      "population_growth_5yr_pct": 16.4,
      "population_growth_10yr_projected_pct": 32.0,
      "job_growth_1yr_pct": 4.2,
      "unemployment_rate_pct": 2.9,
      "median_sale_price_1yr_change_pct": 8.4,
      "median_sale_price_3yr_change_pct": 28.6,
      "avg_days_on_market": 14,
      "days_on_market_yoy_change": -18,
      "absorption_rate_months": 1.2,
      "new_listings_yoy_change_pct": -11.5,
      "building_permits_issued_ytd": 6800,
      "building_permits_yoy_change_pct": 24.0,
      "new_construction_units_pipeline": 28000,
      "commercial_permits_ytd": 520,
      "current_walk_score": 52,
      "projected_walk_score_5yr": 68,
      "current_transit_score": 34,
      "projected_transit_score_5yr": 52,
      "is_opportunity_zone": true,
      "opportunity_zone_tract_id": "12057013400",
      "has_tax_increment_financing": false,
      "has_enterprise_zone": true,
      "has_historic_tax_credits": false,
      "has_new_market_tax_credits": false,
      "special_incentive_programs": [],
      "infrastructure_projects": [
        {
          "name": "Water Street Tampa Phase 2 & USF Health Campus",
          "category": "mixed_use_town_center",
          "phase": "under_construction",
          "estimated_investment": 3500000000,
          "distance_miles": 3.0,
          "estimated_completion_year": 2029,
          "jobs_created": 8000,
          "housing_units_added": 3800,
          "impact_description": "56-acre waterfront district adding medical campus, Class-A office towers, luxury residential, and boutique hotel. WELL-certified neighborhood transforming Channelside.",
          "appreciation_catalyst_score": 89
        },
        {
          "name": "Ybor City Historic District Revitalization & Streetcar Expansion",
          "category": "transit_rail",
          "phase": "approved",
          "estimated_investment": 420000000,
          "distance_miles": 1.2,
          "estimated_completion_year": 2030,
          "jobs_created": 2200,
          "housing_units_added": 1400,
          "impact_description": "Streetcar line extension into East Tampa with adaptive-reuse historic lofts, artisan food halls, and creative office. Strong FSBO and wholesale deal flow from transitioning parcels.",
          "appreciation_catalyst_score": 86
        }
      ],
      "rezoning_proposals": [
        {
          "case_number": "REZ-2025-1142",
          "current_zoning": "CG (General Commercial)",
          "proposed_zoning": "PD-MU (Planned Development Mixed-Use)",
          "status": "Under City Planning Review \u2014 Hearing scheduled Q2 2027",
          "acreage_affected": 18.5,
          "distance_miles": 0.8,
          "density_increase_pct": 280.0,
          "description": "Proposed conversion of aging commercial strip along E Columbus Dr into walkable mixed-use with residential above retail. Ground-zero for Ybor City expansion."
        }
      ],
      "employer_migrations": [
        {
          "company_name": "Citigroup",
          "industry": "Financial Services",
          "announcement_type": "Regional Hub Expansion",
          "estimated_employees": 2800,
          "avg_salary": 92000,
          "distance_miles": 3.5,
          "target_year": 2027
        }
      ],
      "development_momentum_score": 99,
      "appreciation_forecast_5yr_pct": 52.8,
      "risk_of_overbuilding": "Moderate",
      "gentrification_pressure_index": 85,
      "overall_investment_timing": "Active Growth Phase \u2014 Appreciation accelerating"
    }
  }
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // ── API Routes ──
    if (pathname.startsWith('/api/')) {
      return handleApi(pathname, searchParams, request, corsHeaders);
    }

    // ── Web Application UI ──
    return new Response(renderHtmlApp(), {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...corsHeaders,
      },
    });
  },
};

function handleApi(pathname, searchParams, request, corsHeaders) {
  // GET /api/properties
  if (pathname === '/api/properties') {
    const query = searchParams.get('q')?.toLowerCase() || '';
    const state = searchParams.get('state')?.toUpperCase() || '';
    const type = searchParams.get('type') || '';
    const minCap = parseFloat(searchParams.get('min_cap')) || 0;

    let filtered = propertiesData.filter((p) => {
      if (state && p.state.toUpperCase() !== state) return false;
      if (type && p.property_type !== type) return false;
      if (minCap > 0 && (!p.financials || p.financials.cap_rate < minCap)) return false;
      if (query) {
        const text = `${p.title} ${p.city} ${p.state} ${p.description}`.toLowerCase();
        return text.includes(query);
      }
      return true;
    });

    return Response.json(filtered, { headers: corsHeaders });
  }

  // GET /api/properties/:id
  if (pathname.startsWith('/api/properties/')) {
    const id = pathname.replace('/api/properties/', '');
    const prop = propertiesData.find((p) => p.id === id);
    if (!prop) {
      return new Response(JSON.stringify({ error: 'Property not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
    return Response.json(prop, { headers: corsHeaders });
  }

  // GET /api/health
  if (pathname === '/api/health') {
    return Response.json({
      status: 'healthy',
      app: 'TerraYield AI Property Finder',
      domain: 'terrayield.com',
      total_properties: propertiesData.length,
      edge_node: 'Cloudflare Global Network',
    }, { headers: corsHeaders });
  }

  return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

function renderHtmlApp() {
  const propsJson = JSON.stringify(propertiesData);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TerraYield | AI Investment Property Finder</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .badge { padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  <!-- Header -->
  <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20">
          🌱
        </div>
        <div>
          <h1 class="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            TerraYield
            <span class="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-medium">LIVE ON CLOUDFLARE</span>
          </h1>
          <p class="text-xs text-slate-400">AI Real Estate, Soil Science & Up-and-Coming Area Intelligence</p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <span class="text-xs text-slate-400 font-mono hidden md:inline">terrayield.com</span>
        <a href="/api/properties" target="_blank" class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5">
          <i class="fa-solid fa-code"></i> REST API
        </a>
      </div>
    </div>
  </header>

  <!-- Hero & Filters -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold text-white tracking-tight mb-2">Find High-Yield Investment Properties</h2>
      <p class="text-slate-400 max-w-2xl text-sm">
        Deep-dive underwriting across the USA and Territories (Puerto Rico, USVI, Guam). Powered by soil science, demographic business matching, zoning verification, and upcoming infrastructure pipeline momentum.
      </p>

      <!-- Search & Filters -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800 shadow-xl">
        <div class="md:col-span-2 relative">
          <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-slate-500 text-sm"></i>
          <input type="text" id="searchInput" placeholder="Search by city, state, crop (vineyard, coffee), or keyword..."
            class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500">
        </div>
        <div>
          <select id="typeFilter" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500">
            <option value="">All Property Types</option>
            <option value="agricultural">Farmland / Agricultural</option>
            <option value="single_family">Single Family / ADU</option>
            <option value="multi_family">Multi-Family / Units</option>
            <option value="mixed_use">Commercial / Mixed-Use</option>
          </select>
        </div>
        <div>
          <select id="regionFilter" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-emerald-500">
            <option value="">All Regions & Territories</option>
            <option value="PR">Puerto Rico (Territory)</option>
            <option value="VI">U.S. Virgin Islands (Territory)</option>
            <option value="GU">Guam (Territory)</option>
            <option value="TX">Texas (Austin)</option>
            <option value="CO">Colorado (Denver)</option>
            <option value="GA">Georgia (Atlanta)</option>
            <option value="OR">Oregon (Portland/Willamette)</option>
            <option value="FL">Florida (Tampa)</option>
            <option value="TN">Tennessee (Gatlinburg)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Active Count -->
    <div class="flex items-center justify-between mb-4">
      <div class="text-xs text-slate-400 font-medium">
        Showing <span id="propertyCount" class="text-white font-bold">0</span> properties
      </div>
      <div class="flex gap-2">
        <button onclick="filterByTag('farmland')" class="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg">🌾 Farmland & Soils</button>
        <button onclick="filterByTag('territory')" class="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg">🏝️ US Territories</button>
        <button onclick="filterByTag('high_cap')" class="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg">📈 High Momentum</button>
      </div>
    </div>

    <!-- Properties Grid -->
    <div id="propertiesGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Injected by JavaScript -->
    </div>
  </main>

  <!-- Modal for Full 360 Deep-Dive -->
  <div id="detailModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
      <button onclick="closeModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white text-lg w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
        ✕
      </button>
      <div id="modalContent"></div>
    </div>
  </div>

  <footer class="border-t border-slate-800/80 mt-16 py-8 text-center text-xs text-slate-500">
    TerraYield © 2026 • Live on Cloudflare Global Network • terrayield.com / terrayeild.com
  </footer>

  <script>
    const allProperties = ${propsJson};

    function renderProperties(list) {
      const grid = document.getElementById('propertiesGrid');
      document.getElementById('propertyCount').textContent = list.length;

      if (list.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-12 text-slate-500">No properties match your search criteria.</div>';
        return;
      }

      grid.innerHTML = list.map(p => {
        const fin = p.financials || {};
        const dev = p.development || {};
        const crops = p.crop_suitability || [];
        const biz = p.business_recommendations || [];
        const topCrop = crops[0];
        const topBiz = biz[0];

        return \`
          <div class="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition flex flex-col shadow-lg">
            <div class="h-48 w-full bg-slate-800 relative overflow-hidden">
              <img src="\${p.image_url}" alt="\${p.title}" class="w-full h-full object-cover">
              <div class="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                <span class="badge bg-slate-950/80 text-white backdrop-blur border border-white/10">\${p.state}</span>
                <span class="badge bg-emerald-500/90 text-slate-950 font-bold">\${p.property_type.replace('_', ' ')}</span>
              </div>
              <div class="absolute bottom-3 right-3 bg-slate-950/90 text-white font-black text-lg px-3 py-1 rounded-xl border border-white/10">
                $\${Number(p.list_price).toLocaleString()}
              </div>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-bold text-white text-base leading-tight mb-1 line-clamp-1">\${p.title}</h3>
                <p class="text-xs text-slate-400 mb-4"><i class="fa-solid fa-location-dot text-emerald-400 mr-1"></i>\${p.city}, \${p.state} \${p.zip_code}</p>

                <!-- Financial Underwriting KPIs -->
                <div class="grid grid-cols-3 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 mb-3 text-center">
                  <div>
                    <div class="text-[10px] text-slate-500 uppercase font-semibold">Cap Rate</div>
                    <div class="text-sm font-black text-emerald-400">\${fin.cap_rate || 0}%</div>
                  </div>
                  <div>
                    <div class="text-[10px] text-slate-500 uppercase font-semibold">Cash Flow</div>
                    <div class="text-sm font-black \${(fin.monthly_cash_flow >= 0) ? 'text-white' : 'text-rose-400'}">
                      $\${Math.round(fin.monthly_cash_flow || 0)}/mo
                    </div>
                  </div>
                  <div>
                    <div class="text-[10px] text-slate-500 uppercase font-semibold">10-Yr IRR</div>
                    <div class="text-sm font-black text-teal-400">\${fin.estimated_10yr_irr || 0}%</div>
                  </div>
                </div>

                <!-- Up-and-Coming Area Momentum Badge -->
                \${dev.development_momentum_score ? \`
                  <div class="bg-indigo-950/40 border border-indigo-800/40 rounded-xl p-2.5 mb-3 flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2">
                      <span class="text-base">🚀</span>
                      <div>
                        <div class="font-bold text-indigo-300">Momentum: \${dev.development_momentum_score}/100</div>
                        <div class="text-[10px] text-slate-400">5yr Forecast: +\${dev.appreciation_forecast_5yr_pct || 0}%</div>
                      </div>
                    </div>
                    \${dev.is_opportunity_zone ? '<span class="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">OZ</span>' : ''}
                  </div>
                \` : ''}

                <!-- Top Agricultural Crop & Demographic Business Fit -->
                <div class="space-y-1.5 text-xs mb-4">
                  \${topCrop ? \`
                    <div class="flex items-center text-slate-300 gap-1.5 truncate">
                      <span class="text-emerald-400 font-bold">🌾 Flourishing:</span>
                      <span class="truncate">\${topCrop.crop_name} ($' + Math.round(topCrop.estimated_net_profit_per_acre).toLocaleString() + '/ac)</span>
                    </div>
                  \` : ''}
                  \${topBiz ? \`
                    <div class="flex items-center text-slate-300 gap-1.5 truncate">
                      <span class="text-teal-400 font-bold">💡 Best Biz:</span>
                      <span class="truncate">\${topBiz.business_type} (\${topBiz.match_score}%)</span>
                    </div>
                  \` : ''}
                </div>
              </div>

              <button onclick="viewDetails('\${p.id}')" class="w-full bg-slate-800 hover:bg-emerald-600 text-white font-medium text-xs py-2.5 rounded-xl transition border border-slate-700 hover:border-emerald-500 flex items-center justify-center gap-1.5">
                <span>View Full AI Underwriting</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
            </div>
          </div>
        \`;
      }).join('');
    }

    function viewDetails(id) {
      const p = allProperties.find(item => item.id === id);
      if (!p) return;

      const fin = p.financials || {};
      const dev = p.development || {};
      const zoning = p.zoning || {};
      const soil = p.soil || {};
      const crops = p.crop_suitability || [];
      const biz = p.business_recommendations || [];

      const html = \`
        <div class="space-y-6">
          <div class="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <span class="text-xs font-mono text-emerald-400 uppercase tracking-wider">\${p.state} • \${p.property_type.replace('_', ' ')}</span>
              <h2 class="text-2xl font-black text-white mt-1">\${p.title}</h2>
              <p class="text-sm text-slate-400">\${p.address}, \${p.city}, \${p.state} \${p.zip_code}</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-black text-white">$\${Number(p.list_price).toLocaleString()}</div>
              <div class="text-xs text-slate-400">\${p.bedrooms} Beds • \${p.bathrooms} Baths • \${p.square_feet.toLocaleString()} SqFt</div>
            </div>
          </div>

          <!-- Financial Strategy Breakdown -->
          <div>
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">1. Quantitative Financial Underwriting</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <div><span class="text-xs text-slate-500">Cap Rate</span><div class="text-lg font-black text-emerald-400">\${fin.cap_rate || 0}%</div></div>
              <div><span class="text-xs text-slate-500">Cash Flow</span><div class="text-lg font-black text-white">$\${Math.round(fin.monthly_cash_flow || 0)}/mo</div></div>
              <div><span class="text-xs text-slate-500">Cash on Cash</span><div class="text-lg font-black text-teal-400">\${fin.cash_on_cash_return || 0}%</div></div>
              <div><span class="text-xs text-slate-500">DSCR</span><div class="text-lg font-black text-indigo-400">\${fin.debt_service_coverage_ratio || 0}x</div></div>
            </div>
          </div>

          <!-- Upcoming Development Pipeline -->
          \${dev.development_momentum_score ? \`
            <div>
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">2. Upcoming Development Pipeline & Growth Signals</h3>
              <div class="bg-indigo-950/20 border border-indigo-800/40 p-4 rounded-xl space-y-3">
                <div class="flex justify-between items-center">
                  <div class="text-sm font-bold text-indigo-300">Momentum Score: \${dev.development_momentum_score}/100</div>
                  <div class="text-xs text-slate-300">5-Yr Appreciation Forecast: <span class="font-bold text-emerald-400">+\${dev.appreciation_forecast_5yr_pct}%</span></div>
                </div>
                <div class="text-xs text-slate-400">Timing: <span class="text-white font-medium">\${dev.overall_investment_timing}</span></div>
                \${dev.infrastructure_projects && dev.infrastructure_projects.length > 0 ? \`
                  <div class="border-t border-indigo-900/40 pt-2 text-xs">
                    <div class="font-bold text-slate-300 mb-1">Top Infrastructure Catalyst:</div>
                    <div class="text-slate-400">\${dev.infrastructure_projects[0].name} ($' + Math.round(dev.infrastructure_projects[0].estimated_investment/1e6) + 'M investment, completion ' + dev.infrastructure_projects[0].estimated_completion_year + ')</div>
                  </div>
                \` : ''}
              </div>
            </div>
          \` : ''}

          <!-- Soil & Agriculture -->
          \${soil.soil_texture ? \`
            <div>
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">3. Soil Science & Flourishing Crops</h3>
              <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div class="flex justify-between text-slate-300">
                  <span>Soil: <strong class="text-white">\${soil.soil_series_name} (\${soil.soil_texture})</strong></span>
                  <span>pH: <strong class="text-white">\${soil.ph_level}</strong> • Drainage: <strong class="text-white">\${soil.drainage_class}</strong></span>
                </div>
                <div class="mt-2 space-y-1">
                  \${crops.slice(0, 3).map(c => \`
                    <div class="flex justify-between border-t border-slate-800/60 pt-1 text-slate-400">
                      <span class="text-slate-200">🌱 \${c.crop_name} [\${c.tier}]</span>
                      <span class="text-emerald-400 font-bold">$\${Math.round(c.estimated_net_profit_per_acre).toLocaleString()}/acre net</span>
                    </div>
                  \`).join('')}
                </div>
              </div>
            </div>
          \` : ''}

          <!-- Zoning & Permitted Commercial Uses -->
          <div>
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">4. Zoning Restrictions & Permitted Uses</h3>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div>Zoning Code: <strong class="text-white">\${zoning.code || 'N/A'} (\${zoning.name || ''})</strong></div>
              <div>Permitted Uses: <span class="text-slate-400">\${(zoning.permitted_uses || []).join(', ')}</span></div>
              <div>ADU Allowed: <strong class="\${zoning.adu_permitted ? 'text-emerald-400' : 'text-slate-500'}">\${zoning.adu_permitted ? 'YES (Density Upside)' : 'No'}</strong></div>
            </div>
          </div>
        </div>
      \`;

      document.getElementById('modalContent').innerHTML = html;
      document.getElementById('detailModal').classList.remove('hidden');
    }

    function closeModal() {
      document.getElementById('detailModal').classList.add('hidden');
    }

    function applyFilters() {
      const q = document.getElementById('searchInput').value.toLowerCase();
      const type = document.getElementById('typeFilter').value;
      const reg = document.getElementById('regionFilter').value.toUpperCase();

      const filtered = allProperties.filter(p => {
        if (type && p.property_type !== type) return false;
        if (reg && p.state.toUpperCase() !== reg) return false;
        if (q) {
          const cropsStr = (p.crop_suitability || []).map(c => c.crop_name).join(' ');
          const text = \`\${p.title} \${p.city} \${p.state} \${p.description} \${cropsStr}\`.toLowerCase();
          return text.includes(q);
        }
        return true;
      });

      renderProperties(filtered);
    }

    function filterByTag(tag) {
      if (tag === 'farmland') {
        document.getElementById('typeFilter').value = 'agricultural';
      } else if (tag === 'territory') {
        document.getElementById('regionFilter').value = 'PR';
      } else if (tag === 'high_cap') {
        document.getElementById('searchInput').value = 'momentum';
      }
      applyFilters();
    }

    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('typeFilter').addEventListener('change', applyFilters);
    document.getElementById('regionFilter').addEventListener('change', applyFilters);

    // Initial render
    renderProperties(allProperties);
  </script>
</body>
</html>`;
}
