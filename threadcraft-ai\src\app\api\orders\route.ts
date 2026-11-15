import { priceDesign } from "@/lib/pricing";
import { getDropshipProvider } from "@/lib/server/dropship";
import { sanitizeAddress, sanitizeDesign } from "@/lib/server/validate";

// Prototype: this validates the order, recomputes the price on the server (never trusting the
// client's total) and hands it to the dropship provider. No payment is taken here.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const address = sanitizeAddress(body.customer);
  if (!address.ok) return Response.json({ error: address.error }, { status: 400 });

  const design = sanitizeDesign(body.design);
  const price = priceDesign(
    design,
    typeof body.quantity === "number" ? body.quantity : 1,
    typeof body.shippingMethod === "string" ? (body.shippingMethod as never) : "standard",
  );

  try {
    const result = await getDropshipProvider().submit({ design, price, customer: address.value });
    return Response.json({ order: result, price });
  } catch (err) {
    console.error("dropship submit failed", err);
    return Response.json({ error: "We couldn't place your order. Please try again." }, { status: 502 });
  }
}
