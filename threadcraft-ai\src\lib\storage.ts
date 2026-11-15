"use client";

// Tiny localStorage-backed stores for saved designs and placed orders.
// Snapshots are cached so useSyncExternalStore sees a stable reference between changes.

import { useSyncExternalStore } from "react";
import type { DesignState } from "./design";
import { sanitizeDesign } from "./sanitize";

function createListStore<T>(key: string, normalize: (raw: unknown) => T | null) {
  const EMPTY: T[] = [];
  let cache: T[] | null = null;
  const listeners = new Set<() => void>();

  const read = (): T[] => {
    if (cache) return cache;
    try {
      const raw = window.localStorage.getItem(key);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      cache = Array.isArray(parsed) ? parsed.map(normalize).filter((x): x is T => x !== null) : [];
    } catch {
      cache = [];
    }
    return cache;
  };

  const write = (next: T[]) => {
    cache = next;
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Storage full or blocked: keep working in memory.
    }
    listeners.forEach((l) => l());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) {
        cache = null;
        listener();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  };

  return { read, write, subscribe, getServerSnapshot: () => EMPTY };
}

// ── Saved designs ("My Wardrobe") ─────────────────────────────────────────────

export interface SavedDesign {
  id: string;
  name: string;
  createdAt: number;
  design: DesignState;
}

const savedStore = createListStore<SavedDesign>("threadcraft:saved:v1", (raw) => {
  const r = raw as Partial<SavedDesign> | null;
  if (!r || typeof r.id !== "string" || typeof r.name !== "string") return null;
  return {
    id: r.id,
    name: r.name.slice(0, 60),
    createdAt: typeof r.createdAt === "number" ? r.createdAt : Date.now(),
    design: sanitizeDesign(r.design),
  };
});

export function useSavedDesigns() {
  const items = useSyncExternalStore(savedStore.subscribe, savedStore.read, savedStore.getServerSnapshot);
  return {
    items,
    save(name: string, design: DesignState) {
      const entry: SavedDesign = {
        id: crypto.randomUUID(),
        name: name.trim().slice(0, 60) || `${design.garmentType} design`,
        createdAt: Date.now(),
        design: structuredClone(design),
      };
      savedStore.write([entry, ...savedStore.read()]);
      return entry;
    },
    remove(id: string) {
      savedStore.write(savedStore.read().filter((d) => d.id !== id));
    },
    rename(id: string, name: string) {
      savedStore.write(savedStore.read().map((d) => (d.id === id ? { ...d, name: name.trim().slice(0, 60) || d.name } : d)));
    },
  };
}

// ── Orders ────────────────────────────────────────────────────────────────────

export interface OrderRecord {
  orderNumber: string;
  createdAt: number;
  estimatedDelivery: string; // ISO date
  quantity: number;
  total: number;
  shippingLabel: string;
  design: DesignState;
}

const ordersStore = createListStore<OrderRecord>("threadcraft:orders:v1", (raw) => {
  const r = raw as Partial<OrderRecord> | null;
  if (!r || typeof r.orderNumber !== "string") return null;
  return {
    orderNumber: r.orderNumber,
    createdAt: typeof r.createdAt === "number" ? r.createdAt : Date.now(),
    estimatedDelivery: typeof r.estimatedDelivery === "string" ? r.estimatedDelivery : new Date().toISOString(),
    quantity: typeof r.quantity === "number" ? r.quantity : 1,
    total: typeof r.total === "number" ? r.total : 0,
    shippingLabel: typeof r.shippingLabel === "string" ? r.shippingLabel : "Standard Shipping",
    design: sanitizeDesign(r.design),
  };
});

/** Imperative add (used by checkout right after the server confirms the order). */
export function addOrder(order: OrderRecord) {
  ordersStore.write([order, ...ordersStore.read()]);
}

export function useOrders() {
  return useSyncExternalStore(ordersStore.subscribe, ordersStore.read, ordersStore.getServerSnapshot);
}
