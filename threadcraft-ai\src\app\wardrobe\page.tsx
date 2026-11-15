"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MagicalParticles from "@/components/MagicalParticles";
import ModelViewer from "@/components/ModelViewer";
import { useDesign } from "@/context/DesignContext";
import { formatMoney, priceDesign } from "@/lib/pricing";
import { copyText, shareUrl } from "@/lib/share";
import { useOrders, useSavedDesigns, type OrderRecord } from "@/lib/storage";

const STAGES = ["Order received", "Design verified", "In production", "Quality check", "Shipped", "Delivered"];
const DAY = 24 * 60 * 60 * 1000;

/** Demo timeline: spreads the stages evenly between order time and the estimated delivery. */
function stageIndex(order: OrderRecord, now: number): number {
  const end = new Date(order.estimatedDelivery).getTime();
  const span = Math.max(DAY, end - order.createdAt);
  const progress = Math.min(1, Math.max(0, (now - order.createdAt) / span));
  return Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));
}

const date = (ms: number | string) =>
  new Date(ms).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function WardrobePage() {
  const router = useRouter();
  const { replaceDesign } = useDesign();
  const { items, remove } = useSavedDesigns();
  const orders = useOrders();
  const [now] = useState(() => Date.now());
  const [confirming, setConfirming] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const openDesign = (id: string, to: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    replaceDesign(structuredClone(item.design));
    router.push(to);
  };

  const share = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const ok = await copyText(shareUrl(item.design));
    setNotice(ok ? `Share link for “${item.name}” copied` : "Couldn't access the clipboard.");
    window.setTimeout(() => setNotice(null), 2500);
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <MagicalParticles />
      <Navbar />
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-16">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold text-violet-700 uppercase tracking-wider">My Wardrobe</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">Saved designs & orders</h1>
          <p className="mt-4 text-lg text-slate-600">Everything here is stored in this browser. No account needed.</p>
        </header>

        <p role="status" aria-live="polite" className="text-sm text-emerald-700 min-h-5 -mb-10">
          {notice}
        </p>

        {/* Saved designs */}
        <section aria-labelledby="saved-heading">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 id="saved-heading" className="text-2xl font-bold">
              Saved designs <span className="text-slate-400 font-medium">({items.length})</span>
            </h2>
            <Link href="/customize" className="btn-ghost rounded-xl px-4 py-2 text-sm font-semibold">
              + New design
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="surface-soft rounded-3xl p-10 text-center">
              <p className="text-lg font-semibold">Nothing saved yet</p>
              <p className="mt-1 text-slate-600">Use “Save to wardrobe” in the customizer to keep a design here.</p>
              <div className="mt-6 flex justify-center gap-3">
                <Link href="/customize" className="btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold">
                  Open customizer
                </Link>
                <Link href="/gallery" className="btn-ghost rounded-xl px-5 py-2.5 text-sm font-semibold">
                  Browse templates
                </Link>
              </div>
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <li key={item.id} className="surface surface-hover rounded-3xl overflow-hidden flex flex-col">
                  <div className="bg-gradient-to-b from-violet-50 to-white pt-6 flex justify-center">
                    <ModelViewer design={item.design} compact />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-semibold truncate" title={item.name}>
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {item.design.garmentType} · Size {item.design.size} · Saved {date(item.createdAt)}
                    </p>
                    <p className="mt-2 text-lg font-bold text-violet-700">{formatMoney(priceDesign(item.design).unitPrice)}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => openDesign(item.id, "/customize")} className="btn-primary rounded-xl px-3 py-2 text-sm font-semibold">
                        Edit
                      </button>
                      <button type="button" onClick={() => openDesign(item.id, "/preview")} className="btn-ghost rounded-xl px-3 py-2 text-sm font-semibold">
                        Preview
                      </button>
                      <button type="button" onClick={() => openDesign(item.id, "/checkout")} className="btn-ghost rounded-xl px-3 py-2 text-sm font-semibold">
                        Order
                      </button>
                      <button type="button" onClick={() => share(item.id)} className="btn-ghost rounded-xl px-3 py-2 text-sm font-semibold">
                        Share
                      </button>
                    </div>
                    {confirming === item.id ? (
                      <div className="mt-3 flex items-center gap-2 text-sm">
                        <span className="text-slate-600">Delete?</span>
                        <button
                          type="button"
                          onClick={() => {
                            remove(item.id);
                            setConfirming(null);
                          }}
                          className="font-semibold text-red-600 hover:underline"
                        >
                          Yes, delete
                        </button>
                        <button type="button" onClick={() => setConfirming(null)} className="font-semibold text-slate-500 hover:underline">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setConfirming(item.id)} className="mt-3 self-start text-sm text-slate-500 hover:text-red-600">
                        Delete
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Orders */}
        <section id="orders" aria-labelledby="orders-heading" className="scroll-mt-24">
          <h2 id="orders-heading" className="text-2xl font-bold mb-2">
            Orders <span className="text-slate-400 font-medium">({orders.length})</span>
          </h2>
          <p className="text-sm text-slate-500 mb-6">Status is a demo timeline. Live tracking needs a connected supplier.</p>

          {orders.length === 0 ? (
            <div className="surface-soft rounded-3xl p-10 text-center">
              <p className="text-lg font-semibold">No orders yet</p>
              <p className="mt-1 text-slate-600">Orders you place at checkout appear here with their status.</p>
            </div>
          ) : (
            <ul className="space-y-5">
              {orders.map((o) => {
                const current = stageIndex(o, now);
                return (
                  <li key={o.orderNumber} className="surface rounded-3xl p-6 flex flex-col lg:flex-row gap-6">
                    <div className="shrink-0 w-32 h-40 rounded-2xl bg-gradient-to-b from-violet-50 to-white grid place-items-center overflow-hidden">
                      <div className="origin-center scale-[0.55]">
                        <ModelViewer design={o.design} compact />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-mono font-bold text-slate-900">{o.orderNumber}</h3>
                        <span className="text-lg font-bold text-violet-700">{formatMoney(o.total)}</span>
                      </div>
                      <p className="text-sm text-slate-600">
                        {o.quantity} × {o.design.garmentType} (Size {o.design.size}) · {o.shippingLabel}
                      </p>
                      <p className="text-sm text-slate-500">
                        Placed {date(o.createdAt)} · Estimated delivery {date(o.estimatedDelivery)}
                      </p>
                      <ol className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-3" aria-label="Order progress">
                        {STAGES.map((stage, i) => (
                          <li key={stage} aria-current={i === current ? "step" : undefined} className="text-center">
                            <span
                              className={`mx-auto grid place-items-center w-8 h-8 rounded-full text-xs font-bold border-2 ${
                                i < current
                                  ? "bg-emerald-500 border-emerald-500 text-white"
                                  : i === current
                                    ? "bg-violet-600 border-violet-600 text-white"
                                    : "bg-white border-slate-200 text-slate-400"
                              }`}
                            >
                              {i < current ? "✓" : i + 1}
                            </span>
                            <span className={`mt-1.5 block text-[11px] leading-tight ${i <= current ? "text-slate-800 font-medium" : "text-slate-400"}`}>
                              {stage}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
