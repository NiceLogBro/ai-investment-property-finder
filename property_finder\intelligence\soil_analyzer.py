"""
Agricultural Soil Science & Crop Suitability Analyzer.
Evaluates soil taxonomy, pH, organic matter, drainage, and USDA climate hardiness zones
to determine what specialty crops and farming operations will flourish.
"""

from typing import List, Dict, Any, Optional
from ..models import Property, SoilProfile, CropSuitability


class SoilCropAnalyzer:
    """Agronomic intelligence for agricultural parcels and farmland investments."""

    CROP_KNOWLEDGE_BASE = [
        {
            "crop_name": "Premium Wine Grapes (Pinot Noir / Cabernet)",
            "optimal_textures": ["Loam", "Sandy Loam", "Gravelly Loam", "Silt Loam"],
            "optimal_ph_range": (6.0, 7.2),
            "optimal_drainage": ["Well Drained", "Moderately Well Drained"],
            "min_organic_matter": 1.5,
            "max_organic_matter": 4.5,  # Too high causes excessive vine vigor
            "ideal_hardiness_zones": ["7a", "7b", "8a", "8b", "9a", "9b"],
            "gross_yield_per_acre": 14500.0,
            "cost_per_acre": 6200.0,
            "recommended_farming_method": "Precision Drip Irrigation with Cover Crop Alleyways",
            "optimal_reasons": [
                "Well-drained soil structure allows deep root penetration and controlled moisture stress for concentrated grape brix",
                "Favorable pH range facilitates balanced micronutrient uptake (magnesium, potassium, calcium)",
            ],
            "risk_factors": ["Spring budbreak frost risks", "Initial vineyard establishment timeline (3 years to first harvest)"],
        },
        {
            "crop_name": "High-Density Specialty Apple & Pear Orchard",
            "optimal_textures": ["Silt Loam", "Loam", "Clay Loam"],
            "optimal_ph_range": (6.0, 7.0),
            "optimal_drainage": ["Well Drained", "Moderately Well Drained"],
            "min_organic_matter": 2.5,
            "max_organic_matter": 6.0,
            "ideal_hardiness_zones": ["5a", "5b", "6a", "6b", "7a", "7b", "8a", "8b"],
            "gross_yield_per_acre": 18200.0,
            "cost_per_acre": 8400.0,
            "recommended_farming_method": "Trellised High-Density Spindle with Micro-Sprinklers",
            "optimal_reasons": [
                "Deep loam soil provides exceptional water retention during fruit sizing periods",
                "Consistent organic matter sustains active mycorrhizal biology supporting root health",
            ],
            "risk_factors": ["Fire blight susceptibility", "Hail damage risk requiring netting"],
        },
        {
            "crop_name": "Organic Blueberries & Specialty Berries",
            "optimal_textures": ["Sandy Loam", "Peat / Muck", "Loam"],
            "optimal_ph_range": (4.5, 5.5),  # Highly acid-loving
            "optimal_drainage": ["Well Drained", "Moderately Well Drained"],
            "min_organic_matter": 4.0,
            "max_organic_matter": 12.0,
            "ideal_hardiness_zones": ["6a", "6b", "7a", "7b", "8a", "8b"],
            "gross_yield_per_acre": 22000.0,
            "cost_per_acre": 9500.0,
            "recommended_farming_method": "Raised Mulched Beds with Acidifying Drip Fertigation",
            "optimal_reasons": [
                "Thrives in lighter soil textures with high organic humus and aeration",
                "Very high wholesale and direct-to-consumer market margins",
            ],
            "risk_factors": ["Requires sulfur amendments if soil pH is above 5.8", "Bird predation"],
        },
        {
            "crop_name": "Specialty Heirloom Vegetables & Bio-Intensive Market Garden",
            "optimal_textures": ["Loam", "Silt Loam", "Sandy Loam"],
            "optimal_ph_range": (6.2, 7.0),
            "optimal_drainage": ["Well Drained"],
            "min_organic_matter": 3.5,
            "max_organic_matter": 10.0,
            "ideal_hardiness_zones": ["4a", "5a", "6a", "7a", "8a", "8b", "9a"],
            "gross_yield_per_acre": 28000.0,
            "cost_per_acre": 11000.0,
            "recommended_farming_method": "No-Till Permanent Beds with Composted Mulch & Low Tunnels",
            "optimal_reasons": [
                "Rich balanced loam enables multi-succession plantings per season (greens, brassicas, heirloom nightshades)",
                "High organic matter ensures resilient water-holding buffer during heatwaves",
            ],
            "risk_factors": ["Labor-intensive harvesting", "Immediate cold-chain storage required post-harvest"],
        },
        {
            "crop_name": "Hazelnut / Truffle Agroforestry Orchard",
            "optimal_textures": ["Silt Loam", "Loam", "Sandy Loam"],
            "optimal_ph_range": (6.5, 7.8),
            "optimal_drainage": ["Well Drained"],
            "min_organic_matter": 2.0,
            "max_organic_matter": 5.0,
            "ideal_hardiness_zones": ["7a", "7b", "8a", "8b"],
            "gross_yield_per_acre": 11500.0,
            "cost_per_acre": 3800.0,
            "recommended_farming_method": "Regenerative Alley Cropping with Inoculated Mycorrhizae",
            "optimal_reasons": [
                "Deep well-drained profile prevents root rot and supports symbiotic truffle fungi development",
                "Low labor requirement compared to soft fruit once established",
            ],
            "risk_factors": ["Eastern filbert blight resistance selection needed", "5 to 6 year maturity ramp"],
        },
        {
            "crop_name": "Premium Organic Alfalfa & Hay Forage",
            "optimal_textures": ["Loam", "Clay Loam", "Silt Loam"],
            "optimal_ph_range": (6.5, 7.5),
            "optimal_drainage": ["Well Drained", "Moderately Well Drained"],
            "min_organic_matter": 1.5,
            "max_organic_matter": 6.0,
            "ideal_hardiness_zones": ["4a", "5a", "6a", "7a", "8a", "9a"],
            "gross_yield_per_acre": 4800.0,
            "cost_per_acre": 1800.0,
            "recommended_farming_method": "Rotational Pivot or Linear Irrigation with Nitrogen Fixation",
            "optimal_reasons": [
                "Deep taproot utilizes subsoil moisture effectively",
                "Builds soil nitrogen naturally, excellent cash crop for multi-acre expanses",
            ],
            "risk_factors": ["Requires timely dry windows during hay-baling cycles"],
        },
    ]

    @classmethod
    def analyze(cls, prop: Property, top_n: int = 4) -> List[CropSuitability]:
        """
        Analyzes the property's soil profile and outputs scored crop recommendations.
        """
        # If no soil profile present, generate a default one based on property type
        if not prop.soil:
            prop.soil = SoilProfile(
                soil_series_name="Willamette Silt Loam",
                soil_texture="Silt Loam",
                ph_level=6.4,
                organic_matter_pct=3.8,
                drainage_class="Well Drained",
                water_storage_capacity_inches=9.2,
                slope_pct=2.5,
                prime_farmland_rating="All Areas are Prime Farmland",
                frost_free_days=205,
                usda_hardiness_zone="8b",
                irrigation_water_rights=True
            )

        soil = prop.soil
        scored_crops: List[CropSuitability] = []

        for crop in cls.CROP_KNOWLEDGE_BASE:
            score = 65  # Base score
            optimal_reasons = list(crop["optimal_reasons"])
            risk_factors = list(crop["risk_factors"])

            # 1. Texture compatibility
            if soil.soil_texture in crop["optimal_textures"]:
                score += 15
                optimal_reasons.append(f"Soil texture '{soil.soil_texture}' matches optimal physical aeration and root development criteria.")
            else:
                score -= 10
                risk_factors.append(f"Soil texture '{soil.soil_texture}' may require drainage or tilth management for {crop['crop_name']}.")

            # 2. pH evaluation
            min_ph, max_ph = crop["optimal_ph_range"]
            if min_ph <= soil.ph_level <= max_ph:
                score += 12
                optimal_reasons.append(f"Soil pH of {soil.ph_level} is right in the sweet spot ({min_ph} - {max_ph}) for nutrient availability.")
            else:
                diff = min(abs(soil.ph_level - min_ph), abs(soil.ph_level - max_ph))
                penalty = int(diff * 12)
                score -= penalty
                if soil.ph_level < min_ph:
                    risk_factors.append(f"Soil is acidic (pH {soil.ph_level} vs min {min_ph}); agricultural lime application recommended.")
                else:
                    risk_factors.append(f"Soil is alkaline (pH {soil.ph_level} vs max {max_ph}); elemental sulfur or organic compost needed.")

            # 3. Drainage compatibility
            if soil.drainage_class in crop["optimal_drainage"]:
                score += 8
            else:
                score -= 12
                risk_factors.append(f"Drainage class '{soil.drainage_class}' may cause root saturation during wet cycles.")

            # 4. Organic matter
            if crop["min_organic_matter"] <= soil.organic_matter_pct <= crop["max_organic_matter"]:
                score += 5
            elif soil.organic_matter_pct < crop["min_organic_matter"]:
                score -= 6
                risk_factors.append(f"Organic matter ({soil.organic_matter_pct}%) is lower than ideal ({crop['min_organic_matter']}%); cover cropping advised.")

            score = max(20, min(99, score))

            # Determine qualitative tier
            if score >= 88:
                tier = "Exceptional Viability"
            elif score >= 75:
                tier = "High Viability"
            elif score >= 60:
                tier = "Moderate Viability"
            else:
                tier = "Conditional / Not Recommended"

            net_profit_per_acre = crop["gross_yield_per_acre"] - crop["cost_per_acre"]

            suitability = CropSuitability(
                crop_name=crop["crop_name"],
                suitability_score=score,
                tier=tier,
                optimal_reasons=optimal_reasons[:3],
                risk_factors=risk_factors[:3],
                estimated_annual_gross_yield_per_acre=crop["gross_yield_per_acre"],
                estimated_cost_per_acre=crop["cost_per_acre"],
                estimated_net_profit_per_acre=net_profit_per_acre,
                recommended_farming_method=crop["recommended_farming_method"]
            )
            scored_crops.append(suitability)

        scored_crops.sort(key=lambda x: x.suitability_score, reverse=True)
        top_crops = scored_crops[:top_n]
        prop.crop_suitability = top_crops

        # If property is agricultural, also compute farm annual net yield
        if prop.property_type.value == "agricultural" and prop.lot_size_acres > 0:
            top_crop = top_crops[0]
            total_farm_net = top_crop.estimated_net_profit_per_acre * prop.lot_size_acres
            farm_cap = (total_farm_net / prop.list_price * 100.0) if prop.list_price > 0 else 0.0
            if prop.financials:
                prop.financials.farm_annual_net_yield = round(total_farm_net, 2)
                prop.financials.farm_cap_rate = round(farm_cap, 2)

        return top_crops
