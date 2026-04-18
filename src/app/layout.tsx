import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://rarestar.studio"),
  title: {
    default: "Rarestar Creative Studio — We design the unforgettable.",
    template: "%s · Rarestar"
  },
  description:
    "Rarestar is a creative studio building brand systems, websites, and commerce for founders who sweat every pixel. Home of RARES.AI and Rarestar Agency.",
  keywords: [
    "creative studio",
    "brand identity",
    "headless commerce",
    "Shopify studio",
    "Sanity CMS",
    "Next.js agency",
    "motion graphics",
    "RARES.AI"
  ],
  openGraph: {
    type: "website",
    url: "https://rarestar.studio",
    title: "Rarestar Creative Studio",
    description:
      "Two arms. One obsession with craft. Brand systems, websites, commerce, and the first AI motion graphics tool whose output does not look AI-generated.",
    siteName: "Rarestar"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rarestar Creative Studio",
    description:
      "Brand systems, websites, commerce, and AE-level AI motion graphics. Made by Rarestar."
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1
};

// JSON-LD: Organization + WebSite schema. Lifts SEO + AI-assistant visibility.
// Kept minimal and truthful; easy to extend with FAQPage / Service once those
// sections ship with real content.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://rarestar.studio#organization",
      name: "Rarestar Creative Studio",
      url: "https://rarestar.studio",
      logo: "https://rarestar.studio/brand/mark.png",
      sameAs: [
        "https://rares.ai",
        "https://twitter.com/rarestarstudio",
        "https://www.linkedin.com/company/rarestar-studio"
      ],
      description:
        "Creative studio building brand systems, websites, and headless commerce for founders who sweat every pixel. Makers of RARES.AI."
    },
    {
      "@type": "WebSite",
      "@id": "https://rarestar.studio#website",
      url: "https://rarestar.studio",
      name: "Rarestar Creative Studio",
      publisher: { "@id": "https://rarestar.studio#organization" },
      inLanguage: "en"
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <ScrollProgress />
        <Nav />
        {children}
        <Cursor />
      </body>
    </html>
  );
}
