import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import StudioNav from "@/components/studio/StudioNav";
import StudioFooter from "@/components/studio/StudioFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://rarestar.studio"),
  title: "Rarestar Studio - Products With a Point of View",
  description:
    "Rarestar Studio is a minimal product studio building focused software, AI systems, and digital ventures.",
  openGraph: {
    type: "website",
    url: "https://rarestar.studio",
    title: "Rarestar Studio - Products With a Point of View",
    description: "A focused product studio building software, AI systems, and new ventures.",
    siteName: "Rarestar Studio",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rarestar Studio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rarestar Studio - Products With a Point of View",
    description: "A focused product studio building software, AI systems, and new ventures.",
    creator: "@rarestarstudio",
    images: ["/twitter-image"]
  },
  alternates: {
    canonical: "https://rarestar.studio"
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://rarestar.studio#organization",
  name: "Rarestar Creative Studio LLP",
  url: "https://rarestar.studio",
  logo: {
    "@type": "ImageObject",
    url: "https://rarestar.studio/brand/studio-lockup-red-bg.png",
    width: "2516",
    height: "631"
  },
  sameAs: [
    "https://twitter.com/rarestarstudio",
    "https://www.linkedin.com/company/rarestar-studio"
  ]
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScroll />
      <ScrollProgress />
      <StudioNav />
      {children}
      <StudioFooter />
      <Cursor />
    </>
  );
}
