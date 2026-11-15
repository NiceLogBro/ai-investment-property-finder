"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSavedDesigns } from "@/lib/storage";

const NAV_LINKS = [
  { href: "/upload", label: "Scanner" },
  { href: "/customize", label: "Customizer" },
  { href: "/gallery", label: "Templates" },
  { href: "/preview", label: "3D Model" },
  { href: "/size-guide", label: "Size Guide" },
  { href: "/pricing", label: "Pricing" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items } = useSavedDesigns();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="ThreadCraft AI home">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/30 group-hover:rotate-6 transition-transform">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2zm7 11l.9 2.6L22.5 16.5l-2.6.9L19 20l-.9-2.6-2.6-.9 2.6-.9L19 13zM6 15l.7 2 2 .7-2 .7L6 20.5l-.7-2.1-2-.7 2-.7L6 15z" />
              </svg>
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              ThreadCraft<span className="text-gradient-brand"> AI</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active ? "text-violet-700 bg-violet-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/wardrobe"
              className="btn-ghost relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl"
            >
              My Wardrobe
              {items.length > 0 && (
                <span className="grid place-items-center min-w-5 h-5 px-1.5 rounded-full bg-violet-600 text-white text-[11px] font-bold">
                  {items.length}
                </span>
              )}
            </Link>
            <Link href="/upload" className="btn-primary px-5 py-2 text-sm font-semibold rounded-xl">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              {mobileMenuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!mobileMenuOpen}
        className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1"
      >
        {[...NAV_LINKS, { href: "/wardrobe", label: "My Wardrobe" }].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 text-sm font-medium rounded-xl ${
              pathname === link.href ? "bg-violet-50 text-violet-700" : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/upload"
          onClick={() => setMobileMenuOpen(false)}
          className="btn-primary block text-center px-5 py-3 text-sm font-semibold rounded-xl mt-2"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
