// Client-safe sanitizer: rebuilds a trusted DesignState from untrusted JSON
// (request bodies, share links, localStorage). Anything invalid falls back to defaults.

import {
  COLLAR_TYPES,
  CUT_STYLES,
  EMBELLISHMENTS,
  FIT_TYPES,
  FONT_STYLES,
  GARMENT_TYPES,
  PATTERN_TYPES,
  POCKET_TYPES,
  SIZES,
  SLEEVE_STYLES,
  TEXT_PLACEMENTS,
  defaultDesign,
  pick,
  type DesignState,
} from "./design";

type Raw = Record<string, unknown>;
const obj = (v: unknown): Raw => (v && typeof v === "object" && !Array.isArray(v) ? (v as Raw) : {});
const hex = (v: unknown, fallback: string) => (typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v) ? v : fallback);
const num = (v: unknown, fallback: number, min: number, max: number) =>
  typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : fallback;

export function sanitizeDesign(input: unknown): DesignState {
  const d = defaultDesign;
  const r = obj(input);
  const colors = obj(r.colors);
  const text = obj(r.text);
  const pattern = obj(r.pattern);
  const fit = obj(r.fit);
  const pocket = pick(POCKET_TYPES, r.pocket, d.pocket);
  return {
    garmentType: pick(GARMENT_TYPES, r.garmentType, d.garmentType),
    size: pick(SIZES, r.size, d.size),
    source: pick(["scratch", "photo", "barcode", "tag"] as const, r.source, "scratch"),
    basedOn: typeof r.basedOn === "string" ? r.basedOn.slice(0, 120) : null,
    colors: {
      primary: hex(colors.primary, d.colors.primary),
      secondary: hex(colors.secondary, d.colors.secondary),
      accent: hex(colors.accent, d.colors.accent),
      useGradient: colors.useGradient === true,
    },
    text: {
      content: typeof text.content === "string" ? text.content.slice(0, 40) : "",
      fontStyle: pick(FONT_STYLES, text.fontStyle, d.text.fontStyle),
      placement: pick(TEXT_PLACEMENTS, text.placement, d.text.placement),
      color: hex(text.color, d.text.color),
      size: num(text.size, d.text.size, 1, 100),
    },
    pattern: {
      type: pick(PATTERN_TYPES, pattern.type, d.pattern.type),
      scale: num(pattern.scale, d.pattern.scale, 1, 100),
      color: hex(pattern.color, d.pattern.color),
    },
    collar: pick(COLLAR_TYPES, r.collar, d.collar),
    sleeve: pick(SLEEVE_STYLES, r.sleeve, d.sleeve),
    fit: {
      type: pick(FIT_TYPES, fit.type, d.fit.type),
      length: num(fit.length, 50, 1, 100),
      width: num(fit.width, 50, 1, 100),
    },
    cut: pick(CUT_STYLES, r.cut, d.cut),
    pocket,
    pocketCount: pocket === "No Pockets" ? 0 : Math.round(num(r.pocketCount, 1, 0, 4)),
    embellishments: Array.isArray(r.embellishments)
      ? Array.from(
          new Set(
            r.embellishments.filter((e): e is (typeof EMBELLISHMENTS)[number] =>
              (EMBELLISHMENTS as readonly unknown[]).includes(e),
            ),
          ),
        )
      : [],
  };
}
