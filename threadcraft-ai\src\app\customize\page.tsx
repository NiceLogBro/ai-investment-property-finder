"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import MagicalParticles from "@/components/MagicalParticles";
import DesignToolbar from "@/components/DesignToolbar";
import { useDesign } from "@/context/DesignContext";
import { priceDesign, priceLines, formatMoney } from "@/lib/pricing";
import CustomizerPanel from "@/components/customizer/CustomizerPanel";
import ClothingPreview from "@/components/customizer/ClothingPreview";

function CustomizerContent() {
  const { design } = useDesign();
  const total = priceDesign(design).unitPrice;

  const specs: [string, string][] = [
    ["Garment", `${design.garmentType} · ${design.size}`],
    ["Collar", design.collar],
    ["Sleeves", design.sleeve],
    ["Fit", design.fit.type],
    ["Cut", design.cut],
    ["Pockets", design.pocket === "No Pockets" ? "None" : `${design.pocket} × ${design.pocketCount}`],
    ["Pattern", design.pattern.type],
    ["Details", design.embellishments.length > 0 ? design.embellishments.join(", ") : "Minimal"],
    ["Lettering", design.text.content || "None"],
  ];

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <MagicalParticles />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500 mb-3">
              <Link href="/" className="hover:text-violet-700">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/upload" className="hover:text-violet-700">Scanner</Link>
              <span aria-hidden="true">/</span>
              <span className="text-slate-900 font-medium" aria-current="page">Customizer</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Atelier <span className="text-gradient-brand">Customizer</span>
            </h1>
            <p className="mt-3 text-slate-600 max-w-2xl">
              {design.basedOn ? (
                <>Editing a duplicate of <strong className="text-slate-900">{design.basedOn}</strong>. Change anything and the preview and price update instantly.</>
              ) : (
                <>Edit every detail of your garment. The preview and price update instantly.</>
              )}
            </p>
          </div>

          {/* Live price + order */}
          <div className="surface rounded-2xl p-4 flex items-center gap-5">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Per piece</p>
              <p className="text-3xl font-extrabold text-slate-900">{formatMoney(total)}</p>
            </div>
            <Link href="/checkout" className="btn-primary rounded-xl px-5 py-3 text-sm font-semibold">
              Order now →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: controls */}
          <div className="lg:col-span-7 space-y-6">
            <DesignToolbar />
            <CustomizerPanel />
          </div>

          {/* Right: preview, specs, price */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <section className="surface rounded-3xl p-6" aria-labelledby="preview-heading">
              <div className="flex items-center justify-between mb-4">
                <h2 id="preview-heading" className="text-base font-bold">Live preview</h2>
                <Link href="/preview" className="text-sm font-semibold text-violet-700 hover:underline">
                  View on model →
                </Link>
              </div>
              <ClothingPreview />
            </section>

            <section className="surface rounded-3xl p-6" aria-labelledby="specs-heading">
              <h2 id="specs-heading" className="text-sm font-bold uppercase tracking-wider text-slate-500">Specifications</h2>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {specs.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="font-medium text-slate-900">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="surface rounded-3xl p-6" aria-labelledby="price-heading">
              <h2 id="price-heading" className="text-sm font-bold uppercase tracking-wider text-slate-500">Price breakdown</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {priceLines(design).map((line) => (
                  <li key={line.label} className="flex justify-between gap-4">
                    <span className="text-slate-600">{line.label}</span>
                    <span className="font-medium text-slate-900">{formatMoney(line.amount)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-baseline">
                <span className="font-bold">Total per piece</span>
                <span className="text-2xl font-extrabold text-violet-700">{formatMoney(total)}</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">Shipping and tax are added at checkout.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CustomizePage() {
  return <CustomizerContent />;
}
