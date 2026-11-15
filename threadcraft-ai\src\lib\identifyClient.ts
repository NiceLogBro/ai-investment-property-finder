import type { GarmentAnalysis } from "./design";

/** Downscale an image file to a JPEG (max 1280px) so uploads stay small and fast. */
export async function fileToPayload(file: File): Promise<{ imageBase64: string; mimeType: string }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available in this browser.");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
  return { imageBase64: dataUrl.split(",")[1], mimeType: "image/jpeg" };
}

export type IdentifyRequest =
  | { mode: "photo" | "tag"; file: File }
  | { mode: "barcode"; barcode: string };

/** Calls /api/identify. Throws an Error with a user-presentable message on failure. */
export async function identifyGarment(req: IdentifyRequest): Promise<GarmentAnalysis> {
  const body =
    req.mode === "barcode"
      ? { mode: "barcode", barcode: req.barcode }
      : { mode: req.mode, ...(await fileToPayload(req.file)) };

  const res = await fetch("/api/identify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as { analysis?: GarmentAnalysis; error?: string; sampleBarcodes?: string[] };
  if (!res.ok || !data.analysis) {
    const hint = data.sampleBarcodes?.length ? ` Demo barcodes: ${data.sampleBarcodes.join(", ")}.` : "";
    throw new Error((data.error ?? "Something went wrong. Please try again.") + hint);
  }
  return data.analysis;
}
