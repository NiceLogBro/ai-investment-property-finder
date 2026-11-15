import "server-only";

import type { DesignState } from "@/lib/design";
import type { PriceBreakdown } from "@/lib/pricing";

// Dropshipper hand-off. `MockDropshipProvider` stands in for a real supplier API
// (Printful, CJ Dropshipping, a cut-and-sew partner…). Implement `DropshipProvider`
// for the chosen supplier and return it from `getDropshipProvider`.

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone?: string;
  address1: string;
  address2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface DropshipOrderRequest {
  design: DesignState;
  price: PriceBreakdown;
  customer: ShippingAddress;
}

export interface DropshipOrderResult {
  orderNumber: string;
  provider: string;
  status: "queued";
  estimatedDelivery: string; // ISO date
}

export interface DropshipProvider {
  submit(order: DropshipOrderRequest): Promise<DropshipOrderResult>;
}

export const MockDropshipProvider: DropshipProvider = {
  async submit({ price }) {
    const orderNumber = `TC-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`;
    const eta = new Date(Date.now() + price.shipping.days * 24 * 60 * 60 * 1000);
    return { orderNumber, provider: "mock", status: "queued", estimatedDelivery: eta.toISOString() };
  },
};

export function getDropshipProvider(): DropshipProvider {
  return MockDropshipProvider;
}
