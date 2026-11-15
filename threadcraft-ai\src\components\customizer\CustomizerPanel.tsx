"use client";

import React, { useState } from "react";
import { suggestPalettes } from "@/lib/color";
import {
  useDesign,
  type CollarType,
  type SleeveStyle,
  type FitType,
  type CutStyle,
  type PocketType,
  type PatternType,
  type FontStyle,
  type TextPlacement,
  type Embellishment,
  type GarmentType,
  type Size,
  GARMENT_TYPES,
  SIZES,
} from "@/context/DesignContext";

// ── Preset Palettes ─────────────────────────────────────────────────────────
const PRESET_COLORS = [
  { name: "Mystic Violet", hex: "#7C3AED" },
  { name: "Deep Indigo", hex: "#4338CA" },
  { name: "Emerald Alchemist", hex: "#059669" },
  { name: "Crimson Velvet", hex: "#BE123C" },
  { name: "Solar Gold", hex: "#F59E0B" },
  { name: "Rose Gold", hex: "#E8A87C" },
  { name: "Midnight Onyx", hex: "#111827" },
  { name: "Moonlight Silver", hex: "#94A3B8" },
  { name: "Ethereal Cyan", hex: "#06B6D4" },
  { name: "Enchanted Magenta", hex: "#D946EF" },
];

const COLLAR_OPTIONS: { type: CollarType; icon: string }[] = [
  { type: "Crew Neck", icon: "⭕" },
  { type: "V-Neck", icon: "🔻" },
  { type: "Polo", icon: "👔" },
  { type: "Mandarin", icon: "⛩️" },
  { type: "Spread", icon: "📐" },
  { type: "Button-Down", icon: "🔘" },
  { type: "Shawl", icon: "🧣" },
  { type: "Notch Lapel", icon: "🧥" },
  { type: "Stand", icon: "🏛️" },
  { type: "Hooded", icon: "🧙" },
];

const SLEEVE_OPTIONS: { type: SleeveStyle; icon: string }[] = [
  { type: "Short", icon: "👕" },
  { type: "Long", icon: "🧥" },
  { type: "3/4", icon: "🧤" },
  { type: "Sleeveless", icon: "🎽" },
  { type: "Cap", icon: "✨" },
  { type: "Bell", icon: "🔔" },
  { type: "Puff", icon: "☁️" },
  { type: "Raglan", icon: "⚡" },
  { type: "Rolled", icon: "🌀" },
  { type: "Bishop", icon: "👑" },
];

const FIT_OPTIONS: FitType[] = ["Slim", "Regular", "Relaxed", "Oversized", "Tailored"];

const CUT_OPTIONS: { type: CutStyle; desc: string }[] = [
  { type: "Straight", desc: "Classic parallel hem" },
  { type: "A-Line", desc: "Flares gently at hip" },
  { type: "Tapered", desc: "Narrowed modern profile" },
  { type: "Flared", desc: "Dramatic flare effect" },
  { type: "Asymmetric", desc: "Avant-garde uneven cut" },
  { type: "Cropped", desc: "High waistline modern cut" },
  { type: "Longline", desc: "Elongated street-luxe hem" },
];

const POCKET_OPTIONS: { type: PocketType; icon: string }[] = [
  { type: "No Pockets", icon: "🚫" },
  { type: "Chest Pocket", icon: "🏷️" },
  { type: "Side Pockets", icon: "👐" },
  { type: "Kangaroo Pocket", icon: "🦘" },
  { type: "Patch Pockets", icon: "📦" },
  { type: "Hidden Pockets", icon: "🕵️" },
];

const PATTERN_OPTIONS: PatternType[] = [
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
];

const EMBELLISHMENT_OPTIONS: { type: Embellishment; icon: string }[] = [
  { type: "Buttons", icon: "🔘" },
  { type: "Zipper", icon: "🤐" },
  { type: "Embroidery", icon: "🪡" },
  { type: "Sequins", icon: "✨" },
  { type: "Rivets", icon: "⚙️" },
  { type: "Drawstring", icon: "🪢" },
  { type: "Hood", icon: "🧙" },
  { type: "Belt Loops", icon: "➰" },
  { type: "Epaulettes", icon: "⭐" },
];

const FONT_OPTIONS: FontStyle[] = ["Modern", "Elegant", "Bold", "Script", "Playful"];

const PLACEMENT_OPTIONS: TextPlacement[] = [
  "Front Center",
  "Left Chest",
  "Right Chest",
  "Back",
  "Sleeve",
];

type ActiveTab =
  | "colors"
  | "patterns"
  | "lettering"
  | "collar"
  | "sleeves"
  | "fit"
  | "pockets"
  | "details";

export default function CustomizerPanel() {
  const {
    design,
    setColors,
    setText,
    setPattern,
    setCollar,
    setSleeve,
    setFit,
    setCut,
    setPocket,
    setPocketCount,
    toggleEmbellishment,
    setGarmentType,
    setSize,
    resetDesign,
  } = useDesign();

  const [activeTab, setActiveTab] = useState<ActiveTab>("colors");

  return (
    <div className="w-full rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-5 md:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.37)] flex flex-col gap-6">
      {/* Garment Type & Size Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <label htmlFor="customizer-garment" className="text-xs font-semibold uppercase tracking-wider text-violet-700">
            Garment
          </label>
          <select
            id="customizer-garment"
            value={design.garmentType}
            onChange={(e) => setGarmentType(e.target.value as GarmentType)}
            className="rounded-xl bg-slate-100 border border-slate-200 text-slate-900 px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {GARMENT_TYPES.map((g) => (
              <option key={g} value={g} className="bg-white">
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-700">Size</span>
          <div className="flex gap-1">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s as Size)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                  design.size === s
                    ? "bg-purple-600 border-violet-500 text-white"
                    : "bg-white shadow-sm border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "colors", label: "Colors", icon: "🎨" },
          { id: "patterns", label: "Patterns", icon: "🌸" },
          { id: "lettering", label: "Lettering", icon: "🔤" },
          { id: "collar", label: "Collar", icon: "👔" },
          { id: "sleeves", label: "Sleeves", icon: "💪" },
          { id: "fit", label: "Fit & Cut", icon: "📏" },
          { id: "pockets", label: "Pockets", icon: "🗂️" },
          { id: "details", label: "Details", icon: "✨" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.5)] scale-105"
                  : "bg-white shadow-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── TAB 1: COLORS ─── */}
      {activeTab === "colors" && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">Primary Color</label>
              <span className="text-xs font-mono text-violet-700">{design.colors.primary}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColors({ primary: c.hex })}
                  style={{ backgroundColor: c.hex }}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    design.colors.primary.toLowerCase() === c.hex.toLowerCase()
                      ? "border-amber-400 scale-110 shadow-[0_0_10px_#F59E0B]"
                      : "border-slate-300 hover:scale-105"
                  }`}
                  title={c.name}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={design.colors.primary}
                onChange={(e) => setColors({ primary: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-slate-300"
              />
              <span className="text-xs text-slate-600">Custom Hex Color</span>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">Secondary / Sleeve Color</label>
              <span className="text-xs font-mono text-violet-700">{design.colors.secondary}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {PRESET_COLORS.map((c) => (
                <button
                  key={`sec-${c.name}`}
                  onClick={() => setColors({ secondary: c.hex })}
                  style={{ backgroundColor: c.hex }}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    design.colors.secondary.toLowerCase() === c.hex.toLowerCase()
                      ? "border-amber-400 scale-110 shadow-[0_0_10px_#F59E0B]"
                      : "border-slate-300 hover:scale-105"
                  }`}
                  title={c.name}
                />
              ))}
            </div>
            <input
              type="color"
              value={design.colors.secondary}
              onChange={(e) => setColors({ secondary: e.target.value })}
              className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-slate-300"
            />
          </div>

          <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700">Magical Gradient Blend</p>
              <p className="text-xs text-slate-500">Smooth chromatic aura across fabrics</p>
            </div>
            <button
              onClick={() => setColors({ useGradient: !design.colors.useGradient })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                design.colors.useGradient ? "bg-purple-600 shadow-[0_0_10px_rgba(124,58,237,0.7)]" : "bg-slate-200"
              }`}
            >
              <span
                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  design.colors.useGradient ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          {/* Palette suggestions derived from the primary color */}
          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm font-semibold text-slate-700">Palette suggestions</p>
            <p className="text-xs text-slate-500 mb-3">Built from your primary color. Click one to apply it to the secondary and accent colors.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {suggestPalettes(design.colors.primary).map((p) => {
                const active =
                  design.colors.secondary.toLowerCase() === p.secondary.toLowerCase() &&
                  design.colors.accent.toLowerCase() === p.accent.toLowerCase();
                return (
                  <button
                    key={p.name}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setColors({ secondary: p.secondary, accent: p.accent })}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                      active ? "border-violet-500 bg-violet-50" : "border-slate-200 bg-white hover:border-violet-300"
                    }`}
                  >
                    <span className="flex shrink-0 -space-x-2" aria-hidden="true">
                      {[design.colors.primary, p.secondary, p.accent].map((c, i) => (
                        <span key={i} className="w-7 h-7 rounded-full border-2 border-white shadow" style={{ backgroundColor: c }} />
                      ))}
                    </span>
                    <span>
                      <span className="block text-xs font-semibold text-slate-800">{p.name}</span>
                      <span className="block text-[11px] text-slate-500">{p.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: PATTERNS ─── */}
      {activeTab === "patterns" && (
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-3">Select Weave Pattern</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PATTERN_OPTIONS.map((pat) => {
                const isSelected = design.pattern.type === pat;
                return (
                  <button
                    key={pat}
                    onClick={() => setPattern({ type: pat })}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                      isSelected
                        ? "bg-violet-100 border-violet-500 text-slate-900 shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                        : "bg-white shadow-sm border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="block font-semibold">{pat}</span>
                    <span className="text-[10px] text-slate-500">
                      {pat === "Solid" ? "Pure fabric texture" : "AI procedurally woven"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {design.pattern.type !== "Solid" && (
            <div className="border-t border-slate-200 pt-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Pattern Scale</span>
                  <span>{design.pattern.scale}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={design.pattern.scale}
                  onChange={(e) => setPattern({ scale: parseInt(e.target.value) })}
                  className="w-full accent-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Pattern Accent Tint</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={design.pattern.color}
                    onChange={(e) => setPattern({ color: e.target.value })}
                    className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border border-slate-300"
                  />
                  <span className="text-xs text-violet-700 font-mono">{design.pattern.color}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 3: LETTERING ─── */}
      {activeTab === "lettering" && (
        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-2">Custom Text / Monogram</label>
            <input
              type="text"
              placeholder="e.g. AURA, VOYAGER, 1994, Arcane"
              value={design.text.content}
              onChange={(e) => setText({ content: e.target.value })}
              className="w-full bg-white shadow-sm border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-2">Typography Font Vibe</label>
            <div className="grid grid-cols-3 gap-2">
              {FONT_OPTIONS.map((f) => (
                <button
                  key={f}
                  onClick={() => setText({ fontStyle: f })}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                    design.text.fontStyle === f
                      ? "bg-violet-100 border-violet-500 text-slate-900 shadow-[0_0_10px_rgba(124,58,237,0.4)]"
                      : "bg-white shadow-sm border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-2">Print Placement</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PLACEMENT_OPTIONS.map((p) => (
                <button
                  key={p}
                  onClick={() => setText({ placement: p })}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                    design.text.placement === p
                      ? "bg-violet-100 border-violet-500 text-slate-900 shadow-[0_0_10px_rgba(124,58,237,0.4)]"
                      : "bg-white shadow-sm border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Text Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={design.text.color}
                  onChange={(e) => setText({ color: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-slate-300"
                />
                <span className="text-xs text-violet-700 font-mono">{design.text.color}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Font Size</span>
                <span>{design.text.size}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={design.text.size}
                onChange={(e) => setText({ size: parseInt(e.target.value) })}
                className="w-full accent-purple-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 4: COLLAR ─── */}
      {activeTab === "collar" && (
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-3">Collar Architecture</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {COLLAR_OPTIONS.map((c) => {
              const isSelected = design.collar === c.type;
              return (
                <button
                  key={c.type}
                  onClick={() => setCollar(c.type)}
                  className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? "bg-violet-100 border-violet-500 text-slate-900 shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                      : "bg-white shadow-sm border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-lg">{c.icon}</span>
                  <span className="font-semibold">{c.type}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── TAB 5: SLEEVES ─── */}
      {activeTab === "sleeves" && (
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-3">Sleeve Cut & Silhouette</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {SLEEVE_OPTIONS.map((s) => {
              const isSelected = design.sleeve === s.type;
              return (
                <button
                  key={s.type}
                  onClick={() => setSleeve(s.type)}
                  className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? "bg-violet-100 border-violet-500 text-slate-900 shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                      : "bg-white shadow-sm border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-lg">{s.icon}</span>
                  <span className="font-semibold">{s.type}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── TAB 6: FIT & CUT ─── */}
      {activeTab === "fit" && (
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-2">Tailored Fit</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {FIT_OPTIONS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFit({ type: f })}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                    design.fit.type === f
                      ? "bg-violet-100 border-violet-500 text-slate-900 shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                      : "bg-white shadow-sm border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 pt-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Garment Length (Long / Shorten)</span>
                <span>{design.fit.length < 50 ? "Cropped" : design.fit.length > 60 ? "Longline" : "Standard"} ({design.fit.length}%)</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                value={design.fit.length}
                onChange={(e) => setFit({ length: parseInt(e.target.value) })}
                className="w-full accent-purple-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Torso Width & Draping</span>
                <span>{design.fit.width}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="80"
                value={design.fit.width}
                onChange={(e) => setFit({ width: parseInt(e.target.value) })}
                className="w-full accent-purple-500"
              />
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <label className="text-sm font-semibold text-slate-700 block mb-3">Hemline & Silhouette Cut</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CUT_OPTIONS.map((c) => {
                const isSelected = design.cut === c.type;
                return (
                  <button
                    key={c.type}
                    onClick={() => setCut(c.type)}
                    className={`p-3 rounded-xl border text-xs text-left transition-all ${
                      isSelected
                        ? "bg-violet-100 border-violet-500 text-slate-900 shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                        : "bg-white shadow-sm border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="block font-semibold">{c.type}</span>
                    <span className="text-[10px] text-slate-500">{c.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 7: POCKETS ─── */}
      {activeTab === "pockets" && (
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-3">Pocket Placement & Style</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {POCKET_OPTIONS.map((p) => {
                const isSelected = design.pocket === p.type;
                return (
                  <button
                    key={p.type}
                    onClick={() => setPocket(p.type)}
                    className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? "bg-violet-100 border-violet-500 text-slate-900 shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                        : "bg-white shadow-sm border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-lg">{p.icon}</span>
                    <span className="font-semibold">{p.type}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {design.pocket !== "No Pockets" && (
            <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700">Pocket Quantity</p>
                <p className="text-xs text-slate-500">Symmetric dual placement or single accent</p>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 4].map((count) => (
                  <button
                    key={count}
                    onClick={() => setPocketCount(count)}
                    className={`w-9 h-9 rounded-lg border text-xs font-semibold ${
                      design.pocketCount === count
                        ? "bg-purple-600 border-violet-500 text-white"
                        : "bg-white shadow-sm border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {count}x
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 8: DETAILS & EMBELLISHMENTS ─── */}
      {activeTab === "details" && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-slate-700">Embellishments & Hardware</label>
            <span className="text-xs text-amber-600">Selected ({design.embellishments.length})</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {EMBELLISHMENT_OPTIONS.map((e) => {
              const isChecked = design.embellishments.includes(e.type);
              return (
                <button
                  key={e.type}
                  onClick={() => toggleEmbellishment(e.type)}
                  className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${
                    isChecked
                      ? "bg-violet-100 border-violet-500 text-slate-900 shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                      : "bg-white shadow-sm border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{e.icon}</span>
                    <span className="font-semibold">{e.type}</span>
                  </div>
                  <span className={`text-xs ${isChecked ? "text-amber-600 font-bold" : "text-slate-400"}`}>
                    {isChecked ? "✓" : "+"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Reset & Quick Helper */}
      <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
        <button
          onClick={resetDesign}
          className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
        >
          <span>↺</span>
          <span>Reset to Default</span>
        </button>
        <span className="text-[11px] text-amber-600">✨ Real-time AI Supercomputer Simulation</span>
      </div>
    </div>
  );
}
