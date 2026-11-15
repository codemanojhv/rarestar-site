import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono, Manrope } from "next/font/google";
import { ExperienceProvider } from "@/components/string-theory/ExperienceContext";
import "./globals.css";
import "./experience.css";
import "./journey.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap"
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rarestar.studio")
};

/**
 * Minimal root layout — shared across all subdomains.
 * Font variables, viewport config, and globals.css only.
 * Site-specific SEO, JSON-LD, nav, and chrome live in route-group layouts.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body><ExperienceProvider>{children}</ExperienceProvider></body>
    </html>
  );
}
