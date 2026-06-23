import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import StudioNav from "@/components/studio/StudioNav";
import StudioFooter from "@/components/studio/StudioFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://rarestar.studio"),
  title: "Rarestar Studio — Building Products That Matter",
  description:
    "Rarestar Studio is a product studio and umbrella brand operating ventures in software, AI, and digital products.",
  openGraph: {
    type: "website",
    url: "https://rarestar.studio",
    title: "Rarestar Studio — Building Products That Matter",
    description: "Venture studio building impactful software and AI solutions.",
    siteName: "Rarestar Studio",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
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
    url: "https://rarestar.studio/brand/mark.png",
    width: "512",
    height: "512"
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
