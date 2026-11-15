"use client";

import React, { useState, useEffect } from "react";
import type { GarmentAnalysis } from "@/lib/design";

const SOURCE_LABEL: Record<GarmentAnalysis["provider"], { text: string; className: string }> = {
  gemini: { text: "Live AI analysis", className: "text-emerald-600" },
  catalog: { text: "Catalog match", className: "text-emerald-600" },
  demo: { text: "Demo data", className: "text-amber-600" },
};

interface Props {
  analysis: GarmentAnalysis;
  /** Called when the user chooses to start customizing this garment. */
  onCustomize: () => void;
}

export default function AIAnalysisResults({ analysis, onCustomize }: Props) {
  const [visible, setVisible] = useState(false);
  const [revealIndex, setRevealIndex] = useState(0);

  useEffect(() => {
    setVisible(true);
    const timer = setInterval(() => {
      setRevealIndex((prev) => {
        if (prev >= 6) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const sectionClass = (index: number) =>
    `transition-all duration-700 ${
      revealIndex >= index
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-6"
    }`;

  return (
    <div
      className={`space-y-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Header */}
      <div className={sectionClass(0)}>
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)] animate-pulse" />
            <span className="text-sm font-medium text-emerald-600">
              Analysis Complete
            </span>
            <span className={`text-xs font-semibold uppercase tracking-wider ${SOURCE_LABEL[analysis.provider].className}`}>
              · {SOURCE_LABEL[analysis.provider].text}
            </span>
          </div>
        </div>
        {analysis.notes && <p className="text-xs text-slate-500 mb-2">{analysis.notes}</p>}
        <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
          AI Garment Analysis
        </h3>
      </div>

      {/* Garment Type & Brand */}
      <div className={sectionClass(1)}>
        <div className="rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                Detected Garment
              </p>
              <p className="text-xl font-bold text-slate-900">
                {analysis.title}
              </p>
              <p className="text-sm text-violet-700 mt-0.5">
                Brand:{" "}
                <span className="text-slate-900 font-medium">
                  {analysis.brand ?? "Not identified"}
                </span>
                {analysis.origin ? <span className="text-slate-500"> · {analysis.origin}</span> : null}
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-100 border border-violet-200">
              <svg
                className="w-4 h-4 text-violet-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-bold text-violet-700">
                {analysis.confidence}%{" "}
                <span className="font-normal text-violet-600">confidence</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Measurements */}
      <div className={sectionClass(2)}>
        <div className="rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">
            📐 Estimated Measurements
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {analysis.measurements.map((m) => (
              <div
                key={m.label}
                className="text-center p-3 rounded-xl bg-white shadow-sm border border-slate-100"
              >
                <p className="text-lg font-bold text-slate-900">{m.value}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Material Composition */}
      <div className={sectionClass(3)}>
        <div className="rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">
            🧵 Material Composition
          </p>
          <div className="space-y-3">
            {analysis.materials.map((mat) => (
              <div key={mat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700">{mat.name}</span>
                  <span className="text-violet-700 font-medium">
                    {mat.percent}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                    style={{
                      width: revealIndex >= 3 ? `${mat.percent}%` : "0%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className={sectionClass(4)}>
        <div className="rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">
            🎨 Detected Color Palette
          </p>
          <div className="flex gap-3 flex-wrap">
            {analysis.colors.map((color) => (
              <div key={color.name} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg border border-slate-300 shadow-lg"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {color.name}
                  </p>
                  <p className="text-[10px] text-violet-600 font-mono">
                    {color.hex}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Design Features */}
      <div className={sectionClass(5)}>
        <div className="rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">
            ✨ Design Features Detected
          </p>
          <div className="flex flex-wrap gap-2">
            {analysis.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1.5 text-sm rounded-lg bg-violet-50 border border-violet-200 text-slate-700"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={sectionClass(6)}>
        {analysis.careInstructions && analysis.careInstructions.length > 0 && (
          <div className="rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-5 mb-6">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">🧼 Care Instructions</p>
            <div className="flex flex-wrap gap-2">
              {analysis.careInstructions.map((c) => (
                <span key={c} className="px-3 py-1.5 text-sm rounded-lg bg-violet-50 border border-violet-200 text-slate-700">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={onCustomize}
          className="inline-flex items-center gap-2 w-full justify-center rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold px-6 py-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-[1.02]"
        >
          Customize This Design
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
