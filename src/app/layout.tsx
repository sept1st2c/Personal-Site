import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Self-hosted at build time via next/font — no runtime CDN request, and it
// degrades to the system sans stack declared in the font's fallback if the
// Google Fonts fetch ever fails during build.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubh Gupta — Founding Engineer",
  description:
    "Shubh Gupta — founding engineer building full-stack products and AI agent systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="grain-layer" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
