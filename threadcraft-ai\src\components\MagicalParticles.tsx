"use client";

// Subtle ambient backdrop for the light theme: a dot grid plus a few soft pastel blobs.
// (Name kept so existing pages keep working; it no longer renders dark-mode particles.)

export default function MagicalParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      <div className="absolute inset-0 dot-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-violet-200/50 blur-[110px] animate-aurora" />
      <div className="absolute top-1/3 -right-32 w-[480px] h-[480px] rounded-full bg-fuchsia-200/40 blur-[110px] animate-aurora" style={{ animationDelay: "3s" }} />
      <div className="absolute -bottom-40 left-1/3 w-[460px] h-[460px] rounded-full bg-amber-100/60 blur-[110px] animate-aurora" style={{ animationDelay: "6s" }} />
    </div>
  );
}
