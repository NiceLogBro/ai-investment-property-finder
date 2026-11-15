"use client";

import React, { useState } from "react";
import { useDesign } from "@/context/DesignContext";
import Link from "next/link";

// ── Helper: pattern fill for SVG ──────────────────────────────────────────────
export function PatternDefs({ patternType, patternColor, scale }: { patternType: string; patternColor: string; scale: number }) {
  const s = Math.max(4, scale / 5);
  switch (patternType) {
    case "Stripes":
      return (
        <pattern id="pat" patternUnits="userSpaceOnUse" width={s} height={s * 2}>
          <rect width={s} height={s} fill={patternColor} opacity={0.25} />
        </pattern>
      );
    case "Polka Dots":
      return (
        <pattern id="pat" patternUnits="userSpaceOnUse" width={s * 2} height={s * 2}>
          <circle cx={s} cy={s} r={s / 3} fill={patternColor} opacity={0.3} />
        </pattern>
      );
    case "Plaid":
      return (
        <pattern id="pat" patternUnits="userSpaceOnUse" width={s * 2} height={s * 2}>
          <rect width={s} height={s * 2} fill={patternColor} opacity={0.12} />
          <rect width={s * 2} height={s} fill={patternColor} opacity={0.12} />
        </pattern>
      );
    case "Geometric":
      return (
        <pattern id="pat" patternUnits="userSpaceOnUse" width={s * 2} height={s * 2}>
          <polygon points={`0,0 ${s * 2},0 ${s},${s * 2}`} fill={patternColor} opacity={0.18} />
        </pattern>
      );
    case "Floral":
      return (
        <pattern id="pat" patternUnits="userSpaceOnUse" width={s * 3} height={s * 3}>
          <circle cx={s * 1.5} cy={s * 1.5} r={s / 2} fill={patternColor} opacity={0.2} />
          <circle cx={s * 1.5} cy={s * 0.5} r={s / 4} fill={patternColor} opacity={0.15} />
          <circle cx={s * 0.7} cy={s * 2} r={s / 4} fill={patternColor} opacity={0.15} />
          <circle cx={s * 2.3} cy={s * 2} r={s / 4} fill={patternColor} opacity={0.15} />
        </pattern>
      );
    case "Camo":
      return (
        <pattern id="pat" patternUnits="userSpaceOnUse" width={s * 3} height={s * 3}>
          <ellipse cx={s} cy={s} rx={s * 1.2} ry={s * 0.6} fill={patternColor} opacity={0.2} />
          <ellipse cx={s * 2.5} cy={s * 2} rx={s * 0.8} ry={s * 0.5} fill={patternColor} opacity={0.15} />
        </pattern>
      );
    case "Abstract":
      return (
        <pattern id="pat" patternUnits="userSpaceOnUse" width={s * 4} height={s * 4}>
          <path d={`M0,${s * 2} Q${s * 2},0 ${s * 4},${s * 2}`} fill="none" stroke={patternColor} strokeWidth={1} opacity={0.25} />
          <path d={`M0,${s * 3} Q${s * 2},${s} ${s * 4},${s * 3}`} fill="none" stroke={patternColor} strokeWidth={1} opacity={0.2} />
        </pattern>
      );
    case "Animal Print":
      return (
        <pattern id="pat" patternUnits="userSpaceOnUse" width={s * 3} height={s * 3}>
          <ellipse cx={s} cy={s} rx={s * 0.6} ry={s * 0.4} fill={patternColor} opacity={0.22} transform="rotate(20)" />
          <ellipse cx={s * 2.2} cy={s * 2.2} rx={s * 0.5} ry={s * 0.35} fill={patternColor} opacity={0.18} transform="rotate(-15)" />
        </pattern>
      );
    case "Tie-Dye":
      return (
        <pattern id="pat" patternUnits="userSpaceOnUse" width={s * 5} height={s * 5}>
          <circle cx={s * 2.5} cy={s * 2.5} r={s * 2} fill="none" stroke={patternColor} strokeWidth={2} opacity={0.15} />
          <circle cx={s * 2.5} cy={s * 2.5} r={s * 1.2} fill="none" stroke={patternColor} strokeWidth={2} opacity={0.2} />
          <circle cx={s * 2.5} cy={s * 2.5} r={s * 0.5} fill={patternColor} opacity={0.18} />
        </pattern>
      );
    default:
      return null;
  }
}

// ── Collar path helpers ─────────────────────────────────────────────────────────
export function getCollarPath(collar: string): string {
  switch (collar) {
    case "V-Neck":
      return "M 115,68 L 150,105 L 185,68";
    case "Polo":
      return "M 112,68 Q 125,65 135,72 L 150,85 L 165,72 Q 175,65 188,68";
    case "Mandarin":
      return "M 120,68 L 120,58 Q 150,52 180,58 L 180,68";
    case "Spread":
      return "M 110,68 L 125,55 L 140,70 L 150,80 L 160,70 L 175,55 L 190,68";
    case "Button-Down":
      return "M 112,68 L 128,55 L 140,68 L 150,78 L 160,68 L 172,55 L 188,68";
    case "Shawl":
      return "M 110,68 Q 120,60 135,75 Q 150,90 165,75 Q 180,60 190,68";
    case "Notch Lapel":
      return "M 108,68 L 120,50 L 132,65 L 150,85 L 168,65 L 180,50 L 192,68";
    case "Stand":
      return "M 122,68 L 122,60 Q 150,54 178,60 L 178,68";
    case "Hooded":
      return "M 108,68 Q 110,40 150,30 Q 190,40 192,68";
    default: // Crew Neck
      return "M 120,68 Q 150,82 180,68";
  }
}

// ── Sleeve geometry ─────────────────────────────────────────────────────────────
function getSleeveGeometry(sleeve: string) {
  const base = { leftPath: "", rightPath: "" };
  switch (sleeve) {
    case "Sleeveless":
      return {
        leftPath: "M 82,72 L 82,78 Q 84,82 88,84",
        rightPath: "M 218,72 L 218,78 Q 216,82 212,84",
      };
    case "Cap":
      return {
        leftPath: "M 82,72 L 60,85 Q 65,95 82,95",
        rightPath: "M 218,72 L 240,85 Q 235,95 218,95",
      };
    case "Short":
      return {
        leftPath: "M 82,72 L 48,100 Q 52,115 70,118 L 82,108",
        rightPath: "M 218,72 L 252,100 Q 248,115 230,118 L 218,108",
      };
    case "3/4":
      return {
        leftPath: "M 82,72 L 35,115 Q 38,155 52,158 L 82,140",
        rightPath: "M 218,72 L 265,115 Q 262,155 248,158 L 218,140",
      };
    case "Bell":
      return {
        leftPath: "M 82,72 L 30,125 Q 15,175 10,190 L 82,170",
        rightPath: "M 218,72 L 270,125 Q 285,175 290,190 L 218,170",
      };
    case "Puff":
      return {
        leftPath: "M 82,72 Q 40,75 42,100 Q 44,115 68,118 L 82,108",
        rightPath: "M 218,72 Q 260,75 258,100 Q 256,115 232,118 L 218,108",
      };
    case "Raglan":
      return {
        leftPath: "M 120,68 L 48,100 Q 52,115 70,118 L 82,108",
        rightPath: "M 180,68 L 252,100 Q 248,115 230,118 L 218,108",
      };
    case "Rolled":
      return {
        leftPath: "M 82,72 L 48,100 Q 52,112 66,115 L 68,110 Q 55,108 52,100",
        rightPath: "M 218,72 L 252,100 Q 248,112 234,115 L 232,110 Q 245,108 248,100",
      };
    case "Bishop":
      return {
        leftPath: "M 82,72 L 35,115 Q 30,170 45,185 Q 50,188 55,185 L 82,170",
        rightPath: "M 218,72 L 265,115 Q 270,170 255,185 Q 250,188 245,185 L 218,170",
      };
    default: // Long
      return {
        leftPath: "M 82,72 L 30,125 Q 35,185 50,190 L 82,170",
        rightPath: "M 218,72 L 270,125 Q 265,185 250,190 L 218,170",
      };
  }
}

// ── Text placement coords ───────────────────────────────────────────────────────
function getTextPosition(placement: string): { x: number; y: number } {
  switch (placement) {
    case "Back":
      return { x: 150, y: 145 };
    case "Left Chest":
      return { x: 120, y: 110 };
    case "Right Chest":
      return { x: 180, y: 110 };
    case "Sleeve":
      return { x: 62, y: 95 };
    default: // Front Center
      return { x: 150, y: 140 };
  }
}

// ── Body path (affected by fit & cut) ───────────────────────────────────────────
function getBodyPath(fit: string, cut: string, lengthVal: number) {
  const baseBottom = 170 + (lengthVal - 50) * 0.6;
  let widthLeft = 82;
  let widthRight = 218;
  let bottomLeft = widthLeft;
  let bottomRight = widthRight;

  // Fit adjustments
  if (fit === "Slim") { widthLeft += 8; widthRight -= 8; }
  else if (fit === "Relaxed") { widthLeft -= 5; widthRight += 5; }
  else if (fit === "Oversized") { widthLeft -= 12; widthRight += 12; }
  else if (fit === "Tailored") { widthLeft += 3; widthRight -= 3; }

  // Cut adjustments
  if (cut === "A-Line") { bottomLeft = widthLeft - 15; bottomRight = widthRight + 15; }
  else if (cut === "Tapered") { bottomLeft = widthLeft + 10; bottomRight = widthRight - 10; }
  else if (cut === "Flared") { bottomLeft = widthLeft - 20; bottomRight = widthRight + 20; }
  else if (cut === "Asymmetric") { bottomLeft = widthLeft - 5; bottomRight = widthRight + 12; }
  else if (cut === "Cropped") { /* handled by length */ }
  else if (cut === "Longline") { /* handled by length */ }
  else { bottomLeft = widthLeft; bottomRight = widthRight; }

  const effectiveBottom = cut === "Cropped" ? Math.min(baseBottom, 170) : cut === "Longline" ? Math.max(baseBottom, 210) : baseBottom;

  return `M ${widthLeft},72 L ${widthLeft},${effectiveBottom - 20} Q ${widthLeft},${effectiveBottom} ${bottomLeft},${effectiveBottom} L ${bottomRight},${effectiveBottom} Q ${widthRight},${effectiveBottom} ${widthRight},${effectiveBottom - 20} L ${widthRight},72`;
}

// ── Pocket SVG ──────────────────────────────────────────────────────────────────
function PocketOverlay({ pocket, pocketCount }: { pocket: string; pocketCount: number }) {
  if (pocket === "No Pockets") return null;
  const strokeColor = "rgba(255,255,255,0.35)";
  switch (pocket) {
    case "Chest Pocket":
      return (
        <g>
          <rect x={160} y={100} width={22} height={18} rx={2} fill="none" stroke={strokeColor} strokeWidth={1.2} />
          <line x1={160} y1={100} x2={182} y2={100} stroke={strokeColor} strokeWidth={1.5} />
        </g>
      );
    case "Side Pockets":
      return (
        <g>
          <rect x={90} y={155} width={24} height={20} rx={2} fill="none" stroke={strokeColor} strokeWidth={1.2} />
          <rect x={186} y={155} width={24} height={20} rx={2} fill="none" stroke={strokeColor} strokeWidth={1.2} />
        </g>
      );
    case "Kangaroo Pocket":
      return (
        <path d="M 115,145 Q 115,170 150,172 Q 185,170 185,145" fill="none" stroke={strokeColor} strokeWidth={1.2} />
      );
    case "Patch Pockets":
      return (
        <g>
          {pocketCount >= 1 && <rect x={100} y={130} width={20} height={22} rx={2} fill="none" stroke={strokeColor} strokeWidth={1.2} />}
          {pocketCount >= 2 && <rect x={180} y={130} width={20} height={22} rx={2} fill="none" stroke={strokeColor} strokeWidth={1.2} />}
        </g>
      );
    case "Hidden Pockets":
      return (
        <g>
          <line x1={90} y1={145} x2={90} y2={165} stroke={strokeColor} strokeWidth={1} strokeDasharray="3,2" />
          <line x1={210} y1={145} x2={210} y2={165} stroke={strokeColor} strokeWidth={1} strokeDasharray="3,2" />
        </g>
      );
    default:
      return null;
  }
}

// ── Embellishment dots ──────────────────────────────────────────────────────────
function EmbellishmentOverlay({ embellishments }: { embellishments: string[] }) {
  if (embellishments.length === 0) return null;
  return (
    <g>
      {embellishments.includes("Buttons") && (
        <g>
          {[90, 110, 130, 150, 165].map((y) => (
            <circle key={y} cx={150} cy={y} r={2} fill="rgba(255,255,255,0.45)" />
          ))}
        </g>
      )}
      {embellishments.includes("Zipper") && (
        <line x1={150} y1={82} x2={150} y2={180} stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} strokeDasharray="4,3" />
      )}
      {embellishments.includes("Drawstring") && (
        <path d="M 130,180 Q 140,186 150,183 Q 160,186 170,180" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
      )}
      {embellishments.includes("Hood") && (
        <path d="M 108,68 Q 105,35 150,22 Q 195,35 192,68" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={1.2} strokeDasharray="4,3" />
      )}
      {embellishments.includes("Embroidery") && (
        <g opacity={0.35}>
          <circle cx={170} cy={105} r={5} fill="none" stroke="white" strokeWidth={0.8} />
          <path d="M167,105 L170,100 L173,105 L170,110 Z" fill="none" stroke="white" strokeWidth={0.6} />
        </g>
      )}
      {embellishments.includes("Sequins") && (
        <g opacity={0.3}>
          {[105, 120, 135, 150].map((y) =>
            [130, 145, 160, 170].map((x) => (
              <circle key={`${x}-${y}`} cx={x + (y % 2 === 0 ? 3 : 0)} cy={y} r={1.2} fill="rgba(245,158,11,0.6)" />
            ))
          )}
        </g>
      )}
    </g>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────────

export default function ClothingPreview() {
  const { design } = useDesign();
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  const { colors, text, pattern, collar, sleeve, fit, cut, pocket, pocketCount, embellishments } = design;

  const bodyPath = getBodyPath(fit.type, cut, fit.length);
  const { leftPath, rightPath } = getSleeveGeometry(sleeve);
  const collarPath = getCollarPath(collar);
  const textPos = getTextPosition(text.placement);

  const fillColor = colors.useGradient ? "url(#bodyGrad)" : colors.primary;
  const sleeveFill = colors.useGradient ? "url(#sleeveGrad)" : colors.secondary;

  const fontMap: Record<string, string> = {
    Elegant: "serif",
    Bold: "Impact, sans-serif",
    Script: "cursive",
    Modern: "system-ui, sans-serif",
    Playful: "Comic Sans MS, cursive",
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Preview container */}
      <div className="relative w-full max-w-md aspect-square rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 flex items-center justify-center overflow-hidden group">
        {/* Glow background */}
        <div
          className="absolute inset-0 opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 50% 40%, ${colors.primary}55, transparent 70%)`,
          }}
        />

        {/* SVG Preview */}
        <svg
          viewBox="0 0 300 260"
          className="w-[85%] h-[85%] drop-shadow-2xl transition-transform duration-500"
          style={{ transform: `scale(${zoom}) rotate(${rotation}deg)` }}
          role="img"
          aria-label="Clothing preview"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
            <linearGradient id="sleeveGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={colors.secondary} />
              <stop offset="100%" stopColor={colors.primary} />
            </linearGradient>
            {/* Pattern */}
            {pattern.type !== "Solid" && (
              <PatternDefs patternType={pattern.type} patternColor={pattern.color} scale={pattern.scale} />
            )}
            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Shadow */}
          <ellipse cx={150} cy={240} rx={65} ry={8} fill="rgba(0,0,0,0.25)" />

          {/* Body */}
          <path d={bodyPath} fill={fillColor} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
          {pattern.type !== "Solid" && <path d={bodyPath} fill="url(#pat)" />}

          {/* Sleeves */}
          <path d={leftPath} fill={sleeveFill} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
          <path d={rightPath} fill={sleeveFill} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
          {pattern.type !== "Solid" && (
            <>
              <path d={leftPath} fill="url(#pat)" />
              <path d={rightPath} fill="url(#pat)" />
            </>
          )}

          {/* Collar */}
          <path
            d={collarPath}
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Neckline fill */}
          <path d={`M 120,68 Q 150,58 180,68`} fill="rgba(0,0,0,0.2)" />

          {/* Shoulders */}
          <line x1={82} y1={72} x2={120} y2={68} stroke="rgba(255,255,255,0.1)" strokeWidth={1.5} />
          <line x1={218} y1={72} x2={180} y2={68} stroke="rgba(255,255,255,0.1)" strokeWidth={1.5} />

          {/* Pockets */}
          <PocketOverlay pocket={pocket} pocketCount={pocketCount} />

          {/* Embellishments */}
          <EmbellishmentOverlay embellishments={embellishments} />

          {/* Text */}
          {text.content && (
            <text
              x={textPos.x}
              y={textPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={text.color}
              fontFamily={fontMap[text.fontStyle] || "sans-serif"}
              fontSize={8 + (text.size / 100) * 16}
              filter="url(#glow)"
              className="select-none"
            >
              {text.content}
            </text>
          )}

          {/* Accent line at the hem */}
          <line x1={100} y1={198} x2={200} y2={198} stroke={colors.accent} strokeWidth={1} opacity={0.4} />
        </svg>

        {/* Sparkle particles */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-amber-400/60 animate-ping" />
        <div className="absolute bottom-8 left-6 w-1.5 h-1.5 rounded-full bg-purple-400/50 animate-ping" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/3 left-4 w-1 h-1 rounded-full bg-pink-400/40 animate-ping" style={{ animationDelay: "1s" }} />
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {/* Rotate */}
        <button
          onClick={() => setRotation((r) => r - 15)}
          className="rounded-xl bg-white shadow-sm border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-all duration-300"
          aria-label="Rotate left"
        >
          ↺ Rotate
        </button>
        <button
          onClick={() => setRotation((r) => r + 15)}
          className="rounded-xl bg-white shadow-sm border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-all duration-300"
          aria-label="Rotate right"
        >
          Rotate ↻
        </button>

        {/* Zoom */}
        <button
          onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
          className="rounded-xl bg-white shadow-sm border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-all duration-300"
          aria-label="Zoom out"
        >
          ➖
        </button>
        <button
          onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
          className="rounded-xl bg-white shadow-sm border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-all duration-300"
          aria-label="Zoom in"
        >
          ➕
        </button>

        {/* Reset view */}
        <button
          onClick={() => { setRotation(0); setZoom(1); }}
          className="rounded-xl bg-white shadow-sm border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition-all duration-300"
          aria-label="Reset view"
        >
          ⟳ Reset
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 w-full max-w-md">
        <Link
          href="/preview"
          className="flex-1 text-center rounded-xl bg-white shadow-sm border border-slate-200 px-6 py-3 text-slate-900 font-semibold transition-all duration-300 hover:bg-slate-100 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
        >
          View on Model →
        </Link>
        <Link
          href="/checkout"
          className="flex-1 text-center rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold px-6 py-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-[1.02]"
        >
          Order Now ✨
        </Link>
      </div>
    </div>
  );
}
