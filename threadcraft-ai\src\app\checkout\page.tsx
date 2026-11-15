"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MagicalParticles from "@/components/MagicalParticles";
import { useDesign } from "@/context/DesignContext";
import { addOrder } from "@/lib/storage";
import {
  SHIPPING_OPTIONS,
  MAX_QUANTITY,
  clampQuantity,
  formatMoney,
  priceDesign,
  type ShippingMethod,
} from "@/lib/pricing";

const SHIPPING_ICONS: Record<ShippingMethod, string> = { standard: "📦", express: "🚚", priority: "⚡" };
const CONFETTI_COLORS = ["#7C3AED", "#F59E0B", "#EC4899", "#8B5CF6", "#F472B6", "#FBBF24", "#A78BFA"];

export default function CheckoutPage() {
  const { design } = useDesign();
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [order, setOrder] = useState<{ orderNumber: string; estimatedDelivery: string } | null>(null);
  const [confettiParticles, setConfettiParticles] = useState<
    { id: number; x: number; color: string; delay: number; duration: number }[]
  >([]);
  const orderPlaced = order !== null;

  // Form state (no card data: payments are not connected in this prototype)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const price = priceDesign(design, quantity, shippingMethod);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          design,
          quantity,
          shippingMethod,
          customer: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address1: formData.address,
            city: formData.city,
            region: formData.state,
            postalCode: formData.zip,
            country: formData.country,
          },
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        order?: { orderNumber: string; estimatedDelivery: string };
        price?: { total: number };
        error?: string;
      };
      if (!res.ok || !data.order) {
        throw new Error(data.error ?? "We couldn't place your order. Please try again.");
      }
      // Remember the order locally so it shows up under My Wardrobe → Orders.
      addOrder({
        orderNumber: data.order.orderNumber,
        createdAt: Date.now(),
        estimatedDelivery: data.order.estimatedDelivery,
        quantity,
        total: data.price?.total ?? price.total,
        shippingLabel: price.shipping.label,
        design: structuredClone(design),
      });
      setConfettiParticles(
        Array.from({ length: 60 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          delay: Math.random() * 2,
          duration: 2 + Math.random() * 3,
        })),
      );
      setOrder({
        orderNumber: data.order.orderNumber,
        estimatedDelivery: new Date(data.order.estimatedDelivery).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };
  const inputClass =
    "w-full rounded-xl bg-white shadow-sm border border-slate-200 text-slate-900 placeholder-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-violet-300 transition-all duration-300 backdrop-blur-sm";

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-hidden relative pt-20">
      <MagicalParticles />
      <Navbar />
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/8 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-amber-500/6 blur-[100px]" />
      </div>

      {/* Success Overlay */}
      {orderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md">
          {/* Confetti */}
          {confettiParticles.map((p) => (
            <div
              key={p.id}
              className="absolute w-3 h-3 rounded-sm pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: "-5%",
                backgroundColor: p.color,
                animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
                transform: `rotate(${(p.id * 47) % 360}deg)`,
              }}
            />
          ))}

          <div className="rounded-2xl bg-slate-100 backdrop-blur-xl border border-slate-300 p-10 max-w-md w-full mx-4 text-center relative overflow-hidden">
            {/* Success glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-violet-100 blur-3xl pointer-events-none" />

            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent mb-3">
              Order Confirmed!
            </h2>
            <p className="text-slate-600 mb-6">
              Your design has been queued with the dropship hand-off service.
            </p>
            <p className="text-xs text-amber-600 mb-6">
              Prototype order: nothing was charged and nothing will ship.
            </p>

            <div className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 mb-6">
              <p className="text-sm text-slate-500 mb-1">Order Number</p>
              <p className="text-lg font-mono font-bold text-violet-700">{order?.orderNumber}</p>
            </div>

            <div className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 mb-6">
              <p className="text-sm text-slate-500 mb-1">Estimated Delivery</p>
              <p className="text-slate-900 font-semibold">{order?.estimatedDelivery}</p>
            </div>

            <div className="space-y-3">
              <Link
                href="/wardrobe#orders"
                className="btn-primary block w-full rounded-xl font-semibold px-6 py-3 text-center"
              >
                View order status
              </Link>
              <Link
                href="/"
                className="block w-full rounded-xl bg-white shadow-sm border border-slate-200 text-slate-600 font-semibold px-6 py-3 transition-all duration-300 hover:bg-slate-100 text-center"
              >
                Back to home
              </Link>
            </div>
          </div>

          <style jsx>{`
            @keyframes confettiFall {
              0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
              }
              100% {
                transform: translateY(110vh) rotate(720deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <Link
            href="/preview"
            className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors mb-4 text-sm"
          >
            ← Back to Preview
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent mb-3">
            ✨ Complete Your Order
          </h1>
          <p className="text-slate-600 text-lg">
            Just a few steps to bring your design home
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Order Form */}
            <div className="flex-1 space-y-6">
              {/* Shipping Information */}
              <section className="rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <span className="text-2xl">📦</span> Shipping Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="fullName" className="block text-sm text-slate-500 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-slate-500 mb-1.5">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm text-slate-500 mb-1.5">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm text-slate-500 mb-1.5">
                      Street Address *
                    </label>
                    <input
                      id="address"
                      type="text"
                      required
                      placeholder="123 Enchanted Lane"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm text-slate-500 mb-1.5">
                      City *
                    </label>
                    <input
                      id="city"
                      type="text"
                      required
                      placeholder="Mystic Falls"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm text-slate-500 mb-1.5">
                      State *
                    </label>
                    <input
                      id="state"
                      type="text"
                      required
                      placeholder="CA"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="zip" className="block text-sm text-slate-500 mb-1.5">
                      ZIP Code *
                    </label>
                    <input
                      id="zip"
                      type="text"
                      required
                      placeholder="90210"
                      value={formData.zip}
                      onChange={(e) => handleInputChange("zip", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm text-slate-500 mb-1.5">
                      Country
                    </label>
                    <select
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className={inputClass}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Shipping Method */}
              <section className="rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <span className="text-2xl">🚚</span> Shipping Method
                </h2>

                <fieldset>
                  <legend className="sr-only">Select shipping method</legend>
                  <div className="space-y-3">
                    {SHIPPING_OPTIONS.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center gap-4 rounded-xl p-4 border cursor-pointer transition-all duration-300 ${
                          shippingMethod === option.id
                            ? "bg-purple-600/15 border-purple-400/50 shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                            : "bg-white shadow-sm border-slate-200 hover:bg-white/8 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={shippingMethod === option.id}
                          onChange={() => setShippingMethod(option.id)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            shippingMethod === option.id
                              ? "border-violet-500 bg-purple-500"
                              : "border-slate-300"
                          }`}
                        >
                          {shippingMethod === option.id && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="text-2xl">{SHIPPING_ICONS[option.id]}</span>
                        <div className="flex-1">
                          <p className="text-slate-900 font-medium">{option.label}</p>
                          <p className="text-sm text-slate-500">{option.time}</p>
                        </div>
                        <span className="text-slate-900 font-semibold">${option.price.toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </section>

              {/* Payment */}
              <section className="rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">💳</span> Payment
                </h2>
                <p className="text-sm text-slate-500">
                  Payments aren&apos;t connected in this prototype, so no card details are collected and nothing is
                  charged. Placing the order sends it to the dropship hand-off service so you can see the full flow.
                </p>
              </section>
            </div>

            {/* Right Column - Order Summary */}
            <div className="w-full lg:w-[400px] lg:sticky lg:top-8 self-start">
              <div className="rounded-2xl bg-white shadow-sm backdrop-blur-xl border border-slate-200 p-6 space-y-5">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  🧾 Order Summary
                </h2>

                {/* Mini Preview */}
                <div className="rounded-xl bg-white shadow-sm border border-slate-200 p-4 flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0 border border-slate-300"
                    style={{ background: `linear-gradient(135deg, ${design.colors.primary}, ${design.colors.useGradient ? design.colors.secondary : design.colors.primary})` }}
                    aria-hidden="true"
                  >
                    <span className="text-2xl drop-shadow">🧵</span>
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold">Custom {design.garmentType}</p>
                    <p className="text-sm text-slate-500">
                      {design.pattern.type} • {design.collar} • {design.fit.type} fit • Size {design.size}
                    </p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between">
                  <label htmlFor="quantity" className="text-sm text-slate-500">
                    Quantity
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center hover:bg-slate-200 transition-all"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      id="quantity"
                      type="number"
                      min={1}
                      max={MAX_QUANTITY}
                      value={quantity}
                       onChange={(e) => setQuantity(clampQuantity(parseInt(e.target.value) || 1))}
                      className="w-12 text-center bg-white shadow-sm border border-slate-200 rounded-lg py-1 text-slate-900"
                    />
                    <button
                      type="button"
                       onClick={() => setQuantity((q) => clampQuantity(q + 1))}
                      className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center hover:bg-slate-200 transition-all"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price Breakdown (computed by the shared pricing module; the server recomputes it on submit) */}
                <div className="border-t border-slate-200 pt-4 space-y-2.5">
                  {price.lines.map((line) => (
                    <div key={line.label} className="flex justify-between text-sm">
                      <span className="text-slate-500">{line.label}</span>
                      <span className="text-slate-900">{formatMoney(line.amount)}</span>
                    </div>
                  ))}
                  {quantity > 1 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">
                        Quantity ({formatMoney(price.unitPrice)} × {quantity})
                      </span>
                      <span className="text-slate-900"></span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm border-t border-slate-200 pt-2">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="text-slate-900">{formatMoney(price.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Shipping ({price.shipping.label})</span>
                    <span className="text-slate-900">{formatMoney(price.shipping.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Tax (estimated)</span>
                    <span className="text-slate-900">{formatMoney(price.tax)}</span>
                  </div>

                  <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-900">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
                      {formatMoney(price.total)}
                    </span>
                  </div>
                </div>

                {/* Fulfillment Info */}
                <div className="rounded-xl bg-violet-50 border border-violet-200 p-3">
                  <p className="text-xs text-slate-600 flex items-center gap-2">
                    <span>🏭</span>
                    Fulfilled by a dropship partner (demo provider)
                  </p>
                  <p className="text-xs text-slate-400 mt-1 ml-6">
                    Est. delivery: {price.shipping.time}
                  </p>
                </div>

                {/* Place Order Button */}
                {submitError && (
                  <p role="alert" className="text-sm text-red-600">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full relative rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold px-6 py-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-[1.02] text-lg overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">{submitting ? "Placing order…" : "✨ Place Order"}</span>
                </button>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    🧪 Prototype checkout: no payment is taken
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    📦 Quality Guaranteed
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    ↩️ Easy Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}