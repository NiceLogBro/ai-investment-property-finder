"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MagicalParticles from "@/components/MagicalParticles";
import ModelViewer from "@/components/ModelViewer";
import { useDesign } from "@/context/DesignContext";
import { formatMoney, priceDesign } from "@/lib/pricing";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/templates";

export default function GalleryPage() {
  const router = useRouter();
  const { replaceDesign } = useDesign();
  const [category, setCategory] = useState<(typeof TEMPLATE_CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");

  const built = useMemo(
    () =>
      TEMPLATES.map((t) => {
        const design = t.build();
        return { template: t, design, price: priceDesign(design).unitPrice };
      }),
    [],
  );

  const q = query.trim().toLowerCase();
  const visible = built.filter(
    ({ template: t }) =>
      (category === "All" || t.category === category) &&
      (!q || `${t.name} ${t.tagline} ${t.tags.join(" ")}`.toLowerCase().includes(q)),
  );

  const open = (index: number, to: string) => {
    replaceDesign(structuredClone(built[index].design));
    router.push(to);
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <MagicalParticles />
      <Navbar />
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold text-violet-700 uppercase tracking-wider">Templates</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">Start from a finished look</h1>
          <p className="mt-4 text-lg text-slate-600">Pick a template, then change anything in the customizer. Prices update with every edit.</p>
        </header>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {TEMPLATE_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                  category === c
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div>
            <label htmlFor="template-search" className="sr-only">
              Search templates
            </label>
            <input
              id="template-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates…"
              className="w-full sm:w-64 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400"
            />
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 text-center text-slate-500">No templates match your search.</p>
        ) : (
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visible.map(({ template: t, design, price }) => {
              const index = built.findIndex((b) => b.template.id === t.id);
              return (
                <li key={t.id} className="surface surface-hover rounded-3xl overflow-hidden flex flex-col">
                  <div className="bg-gradient-to-b from-violet-50 to-white pt-6 flex justify-center">
                    <ModelViewer design={design} compact />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-semibold text-slate-900">{t.name}</h2>
                      <span className="text-sm font-bold text-violet-700 whitespace-nowrap">{formatMoney(price)}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600 flex-1">{t.tagline}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {[t.category, ...t.tags].map((tag) => (
                        <li key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => open(index, "/customize")} className="btn-primary rounded-xl px-3 py-2.5 text-sm font-semibold">
                        Customize
                      </button>
                      <button type="button" onClick={() => open(index, "/preview")} className="btn-ghost rounded-xl px-3 py-2.5 text-sm font-semibold">
                        Preview
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-12 text-sm text-slate-500">
          Want to begin from a real garment instead?{" "}
          <Link href="/upload" className="font-semibold text-violet-700 hover:underline">
            Scan a photo, barcode or tag
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
