# ThreadCraft AI — Magical AI-Powered Bespoke Clothing & Dropshipping Platform

ThreadCraft AI is a classy, interactive, magical-themed custom clothing and dropshipping platform built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS 4**.

## ✨ Key Features

- **AI Outfit, Barcode & Tag Scanner (`/upload`)**:
  - **Upload Outfit Photo**: Uses Gemini Vision AI (`GEMINI_API_KEY`) or a built-in demo analyzer to identify garment types, brand matches, estimated measurements, fabric composition, color palettes, and design features.
  - **Scan Barcode / Tag**: Validates GTIN-8/12/13/14 barcodes against the garment catalog (or reads uploaded care/material tags with AI) to extract brand, material composition, origin, and care instructions.
  - **Design From Scratch**: Choose from 10 garment types (`T-Shirt`, `Dress Shirt`, `Blouse`, `Jacket`, `Hoodie`, `Dress`, `Pants`, `Skirt`, `Coat`, `Sweater`) and tailored silhouettes.
- **Atelier AI Customizer (`/customize`)**:
  - Real-time customization of garment type, size (`XS`–`XXL`), primary/secondary/accent colors, chromatic gradients, weave patterns (`Stripes`, `Plaid`, `Floral`, `Geometric`, `Polka Dots`, `Camo`, `Abstract`, `Animal Print`, `Tie-Dye`), custom lettering & typography, collar styles, sleeve geometries, fit, length/width sliders, hemline cuts, pocket styles/counts, and hardware embellishments (`Buttons`, `Zipper`, `Embroidery`, `Sequins`, `Rivets`, `Drawstring`, `Hood`, `Belt Loops`, `Epaulettes`).
  - Live SVG hologram preview and itemized per-piece price breakdown.
- **Interactive 3D-Perspective Mannequin Preview (`/preview`)**:
  - Full-body model wearing the user's customized garment with 360° rotation (`Front`, `Back`, `Side`, `Detail`), zoom controls, and synchronized design state across pages.
- **Direct Dropship Checkout (`/checkout`)**:
  - Server-validated order submission (`POST /api/orders`) that sanitizes the design blueprint, recomputes itemized pricing server-side, and dispatches the order to the dropshipper provider interface.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Optional Environment Variables

Create a `.env.local` file (automatically ignored by git) to enable live Gemini vision analysis:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```
