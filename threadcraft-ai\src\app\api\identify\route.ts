import { getIdentifier } from "@/lib/server/identify";
import { isValidGtin, lookupBarcode, SAMPLE_BARCODES } from "@/lib/server/catalog";

const MAX_BASE64_CHARS = 7_000_000; // ≈ 5 MB of image data
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const mode = body.mode;

  if (mode === "barcode") {
    const code = typeof body.barcode === "string" ? body.barcode.replace(/\s|-/g, "") : "";
    if (!isValidGtin(code)) {
      return Response.json(
        { error: "That doesn't look like a valid barcode (8, 12, 13 or 14 digits with a correct check digit)." },
        { status: 400 },
      );
    }
    const analysis = await lookupBarcode(code);
    if (!analysis) {
      return Response.json(
        {
          error: "Barcode not found in the catalog. Try uploading a photo of the tag, or design from scratch.",
          sampleBarcodes: SAMPLE_BARCODES,
        },
        { status: 404 },
      );
    }
    return Response.json({ analysis });
  }

  if (mode === "photo" || mode === "tag") {
    const imageBase64 = typeof body.imageBase64 === "string" ? body.imageBase64 : "";
    const mimeType = typeof body.mimeType === "string" ? body.mimeType : "";
    if (!imageBase64 || !ALLOWED_MIME.has(mimeType)) {
      return Response.json({ error: "Send a JPG, PNG or WEBP image." }, { status: 400 });
    }
    if (imageBase64.length > MAX_BASE64_CHARS) {
      return Response.json({ error: "Image is too large. Please use one under 5 MB." }, { status: 413 });
    }
    try {
      const analysis = await getIdentifier().identify({ kind: mode, imageBase64, mimeType });
      return Response.json({ analysis });
    } catch (err) {
      console.error("identify failed", err);
      return Response.json({ error: "The AI analysis failed. Please try again." }, { status: 502 });
    }
  }

  return Response.json({ error: "mode must be photo, tag or barcode" }, { status: 400 });
}
