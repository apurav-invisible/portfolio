/**
 * layout.tsx
 *
 * Root layout — wraps every page in the application.
 *
 * This is a Server Component (no "use client") — it runs on the server,
 * generates the HTML shell, and streams it to the browser.
 *
 * FONTS:
 * Geist Sans and Geist Mono are already the correct fonts for this portfolio.
 * They are loaded here once and exposed as CSS variables:
 *   --font-geist-sans  →  used as --font-sans in the design system
 *   --font-geist-mono  →  used as --font-mono in the design system
 *
 * METADATA:
 * Next.js App Router uses the Metadata API (exported `metadata` object)
 * instead of <head> tags. This generates correct <title> and <meta> tags
 * in the rendered HTML.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";

// Load Geist Sans — primary UI font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  // display: "swap" prevents invisible text during font load
  display: "swap",
});

// Load Geist Mono — used only for code, section numbers, labels
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Load Inter Tight — used for the Overview hero headline (weight 800 / 700)
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});


// SEO metadata — Next.js injects these into <head> automatically
export const metadata: Metadata = {
  title: "Apurav — Software Developer",
  description:
    "Portfolio of Apurav, a software developer based in Pune. Selected work, projects, experiments, and writing.",
  // Prevent search engines from caching a stale description
  openGraph: {
    title: "Apurav — Software Developer",
    description: "Software developer based in Pune. Selected work and projects.",
    type: "website",
  },
};

/**
 * RootLayout
 *
 * The `children` prop receives the rendered page component.
 * For the root route ("/"), that is app/page.tsx.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      /*
       * Apply the font CSS variables to the html element so every
       * component in the tree can use var(--font-geist-sans) etc.
       *
       * "antialiased" is a Tailwind utility that applies -webkit-font-smoothing:
       * antialiased and -moz-osx-font-smoothing: grayscale. This makes text
       * look crisper on most displays.
       *
       * "h-full" ensures the html element fills the full viewport height,
       * which is required for the 100dvh shell to work correctly.
       */
      className={`${geistSans.variable} ${geistMono.variable} ${interTight.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
