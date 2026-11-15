"use client";

import { useState } from "react";
import Link from "next/link";
import { useDesign, randomizeDesign } from "@/context/DesignContext";
import { useSavedDesigns } from "@/lib/storage";
import { copyText, shareUrl } from "@/lib/share";

const btn =
  "btn-ghost inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed";

/** Undo/redo, surprise-me, save-to-wardrobe and share-link actions for the current design. */
export default function DesignToolbar() {
  const { design, canUndo, canRedo, undo, redo, replaceDesign, resetDesign } = useDesign();
  const { save } = useSavedDesigns();
  const [status, setStatus] = useState<string | null>(null);
  const [name, setName] = useState("");

  const flash = (msg: string) => {
    setStatus(msg);
    window.setTimeout(() => setStatus(null), 2500);
  };

  const handleSave = () => {
    const entry = save(name || `${design.garmentType} · ${design.pattern.type}`, design);
    setName("");
    flash(`Saved “${entry.name}” to your wardrobe`);
  };

  const handleShare = async () => {
    const ok = await copyText(shareUrl(design));
    flash(ok ? "Share link copied to clipboard" : "Couldn't access the clipboard. Copy the link from the Share page.");
  };

  return (
    <div className="surface rounded-2xl p-4 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={undo} disabled={!canUndo} className={btn} aria-label="Undo last change">
          ↶ Undo
        </button>
        <button type="button" onClick={redo} disabled={!canRedo} className={btn} aria-label="Redo change">
          ↷ Redo
        </button>
        <button type="button" onClick={() => replaceDesign(randomizeDesign(design))} className={btn}>
          ✨ Surprise me
        </button>
        <button type="button" onClick={handleShare} className={btn}>
          🔗 Share link
        </button>
        <button type="button" onClick={resetDesign} className={btn}>
          ⟳ Reset
        </button>
        <Link href="/gallery" className={btn}>
          🎨 Templates
        </Link>
      </div>

      <form
        className="flex flex-col sm:flex-row gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <label htmlFor="design-name" className="sr-only">
          Design name
        </label>
        <input
          id="design-name"
          value={name}
          maxLength={60}
          onChange={(e) => setName(e.target.value)}
          placeholder={`Name this design (e.g. ${design.garmentType} · ${design.pattern.type})`}
          className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400"
        />
        <button type="submit" className="btn-primary rounded-xl px-5 py-2 text-sm font-semibold">
          💾 Save to wardrobe
        </button>
      </form>

      <p role="status" aria-live="polite" className={`text-xs ${status ? "text-emerald-700" : "text-transparent"} h-4`}>
        {status ?? "."}
      </p>
    </div>
  );
}
