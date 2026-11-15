"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MagicalParticles from "@/components/MagicalParticles";
import ModelViewer from "@/components/ModelViewer";
import { useDesign } from "@/context/DesignContext";
import { formatMoney, priceDesign } from "@/lib/pricing";
import { designFromHash, useHash } from "@/lib/share";

export default function SharedDesignPage() {
  const router = useRouter();
  const { replaceDesign } = useDesign();
  const hash = useHash();
  const design = useMemo(() => designFromHash(hash), [hash]);

  const edit = (to: string) => {
    if (!design) return;
    replaceDesign(structuredClone(design));
    router.push(to);
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <MagicalParticles />
      <Navbar />
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {!hash ? (
          <div className="surface-soft rounded-3xl p-12 text-center">
            <h1 className="text-2xl font-bold">No design to show</h1>
            <p className="mt-2 text-slate-600">Open a share link from the customizer or your wardrobe to view a design here.</p>
            <Link href="/customize" className="btn-primary mt-6 inline-block rounded-xl px-6 py-3 text-sm font-semibold">
              Open the customizer
            </Link>
          </div>
        ) : !design ? (
          <div role="alert" className="rounded-3xl border border-red-200 bg-red-50 p-12 text-center">
            <h1 className="text-2xl font-bold text-red-700">This link looks damaged</h1>
            <p className="mt-2 text-red-700/80">The design couldn't be read. Ask the sender for a fresh link.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="surface rounded-[2rem] p-6 bg-gradient-to-b from-violet-50 to-white">
              <ModelViewer design={design} />
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-700 uppercase tracking-wider">Shared design</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{design.basedOn ?? `Custom ${design.garmentType}`}</h1>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {[
                  ["Garment", `${design.garmentType} (Size ${design.size})`],
                  ["Pattern", design.pattern.type],
                  ["Collar", design.collar],
                  ["Sleeves", design.sleeve],
                  ["Fit / Cut", `${design.fit.type} · ${design.cut}`],
                  ["Details", design.embellishments.join(", ") || "None"],
                  ["Lettering", design.text.content.trim() || "None"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="font-medium text-slate-900">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-3xl font-extrabold text-violet-700">{formatMoney(priceDesign(design).unitPrice)}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => edit("/customize")} className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold">
                  Edit my own copy
                </button>
                <button type="button" onClick={() => edit("/checkout")} className="btn-ghost rounded-xl px-6 py-3 text-sm font-semibold">
                  Order this design
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
