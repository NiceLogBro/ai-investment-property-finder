"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MagicalParticles from "@/components/MagicalParticles";
import { useDesign, SIZES, type Size } from "@/context/DesignContext";

type Unit = "in" | "cm";
type Kind = "tops" | "bottoms" | "dresses";
type Pref = "slim" | "regular" | "relaxed";

// Body measurement ranges in inches [min, max] for each size.
const CHEST: Record<Size, [number, number]> = { XS: [32, 34], S: [35, 37], M: [38, 40], L: [41, 43], XL: [44, 46], XXL: [47, 50] };
const WAIST: Record<Size, [number, number]> = { XS: [26, 28], S: [29, 31], M: [32, 34], L: [35, 37], XL: [38, 41], XXL: [42, 45] };
const HIP: Record<Size, [number, number]> = { XS: [34, 36], S: [37, 39], M: [40, 42], L: [43, 45], XL: [46, 49], XXL: [50, 53] };

const MEASURES: Record<Kind, { key: "chest" | "waist" | "hip"; label: string; help: string; chart: Record<Size, [number, number]> }[]> = {
  tops: [
    { key: "chest", label: "Chest", help: "Around the fullest part, under the arms.", chart: CHEST },
    { key: "waist", label: "Waist (optional)", help: "Around the narrowest part of your torso.", chart: WAIST },
  ],
  bottoms: [
    { key: "waist", label: "Waist", help: "Around your natural waistline.", chart: WAIST },
    { key: "hip", label: "Hips", help: "Around the fullest part of your hips.", chart: HIP },
  ],
  dresses: [
    { key: "chest", label: "Chest", help: "Around the fullest part, under the arms.", chart: CHEST },
    { key: "waist", label: "Waist", help: "Around the narrowest part of your torso.", chart: WAIST },
    { key: "hip", label: "Hips", help: "Around the fullest part of your hips.", chart: HIP },
  ],
};

/** Index of the size whose range contains the value; clamps to the nearest end. */
function sizeIndex(value: number, chart: Record<Size, [number, number]>): number {
  for (let i = 0; i < SIZES.length; i++) {
    const [, max] = chart[SIZES[i]];
    if (value <= max + 0.99) return i; // ranges are whole inches; bridge the gaps upward
  }
  return SIZES.length - 1;
}

export default function SizeGuidePage() {
  const { design, setSize } = useDesign();
  const [unit, setUnit] = useState<Unit>("in");
  const [kind, setKind] = useState<Kind>("tops");
  const [pref, setPref] = useState<Pref>("regular");
  const [values, setValues] = useState<Record<string, string>>({ chest: "", waist: "", hip: "" });
  const [applied, setApplied] = useState(false);

  const measures = MEASURES[kind];
  const toInches = (v: string) => {
    const n = parseFloat(v);
    if (!Number.isFinite(n) || n <= 0) return null;
    return unit === "cm" ? n / 2.54 : n;
  };

  const breakdown = measures
    .map((m) => {
      const inches = toInches(values[m.key]);
      return inches === null ? null : { ...m, inches, index: sizeIndex(inches, m.chart) };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const required = measures.filter((m) => !m.label.includes("optional"));
  const complete = required.every((m) => toInches(values[m.key]) !== null);
  const baseIndex = breakdown.length ? Math.max(...breakdown.map((b) => b.index)) : null;
  const adjusted = baseIndex === null ? null : Math.min(SIZES.length - 1, Math.max(0, baseIndex + (pref === "relaxed" ? 1 : pref === "slim" ? -1 : 0)));
  const recommended: Size | null = complete && adjusted !== null ? SIZES[adjusted] : null;

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400";

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <MagicalParticles />
      <Navbar />
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold text-violet-700 uppercase tracking-wider">Size guide</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">Find your size</h1>
          <p className="mt-4 text-lg text-slate-600">Enter your body measurements and we'll suggest a size from the chart below. Fit varies by cut, so treat it as a starting point.</p>
        </header>

        <div className="mt-10 grid lg:grid-cols-5 gap-8">
          {/* Calculator */}
          <section className="surface rounded-3xl p-6 sm:p-8 lg:col-span-3" aria-labelledby="calc-heading">
            <h2 id="calc-heading" className="text-xl font-bold">
              Size calculator
            </h2>

            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="kind" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Garment
                </label>
                <select id="kind" value={kind} onChange={(e) => setKind(e.target.value as Kind)} className={inputClass}>
                  <option value="tops">Tops & jackets</option>
                  <option value="dresses">Dresses</option>
                  <option value="bottoms">Pants & skirts</option>
                </select>
              </div>
              <div>
                <label htmlFor="pref" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Preferred fit
                </label>
                <select id="pref" value={pref} onChange={(e) => setPref(e.target.value as Pref)} className={inputClass}>
                  <option value="slim">Slim (size down)</option>
                  <option value="regular">Regular</option>
                  <option value="relaxed">Relaxed (size up)</option>
                </select>
              </div>
              <fieldset>
                <legend className="block text-sm font-medium text-slate-700 mb-1.5">Units</legend>
                <div className="flex rounded-xl border border-slate-200 p-1 bg-slate-50">
                  {(["in", "cm"] as Unit[]).map((u) => (
                    <button
                      key={u}
                      type="button"
                      aria-pressed={unit === u}
                      onClick={() => setUnit(u)}
                      className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${unit === u ? "bg-white shadow text-violet-700" : "text-slate-500"}`}
                    >
                      {u === "in" ? "Inches" : "Centimeters"}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {measures.map((m) => (
                <div key={m.key}>
                  <label htmlFor={`m-${m.key}`} className="block text-sm font-medium text-slate-700 mb-1.5">
                    {m.label} ({unit})
                  </label>
                  <input
                    id={`m-${m.key}`}
                    type="number"
                    inputMode="decimal"
                    min={1}
                    step="0.5"
                    value={values[m.key]}
                    onChange={(e) => {
                      setValues((v) => ({ ...v, [m.key]: e.target.value }));
                      setApplied(false);
                    }}
                    placeholder={unit === "in" ? "e.g. 38" : "e.g. 97"}
                    aria-describedby={`h-${m.key}`}
                    className={inputClass}
                  />
                  <p id={`h-${m.key}`} className="mt-1 text-xs text-slate-500">
                    {m.help}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-violet-200 bg-violet-50 p-6" aria-live="polite">
              {recommended ? (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-violet-800">Recommended size</p>
                    <p className="text-5xl font-extrabold text-violet-700">{recommended}</p>
                    <ul className="mt-2 text-xs text-slate-600 space-y-0.5">
                      {breakdown.map((b) => (
                        <li key={b.key}>
                          {b.label.replace(" (optional)", "")}: {b.inches.toFixed(1)}″ → {SIZES[b.index]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSize(recommended);
                      setApplied(true);
                    }}
                    className="btn-primary rounded-xl px-5 py-3 text-sm font-semibold"
                  >
                    {applied ? "✓ Applied to design" : `Use size ${recommended} for my ${design.garmentType}`}
                  </button>
                </div>
              ) : (
                <p className="text-slate-600">Enter {required.map((r) => r.label.toLowerCase()).join(" and ")} to see your recommended size.</p>
              )}
            </div>
          </section>

          {/* Tips */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="surface rounded-3xl p-6">
              <h2 className="text-lg font-bold">Measure like a tailor</h2>
              <ul className="mt-3 space-y-2.5 text-sm text-slate-600 list-disc pl-5">
                <li>Use a soft tape measure over thin clothing.</li>
                <li>Keep the tape level and snug, not tight.</li>
                <li>Stand naturally and breathe normally.</li>
                <li>If you're between sizes, pick by the largest measurement.</li>
              </ul>
            </div>
            <div className="surface rounded-3xl p-6">
              <h2 className="text-lg font-bold">Already scanned a garment?</h2>
              <p className="mt-2 text-sm text-slate-600">Photo scans give estimated garment measurements. Compare them with this chart before ordering.</p>
              <Link href="/upload" className="mt-4 inline-block text-sm font-semibold text-violet-700 hover:underline">
                Scan an outfit →
              </Link>
            </div>
          </aside>
        </div>

        {/* Chart */}
        <section className="mt-12" aria-labelledby="chart-heading">
          <h2 id="chart-heading" className="text-2xl font-bold">
            Size chart (body measurements, inches)
          </h2>
          <div className="mt-5 overflow-x-auto surface rounded-3xl">
            <table className="w-full text-sm text-left">
              <caption className="sr-only">Size chart showing chest, waist and hip ranges in inches for each size</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th scope="col" className="px-5 py-3 font-semibold">Size</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Chest</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Waist</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Hips</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SIZES.map((s) => (
                  <tr key={s} className={s === design.size ? "bg-violet-50" : ""}>
                    <th scope="row" className="px-5 py-3 font-bold text-slate-900">
                      {s}
                      {s === design.size && <span className="ml-2 text-xs font-medium text-violet-700">your design</span>}
                    </th>
                    <td className="px-5 py-3 text-slate-700">{CHEST[s][0]}–{CHEST[s][1]}</td>
                    <td className="px-5 py-3 text-slate-700">{WAIST[s][0]}–{WAIST[s][1]}</td>
                    <td className="px-5 py-3 text-slate-700">{HIP[s][0]}–{HIP[s][1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
