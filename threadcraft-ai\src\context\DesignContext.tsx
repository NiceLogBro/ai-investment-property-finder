"use client";

// Shared, persisted design state with undo/redo. Backed by a tiny external store so every
// page (/customize, /preview, /checkout…) sees the same design and it survives reloads.

import { useSyncExternalStore } from "react";
import {
  defaultDesign,
  type CollarType,
  type CutStyle,
  type DesignColors,
  type DesignFit,
  type DesignPattern,
  type DesignState,
  type DesignText,
  type Embellishment,
  type PocketType,
  type Size,
  type SleeveStyle,
} from "@/lib/design";

export * from "@/lib/design";

const STORAGE_KEY = "threadcraft:design:v1";
const HISTORY_LIMIT = 50;
/** Edits within this window (e.g. dragging a slider) collapse into one undo step. */
const COALESCE_MS = 600;

let state: DesignState = defaultDesign;
let loaded = false;
let past: DesignState[] = [];
let future: DesignState[] = [];
let lastRecorded = 0;

interface HistoryInfo {
  canUndo: boolean;
  canRedo: boolean;
}
const NO_HISTORY: HistoryInfo = { canUndo: false, canRedo: false };
let history: HistoryInfo = NO_HISTORY;

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

function refreshHistory() {
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;
  if (canUndo !== history.canUndo || canRedo !== history.canRedo) history = { canUndo, canRedo };
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full/blocked: keep working in memory.
  }
}

function load() {
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw) as Partial<DesignState>;
    // Merge over defaults so older saved shapes never crash newer code.
    state = {
      ...defaultDesign,
      ...saved,
      colors: { ...defaultDesign.colors, ...saved.colors },
      text: { ...defaultDesign.text, ...saved.text },
      pattern: { ...defaultDesign.pattern, ...saved.pattern },
      fit: { ...defaultDesign.fit, ...saved.fit },
      embellishments: Array.isArray(saved.embellishments) ? saved.embellishments : [],
    };
  } catch {
    // Corrupt or unavailable storage: fall back to defaults.
  }
}

function update(next: DesignState | ((prev: DesignState) => DesignState)) {
  const value = typeof next === "function" ? next(state) : next;
  const now = Date.now();
  if (now - lastRecorded > COALESCE_MS) past = [...past.slice(-(HISTORY_LIMIT - 1)), state];
  lastRecorded = now;
  future = [];
  state = value;
  refreshHistory();
  persist();
  notify();
}

function undo() {
  if (past.length === 0) return;
  future = [state, ...future];
  state = past[past.length - 1];
  past = past.slice(0, -1);
  lastRecorded = 0;
  refreshHistory();
  persist();
  notify();
}

function redo() {
  if (future.length === 0) return;
  past = [...past, state];
  state = future[0];
  future = future.slice(1);
  lastRecorded = 0;
  refreshHistory();
  persist();
  notify();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  if (!loaded) load();
  return state;
}

const getServerSnapshot = () => defaultDesign;
const getHistory = () => history;
const getServerHistory = () => NO_HISTORY;

// Stable action functions (module level), so consumers never re-render because of them.
const actions = {
  /** Start a fresh design (always its own undo step). */
  replaceDesign: (design: DesignState) => {
    lastRecorded = 0;
    update(design);
  },
  setGarmentType: (garmentType: DesignState["garmentType"]) => update((p) => ({ ...p, garmentType })),
  setSize: (size: Size) => update((p) => ({ ...p, size })),
  setColors: (colors: Partial<DesignColors>) => update((p) => ({ ...p, colors: { ...p.colors, ...colors } })),
  setText: (text: Partial<DesignText>) => update((p) => ({ ...p, text: { ...p.text, ...text } })),
  setPattern: (pattern: Partial<DesignPattern>) => update((p) => ({ ...p, pattern: { ...p.pattern, ...pattern } })),
  setCollar: (collar: CollarType) => update((p) => ({ ...p, collar })),
  setSleeve: (sleeve: SleeveStyle) => update((p) => ({ ...p, sleeve })),
  setFit: (fit: Partial<DesignFit>) => update((p) => ({ ...p, fit: { ...p.fit, ...fit } })),
  setCut: (cut: CutStyle) => update((p) => ({ ...p, cut })),
  setPocket: (pocket: PocketType) => update((p) => ({ ...p, pocket })),
  setPocketCount: (pocketCount: number) => update((p) => ({ ...p, pocketCount })),
  toggleEmbellishment: (e: Embellishment) =>
    update((p) => ({
      ...p,
      embellishments: p.embellishments.includes(e)
        ? p.embellishments.filter((x) => x !== e)
        : [...p.embellishments, e],
    })),
  resetDesign: () => {
    lastRecorded = 0;
    update(defaultDesign);
  },
  undo,
  redo,
};

export function useDesign() {
  const design = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { canUndo, canRedo } = useSyncExternalStore(subscribe, getHistory, getServerHistory);
  // `isDefault` lets pages show a "start a design" prompt instead of a blank default.
  const isDefault = design === defaultDesign;
  return { design, isDefault, canUndo, canRedo, ...actions };
}

/** Kept for call-sites that still wrap content in a provider; the store is global now. */
export function DesignProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
