// Ready-made starting points shown in the Templates gallery.

import { presetForGarment, type DesignState, type GarmentType } from "./design";

export type TemplateCategory = "Tops" | "Dresses & Skirts" | "Bottoms" | "Outerwear";

export interface DesignTemplate {
  id: string;
  name: string;
  tagline: string;
  category: TemplateCategory;
  tags: string[];
  build: () => DesignState;
}

function make(
  garment: GarmentType,
  edit: (d: DesignState) => void,
  basedOn: string,
): () => DesignState {
  return () => {
    const d = presetForGarment(garment);
    edit(d);
    d.basedOn = basedOn;
    return d;
  };
}

export const TEMPLATES: DesignTemplate[] = [
  {
    id: "midnight-oxford",
    name: "Midnight Oxford",
    tagline: "A tailored navy shirt with gold buttons.",
    category: "Tops",
    tags: ["Classic", "Work"],
    build: make("Dress Shirt", (d) => {
      d.colors = { primary: "#1E293B", secondary: "#0F172A", accent: "#D4A843", useGradient: false };
      d.fit.type = "Tailored";
      d.pocket = "Chest Pocket";
      d.pocketCount = 1;
    }, "Template: Midnight Oxford"),
  },
  {
    id: "varsity-tee",
    name: "Varsity Tee",
    tagline: "Striped teal tee with bold lettering.",
    category: "Tops",
    tags: ["Casual", "Lettering"],
    build: make("T-Shirt", (d) => {
      d.colors = { primary: "#0F766E", secondary: "#115E59", accent: "#F8FAFC", useGradient: false };
      d.pattern = { type: "Stripes", scale: 40, color: "#CCFBF1" };
      d.fit.type = "Relaxed";
      d.text = { content: "EST. 2026", fontStyle: "Bold", placement: "Front Center", color: "#F8FAFC", size: 55 };
    }, "Template: Varsity Tee"),
  },
  {
    id: "silk-noir",
    name: "Silk Blouse Noir",
    tagline: "Flowing black blouse with bell sleeves.",
    category: "Tops",
    tags: ["Evening", "Elegant"],
    build: make("Blouse", (d) => {
      d.colors = { primary: "#111827", secondary: "#1F2937", accent: "#E8A87C", useGradient: false };
      d.sleeve = "Bell";
      d.embellishments = ["Buttons"];
    }, "Template: Silk Blouse Noir"),
  },
  {
    id: "cable-rust",
    name: "Cozy Rust Sweater",
    tagline: "Relaxed knit in warm autumn rust.",
    category: "Tops",
    tags: ["Cozy", "Knit"],
    build: make("Sweater", (d) => {
      d.colors = { primary: "#C2410C", secondary: "#9A3412", accent: "#FDE68A", useGradient: false };
      d.pattern = { type: "Geometric", scale: 35, color: "#FED7AA" };
    }, "Template: Cozy Rust Sweater"),
  },
  {
    id: "garden-party",
    name: "Garden Party Dress",
    tagline: "Floral A-line with cap sleeves and pockets.",
    category: "Dresses & Skirts",
    tags: ["Floral", "Pockets"],
    build: make("Dress", (d) => {
      d.colors = { primary: "#FBCFE8", secondary: "#F9A8D4", accent: "#BE185D", useGradient: false };
      d.pattern = { type: "Floral", scale: 45, color: "#BE185D" };
      d.sleeve = "Cap";
      d.collar = "V-Neck";
      d.pocket = "Side Pockets";
      d.pocketCount = 2;
    }, "Template: Garden Party Dress"),
  },
  {
    id: "plaid-midi",
    name: "Plaid Midi Skirt",
    tagline: "Deep wine plaid with a flared hem.",
    category: "Dresses & Skirts",
    tags: ["Plaid", "Autumn"],
    build: make("Skirt", (d) => {
      d.colors = { primary: "#9F1239", secondary: "#881337", accent: "#FDA4AF", useGradient: false };
      d.pattern = { type: "Plaid", scale: 50, color: "#FDA4AF" };
      d.cut = "Flared";
      d.fit.length = 62;
    }, "Template: Plaid Midi Skirt"),
  },
  {
    id: "stone-trousers",
    name: "Wide-Leg Trousers",
    tagline: "Relaxed stone trousers with belt loops.",
    category: "Bottoms",
    tags: ["Relaxed", "Neutral"],
    build: make("Pants", (d) => {
      d.colors = { primary: "#78716C", secondary: "#57534E", accent: "#E7E5E4", useGradient: false };
      d.cut = "Flared";
      d.fit.type = "Relaxed";
    }, "Template: Wide-Leg Trousers"),
  },
  {
    id: "violet-hoodie",
    name: "Violet Hour Hoodie",
    tagline: "Oversized gradient hoodie with bold text.",
    category: "Outerwear",
    tags: ["Street", "Gradient"],
    build: make("Hoodie", (d) => {
      d.colors = { primary: "#7C3AED", secondary: "#C026D3", accent: "#FCD34D", useGradient: true };
      d.fit.type = "Oversized";
      d.text = { content: "MAGIC", fontStyle: "Bold", placement: "Front Center", color: "#FFFFFF", size: 60 };
    }, "Template: Violet Hour Hoodie"),
  },
  {
    id: "utility-bomber",
    name: "Utility Bomber",
    tagline: "Camo jacket with rivets and epaulettes.",
    category: "Outerwear",
    tags: ["Camo", "Utility"],
    build: make("Jacket", (d) => {
      d.colors = { primary: "#4D5B3A", secondary: "#3A4529", accent: "#D6D3A8", useGradient: false };
      d.pattern = { type: "Camo", scale: 45, color: "#A3B18A" };
      d.pocket = "Patch Pockets";
      d.pocketCount = 2;
      d.embellishments = ["Zipper", "Rivets", "Epaulettes"];
    }, "Template: Utility Bomber"),
  },
  {
    id: "tux-coat",
    name: "Evening Overcoat",
    tagline: "Longline coat with notch lapels.",
    category: "Outerwear",
    tags: ["Formal", "Longline"],
    build: make("Coat", (d) => {
      d.colors = { primary: "#0F172A", secondary: "#1E293B", accent: "#D4A843", useGradient: false };
      d.embellishments = ["Buttons", "Epaulettes"];
    }, "Template: Evening Overcoat"),
  },
];

export const TEMPLATE_CATEGORIES: ("All" | TemplateCategory)[] = ["All", "Tops", "Dresses & Skirts", "Bottoms", "Outerwear"];
