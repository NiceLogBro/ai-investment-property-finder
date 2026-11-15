"use client";

import Link from "next/link";
import MagicalParticles from "@/components/MagicalParticles";
import Navbar from "@/components/Navbar";
import ModelViewer from "@/components/ModelViewer";
import { useDesign } from "@/context/DesignContext";
import { priceDesign, formatMoney } from "@/lib/pricing";

const TICKER = [
  "Photo scan",
  "Barcode lookup",
  "Tag reader",
  "10 garment types",
  "Live 3D model",
  "Palette suggestions",
  "Size guide",
  "Share links",
  "Dropship direct",
  "Order tracking",
];

const START_PATHS = [
  {
    href: "/upload#upload",
    icon: "📸",
    title: "Upload a photo",
    body: "Drop in any outfit. AI reads the garment type, brand cues, fabric mix, colors and estimated measurements.",
    cta: "Scan an outfit",
  },
  {
    href: "/upload#barcode",
    icon: "🏷️",
    title: "Scan a barcode or tag",
    body: "Enter a barcode or snap the care tag to pull materials, origin and care details for an exact duplicate.",
    cta: "Look up a tag",
  },
  {
    href: "/gallery",
    icon: "🎨",
    title: "Start from a template",
    body: "Browse ready-made looks, from oxford shirts to floral dresses, and remix them in the customizer.",
    cta: "Browse templates",
  },
];

const STEPS = [
  { n: "01", title: "Capture", body: "Upload a photo, scan a barcode or tag, or pick a template." },
  { n: "02", title: "Analyze", body: "The garment is broken down into type, fabric, color, fit and details." },
  { n: "03", title: "Customize", body: "Edit lettering, colors, patterns, collars, sleeves, length, fit, cut and pockets." },
  { n: "04", title: "Preview", body: "See it on a model, rotate it, check every angle and the live price." },
  { n: "05", title: "Order", body: "Send it to the dropship partner and follow it from your wardrobe." },
];

const FEATURES = [
  { icon: "🔍", title: "AI outfit recognition", body: "Identify garment type, fabric blend, palette and design features from a single photo." },
  { icon: "📐", title: "Measurement estimates", body: "Get chest, waist, length and sleeve estimates, clearly labeled as estimates." },
  { icon: "🏷️", title: "Barcode & tag scanning", body: "GTIN-validated lookups plus AI tag reading for composition, origin and care." },
  { icon: "🎛️", title: "Full design control", body: "Ten garment types with lettering, patterns, collars, sleeves, fit, cuts, pockets and hardware." },
  { icon: "🎨", title: "Palette suggestions", body: "One click generates complementary, analogous, triadic and tonal color schemes." },
  { icon: "↶", title: "Undo, redo & surprise me", body: "Experiment freely with full history, or let the randomizer spark new ideas." },
  { icon: "👗", title: "Live 3D-style model", body: "A rotating model wears your exact design, front and back, with lettering and details." },
  { icon: "🧺", title: "Wardrobe & share links", body: "Save designs in your browser and share any look with a link. No account needed." },
  { icon: "📏", title: "Size guide", body: "Enter your measurements for a recommended size and apply it to your design." },
  { icon: "🧾", title: "Transparent pricing", body: "Every option is itemized live. The server re-checks the price at checkout." },
  { icon: "🚚", title: "Dropship hand-off", body: "Validated orders go to a swappable dropship provider with a delivery estimate." },
  { icon: "📦", title: "Order tracking", body: "Placed orders appear in your wardrobe with a status timeline." },
];

const EDITABLE = [
  "Lettering",
  "Color",
  "Patterns",
  "Details",
  "Length",
  "Collar",
  "Fit",
  "Sleeves",
  "Cut",
  "Pockets",
  "Hardware",
  "Gradients",
];

const FAQ = [
  {
    q: "Does it really identify who made a garment?",
    a: "The AI looks for visible logos, labels and distinctive design cues, and only names a brand when it sees evidence. Otherwise it reports “not identified”. Barcode lookups use a catalog, which currently holds demo entries.",
  },
  {
    q: "How accurate are the measurements?",
    a: "Measurements from a photo are estimates, since a single image can't capture true scale. Always compare with a garment you own or check the size guide before ordering.",
  },
  {
    q: "Can I order a real garment today?",
    a: "This build simulates the dropship hand-off: orders are validated, priced on the server and queued with a demo provider, but nothing is charged or shipped. A real supplier and payment provider plug into the same interfaces.",
  },
  {
    q: "Where are my designs stored?",
    a: "Saved designs, orders and your current design live in your browser's local storage. Share links carry the design in the URL fragment, so it is never sent to a server.",
  },
  {
    q: "Do I need an API key?",
    a: "Not to explore. Without a key you get sample analysis. Add a Gemini API key on the server to analyze your own photos and tags.",
  },
];

function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-16 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12 reveal">
          <p className="text-sm font-semibold text-violet-700 uppercase tracking-wider">{eyebrow}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function HomePage() {
  const { design } = useDesign();
  const price = priceDesign(design);

  return (
    <>
      <MagicalParticles />
      <Navbar />

      <main className="relative z-10 pt-16">
        {/* ───────────── Hero ───────────── */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-14 pb-20 sm:pt-20 sm:pb-28">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700">
                <span className="animate-sparkle inline-block">✨</span>
                AI-powered custom clothing, delivered by dropship
              </p>
              <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-slate-900">
                Scan any outfit.
                <br />
                <span className="text-gradient-brand animate-gradient-shift">Redesign every detail.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
                Upload a photo, scan a barcode or tag, or start from scratch. Change lettering, color, patterns, length,
                collars, sleeves, fit and pockets, then watch it come to life on a model before it ships.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Link href="/upload" className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl">
                  Upload your outfit
                  <span aria-hidden="true">→</span>
                </Link>
                <Link href="/customize" className="btn-ghost inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl">
                  Design from scratch
                </Link>
              </div>
              <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                {[
                  ["10", "garment types"],
                  ["12+", "editable options"],
                  ["Live", "itemized pricing"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="text-3xl font-bold text-slate-900">{v}</dt>
                    <dd className="text-sm text-slate-500">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Live model card */}
            <div className="lg:col-span-5 relative">
              <div className="surface rounded-[2rem] p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-violet-50/80 via-white to-fuchsia-50/60" aria-hidden="true" />
                <div className="relative flex justify-center">
                  <ModelViewer design={design} />
                </div>
              </div>
              {/* Floating chips reflect the live design */}
              <div className="hidden sm:flex absolute -left-6 top-14 items-center gap-2 rounded-2xl bg-white border border-slate-200 shadow-lg px-4 py-2.5 animate-float-slow">
                <span className="grid place-items-center w-8 h-8 rounded-lg" style={{ background: design.colors.primary }} aria-hidden="true" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">Garment</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {design.garmentType} · {design.size}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex absolute -right-4 bottom-20 items-center gap-2 rounded-2xl bg-white border border-slate-200 shadow-lg px-4 py-2.5 animate-float-slow" style={{ animationDelay: "1.5s" }}>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">Your price</p>
                  <p className="text-lg font-bold text-slate-900">{formatMoney(price.unitPrice)}</p>
                </div>
                <Link href="/customize" className="btn-primary rounded-lg px-3 py-1.5 text-xs font-semibold">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── Ticker ───────────── */}
        <div className="border-y border-slate-200 bg-white/80 backdrop-blur overflow-hidden py-4" aria-hidden="true">
          <div className="flex w-max animate-marquee">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="mx-6 inline-flex items-center gap-6 text-sm font-medium text-slate-500 whitespace-nowrap">
                {t}
                <span className="text-violet-400">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ───────────── Three ways to start ───────────── */}
        <Section eyebrow="Get started" title="Three ways to begin">
          <div className="grid md:grid-cols-3 gap-6">
            {START_PATHS.map((p) => (
              <Link key={p.title} href={p.href} className="surface surface-hover reveal group rounded-3xl p-7 flex flex-col">
                <span className="grid place-items-center w-14 h-14 rounded-2xl bg-violet-50 text-2xl">{p.icon}</span>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed flex-1">{p.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 group-hover:gap-2.5 transition-all">
                  {p.cta} <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Section>

        {/* ───────────── How it works ───────────── */}
        <Section id="how-it-works" eyebrow="How it works" title="From inspiration to doorstep in five steps" className="bg-slate-50">
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((s) => (
              <li key={s.n} className="surface reveal rounded-3xl p-6">
                <span className="text-sm font-bold text-gradient-brand">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ───────────── Features ───────────── */}
        <Section id="features" eyebrow="Features" title="Everything you need to design, preview and order">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <article key={f.title} className="surface surface-hover reveal rounded-3xl p-6">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 text-xl">{f.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{f.body}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* ───────────── Editable options ───────────── */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
          <div className="max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-amber-500 p-px">
            <div className="rounded-[calc(2rem-1px)] bg-white px-6 py-12 sm:px-12 grid lg:grid-cols-2 gap-10 items-center">
              <div className="reveal">
                <p className="text-sm font-semibold text-violet-700 uppercase tracking-wider">Customization</p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Change anything that makes it yours</h2>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Every tweak updates the model and the price instantly. Mix patterns, add lettering on the front, back or sleeve, extend or crop the length, and layer on hardware like zippers, rivets and embroidery.
                </p>
                <Link href="/customize" className="btn-primary mt-7 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl">
                  Open the customizer <span aria-hidden="true">→</span>
                </Link>
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {EDITABLE.map((e) => (
                  <li key={e} className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-800">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────────── FAQ ───────────── */}
        <Section id="faq" eyebrow="FAQ" title="Straight answers" className="bg-slate-50">
          <div className="max-w-3xl space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="surface group rounded-2xl px-6 py-5 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-violet-600 text-xl transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* ───────────── CTA ───────────── */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto rounded-[2rem] bg-slate-900 px-6 py-14 sm:px-14 text-center relative overflow-hidden">
            <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-violet-500/30 blur-[90px]" aria-hidden="true" />
            <div className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-amber-400/20 blur-[90px]" aria-hidden="true" />
            <h2 className="relative text-3xl sm:text-4xl font-bold tracking-tight text-white">Ready to make something that's only yours?</h2>
            <p className="relative mt-4 text-slate-300 max-w-xl mx-auto">Start with a photo, a barcode or a blank canvas. It takes about a minute to see your first design on a model.</p>
            <div className="relative mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/upload" className="btn-primary px-7 py-3.5 text-base font-semibold rounded-xl">
                Start designing
              </Link>
              <Link href="/gallery" className="rounded-xl border border-white/25 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors">
                Browse templates
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
