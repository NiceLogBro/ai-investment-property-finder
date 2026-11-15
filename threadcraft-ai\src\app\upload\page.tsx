"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MagicalParticles from "@/components/MagicalParticles";
import UploadZone from "@/components/UploadZone";
import AIAnalysisResults from "@/components/AIAnalysisResults";
import { useDesign, designFromAnalysis, presetForGarment, type DesignSource, type GarmentAnalysis, type GarmentType } from "@/context/DesignContext";
import { identifyGarment, type IdentifyRequest } from "@/lib/identifyClient";
import { useHash } from "@/lib/share";

type TabId = "upload" | "barcode" | "design";

interface Tab {
  id: TabId;
  icon: string;
  label: string;
}

const TABS: Tab[] = [
  { id: "upload", icon: "📸", label: "Upload Photo" },
  { id: "barcode", icon: "🏷️", label: "Scan Barcode / Tag" },
  { id: "design", icon: "🎨", label: "Design From Scratch" },
];

const CLOTHING_TYPES = [
  { name: "T-Shirt", icon: "👕" },
  { name: "Dress Shirt", icon: "🔵" },
  { name: "Blouse", icon: "👚" },
  { name: "Jacket", icon: "🧥" },
  { name: "Hoodie", icon: "🧤" },
  { name: "Dress", icon: "👗" },
  { name: "Pants", icon: "👖" },
  { name: "Skirt", icon: "🩱" },
  { name: "Coat", icon: "🧣" },
  { name: "Sweater", icon: "🧶" },
];

const SILHOUETTES: Record<string, string[]> = {
  "T-Shirt": ["Classic Fit", "Slim Fit", "Oversized", "Cropped", "Longline"],
  "Dress Shirt": [
    "Regular Fit",
    "Slim Fit",
    "Tailored",
    "Spread Collar",
    "Button-Down",
  ],
  Blouse: ["Relaxed", "Fitted", "Peplum", "Wrap", "Off-Shoulder"],
  Jacket: ["Bomber", "Blazer", "Denim", "Varsity", "Utility"],
  Hoodie: ["Pullover", "Zip-Up", "Oversized", "Cropped", "Tech Fleece"],
  Dress: ["A-Line", "Bodycon", "Maxi", "Wrap", "Shirt Dress"],
  Pants: ["Straight", "Slim", "Wide-Leg", "Tapered", "Jogger"],
  Skirt: ["Mini", "Midi", "Maxi", "Pleated", "Wrap"],
  Coat: ["Trench", "Peacoat", "Overcoat", "Puffer", "Parka"],
  Sweater: ["Crewneck", "V-Neck", "Cardigan", "Turtleneck", "Cable Knit"],
};

/* ─────────────────────────── SHARED ANALYSIS FLOW ─────────────────────────── */

type FlowState =
  | { status: "idle" }
  | { status: "analyzing" }
  | { status: "done"; analysis: GarmentAnalysis }
  | { status: "error"; message: string };

function useIdentifyFlow() {
  const [state, setState] = useState<FlowState>({ status: "idle" });

  const run = useCallback(async (req: IdentifyRequest) => {
    setState({ status: "analyzing" });
    try {
      const analysis = await identifyGarment(req);
      setState({ status: "done", analysis });
    } catch (err) {
      setState({ status: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }, []);

  const reset = useCallback(() => setState({ status: "idle" }), []);
  return { state, run, reset };
}

function useStartCustomizing(source: DesignSource) {
  const router = useRouter();
  const { replaceDesign } = useDesign();
  return (analysis: GarmentAnalysis) => {
    replaceDesign(designFromAnalysis(analysis, source));
    router.push("/customize");
  };
}

function ErrorNotice({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 space-y-3">
      <p className="text-sm text-red-700">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="text-sm font-semibold text-slate-700 underline underline-offset-4 hover:text-slate-900"
      >
        Try again
      </button>
    </div>
  );
}

function AnalyzingView({ steps }: { steps: string[] }) {
  // Visual progress only: the real request runs in parallel and the view is replaced when it resolves.
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => Math.min(p + 1, steps.length - 1)), 900);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center py-12 gap-8" aria-live="polite">
      <div className="relative w-28 h-28">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 opacity-30 blur-xl animate-pulse" />
        <div
          className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-60 animate-spin"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-400 to-purple-600 opacity-40 animate-spin"
          style={{ animationDuration: "4s", animationDirection: "reverse" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">✨</span>
        </div>
      </div>

      <div className="text-center space-y-4 w-full max-w-md">
        <h3 className="text-xl font-bold text-slate-900">AI Analysis In Progress</h3>
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div
              key={step}
              className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                i < phase ? "text-emerald-600" : i === phase ? "text-violet-700" : "text-slate-300"
              }`}
            >
              {i < phase ? (
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : i === phase ? (
                <div className="w-4 h-4 flex-shrink-0 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
              ) : (
                <div className="w-4 h-4 flex-shrink-0 rounded-full border border-slate-200" />
              )}
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PHOTO_STEPS = [
  "Detecting garment boundaries…",
  "Identifying fabric type…",
  "Estimating measurements…",
  "Extracting color palette…",
  "Analyzing design features…",
  "Compiling results…",
];

const TAG_STEPS = ["Reading the tag…", "Extracting fabric composition…", "Matching garment details…"];

/* ─────────────────────────── UPLOAD TAB ─────────────────────────── */

function UploadPhotoTab() {
  const { state, run, reset } = useIdentifyFlow();
  const startCustomizing = useStartCustomizing("photo");

  if (state.status === "analyzing") return <AnalyzingView steps={PHOTO_STEPS} />;
  if (state.status === "done") {
    return <AIAnalysisResults analysis={state.analysis} onCustomize={() => startCustomizing(state.analysis)} />;
  }

  return (
    <div className="space-y-4">
      {state.status === "error" && <ErrorNotice message={state.message} onRetry={reset} />}
      <UploadZone
        onFileSelect={(file) => run({ mode: "photo", file })}
        label="Drop your outfit photo here or click to browse"
        supportText="AI will identify the garment, fabric, measurements, and design"
      />
    </div>
  );
}

/* ─────────────────────────── BARCODE TAB ─────────────────────────── */

function ScanBarcodeTab() {
  const [barcode, setBarcode] = useState("");
  const { state, run, reset } = useIdentifyFlow();
  const startCustomizing = useStartCustomizing("barcode");
  const [tagMode, setTagMode] = useState(false);
  const startTagCustomizing = useStartCustomizing("tag");

  if (state.status === "analyzing") return <AnalyzingView steps={tagMode ? TAG_STEPS : ["Looking up barcode…", "Fetching garment data…"]} />;
  if (state.status === "done") {
    const start = tagMode ? startTagCustomizing : startCustomizing;
    return <AIAnalysisResults analysis={state.analysis} onCustomize={() => start(state.analysis)} />;
  }

  const handleScan = () => {
    if (!barcode.trim()) return;
    setTagMode(false);
    run({ mode: "barcode", barcode });
  };

  return (
    <div className="space-y-6">
      {state.status === "error" && <ErrorNotice message={state.message} onRetry={reset} />}

      {/* Barcode input */}
      <div>
        <label htmlFor="barcode-input" className="block text-sm font-medium text-slate-600 mb-2">
          Enter Barcode Number
        </label>
        <div className="flex gap-3">
          <input
            id="barcode-input"
            type="text"
            inputMode="numeric"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="e.g. 4006381333931"
            className="flex-1 px-4 py-3 rounded-xl bg-white shadow-sm border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-violet-300 transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleScan();
            }}
          />
          <button
            type="button"
            onClick={handleScan}
            disabled={!barcode.trim()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Scan
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Demo catalog: try 4006381333931 (oxford shirt), 5000000000005 (hoodie) or 3000000000014 (dress).
        </p>
      </div>

      {/* OR Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <span className="text-xs text-slate-400 uppercase tracking-widest">or upload a photo of the tag</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <UploadZone
        compact
        onFileSelect={(file) => {
          setTagMode(true);
          run({ mode: "tag", file });
        }}
        label="Upload a photo of the clothing tag"
        supportText=""
      />
    </div>
  );
}

/* ─────────────────────────── DESIGN TAB ─────────────────────────── */

function DesignFromScratchTab() {
  const router = useRouter();
  const { replaceDesign } = useDesign();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSilhouette, setSelectedSilhouette] = useState<string | null>(null);

  const start = () => {
    if (!selectedType) return;
    replaceDesign(presetForGarment(selectedType as GarmentType, selectedSilhouette));
    router.push("/customize");
  };

  return (
    <div className="space-y-6">
      {/* Clothing type grid */}
      <div>
        <p className="text-sm font-medium text-slate-600 mb-3">Choose a clothing type</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {CLOTHING_TYPES.map((type) => (
            <button
              key={type.name}
              type="button"
              aria-pressed={selectedType === type.name}
              onClick={() => {
                setSelectedType(type.name);
                setSelectedSilhouette(null);
              }}
              className={`group relative flex flex-col items-center gap-2 rounded-2xl p-4 border transition-all duration-300 ${
                selectedType === type.name
                  ? "bg-violet-100 border-violet-300 shadow-[0_0_15px_rgba(124,58,237,0.3)] scale-[1.03]"
                  : "bg-white shadow-sm border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:scale-[1.02]"
              }`}
            >
              <span className="text-2xl">{type.icon}</span>
              <span
                className={`text-sm font-medium ${
                  selectedType === type.name ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                }`}
              >
                {type.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Silhouette options */}
      {selectedType && SILHOUETTES[selectedType] && (
        <div>
          <p className="text-sm font-medium text-slate-600 mb-3">
            Select a cut / silhouette for <span className="text-slate-900">{selectedType}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {SILHOUETTES[selectedType].map((sil) => (
              <button
                key={sil}
                type="button"
                aria-pressed={selectedSilhouette === sil}
                onClick={() => setSelectedSilhouette(sil)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 ${
                  selectedSilhouette === sil
                    ? "bg-gradient-to-r from-purple-600 to-violet-600 border-violet-300 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                    : "bg-white shadow-sm border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {sil}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      {selectedType && selectedSilhouette && (
        <div className="pt-2">
          <div className="rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-5 mb-4">
            <p className="text-sm text-slate-500 mb-1">Your selection</p>
            <p className="text-lg font-bold text-slate-900">
              {selectedSilhouette} {selectedType}
            </p>
          </div>
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-2 w-full justify-center rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold px-6 py-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-[1.02] text-lg"
          >
            Start Designing
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── MAIN PAGE ─────────────────────────── */

export default function UploadPage() {
  // A "#barcode" / "#design" fragment (from the home page) selects the starting tab.
  const hash = useHash().replace("#", "");
  const hashTab = (["upload", "barcode", "design"] as const).find((t) => t === hash);
  const [chosenTab, setActiveTab] = useState<TabId | null>(null);
  const activeTab: TabId = chosenTab ?? hashTab ?? "upload";

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-violet-50 to-white text-slate-900 pt-24 pb-16">
      <MagicalParticles />
      <Navbar />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 transition-colors mb-6"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
            Create Your Design
          </h1>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto">
            Upload a photo, scan a garment tag, or start from a blank canvas —
            our AI will handle the rest.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-1.5 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-2 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600/80 to-violet-600/80 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-6 sm:p-8">
          {activeTab === "upload" && <UploadPhotoTab />}
          {activeTab === "barcode" && <ScanBarcodeTab />}
          {activeTab === "design" && <DesignFromScratchTab />}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.7;
          }
        }
      `}</style>
    </main>
  );
}
