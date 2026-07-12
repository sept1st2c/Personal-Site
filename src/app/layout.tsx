import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { person } from "@/lib/data";

// Self-hosted at build time via next/font — no runtime CDN request, and it
// degrades to the system sans stack declared in the font's fallback if the
// Google Fonts fetch ever fails during build.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// No custom domain yet — falls back to the Vercel preview/production URL at
// deploy time (Vercel sets VERCEL_URL automatically), and to localhost in
// dev. Once a custom domain is live, set NEXT_PUBLIC_SITE_URL in the Vercel
// project's environment variables to it and this resolves correctly
// everywhere without a code change.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const title = `${person.name} — Fullstack and Agentic AI Developer`;
const description =
  "Shubh Gupta — fullstack developer and agentic AI enthusiast. Full-stack products, AI agent systems, and everything in between.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: person.name,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="atmosphere-layer" aria-hidden="true" />
        <div className="grain-layer" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
