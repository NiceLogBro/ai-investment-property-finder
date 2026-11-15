// Color helpers used for palette suggestions in the customizer.

export interface Hsl {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function hexToHsl(hex: string): Hsl {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return { h: 270, s: 70, l: 50 };
  const n = parseInt(m[1], 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
}

export function hslToHex({ h, s, l }: Hsl): string {
  const sat = clamp(s, 0, 100) / 100;
  const lig = clamp(l, 0, 100) / 100;
  const hue = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * lig - 1)) * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lig - c / 2;
  const [r, g, b] =
    hue < 60 ? [c, x, 0] : hue < 120 ? [x, c, 0] : hue < 180 ? [0, c, x] : hue < 240 ? [0, x, c] : hue < 300 ? [x, 0, c] : [c, 0, x];
  const to = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

export interface PaletteSuggestion {
  name: string;
  description: string;
  secondary: string;
  accent: string;
}

/** Classic color-harmony suggestions derived from the chosen primary color. */
export function suggestPalettes(primary: string): PaletteSuggestion[] {
  const { h, s, l } = hexToHsl(primary);
  const sat = clamp(s, 30, 85);
  const at = (deg: number, light: number) => hslToHex({ h: h + deg, s: sat, l: clamp(light, 18, 82) });
  return [
    { name: "Complementary", description: "Bold contrast", secondary: at(180, l - 10), accent: at(180, l + 25) },
    { name: "Analogous", description: "Calm and cohesive", secondary: at(-30, l), accent: at(30, l + 15) },
    { name: "Triadic", description: "Playful and balanced", secondary: at(120, l), accent: at(240, l) },
    { name: "Monochrome", description: "Tonal depth", secondary: at(0, l - 25), accent: at(0, l + 30) },
    { name: "Classic Neutral", description: "Charcoal and gold", secondary: "#1F2937", accent: "#D4A843" },
  ];
}
