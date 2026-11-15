"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MagicalParticles from "@/components/MagicalParticles";
import {
  BASE_PRICES,
  EMBELLISHMENT_PRICES,
  MAX_QUANTITY,
  SHIPPING_OPTIONS,
  TAX_RATE,
  formatMoney,
  priceDesign,
  type ShippingMethod,
} from "@/lib/pricing";
import {
  EMBELLISHMENTS,
  GARMENT_TYPES,
  PATTERN_TYPES,
  defaultDesign,
  type DesignState,
  type Embellishment,
  type GarmentType,
  type PatternType,
} from "@/lib/design";

const ADD_ONS: [string, string][] = [
  ["Pattern (any weave)", "+$8.00"],
  ["Gradient dye", "+$5.00"],
  ["Custom lettering", "+$6.50 (+$0.50 per character over 12)"],
  ["Pockets", "+$4.00 each"],
  ["Oversized fit allowance", "+$4.00"],
  ["Extended length (above 70%)", "from +$3.00"],
  ["Asymmetric cut", "+$6.00"],
  ["Bell sleeves", "+$4.00"],
  ["Puff or bishop sleeves", "+$5.00"],
  ["Raglan sleeves", "+$3.00"],
  ["Notch lapel collar", "+$6.00"],
  ["Shawl collar", "+$5.00"],
  ["Mandarin, spread or button-down collar", "+$2.00"],
];

export default function PricingPage() {
  const [garment, setGarment] = useState<GarmentType>("T-Shirt");
  const [pattern, setPattern] = useState<PatternType>("Solid");
  const [gradient, setGradient] = useState(false);
  const [lettering, setLettering] = useState(false);
  const [pockets, setPockets] = useState(0);
  const [hardware, setHardware] = useState<Embellishment[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [shipping, setShipping] = useState<ShippingMethod>("standard");

  const price = useMemo(() => {
    const design: DesignState = {
      ...structuredClone(defaultDesign),
      garmentType: garment,
      pattern: { ...defaultDesign.pattern, type: pattern },
      colors: { ...defaultDesign.colors, useGradient: gradient },
      text: { ...defaultDesign.text, content: lettering ? "Your text" : "" },
      pocket: pockets > 0 ? "Patch Pockets" : "No Pockets",
      pocketCount: pockets,
      embellishments: hardware,
    };
    return priceDesign(design, quantity, shipping);
  }, [garment, pattern, gradient, lettering, pockets, hardware, quantity, shipping]);

  const field =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400";

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <MagicalParticles />
      <Navbar />
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-20">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold text-violet-700 uppercase tracking-wider">Pricing</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight">Pay for what you design</h1>
          <p className="mt-4 text-lg text-slate-600">
            Each garment has a base price, and every customization is itemized. The same numbers power the customizer and checkout, and the server re-checks the total when you order.
          </p>
        </header>

        {/* Base prices */}
        <section aria-labelledby="base-heading">
          <h2 id="base-heading" className="text-2xl font-bold">Base garment prices</h2>
          <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {GARMENT_TYPES.map((g) => (
              <li key={g} className="surface surface-hover rounded-2xl p-5">
                <p className="text-sm text-slate-500">{g}</p>
                <p className="mt-1 text-2xl font-extrabold text-slate-900">{formatMoney(BASE_PRICES[g])}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Calculator */}
        <section aria-labelledby="calc-heading" className="surface rounded-[2rem] p-6 sm:p-10">
          <h2 id="calc-heading" className="text-2xl font-bold">Price calculator</h2>
          <p className="mt-1 text-slate-600">Pick options to see an itemized total including shipping and tax.</p>

          <div className="mt-8 grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-garment" className="block text-sm font-medium text-slate-700 mb-1.5">Garment</label>
                  <select id="c-garment" value={garment} onChange={(e) => setGarment(e.target.value as GarmentType)} className={field}>
                    {GARMENT_TYPES.map((g) => (<option key={g}>{g}</option>))}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-pattern" className="block text-sm font-medium text-slate-700 mb-1.5">Pattern</label>
                  <select id="c-pattern" value={pattern} onChange={(e) => setPattern(e.target.value as PatternType)} className={field}>
                    {PATTERN_TYPES.map((p) => (<option key={p}>{p}</option>))}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-pockets" className="block text-sm font-medium text-slate-700 mb-1.5">Pockets</label>
                  <select id="c-pockets" value={pockets} onChange={(e) => setPockets(Number(e.target.value))} className={field}>
                    {[0, 1, 2, 4].map((n) => (<option key={n} value={n}>{n === 0 ? "None" : n}</option>))}
                  </select>
                </div>
                <div>
                  <label htmlFor="c-qty" className="block text-sm font-medium text-slate-700 mb-1.5">Quantity (max {MAX_QUANTITY})</label>
                  <input id="c-qty" type="number" min={1} max={MAX_QUANTITY} value={quantity} onChange={(e) => setQuantity(Math.min(MAX_QUANTITY, Math.max(1, parseInt(e.target.value) || 1)))} className={field} />
                </div>
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-slate-700 mb-2">Extras</legend>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Gradient dye (+$5.00)", checked: gradient, set: setGradient },
                    { label: "Custom lettering (+$6.50)", checked: lettering, set: setLettering },
                  ].map((o) => (
                    <label key={o.label} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm cursor-pointer hover:border-violet-300">
                      <input type="checkbox" checked={o.checked} onChange={(e) => o.set(e.target.checked)} className="accent-violet-600 w-4 h-4" />
                      {o.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-medium text-slate-700 mb-2">Hardware & details</legend>
                <div className="grid sm:grid-cols-3 gap-3">
                  {EMBELLISHMENTS.map((e) => (
                    <label key={e} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm cursor-pointer hover:border-violet-300">
                      <input
                        type="checkbox"
                        checked={hardware.includes(e)}
                        onChange={(ev) => setHardware((h) => (ev.target.checked ? [...h, e] : h.filter((x) => x !== e)))}
                        className="accent-violet-600 w-4 h-4"
                      />
                      <span>{e} <span className="text-slate-500">(+${(EMBELLISHMENT_PRICES[e] ?? 5).toFixed(0)})</span></span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-medium text-slate-700 mb-2">Shipping</legend>
                <div className="grid sm:grid-cols-3 gap-3">
                  {SHIPPING_OPTIONS.map((s) => (
                    <label key={s.id} className={`rounded-xl border px-4 py-3 text-sm cursor-pointer ${shipping === s.id ? "border-violet-500 bg-violet-50" : "border-slate-200 hover:border-violet-300"}`}>
                      <input type="radio" name="shipping" value={s.id} checked={shipping === s.id} onChange={() => setShipping(s.id)} className="sr-only" />
                      <span className="block font-semibold">{s.label.replace(" Shipping", "")}</span>
                      <span className="block text-slate-500">{s.time}</span>
                      <span className="block font-semibold text-violet-700">{formatMoney(s.price)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-violet-200 bg-gradient-to-b from-violet-50 to-white p-6 lg:sticky lg:top-24" aria-live="polite">
                <h3 className="font-semibold">Estimate</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {price.lines.map((l) => (
                    <li key={l.label} className="flex justify-between gap-4">
                      <span className="text-slate-600">{l.label}</span>
                      <span className="font-medium">{formatMoney(l.amount)}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-4 pt-4 border-t border-violet-200 space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-slate-600">Per piece</dt><dd className="font-semibold">{formatMoney(price.unitPrice)}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-600">Subtotal × {price.quantity}</dt><dd className="font-semibold">{formatMoney(price.subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-600">{price.shipping.label}</dt><dd className="font-semibold">{formatMoney(price.shipping.price)}</dd></div>
                  <div className="flex justify-between"><dt className="text-slate-600">Tax ({(TAX_RATE * 100).toFixed(2)}%)</dt><dd className="font-semibold">{formatMoney(price.tax)}</dd></div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-violet-200">
                    <dt className="font-bold">Total</dt>
                    <dd className="text-3xl font-extrabold text-violet-700">{formatMoney(price.total)}</dd>
                  </div>
                </dl>
                <Link href="/customize" className="btn-primary mt-6 block text-center rounded-xl px-5 py-3 text-sm font-semibold">
                  Design it now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section aria-labelledby="addons-heading">
          <h2 id="addons-heading" className="text-2xl font-bold">Customization add-ons</h2>
          <div className="mt-6 surface rounded-3xl overflow-hidden">
            <table className="w-full text-sm text-left">
              <caption className="sr-only">Add-on prices per garment</caption>
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th scope="col" className="px-6 py-3 font-semibold">Option</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Price per piece</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[...ADD_ONS, ...EMBELLISHMENTS.map((e): [string, string] => [`Hardware: ${e}`, `+$${(EMBELLISHMENT_PRICES[e] ?? 5).toFixed(2)}`])].map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row" className="px-6 py-3 font-medium text-slate-800">{k}</th>
                    <td className="px-6 py-3 text-slate-600">{v}</td>
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
