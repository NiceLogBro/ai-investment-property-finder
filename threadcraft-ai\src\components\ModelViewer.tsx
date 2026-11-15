"use client";

import { useState, useEffect, useCallback } from "react";
import { PatternDefs, getCollarPath } from "@/components/customizer/ClothingPreview";
import { garmentCategory, type DesignState } from "@/lib/design";

type ViewType = "front" | "back" | "side" | "detail";

interface ModelViewerProps {
  design: DesignState;
  /** Small static figure for cards: no particles, platform or controls. */
  compact?: boolean;
}

const NEUTRAL_TOP = "#2A2540";

const FONT_FAMILIES: Record<DesignState["text"]["fontStyle"], string> = {
  Elegant: "Georgia, 'Times New Roman', serif",
  Bold: "Impact, 'Arial Black', sans-serif",
  Script: "'Brush Script MT', 'Segoe Script', cursive",
  Modern: "Inter, system-ui, sans-serif",
  Playful: "'Comic Sans MS', 'Chalkboard SE', cursive",
};

const WIDTH_BY_FIT: Record<DesignState["fit"]["type"], number> = {
  Slim: 0.9,
  Regular: 1,
  Relaxed: 1.1,
  Oversized: 1.22,
  Tailored: 0.94,
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Outline of a torso/dress body. All coordinates are in the 280x480 model space. */
function bodyPath(L: number, R: number, hemL: number, hemR: number, flare: number, waist?: number) {
  const mid = waist
    ? `L ${L + 2} ${waist} L ${L - flare} ${hemL} L ${R + flare} ${hemR} L ${R - 2} ${waist}`
    : `L ${L - flare} ${hemL} L ${R + flare} ${hemR}`;
  return `M ${L + 8} 100 L ${L} 110 ${mid} L ${R} 110 L ${R - 8} 100 Q 168 93 140 94 Q 112 93 ${L + 8} 100 Z`;
}

/** Sleeve outline for the left arm; the right arm is the same shape mirrored around x=140. */
function sleevePath(sleeve: DesignState["sleeve"], L: number): string | null {
  if (sleeve === "Sleeveless") return null;
  const length: Record<string, number> = { Cap: 12, Short: 26, Rolled: 40, "3/4": 48 };
  const len = length[sleeve] ?? 68; // Long, Raglan, Bell, Puff, Bishop run to the wrist
  const startX = L - 18;
  const outer = { x: startX - 0.3 * len, y: 115 + len };
  const innerEndX = outer.x + 22;
  const flare = sleeve === "Bell" ? 10 : 0;
  const bulge = sleeve === "Puff" ? 9 : sleeve === "Bishop" ? 6 : 0;
  const midY = 115 + len / 2;
  const mx = startX - 0.15 * len;
  return (
    `M ${L + 8} 100 L ${startX} 115 Q ${mx - bulge} ${midY} ${outer.x - flare} ${outer.y} ` +
    `L ${innerEndX + flare * 0.4} ${outer.y} Q ${mx + 22 + bulge} ${midY} ${L + 2} 135 Z`
  );
}

export default function ModelViewer({ design, compact = false }: ModelViewerProps) {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [currentView, setCurrentView] = useState<ViewType>("front");
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; delay: number; duration: number; size: number }[]
  >([]);

  useEffect(() => {
    if (compact) return;
    const generated = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 4,
      size: 2 + Math.random() * 4,
    }));
    // Random values must be generated on the client to avoid hydration mismatches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(generated);
  }, [compact]);

  const setView = useCallback((view: ViewType) => {
    const viewRotations: Record<ViewType, number> = { front: 0, back: 180, side: 90, detail: 30 };
    setCurrentView(view);
    setRotation(viewRotations[view]);
  }, []);

  const rotateLeft = () => setRotation((r) => r - 30);
  const rotateRight = () => setRotation((r) => r + 30);

  // The SVG is rotated with CSS and shows its mirror image from behind; treat 90-270° as the back view.
  const normalized = ((rotation % 360) + 360) % 360;
  const isBack = normalized > 90 && normalized < 270;

  // ── Geometry derived from the design ──────────────────────────────────────────
  const cat = garmentCategory(design.garmentType);
  const { primary, secondary, accent } = design.colors;
  const widthMul = WIDTH_BY_FIT[design.fit.type] * (0.9 + design.fit.width / 500);
  const half = 50 * widthMul;
  const L = 140 - half;
  const R = 140 + half;
  const lenAdj = (design.fit.length - 50) * 0.7;
  const cutAdj = design.cut === "Cropped" ? -35 : design.cut === "Longline" ? 30 : 0;
  const flare = design.cut === "A-Line" ? 14 : design.cut === "Flared" ? 22 : design.cut === "Tapered" ? -6 : 0;
  const asym = design.cut === "Asymmetric" ? 24 : 0;

  const isTopLike = cat === "top" || cat === "dress";
  const topHem = clamp(240 + lenAdj + cutAdj, 160, 350);
  const dressHem = clamp(330 + lenAdj + cutAdj, 260, 385);

  // Neutral basic tee under pants / skirts so the model is always dressed.
  const neutralBody = bodyPath(88, 192, 240, 240, 0);
  const mainBody =
    cat === "dress"
      ? bodyPath(L, R, dressHem + asym, dressHem, Math.max(flare, 4), 235)
      : bodyPath(L, R, topHem + asym, topHem, Math.max(flare * 0.5, 0));

  const pTop = 45 * widthMul;
  const pL = 140 - pTop;
  const pR = 140 + pTop;
  const pantsHem = clamp(380 + lenAdj * 0.4 + (design.cut === "Cropped" ? -50 : 0), 300, 385);
  const pantsSpread = design.cut === "Flared" ? 10 : design.cut === "Tapered" ? -8 : 0;
  const leftLeg = `M ${pL} 238 L ${pL - 4 - pantsSpread} ${pantsHem} L ${134 + (pantsSpread < 0 ? -pantsSpread * 0.5 : 0)} ${pantsHem} L 140 280 Z`;
  const rightLeg = `M ${pR} 238 L ${pR + 4 + pantsSpread} ${pantsHem} L ${146 - (pantsSpread < 0 ? -pantsSpread * 0.5 : 0)} ${pantsHem} L 140 280 Z`;
  const pantsBlock = `M ${pL} 238 L ${pR} 238 L ${pR} 250 L ${pL} 250 Z`;

  const skirtHem = clamp(320 + lenAdj + cutAdj, 270, 390);
  const skirtFlare = design.cut === "A-Line" ? 22 : design.cut === "Flared" ? 34 : design.cut === "Tapered" ? -4 : 10;
  const skirtPath = `M ${pL} 232 L ${pR} 232 L ${pR + skirtFlare} ${skirtHem} L ${pL - skirtFlare} ${skirtHem + asym * 0.4} Z`;

  const sleeve = isTopLike ? design.sleeve : "Short";
  const sleeveD = sleevePath(sleeve, isTopLike ? L : 88);
  const topFill = isTopLike ? "url(#bodyFill)" : NEUTRAL_TOP;
  const bottomFill = "url(#bodyFill)";

  const lowerHem = cat === "dress" ? dressHem : topHem;
  const showPattern = design.pattern.type !== "Solid";
  const patternTargets: string[] =
    cat === "pants" ? [leftLeg, rightLeg, pantsBlock] : cat === "skirt" ? [skirtPath] : [mainBody];

  // Pockets & details are only drawn on the garment the user is designing.
  const pockets = (() => {
    if (cat === "pants" || cat === "skirt") return null;
    const count = Math.max(1, design.pocketCount);
    switch (design.pocket) {
      case "Chest Pocket":
        return (
          <>
            <rect x={L + 18} y={128} width={22} height={24} rx={2} fill="none" stroke={accent} strokeWidth={1.4} />
            {count > 1 && <rect x={R - 40} y={128} width={22} height={24} rx={2} fill="none" stroke={accent} strokeWidth={1.4} />}
          </>
        );
      case "Side Pockets":
        return (
          <>
            <path d={`M ${L + 10} ${lowerHem - 55} L ${L + 26} ${lowerHem - 40}`} stroke={accent} strokeWidth={1.6} />
            <path d={`M ${R - 10} ${lowerHem - 55} L ${R - 26} ${lowerHem - 40}`} stroke={accent} strokeWidth={1.6} />
          </>
        );
      case "Kangaroo Pocket":
        return (
          <path
            d={`M ${L + 14} ${lowerHem - 62} L ${R - 14} ${lowerHem - 62} L ${R - 22} ${lowerHem - 22} L ${L + 22} ${lowerHem - 22} Z`}
            fill="none"
            stroke={accent}
            strokeWidth={1.6}
          />
        );
      case "Patch Pockets":
        return (
          <>
            <rect x={L + 14} y={lowerHem - 56} width={26} height={28} rx={2} fill="none" stroke={accent} strokeWidth={1.4} />
            {count > 1 && <rect x={R - 40} y={lowerHem - 56} width={26} height={28} rx={2} fill="none" stroke={accent} strokeWidth={1.4} />}
          </>
        );
      case "Hidden Pockets":
        return (
          <>
            <path d={`M ${L + 12} ${lowerHem - 50} L ${L + 24} ${lowerHem - 38}`} stroke={accent} strokeWidth={1} strokeDasharray="3 3" />
            <path d={`M ${R - 12} ${lowerHem - 50} L ${R - 24} ${lowerHem - 38}`} stroke={accent} strokeWidth={1} strokeDasharray="3 3" />
          </>
        );
      default:
        return null;
    }
  })();

  const has = (e: DesignState["embellishments"][number]) => design.embellishments.includes(e);
  const buttonYs: number[] = [];
  if (isTopLike) for (let y = 112; y < lowerHem - 14; y += 22) buttonYs.push(y);

  // Lettering
  const text = design.text;
  const trimmed = text.content.trim();
  const baseSize = 8 + text.size * 0.22;
  const fontSize = Math.min(baseSize, 150 / Math.max(1, trimmed.length * 0.62));
  const textPos = (() => {
    switch (text.placement) {
      case "Left Chest":
        return { x: L + 30, y: 140, rotate: 0, scale: 0.6 };
      case "Right Chest":
        return { x: R - 30, y: 140, rotate: 0, scale: 0.6 };
      case "Sleeve":
        return { x: L - 24, y: 152, rotate: 72, scale: 0.5 };
      case "Back":
        return { x: 140, y: 150, rotate: 0, scale: 1 };
      default:
        return { x: 140, y: 175, rotate: 0, scale: 1 };
    }
  })();
  const textOnBack = text.placement === "Back";
  const showText = trimmed.length > 0 && isTopLike && (textOnBack ? isBack : !isBack);
  const textNode = showText ? (
    <text
      x={textPos.x}
      y={textPos.y}
      textAnchor="middle"
      fill={text.color}
      fontSize={fontSize * textPos.scale}
      fontFamily={FONT_FAMILIES[text.fontStyle]}
      fontWeight={text.fontStyle === "Bold" ? 700 : 500}
      transform={`rotate(${textPos.rotate} ${textPos.x} ${textPos.y})`}
    >
      {trimmed}
    </text>
  ) : null;

  return (
    <div className="relative flex flex-col items-center">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${primary}88, ${secondary}44, transparent 70%)`,
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${p.id % 2 === 0 ? "#F59E0B" : "#C4B5FD"}, transparent)`,
            animation: `sparkleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Model Container with 3D perspective */}
      <div className="relative" style={{ perspective: "1200px", perspectiveOrigin: "50% 40%" }}>
        <div
          className="transition-transform duration-700 ease-out"
          style={{ transform: `rotateY(${rotation}deg) scale(${zoom})`, transformStyle: "preserve-3d" }}
        >
          <svg
            viewBox="0 0 280 480"
            className={compact ? "w-[150px] h-[255px] drop-shadow-lg" : "w-[260px] h-[440px] md:w-[300px] md:h-[500px] drop-shadow-2xl"}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={`Model wearing your custom ${design.garmentType}`}
          >
            <defs>
              <linearGradient id="bodyFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={design.colors.useGradient ? secondary : primary} />
              </linearGradient>
              <radialGradient id="skinGrad" cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#D4A88C" />
                <stop offset="100%" stopColor="#C49478" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#0F0A2E" />
              </linearGradient>
              <linearGradient id="shoeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#374151" />
                <stop offset="100%" stopColor="#1F2937" />
              </linearGradient>
              {showPattern && (
                <PatternDefs patternType={design.pattern.type} patternColor={design.pattern.color} scale={design.pattern.scale} />
              )}
            </defs>

            {/* Head, hair, neck */}
            <ellipse cx="140" cy="55" rx="30" ry="36" fill="url(#skinGrad)" />
            <path
              d="M110 40 Q115 10 140 15 Q165 10 170 40 Q172 30 168 22 Q160 5 140 8 Q120 5 112 22 Q108 30 110 40Z"
              fill="#2D1B3D"
            />
            <rect x="130" y="88" width="20" height="18" rx="4" fill="url(#skinGrad)" />

            {/* Legs (skin) so skirts and cropped pants show real legs */}
            <path d="M100 238 L96 380 L132 380 L140 280 Z" fill="url(#skinGrad)" />
            <path d="M180 238 L184 380 L148 380 L140 280 Z" fill="url(#skinGrad)" />

            {/* Arms (skin) follow the garment width */}
            <g transform={`translate(${L - 88} 0)`}>
              <path d="M70 115 Q55 140 50 175 Q48 182 54 184 Q60 186 62 178 L80 150" fill="url(#skinGrad)" />
              <ellipse cx="52" cy="186" rx="8" ry="10" fill="url(#skinGrad)" />
            </g>
            <g transform={`translate(${R - 192} 0)`}>
              <path d="M210 115 Q225 140 230 175 Q232 182 226 184 Q220 186 218 178 L200 150" fill="url(#skinGrad)" />
              <ellipse cx="228" cy="186" rx="8" ry="10" fill="url(#skinGrad)" />
            </g>

            {/* Lower garment */}
            {cat === "pants" ? (
              <>
                <path d={leftLeg} fill={bottomFill} />
                <path d={rightLeg} fill={bottomFill} />
                <path d={pantsBlock} fill={bottomFill} />
              </>
            ) : cat === "skirt" ? (
              <path d={skirtPath} fill={bottomFill} filter="url(#glow)" />
            ) : cat === "top" ? (
              <path d="M95 238 L90 380 L134 380 L140 280 L146 380 L190 380 L185 238 Z" fill="url(#pantsGrad)" />
            ) : null}

            {/* Belt (not shown on dresses, whose waist is part of the garment) */}
            {cat !== "dress" && cat !== "skirt" && (
              <>
                <rect x="92" y="235" width="96" height="8" rx="2" fill="#374151" />
                <rect x="135" y="234" width="10" height="10" rx="1" fill="#9CA3AF" />
              </>
            )}

            {/* Shoes */}
            <path d="M88 375 Q85 390 82 395 Q80 402 100 402 L132 402 Q140 402 138 392 L134 375Z" fill="url(#shoeGrad)" />
            <path d="M146 375 Q144 390 142 395 Q140 402 160 402 L192 402 Q200 402 198 392 L192 375Z" fill="url(#shoeGrad)" />

            {/* Hood sits behind the body */}
            {isTopLike && design.collar === "Hooded" && (
              <path d="M104 104 Q100 62 140 56 Q180 62 176 104 Q140 90 104 104Z" fill={topFill} opacity="0.9" />
            )}

            {/* Sleeves */}
            {sleeveD && (
              <>
                <path d={sleeveD} fill={topFill} />
                <g transform="translate(280 0) scale(-1 1)">
                  <path d={sleeveD} fill={topFill} />
                </g>
                {isTopLike && showPattern && (
                  <>
                    <path d={sleeveD} fill="url(#pat)" />
                    <g transform="translate(280 0) scale(-1 1)">
                      <path d={sleeveD} fill="url(#pat)" />
                    </g>
                  </>
                )}
              </>
            )}
            {isTopLike && has("Epaulettes") && !isBack && (
              <>
                <rect x={L + 6} y={96} width={22} height={5} rx={1} fill={accent} />
                <rect x={R - 28} y={96} width={22} height={5} rx={1} fill={accent} />
              </>
            )}

            {/* Torso / dress / neutral tee */}
            <path d={isTopLike ? mainBody : neutralBody} fill={topFill} filter="url(#glow)" />

            {/* Pattern overlay on the designed piece */}
            {showPattern && patternTargets.map((d, i) => <path key={i} d={d} fill="url(#pat)" />)}

            {/* Collar (front view only) */}
            {!isBack && (
              <path
                d={getCollarPath(isTopLike ? design.collar : "Crew Neck")}
                transform="translate(140 100) scale(0.7) translate(-150 -68)"
                fill="none"
                stroke={isTopLike ? accent : "#6B5FA8"}
                strokeWidth="2.4"
                strokeLinejoin="round"
                opacity="0.9"
              />
            )}

            {/* Details on the designed top / dress */}
            {isTopLike && !isBack && (
              <>
                {pockets}
                {has("Buttons") &&
                  buttonYs.map((y) => <circle key={y} cx="140" cy={y} r="2.2" fill={accent} />)}
                {has("Zipper") && (
                  <>
                    <line x1="140" y1="100" x2="140" y2={lowerHem - 6} stroke={accent} strokeWidth="1.6" strokeDasharray="2 2" />
                    <rect x="137.5" y="104" width="5" height="9" rx="1.5" fill={accent} />
                  </>
                )}
                {has("Drawstring") && (
                  <>
                    <path d="M132 104 Q130 130 134 150" fill="none" stroke={accent} strokeWidth="1.6" />
                    <path d="M148 104 Q150 130 146 150" fill="none" stroke={accent} strokeWidth="1.6" />
                  </>
                )}
                {has("Embroidery") && (
                  <path
                    d={`M ${R - 34} 128 l 3 7 l 7 1 l -5 5 l 1 7 l -6 -4 l -6 4 l 1 -7 l -5 -5 l 7 -1 Z`}
                    fill={accent}
                    opacity="0.85"
                  />
                )}
                {has("Sequins") &&
                  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <circle
                      key={i}
                      cx={L + 14 + ((i * 37) % (R - L - 28))}
                      cy={115 + ((i * 53) % Math.max(30, lowerHem - 135))}
                      r="1.8"
                      fill={accent}
                    >
                      <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
                    </circle>
                  ))}
                {has("Rivets") && (
                  <>
                    <circle cx={L + 18} cy={128} r="1.8" fill={accent} />
                    <circle cx={L + 40} cy={128} r="1.8" fill={accent} />
                    <circle cx={R - 18} cy={128} r="1.8" fill={accent} />
                    <circle cx={R - 40} cy={128} r="1.8" fill={accent} />
                  </>
                )}
              </>
            )}

            {/* Belt loops / rivets on pants */}
            {cat === "pants" && has("Belt Loops") && (
              <>
                {[-30, -10, 10, 30].map((dx) => (
                  <rect key={dx} x={140 + dx - 1.5} y={233} width={3} height={12} fill="#9CA3AF" />
                ))}
              </>
            )}

            {/* Lettering. On the back view the SVG is mirrored by the 3D rotation, so un-mirror the text. */}
            {isBack ? <g transform="translate(280 0) scale(-1 1)">{textNode}</g> : textNode}
          </svg>
        </div>
      </div>

      {!compact && (
        <>
      {/* Platform with reflection */}
      <div className="relative mt-2">
        <div
          className="w-[200px] h-[14px] rounded-[50%] mx-auto"
          style={{
            background: `radial-gradient(ellipse, ${primary}55, transparent 70%)`,
            boxShadow: `0 0 40px ${primary}33`,
          }}
        />
        <div
          className="w-[160px] h-[6px] rounded-[50%] mx-auto mt-1 opacity-30"
          style={{ background: `radial-gradient(ellipse, ${primary}44, transparent 70%)` }}
        />
      </div>

      {/* Rotation Controls */}
      <div className="flex items-center gap-4 mt-6">
        <button
          type="button"
          onClick={rotateLeft}
          className="w-10 h-10 rounded-full bg-slate-100 backdrop-blur-sm border border-slate-300 text-slate-900 flex items-center justify-center hover:bg-slate-200 hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all duration-300"
          aria-label="Rotate model left"
        >
          ←
        </button>

        <div className="flex flex-col items-center gap-1">
          <label htmlFor="zoom-slider" className="text-xs text-slate-500">
            Zoom
          </label>
          <input
            id="zoom-slider"
            type="range"
            min="0.6"
            max="1.5"
            step="0.05"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-28 accent-purple-500"
          />
        </div>

        <button
          type="button"
          onClick={rotateRight}
          className="w-10 h-10 rounded-full bg-slate-100 backdrop-blur-sm border border-slate-300 text-slate-900 flex items-center justify-center hover:bg-slate-200 hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all duration-300"
          aria-label="Rotate model right"
        >
          →
        </button>
      </div>

      {/* View Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {(["front", "back", "side", "detail"] as ViewType[]).map((view) => (
          <button
            type="button"
            key={view}
            onClick={() => setView(view)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
              currentView === view
                ? "bg-violet-100 border-violet-400 text-slate-900 shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                : "bg-white shadow-sm border-slate-200 text-violet-700 hover:bg-slate-100 hover:border-violet-300"
            }`}
          >
            {view === "front" ? "👤 Front" : view === "back" ? "🔄 Back" : view === "side" ? "📐 Side" : "🔍 Detail"}
          </button>
        ))}
      </div>
        </>
      )}
    </div>
  );
}
