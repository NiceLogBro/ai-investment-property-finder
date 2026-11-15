import Link from "next/link";

const COLUMNS = [
  {
    title: "Create",
    links: [
      { label: "AI Outfit Scanner", href: "/upload" },
      { label: "Atelier Customizer", href: "/customize" },
      { label: "Templates", href: "/gallery" },
      { label: "3D Model Preview", href: "/preview" },
    ],
  },
  {
    title: "Plan & Order",
    links: [
      { label: "Size Guide", href: "/size-guide" },
      { label: "Pricing", href: "/pricing" },
      { label: "Checkout", href: "/checkout" },
      { label: "Orders & Wardrobe", href: "/wardrobe" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Features", href: "/#features" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
              ThreadCraft<span className="text-gradient-brand"> AI</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-xs">
              Scan any outfit, redesign every detail, preview it on a model, and send it straight to a dropship partner.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-900">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-slate-500 hover:text-violet-700 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3 justify-between text-xs text-slate-500">
          <p>© 2026 ThreadCraft AI. Prototype build: orders are simulated and no payment is taken.</p>
          <p>Designs are saved in your browser only.</p>
        </div>
      </div>
    </footer>
  );
}
