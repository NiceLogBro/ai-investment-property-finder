"use client";

import { useSyncExternalStore } from "react";
import { sanitizeDesign } from "./sanitize";
import type { DesignState } from "./design";

const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

/** Current location hash (e.g. "#barcode"). Empty during SSR so hydration always matches. */
export function useHash(): string {
  return useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => "",
  );
}

// ── Share links: the design is serialized into the URL fragment (never sent to a server) ──

export function encodeDesign(design: DesignState): string {
  const bytes = new TextEncoder().encode(JSON.stringify(design));
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeDesign(encoded: string): DesignState | null {
  try {
    const b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const bin = atob(padded);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return sanitizeDesign(JSON.parse(new TextDecoder().decode(bytes)));
  } catch {
    return null;
  }
}

export function shareUrl(design: DesignState): string {
  return `${window.location.origin}/shared#d=${encodeDesign(design)}`;
}

export function designFromHash(hash: string): DesignState | null {
  const m = /^#d=(.+)$/.exec(hash);
  return m ? decodeDesign(m[1]) : null;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
