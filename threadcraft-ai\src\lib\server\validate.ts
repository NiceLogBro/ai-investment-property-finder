import "server-only";

import type { ShippingAddress } from "./dropship";

export { sanitizeDesign } from "@/lib/sanitize";

type Raw = Record<string, unknown>;
const obj = (v: unknown): Raw => (v && typeof v === "object" && !Array.isArray(v) ? (v as Raw) : {});
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Returns a cleaned address or a message describing the first problem. */
export function sanitizeAddress(input: unknown): { ok: true; value: ShippingAddress } | { ok: false; error: string } {
  const r = obj(input);
  const value: ShippingAddress = {
    fullName: str(r.fullName, 100),
    email: str(r.email, 200),
    phone: str(r.phone, 30) || undefined,
    address1: str(r.address1, 150),
    address2: str(r.address2, 150) || undefined,
    city: str(r.city, 80),
    region: str(r.region, 80),
    postalCode: str(r.postalCode, 20),
    country: str(r.country, 80),
  };
  const required: (keyof ShippingAddress)[] = ["fullName", "email", "address1", "city", "region", "postalCode", "country"];
  for (const key of required) {
    if (!value[key]) return { ok: false, error: `Missing ${key}` };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.email)) return { ok: false, error: "Invalid email" };
  return { ok: true, value };
}
