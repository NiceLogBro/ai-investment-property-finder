# AI Investment Property Finder & Multi-Asset Portfolio Library

A complete, production-ready Python library and API for real estate investors, developers, and agricultural analysts.

Designed for instant imports into Python scripts, Jupyter notebooks, automated bots, and web applications.

---

## 🌟 Key Capabilities

1. **Multi-Strategy Financial Underwriting**:
   - **Long-Term Rental / Buy & Hold**: Cap Rate, Cash-on-Cash Return, Monthly Cash Flow, Debt Service Coverage Ratio (DSCR), Gross Rent Multiplier (GRM), and 10-Year Internal Rate of Return (IRR).
   - **Short-Term Rental / Airbnb**: Average Daily Rate (ADR), seasonal occupancy rates, RevPAR, host platform fees, utility allowances, and STR Cash-on-Cash.
   - **Fix & Flip / BRRRR**: After-Repair Value (ARV), Maximum Allowable Offer (70% Rule), multi-tier rehab cost modeling, holding costs, and cash-out refinance returns.
   - **Multi-Family & Commercial**: Unit mix modeling, RUBS utility split, commercial operating expense benchmarks, and debt service underwriting.

2. **Portfolio Builder & Stress-Testing**:
   - Aggregate multi-asset metrics: Blended Cap Rate, Blended Cash-on-Cash, Portfolio DSCR, Equity, and Loan-to-Value (LTV).
   - Asset class allocation breakdowns (Single-Family, Multi-Family, Mixed-Use, Farmland).
   - Macroeconomic stress simulations: Vacancy spikes, interest rate shocks (+bps), and operating expense inflation.

3. **Zoning & Regulatory Intelligence**:
   - Classifies zoning designations (R-1, R-3, C-1, MU-D, AG-20, etc.).
   - Evaluates permitted uses, conditional use permits (CUP), setback buffers, Floor Area Ratio (FAR), maximum building heights, and ADU permissions.

4. **Demographic Research & High-Performing Business Matchmaker**:
   - Analyzes neighborhood median household income, age distribution, foot traffic scores, and discretionary spending indices.
   - Cross-references demographics and zoning to recommend top commercial business concepts (e.g., Artisanal Coffee Hub, Boutique Pilates, Wash-and-Fold Laundromat, Urgent Dental, Farm-to-Table Cidery, Self-Storage) with match scores and revenue drivers.

5. **Agricultural Soil Science & Flourishing Crop Analyzer**:
   - Models soil taxonomy (Silt Loam, Sandy Loam, Clay Loam, etc.), pH levels, drainage classes, organic matter percentages, and USDA climate hardiness zones.
   - Determines flourishing crops (e.g. Wine Grapes, Truffle Orchards, High-Density Apples/Pears, Organic Blueberries, Bio-Intensive Market Greens).
   - Calculates annual gross yield per acre, farming costs, net profit per acre, and recommended regenerative farming methods (precision drip irrigation, cover cropping, keyline alleyways).

6. **AI Executive Investment Memorandum**:
   - Generates institutional-grade investment committee memos summarizing financials, development upside, demographic business fits, soil viability, and risk factors.

---

## 🚀 Quickstart: Importing into Python

### Basic Search and Property Analysis

```python
from property_finder import PropertyFinder, PropertyType

# 1. Initialize finder (comes with rich sample database)
finder = PropertyFinder()

# 2. Natural language query search
results = finder.search_query("farmland suitable for vineyards or berry crops")
for prop in results:
    print(f"{prop.title} — ${prop.list_price:,.0f} in {prop.city}, {prop.state}")

# 3. Comprehensive 360-degree property intelligence
property_id = "prop-005"
prop = finder.analyze_full(property_id)

# 4. Inspect Zoning
print(f"Zoning: {prop.zoning.code} ({prop.zoning.name})")
print(f"Permitted Uses: {prop.zoning.permitted_uses}")

# 5. Inspect Demographic Business Recommendations
for biz in prop.business_recommendations:
    print(f"Business: {biz.business_type} (Match: {biz.match_score}%)")
    print(f"Revenue Model: {biz.revenue_driver}")

# 6. Inspect Soil Profile & Flourishing Crops
print(f"Soil: {prop.soil.soil_series_name} | pH: {prop.soil.ph_level} | Drainage: {prop.soil.drainage_class}")
for crop in prop.crop_suitability:
    print(f"Crop: {crop.crop_name} — Net Yield: ${crop.estimated_net_profit_per_acre:,.0f}/acre/yr")
    print(f"Method: {crop.recommended_farming_method}")

# 7. Print AI Investment Memo
print(prop.ai_investment_memo)
```

---

## 📊 Building and Stress-Testing a Portfolio

```python
from property_finder import PropertyFinder

finder = PropertyFinder()

# Create a new portfolio
portfolio = finder.create_portfolio("West Coast Cash Flow Fund")

# Add properties
portfolio.add_property(finder.get_property("prop-001"))  # Single Family ADU (Austin)
portfolio.add_property(finder.get_property("prop-002"))  # Triplex (Denver)
portfolio.add_property(finder.get_property("prop-004"))  # Mixed-Use Loft (Portland)

# Calculate aggregated performance
metrics = portfolio.calculate_metrics()
print(f"Total Portfolio Value: ${metrics.total_portfolio_value:,.2f}")
print(f"Annual NOI:            ${metrics.total_annual_noi:,.2f}")
print(f"Net Annual Cash Flow:  ${metrics.total_annual_cash_flow:,.2f}")
print(f"Blended Cap Rate:      {metrics.blended_cap_rate_pct:.2f}%")
print(f"Blended DSCR:          {metrics.blended_dscr:.2f}x")

# Stress test against economic downturn (+8% vacancy, +175 bps interest rates)
stress = portfolio.stress_test(vacancy_increase_pct=8.0, interest_rate_increase_bps=175)
print(f"Stressed Cash Flow:    ${stress['stressed_annual_cash_flow']:,.2f}")
print(f"Solvency Status:       {stress['solvency_status']}")
```

---

## 🌐 Running as a REST API (FastAPI)

If you have `fastapi` and `uvicorn` installed, you can also launch the HTTP REST API:

```powershell
uvicorn property_finder.api.server:app --reload --port 8000
```

Interactive Swagger documentation will be available at:
`http://localhost:8000/docs`

Available endpoints:
- `GET /api/properties` (Search with filters or natural language query)
- `GET /api/properties/{id}` (Full 360-degree underwriting & intelligence)
- `GET /api/properties/{id}/memo` (Executive investment committee memo)
- `GET /api/portfolios` (List portfolios)
- `POST /api/portfolios` (Create portfolio)
- `POST /api/portfolios/{name}/add` (Add property to portfolio)
- `GET /api/portfolios/{name}/metrics` (Blended returns & asset allocation)
- `GET /api/portfolios/{name}/stress-test` (Macro stress simulations)

---

## 📁 Repository Structure

```
magical-hawking/
├── property_finder/
│   ├── __init__.py               # Main package exports
│   ├── finder.py                 # Central PropertyFinder class
│   ├── models.py                 # Core Property, Zoning, Soil, Demographic models
│   ├── evaluators/
│   │   ├── long_term.py          # Buy & Hold / Cap Rate / DSCR / CoC / IRR
│   │   ├── short_term.py         # Airbnb / STR occupancy / ADR / RevPAR
│   │   ├── fix_and_flip.py       # ARV / 70% Rule / Rehab / BRRRR Refinance
│   │   └── multi_family.py       # Multi-family unit mix / RUBS / OpEx
│   ├── intelligence/
│   │   ├── zoning.py             # Zoning regulations & permitted uses
│   │   ├── demographics.py       # Census demographics & foot traffic
│   │   ├── business_matcher.py   # AI Demographic-to-Business matchmaker
│   │   ├── soil_analyzer.py      # Soil science & flourishing crops
│   │   └── ai_memo.py            # Executive investment memo generator
│   ├── portfolio/
│   │   └── portfolio.py          # Portfolio manager & stress testing
│   ├── data/
│   │   ├── sample_properties.py  # Residential, commercial, and farm datasets
│   │   └── api_clients.py        # RentCast, Census, and USDA Soil API adapters
│   └── api/
│       └── server.py             # FastAPI REST API implementation
├── examples/
│   ├── demo_usage.py             # Python usage walkthrough
│   └── demo_portfolio.py         # Portfolio building and stress-test demo
├── setup.py                      # Package installation script
└── README.md                     # Documentation
```
