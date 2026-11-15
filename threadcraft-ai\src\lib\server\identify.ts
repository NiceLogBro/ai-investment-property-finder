import "server-only";

import {
  COLLAR_TYPES,
  CUT_STYLES,
  EMBELLISHMENTS,
  FIT_TYPES,
  GARMENT_TYPES,
  PATTERN_TYPES,
  POCKET_TYPES,
  SLEEVE_STYLES,
  pick,
  type GarmentAnalysis,
} from "@/lib/design";

// ── Provider interface ────────────────────────────────────────────────────────
// Swap implementations here (Gemini today, or any other vision / catalog provider).

export interface IdentifyInput {
  kind: "photo" | "tag";
  /** Base64 without the data: prefix. */
  imageBase64: string;
  mimeType: string;
}

export interface GarmentIdentifier {
  identify(input: IdentifyInput): Promise<GarmentAnalysis>;
}

// ── Demo identifier (no API key needed) ───────────────────────────────────────

export const DEMO_ANALYSIS: GarmentAnalysis = {
  provider: "demo",
  garmentType: "Dress Shirt",
  title: "Slim-Fit Dress Shirt",
  confidence: 90,
  brand: null,
  measurements: [
    { label: "Chest", value: '42"' },
    { label: "Waist", value: '38"' },
    { label: "Length", value: '30"' },
    { label: "Sleeves", value: '25"' },
    { label: "Shoulders", value: '18.5"' },
    { label: "Collar", value: '16"' },
  ],
  materials: [
    { name: "Cotton", percent: 72 },
    { name: "Polyester", percent: 20 },
    { name: "Elastane", percent: 8 },
  ],
  colors: [
    { name: "Navy Blue", hex: "#1E3A5F" },
    { name: "Slate Gray", hex: "#708090" },
    { name: "Off White", hex: "#FAF9F6" },
    { name: "Gold Accent", hex: "#D4A843" },
  ],
  features: ["Spread Collar", "French Cuffs", "Chest Pocket", "Darted Back", "Mother-of-Pearl Buttons", "Split Yoke"],
  suggested: {
    collar: "Spread",
    sleeve: "Long",
    fit: "Slim",
    cut: "Straight",
    pocket: "Chest Pocket",
    pattern: "Solid",
    embellishments: ["Buttons"],
  },
  notes: "Sample result. Set GEMINI_API_KEY on the server to analyze your own photos.",
};

export const DemoIdentifier: GarmentIdentifier = {
  async identify() {
    await new Promise((r) => setTimeout(r, 900));
    return DEMO_ANALYSIS;
  },
};

// ── Gemini identifier ─────────────────────────────────────────────────────────

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const PROMPTS: Record<IdentifyInput["kind"], string> = {
  photo:
    "You are a garment analyst for a custom clothing service. Analyze the main garment in this photo. " +
    "Only name a brand if a logo, label or distinctive trademark is actually visible; otherwise set brand to null. " +
    "Measurements are rough estimates in inches for a typical adult size M garment laid flat; do not claim precision. " +
    "Material percentages must sum to 100 and are your best visual guess. " +
    "Pick design vocabulary values strictly from the allowed enums. Colors must be 6-digit hex.",
  tag:
    "You are reading a clothing care/size/material tag. Extract only what is printed: brand, fiber composition percentages, " +
    "country of origin, care instructions. If the garment type is not stated, infer it conservatively. " +
    "If a field is not legible set it to null or an empty list. Pick design vocabulary values from the enums. Colors must be 6-digit hex (use neutral guesses if no garment is visible).",
};

const enumOf = (values: readonly string[]) => ({ type: "STRING", enum: [...values] });

const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    garmentType: enumOf(GARMENT_TYPES),
    title: { type: "STRING" },
    confidence: { type: "NUMBER" },
    brand: { type: "STRING", nullable: true },
    origin: { type: "STRING", nullable: true },
    measurements: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: { label: { type: "STRING" }, value: { type: "STRING" } },
        required: ["label", "value"],
      },
    },
    materials: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: { name: { type: "STRING" }, percent: { type: "NUMBER" } },
        required: ["name", "percent"],
      },
    },
    colors: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: { name: { type: "STRING" }, hex: { type: "STRING" } },
        required: ["name", "hex"],
      },
    },
    features: { type: "ARRAY", items: { type: "STRING" } },
    careInstructions: { type: "ARRAY", items: { type: "STRING" } },
    collar: enumOf(COLLAR_TYPES),
    sleeve: enumOf(SLEEVE_STYLES),
    fit: enumOf(FIT_TYPES),
    cut: enumOf(CUT_STYLES),
    pocket: enumOf(POCKET_TYPES),
    pattern: enumOf(PATTERN_TYPES),
    embellishments: { type: "ARRAY", items: enumOf(EMBELLISHMENTS) },
  },
  required: ["garmentType", "title", "confidence", "measurements", "materials", "colors", "features", "collar", "sleeve", "fit", "cut", "pocket", "pattern"],
} as const;

type Raw = Record<string, unknown>;

const asArray = (v: unknown): Raw[] => (Array.isArray(v) ? (v.filter((x) => x && typeof x === "object") as Raw[]) : []);
const asStr = (v: unknown, max = 80) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Never trust model output: coerce everything onto our vocabulary and sane ranges. */
export function normalizeAnalysis(raw: Raw, kind: IdentifyInput["kind"]): GarmentAnalysis {
  const materials = asArray(raw.materials)
    .map((m) => ({ name: asStr(m.name, 40), percent: Math.round(Number(m.percent)) }))
    .filter((m) => m.name && Number.isFinite(m.percent) && m.percent > 0 && m.percent <= 100)
    .slice(0, 6);

  const colors = asArray(raw.colors)
    .map((c) => ({ name: asStr(c.name, 40), hex: asStr(c.hex, 7) }))
    .filter((c) => c.name && /^#[0-9a-fA-F]{6}$/.test(c.hex))
    .slice(0, 5);

  const embellishments = Array.isArray(raw.embellishments)
    ? Array.from(new Set(raw.embellishments.map((e) => pick(EMBELLISHMENTS, e, "" as never)).filter(Boolean)))
    : [];

  const confidence = Math.min(100, Math.max(0, Number(raw.confidence) || 0));

  return {
    provider: "gemini",
    garmentType: pick(GARMENT_TYPES, raw.garmentType, "T-Shirt"),
    title: asStr(raw.title, 80) || "Garment",
    // Models often answer 0-1; accept both.
    confidence: Math.round((confidence <= 1 ? confidence * 100 : confidence) * 10) / 10,
    brand: asStr(raw.brand, 60) || null,
    origin: asStr(raw.origin, 60) || null,
    measurements: asArray(raw.measurements)
      .map((m) => ({ label: asStr(m.label, 24), value: asStr(m.value, 16) }))
      .filter((m) => m.label && m.value)
      .slice(0, 8),
    materials,
    colors: colors.length ? colors : [{ name: "Neutral", hex: "#7C3AED" }],
    features: Array.isArray(raw.features) ? raw.features.map((f) => asStr(f, 60)).filter(Boolean).slice(0, 10) : [],
    careInstructions: Array.isArray(raw.careInstructions)
      ? raw.careInstructions.map((c) => asStr(c, 60)).filter(Boolean).slice(0, 8)
      : [],
    suggested: {
      collar: pick(COLLAR_TYPES, raw.collar, "Crew Neck"),
      sleeve: pick(SLEEVE_STYLES, raw.sleeve, "Short"),
      fit: pick(FIT_TYPES, raw.fit, "Regular"),
      cut: pick(CUT_STYLES, raw.cut, "Straight"),
      pocket: pick(POCKET_TYPES, raw.pocket, "No Pockets"),
      pattern: pick(PATTERN_TYPES, raw.pattern, "Solid"),
      embellishments,
    },
    notes:
      kind === "photo"
        ? "Brand and measurements are AI estimates from a single photo. Verify against a real garment before ordering."
        : "Read from the tag image by AI. Double-check composition and origin.",
  };
}

export function geminiIdentifier(apiKey: string): GarmentIdentifier {
  return {
    async identify({ kind, imageBase64, mimeType }) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: PROMPTS[kind] }, { inline_data: { mime_type: mimeType, data: imageBase64 } }],
              },
            ],
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: RESPONSE_SCHEMA,
              temperature: 0.2,
            },
          }),
          signal: AbortSignal.timeout(45_000),
        },
      );
      if (!res.ok) {
        throw new Error(`Gemini request failed (${res.status})`);
      }
      const data = (await res.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Gemini returned no content");
      return normalizeAnalysis(JSON.parse(text) as Raw, kind);
    },
  };
}

export function getIdentifier(): GarmentIdentifier {
  const key = process.env.GEMINI_API_KEY;
  return key ? geminiIdentifier(key) : DemoIdentifier;
}
