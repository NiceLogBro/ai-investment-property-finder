"""
National Geographic & Territory Real Estate Registry.
Covers all 50 US States, Washington D.C., and all 5 inhabited US Territories:
- Puerto Rico (PR)
- U.S. Virgin Islands (VI)
- Guam (GU)
- American Samoa (AS)
- Northern Mariana Islands (MP)
"""

from typing import Dict, List, Any

US_TERRITORIES_AND_STATES: Dict[str, Dict[str, Any]] = {
    # Territories
    "PR": {"name": "Puerto Rico", "type": "Territory", "capital": "San Juan", "primary_soil": "Coto Clay & Volcanic Loam", "market_type": "High Tourism & Act 60 Investor Hub"},
    "VI": {"name": "U.S. Virgin Islands", "type": "Territory", "capital": "Charlotte Amalie", "primary_soil": "Cramer Gravelly Loam", "market_type": "Ultra-Luxury Caribbean STR & Resort"},
    "GU": {"name": "Guam", "type": "Territory", "capital": "Hagåtña", "primary_soil": "Ritidian-Inarajan Clay", "market_type": "Pacific Hub & Defense / Commercial Real Estate"},
    "AS": {"name": "American Samoa", "type": "Territory", "capital": "Pago Pago", "primary_soil": "Ofu Silty Clay", "market_type": "Communal & Leasehold Agricultural Holdings"},
    "MP": {"name": "Northern Mariana Islands", "type": "Territory", "capital": "Saipan", "primary_soil": "Saipan Clay", "market_type": "Eco-Tourism & Coastal Farmland"},

    # Continental US & Islands
    "AL": {"name": "Alabama", "type": "State"},
    "AK": {"name": "Alaska", "type": "State"},
    "AZ": {"name": "Arizona", "type": "State"},
    "AR": {"name": "Arkansas", "type": "State"},
    "CA": {"name": "California", "type": "State"},
    "CO": {"name": "Colorado", "type": "State"},
    "CT": {"name": "Connecticut", "type": "State"},
    "DE": {"name": "Delaware", "type": "State"},
    "DC": {"name": "District of Columbia", "type": "Federal District"},
    "FL": {"name": "Florida", "type": "State"},
    "GA": {"name": "Georgia", "type": "State"},
    "HI": {"name": "Hawaii", "type": "State"},
    "ID": {"name": "Idaho", "type": "State"},
    "IL": {"name": "Illinois", "type": "State"},
    "IN": {"name": "Indiana", "type": "State"},
    "IA": {"name": "Iowa", "type": "State"},
    "KS": {"name": "Kansas", "type": "State"},
    "KY": {"name": "Kentucky", "type": "State"},
    "LA": {"name": "Louisiana", "type": "State"},
    "ME": {"name": "Maine", "type": "State"},
    "MD": {"name": "Maryland", "type": "State"},
    "MA": {"name": "Massachusetts", "type": "State"},
    "MI": {"name": "Michigan", "type": "State"},
    "MN": {"name": "Minnesota", "type": "State"},
    "MS": {"name": "Mississippi", "type": "State"},
    "MO": {"name": "Missouri", "type": "State"},
    "MT": {"name": "Montana", "type": "State"},
    "NE": {"name": "Nebraska", "type": "State"},
    "NV": {"name": "Nevada", "type": "State"},
    "NH": {"name": "New Hampshire", "type": "State"},
    "NJ": {"name": "New Jersey", "type": "State"},
    "NM": {"name": "New Mexico", "type": "State"},
    "NY": {"name": "New York", "type": "State"},
    "NC": {"name": "North Carolina", "type": "State"},
    "ND": {"name": "North Dakota", "type": "State"},
    "OH": {"name": "Ohio", "type": "State"},
    "OK": {"name": "Oklahoma", "type": "State"},
    "OR": {"name": "Oregon", "type": "State"},
    "PA": {"name": "Pennsylvania", "type": "State"},
    "RI": {"name": "Rhode Island", "type": "State"},
    "SC": {"name": "South Carolina", "type": "State"},
    "SD": {"name": "South Dakota", "type": "State"},
    "TN": {"name": "Tennessee", "type": "State"},
    "TX": {"name": "Texas", "type": "State"},
    "UT": {"name": "Utah", "type": "State"},
    "VT": {"name": "Vermont", "type": "State"},
    "VA": {"name": "Virginia", "type": "State"},
    "WA": {"name": "Washington", "type": "State"},
    "WV": {"name": "West Virginia", "type": "State"},
    "WI": {"name": "Wisconsin", "type": "State"},
    "WY": {"name": "Wyoming", "type": "State"}
}
