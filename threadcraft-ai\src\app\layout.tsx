import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ThreadCraft AI - Transform Any Outfit Into Your Perfect Design",
  description:
    "Upload a photo, scan a barcode, or design from scratch. AI identifies every detail so you can customize it, preview it on a model, and order it through a dropship partner.",
  keywords: [
    "AI fashion",
    "custom clothing",
    "outfit recognition",
    "dropshipping",
    "design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${inter.className} min-h-screen antialiased bg-white text-slate-900 overflow-x-hidden`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
