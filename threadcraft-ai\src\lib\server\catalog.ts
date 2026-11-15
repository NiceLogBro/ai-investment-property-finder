import "server-only";

import type { GarmentAnalysis } from "@/lib/design";

// Demo barcode catalog. Replace `lookupBarcode` with a real product-data provider
// (GS1, UPCitemdb, a retailer feed…) when one is chosen; the route handler only
// depends on the function signature.

const CATALOG: Record<string, GarmentAnalysis> = {
  "4006381333931": {
    provider: "catalog",
    barcode: "4006381333931",
    garmentType: "Dress Shirt",
    title: "Classic Fit Oxford Shirt",
    confidence: 100,
    brand: "Sample Heritage Co.",
    origin: "Made in Italy",
    measurements: [
      { label: "Chest", value: '44"' },
      { label: "Length", value: '29"' },
      { label: "Sleeves", value: '25"' },
      { label: "Collar", value: '16"' },
    ],
    materials: [{ name: "Cotton", percent: 100 }],
    colors: [
      { name: "Oxford Blue", hex: "#6F8FBF" },
      { name: "White", hex: "#F5F5F0" },
    ],
    features: ["Button-Down Collar", "Chest Pocket", "Box Pleat"],
    careInstructions: ["Machine wash cold", "Tumble dry low", "Iron medium heat", "Do not bleach"],
    suggested: {
      collar: "Button-Down",
      sleeve: "Long",
      fit: "Regular",
      cut: "Straight",
      pocket: "Chest Pocket",
      pattern: "Solid",
      embellishments: ["Buttons"],
    },
    notes: "Demo catalog entry.",
  },
  "5000000000005": {
    provider: "catalog",
    barcode: "5000000000005",
    garmentType: "Hoodie",
    title: "Heavyweight Pullover Hoodie",
    confidence: 100,
    brand: "Sample Street Labs",
    origin: "Made in Portugal",
    measurements: [
      { label: "Chest", value: '48"' },
      { label: "Length", value: '27"' },
      { label: "Sleeves", value: '26"' },
    ],
    materials: [
      { name: "Cotton", percent: 80 },
      { name: "Polyester", percent: 20 },
    ],
    colors: [
      { name: "Charcoal", hex: "#3A3A44" },
      { name: "Cream", hex: "#EFE7D6" },
    ],
    features: ["Kangaroo Pocket", "Drawstring Hood", "Ribbed Cuffs"],
    careInstructions: ["Machine wash cold", "Inside out", "Tumble dry low"],
    suggested: {
      collar: "Hooded",
      sleeve: "Long",
      fit: "Relaxed",
      cut: "Straight",
      pocket: "Kangaroo Pocket",
      pattern: "Solid",
      embellishments: ["Drawstring", "Hood"],
    },
    notes: "Demo catalog entry.",
  },
  "3000000000014": {
    provider: "catalog",
    barcode: "3000000000014",
    garmentType: "Dress",
    title: "Floral A-Line Midi Dress",
    confidence: 100,
    brand: "Sample Atelier",
    origin: "Made in France",
    measurements: [
      { label: "Bust", value: '36"' },
      { label: "Waist", value: '29"' },
      { label: "Length", value: '44"' },
    ],
    materials: [
      { name: "Viscose", percent: 95 },
      { name: "Elastane", percent: 5 },
    ],
    colors: [
      { name: "Plum", hex: "#6B2D5C" },
      { name: "Blush", hex: "#F4C7D1" },
    ],
    features: ["A-Line Skirt", "Short Sleeves", "Side Pockets"],
    careInstructions: ["Hand wash cold", "Line dry", "Cool iron"],
    suggested: {
      collar: "V-Neck",
      sleeve: "Short",
      fit: "Regular",
      cut: "A-Line",
      pocket: "Side Pockets",
      pattern: "Floral",
      embellishments: [],
    },
    notes: "Demo catalog entry.",
  },
};

export const SAMPLE_BARCODES = Object.keys(CATALOG);

/** GTIN-8/12/13/14 check digit validation. */
export function isValidGtin(code: string): boolean {
  if (!/^\d+$/.test(code) || ![8, 12, 13, 14].includes(code.length)) return false;
  const digits = code.split("").map(Number);
  const check = digits.pop()!;
  const sum = digits.reverse().reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === check;
}

export async function lookupBarcode(code: string): Promise<GarmentAnalysis | null> {
  return CATALOG[code] ?? null;
}
