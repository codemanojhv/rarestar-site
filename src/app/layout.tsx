import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import SoundDesign from "@/components/SoundDesign";
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
    default: "Rarestar — Creative Studio for High-Growth Founders",
    template: "%s · Rarestar"
  },
  description:
    "Rarestar is a boutique creative studio designing brand systems, high-converting websites, and headless commerce for founders who sweat every pixel. Makers of RARES.AI.",
  keywords: [
    "creative studio",
    "brand identity design",
    "headless commerce agency",
    "Next.js commerce",
    "Sanity CMS development",
    "high conversion landing pages",
    "custom shopify themes",
    "AI motion graphics",
    "RARES.AI",
    "UI UX design studio",
    "digital product design"
  ],
  openGraph: {
    type: "website",
    url: "https://rarestar.studio",
    title: "Rarestar — We design the unforgettable.",
    description:
      "A creative studio for founders who sweat every pixel. Brand systems, websites, commerce, and AE-level AI motion graphics.",
    siteName: "Rarestar",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rarestar Creative Studio — Brand systems and Headless Commerce"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rarestar — Creative Studio",
    description:
      "Brand systems, websites, commerce, and AE-level AI motion graphics. Designed by Rarestar.",
    creator: "@rarestarstudio",
    images: ["/twitter-image"]
  },
  alternates: {
    canonical: "https://rarestar.studio"
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://rarestar.studio#organization",
      "name": "Rarestar Creative Studio",
      "url": "https://rarestar.studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rarestar.studio/brand/mark.png",
        "width": "512",
        "height": "512"
      },
      "image": "https://rarestar.studio/opengraph-image",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@rarestar.studio",
        "contactType": "customer service"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Global",
        "addressCountry": "US"
      },
      "priceRange": "$$$",
      "sameAs": [
        "https://rares.ai",
        "https://twitter.com/rarestarstudio",
        "https://www.linkedin.com/company/rarestar-studio"
      ],
      "description": "Boutique creative studio specializing in high-performance brand systems, headless commerce, and cinematic AI motion graphics for high-growth founders."
    },
    {
      "@type": "WebSite",
      "@id": "https://rarestar.studio#website",
      "url": "https://rarestar.studio",
      "name": "Rarestar",
      "publisher": { "@id": "https://rarestar.studio#organization" },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://rarestar.studio/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://rarestar.studio#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://rarestar.studio"
        }
      ]
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://rarestar.studio#navigation",
      "name": "Primary Navigation",
      "url": "https://rarestar.studio",
      "hasPart": [
        { "@type": "WebPage", "name": "Studio", "url": "https://rarestar.studio#divisions" },
        { "@type": "WebPage", "name": "Services", "url": "https://rarestar.studio#services" },
        { "@type": "WebPage", "name": "Work", "url": "https://rarestar.studio#work" },
        { "@type": "WebPage", "name": "Testimonials", "url": "https://rarestar.studio#testimonials" },
        { "@type": "WebPage", "name": "Contact", "url": "https://rarestar.studio#contact" }
      ]
    },
    {
      "@type": "Service",
      "name": "Visual Brand Identity",
      "provider": { "@id": "https://rarestar.studio#organization" },
      "serviceType": "Design Service",
      "description": "Comprehensive brand systems including logo design, typography, and cinematic motion principles."
    },
    {
      "@type": "Service",
      "name": "Headless E-commerce",
      "provider": { "@id": "https://rarestar.studio#organization" },
      "serviceType": "Development Service",
      "description": "High-performance headless stores built with Shopify and Next.js for maximum conversion."
    },
    {
      "@type": "CreativeWork",
      "name": "RARES.AI",
      "creator": { "@id": "https://rarestar.studio#organization" },
      "genre": "AI Motion Graphics",
      "description": "Custom AI-driven motion graphics platform for brand storytelling."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Arjun Mehta" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "Rarestar didn't just build our brand — they gave it a soul. Every touchpoint feels intentional.",
      "itemReviewed": { "@id": "https://rarestar.studio#organization" }
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Priya Sharma" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "We went from a generic Shopify template to a headless storefront that converts 3× better. The obsession with craft is real.",
      "itemReviewed": { "@id": "https://rarestar.studio#organization" }
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
        <SoundDesign />
        <Cursor />
      </body>
    </html>
  );
}
