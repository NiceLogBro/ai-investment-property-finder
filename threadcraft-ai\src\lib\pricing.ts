// Single source of truth for pricing. Used by the customizer, preview, checkout UI and
// (authoritatively) by the /api/orders route handler, which recomputes the total server side.

import type { DesignState, GarmentType } from "./design";

export type ShippingMethod = "standard" | "express" | "priority";

export interface ShippingOption {
  id: ShippingMethod;
  label: string;
  time: string;
  price: number;
  /** Rough delivery window in days, used for the estimated delivery date. */
  days: number;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "standard", label: "Standard Shipping", time: "7-14 business days", price: 4.99, days: 17 },
  { id: "express", label: "Express Shipping", time: "3-5 business days", price: 12.99, days: 8 },
  { id: "priority", label: "Priority Shipping", time: "1-2 business days", price: 24.99, days: 4 },
];

export const TAX_RATE = 0.0825;
export const MAX_QUANTITY = 10;

export const BASE_PRICES: Record<GarmentType, number> = {
  "T-Shirt": 29,
  "Dress Shirt": 49,
  Blouse: 44,
  Jacket: 89,
  Hoodie: 59,
  Dress: 69,
  Pants: 54,
  Skirt: 42,
  Coat: 119,
  Sweater: 64,
};

export const EMBELLISHMENT_PRICES: Record<string, number> = {
  Buttons: 3,
  Zipper: 6,
  Embroidery: 9,
  Sequins: 12,
  Rivets: 5,
  Drawstring: 3,
  Hood: 8,
  "Belt Loops": 3,
  Epaulettes: 5,
};

const SLEEVE_SURCHARGE: Record<string, number> = { Bell: 4, Puff: 5, Bishop: 5, Raglan: 3 };
const COLLAR_SURCHARGE: Record<string, number> = { "Notch Lapel": 6, Shawl: 5, Hooded: 0, Mandarin: 2, Spread: 2, "Button-Down": 2 };

export interface PriceLine {
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  /** Garment + customizations, per unit. */
  lines: PriceLine[];
  unitPrice: number;
  quantity: number;
  subtotal: number;
  shipping: ShippingOption;
  tax: number;
  total: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function clampQuantity(q: unknown): number {
  const n = typeof q === "number" ? Math.floor(q) : 1;
  return Math.min(MAX_QUANTITY, Math.max(1, Number.isFinite(n) ? n : 1));
}

export function shippingById(id: unknown): ShippingOption {
  return SHIPPING_OPTIONS.find((s) => s.id === id) ?? SHIPPING_OPTIONS[0];
}

/** Itemized per-unit price for a design. */
export function priceLines(design: DesignState): PriceLine[] {
  const lines: PriceLine[] = [{ label: `${design.garmentType} (base)`, amount: BASE_PRICES[design.garmentType] }];

  if (design.pattern.type !== "Solid") lines.push({ label: `${design.pattern.type} pattern`, amount: 8 });
  if (design.colors.useGradient) lines.push({ label: "Gradient dye", amount: 5 });

  const letters = design.text.content.trim().length;
  if (letters > 0) {
    lines.push({ label: "Custom lettering", amount: 6.5 + Math.max(0, letters - 12) * 0.5 });
  }

  const sleeve = SLEEVE_SURCHARGE[design.sleeve];
  if (sleeve) lines.push({ label: `${design.sleeve} sleeves`, amount: sleeve });
  const collar = COLLAR_SURCHARGE[design.collar];
  if (collar) lines.push({ label: `${design.collar} collar`, amount: collar });

  if (design.fit.type === "Oversized") lines.push({ label: "Oversized fabric allowance", amount: 4 });
  const lengthDelta = Math.abs(design.fit.length - 50);
  if (design.fit.length > 70) lines.push({ label: "Extended length", amount: round2(3 + (lengthDelta - 20) * 0.1) });
  if (design.cut === "Asymmetric") lines.push({ label: "Asymmetric cut", amount: 6 });

  if (design.pocket !== "No Pockets" && design.pocketCount > 0) {
    lines.push({ label: `${design.pocket} × ${design.pocketCount}`, amount: design.pocketCount * 4 });
  }
  for (const e of design.embellishments) {
    lines.push({ label: e, amount: EMBELLISHMENT_PRICES[e] ?? 5 });
  }
  return lines.map((l) => ({ ...l, amount: round2(l.amount) }));
}

export function priceDesign(
  design: DesignState,
  quantity: number = 1,
  shippingMethod: ShippingMethod = "standard",
): PriceBreakdown {
  const lines = priceLines(design);
  const unitPrice = round2(lines.reduce((sum, l) => sum + l.amount, 0));
  const qty = clampQuantity(quantity);
  const shipping = shippingById(shippingMethod);
  const subtotal = round2(unitPrice * qty);
  const tax = round2(subtotal * TAX_RATE);
  return { lines, unitPrice, quantity: qty, subtotal, shipping, tax, total: round2(subtotal + shipping.price + tax) };
}

export const formatMoney = (n: number) => `$${n.toFixed(2)}`;
