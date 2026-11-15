// Shared design model: types, option lists, defaults and analysis → design mapping.
// Pure module (no React) so it can be used from client components and route handlers.

export const FONT_STYLES = ["Elegant", "Bold", "Script", "Modern", "Playful"] as const;
export const TEXT_PLACEMENTS = ["Front Center", "Back", "Left Chest", "Right Chest", "Sleeve"] as const;
export const PATTERN_TYPES = [
  "Solid",
  "Stripes",
  "Plaid",
  "Floral",
  "Geometric",
  "Polka Dots",
  "Camo",
  "Abstract",
  "Animal Print",
  "Tie-Dye",
] as const;
export const COLLAR_TYPES = [
  "Crew Neck",
  "V-Neck",
  "Polo",
  "Mandarin",
  "Spread",
  "Button-Down",
  "Shawl",
  "Notch Lapel",
  "Stand",
  "Hooded",
] as const;
export const SLEEVE_STYLES = [
  "Short",
  "Long",
  "3/4",
  "Sleeveless",
  "Cap",
  "Bell",
  "Puff",
  "Raglan",
  "Rolled",
  "Bishop",
] as const;
export const FIT_TYPES = ["Slim", "Regular", "Relaxed", "Oversized", "Tailored"] as const;
export const CUT_STYLES = [
  "Straight",
  "A-Line",
  "Tapered",
  "Flared",
  "Asymmetric",
  "Cropped",
  "Longline",
] as const;
export const POCKET_TYPES = [
  "No Pockets",
  "Chest Pocket",
  "Side Pockets",
  "Kangaroo Pocket",
  "Patch Pockets",
  "Hidden Pockets",
] as const;
export const EMBELLISHMENTS = [
  "Buttons",
  "Zipper",
  "Embroidery",
  "Sequins",
  "Rivets",
  "Drawstring",
  "Hood",
  "Belt Loops",
  "Epaulettes",
] as const;
export const GARMENT_TYPES = [
  "T-Shirt",
  "Dress Shirt",
  "Blouse",
  "Jacket",
  "Hoodie",
  "Dress",
  "Pants",
  "Skirt",
  "Coat",
  "Sweater",
] as const;
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export type FontStyle = (typeof FONT_STYLES)[number];
export type TextPlacement = (typeof TEXT_PLACEMENTS)[number];
export type PatternType = (typeof PATTERN_TYPES)[number];
export type CollarType = (typeof COLLAR_TYPES)[number];
export type SleeveStyle = (typeof SLEEVE_STYLES)[number];
export type FitType = (typeof FIT_TYPES)[number];
export type CutStyle = (typeof CUT_STYLES)[number];
export type PocketType = (typeof POCKET_TYPES)[number];
export type Embellishment = (typeof EMBELLISHMENTS)[number];
export type GarmentType = (typeof GARMENT_TYPES)[number];
export type Size = (typeof SIZES)[number];

/** How the design was started. */
export type DesignSource = "scratch" | "photo" | "barcode" | "tag";

export interface DesignColors {
  primary: string;
  secondary: string;
  accent: string;
  useGradient: boolean;
}

export interface DesignText {
  content: string;
  fontStyle: FontStyle;
  placement: TextPlacement;
  color: string;
  size: number; // 1-100
}

export interface DesignPattern {
  type: PatternType;
  scale: number; // 1-100
  color: string;
}

export interface DesignFit {
  type: FitType;
  length: number; // 1-100, 50 = standard length for the garment
  width: number; // 1-100, 50 = standard width for the fit
}

export interface DesignState {
  garmentType: GarmentType;
  size: Size;
  source: DesignSource;
  /** Short description of the original garment when the design came from a scan. */
  basedOn: string | null;
  colors: DesignColors;
  text: DesignText;
  pattern: DesignPattern;
  collar: CollarType;
  sleeve: SleeveStyle;
  fit: DesignFit;
  cut: CutStyle;
  pocket: PocketType;
  pocketCount: number;
  embellishments: Embellishment[];
}

export const defaultDesign: DesignState = {
  garmentType: "T-Shirt",
  size: "M",
  source: "scratch",
  basedOn: null,
  colors: {
    primary: "#7C3AED",
    secondary: "#1A1145",
    accent: "#F59E0B",
    useGradient: false,
  },
  text: {
    content: "",
    fontStyle: "Modern",
    placement: "Front Center",
    color: "#F8F7FF",
    size: 50,
  },
  pattern: {
    type: "Solid",
    scale: 50,
    color: "#C4B5FD",
  },
  collar: "Crew Neck",
  sleeve: "Short",
  fit: {
    type: "Regular",
    length: 50,
    width: 50,
  },
  cut: "Straight",
  pocket: "No Pockets",
  pocketCount: 0,
  embellishments: [],
};

/** Sensible starting points when designing from scratch, per garment. */
export function presetForGarment(type: GarmentType, silhouette?: string | null): DesignState {
  const base: DesignState = {
    ...structuredClone(defaultDesign),
    garmentType: type,
    source: "scratch",
  };
  switch (type) {
    case "Dress Shirt":
      base.collar = "Spread";
      base.sleeve = "Long";
      base.embellishments = ["Buttons"];
      break;
    case "Blouse":
      base.collar = "Mandarin";
      base.sleeve = "Long";
      base.fit.type = "Relaxed";
      break;
    case "Jacket":
      base.collar = "Stand";
      base.sleeve = "Long";
      base.embellishments = ["Zipper"];
      break;
    case "Hoodie":
      base.collar = "Hooded";
      base.sleeve = "Long";
      base.pocket = "Kangaroo Pocket";
      base.pocketCount = 1;
      base.embellishments = ["Drawstring", "Hood"];
      break;
    case "Dress":
      base.sleeve = "Short";
      base.cut = "A-Line";
      break;
    case "Pants":
      base.cut = "Straight";
      base.sleeve = "Sleeveless";
      base.embellishments = ["Belt Loops"];
      break;
    case "Skirt":
      base.cut = "A-Line";
      base.sleeve = "Sleeveless";
      break;
    case "Coat":
      base.collar = "Notch Lapel";
      base.sleeve = "Long";
      base.fit.type = "Tailored";
      base.cut = "Longline";
      base.embellishments = ["Buttons"];
      break;
    case "Sweater":
      base.collar = "Crew Neck";
      base.sleeve = "Long";
      base.fit.type = "Relaxed";
      break;
    default:
      break;
  }
  if (silhouette) applySilhouette(base, silhouette);
  base.basedOn = silhouette ? `${silhouette} ${type}` : null;
  return base;
}

/** Map the free-form silhouette names from the "design from scratch" picker onto design fields. */
function applySilhouette(design: DesignState, silhouette: string) {
  const s = silhouette.toLowerCase();
  if (s.includes("slim") || s.includes("fitted") || s.includes("bodycon")) design.fit.type = "Slim";
  if (s.includes("oversized")) design.fit.type = "Oversized";
  if (s.includes("relaxed")) design.fit.type = "Relaxed";
  if (s.includes("tailored")) design.fit.type = "Tailored";
  if (s.includes("cropped")) design.cut = "Cropped";
  if (s.includes("longline") || s.includes("maxi")) design.cut = "Longline";
  if (s.includes("a-line")) design.cut = "A-Line";
  if (s.includes("tapered") || s.includes("jogger")) design.cut = "Tapered";
  if (s.includes("wide-leg") || s.includes("pleated")) design.cut = "Flared";
  if (s.includes("v-neck")) design.collar = "V-Neck";
  if (s.includes("spread")) design.collar = "Spread";
  if (s.includes("button-down")) design.collar = "Button-Down";
  if (s.includes("turtleneck")) design.collar = "Mandarin";
  if (s.includes("cardigan") || s.includes("zip-up")) {
    if (!design.embellishments.includes("Zipper")) design.embellishments.push("Zipper");
  }
}

// ── Garment analysis (output of the identify service) ─────────────────────────

export interface GarmentAnalysis {
  /** "gemini" = live vision model, "catalog" = barcode catalog hit, "demo" = built-in sample data. */
  provider: "gemini" | "catalog" | "demo";
  garmentType: GarmentType;
  /** Human readable description, e.g. "Slim-Fit Dress Shirt". */
  title: string;
  /** 0-100. Model/catalog self-reported confidence, not a calibrated probability. */
  confidence: number;
  brand: string | null;
  /** Estimated from a photo unless the source says otherwise. */
  measurements: { label: string; value: string }[];
  materials: { name: string; percent: number }[];
  colors: { name: string; hex: string }[];
  features: string[];
  origin?: string | null;
  careInstructions?: string[];
  barcode?: string;
  /** Design vocabulary values that best reproduce the garment. */
  suggested: {
    collar: CollarType;
    sleeve: SleeveStyle;
    fit: FitType;
    cut: CutStyle;
    pocket: PocketType;
    pattern: PatternType;
    embellishments: Embellishment[];
  };
  notes?: string;
}

const HEX = /^#[0-9a-fA-F]{6}$/;

export function designFromAnalysis(a: GarmentAnalysis, source: DesignSource): DesignState {
  const base = presetForGarment(a.garmentType);
  const palette = a.colors.map((c) => c.hex).filter((h) => HEX.test(h));
  return {
    ...base,
    source,
    basedOn: a.brand ? `${a.title} (${a.brand})` : a.title,
    colors: {
      ...base.colors,
      primary: palette[0] ?? base.colors.primary,
      secondary: palette[1] ?? base.colors.secondary,
      accent: palette[2] ?? base.colors.accent,
    },
    pattern: { ...base.pattern, type: a.suggested.pattern },
    collar: a.suggested.collar,
    sleeve: a.suggested.sleeve,
    fit: { ...base.fit, type: a.suggested.fit },
    cut: a.suggested.cut,
    pocket: a.suggested.pocket,
    pocketCount: a.suggested.pocket === "No Pockets" ? 0 : a.suggested.pocket === "Side Pockets" ? 2 : 1,
    embellishments: a.suggested.embellishments,
  };
}

export type GarmentCategory = "top" | "dress" | "pants" | "skirt";

export function garmentCategory(type: GarmentType): GarmentCategory {
  if (type === "Dress") return "dress";
  if (type === "Pants") return "pants";
  if (type === "Skirt") return "skirt";
  return "top";
}

/** Coerce an unknown value onto one of the allowed options. */
export function pick<T extends string>(options: readonly T[], value: unknown, fallback: T): T {
  return typeof value === "string" && (options as readonly string[]).includes(value) ? (value as T) : fallback;
}

/** Shuffle styling choices while keeping the garment type, size and lettering. */
export function randomizeDesign(base: DesignState, rnd: () => number = Math.random): DesignState {
  const one = <T,>(arr: readonly T[]): T => arr[Math.floor(rnd() * arr.length)];
  const palette = ["#7C3AED", "#0F766E", "#BE123C", "#1D4ED8", "#B45309", "#047857", "#9D174D", "#1E293B", "#C2410C", "#4338CA"];
  const accents = ["#F59E0B", "#E8A87C", "#F8FAFC", "#D4A843", "#FDE68A"];
  const pocket = one(POCKET_TYPES);
  const extras = rnd() < 0.5 ? [] : [one(EMBELLISHMENTS)];
  return {
    ...base,
    source: "scratch",
    basedOn: "Surprise design",
    colors: { primary: one(palette), secondary: one(palette), accent: one(accents), useGradient: rnd() < 0.3 },
    pattern: { ...base.pattern, type: rnd() < 0.45 ? "Solid" : one(PATTERN_TYPES), color: one(["#C4B5FD", "#FDE68A", "#FFFFFF", "#FBCFE8"]) },
    collar: one(COLLAR_TYPES),
    sleeve: one(SLEEVE_STYLES),
    fit: { ...base.fit, type: one(FIT_TYPES), length: 40 + Math.floor(rnd() * 30) },
    cut: one(CUT_STYLES),
    pocket,
    pocketCount: pocket === "No Pockets" ? 0 : rnd() < 0.5 ? 1 : 2,
    embellishments: extras,
  };
}
