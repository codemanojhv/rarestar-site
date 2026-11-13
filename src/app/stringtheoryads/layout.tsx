import type { Metadata, Viewport } from "next";

const siteUrl = "https://stringtheoryads.rarestar.studio";
const description =
  "String Theory Ads is a local-first, context-aware digital out-of-home advertising product in development at Rarestar Studio.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "String Theory Ads | Local attention, in context",
  description,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "String Theory Ads | Local attention, in context",
    description,
    siteName: "String Theory Ads",
    locale: "en_IN",
    images: [{ url: "/brand/string-theory-ads-wordmark.png", alt: "String Theory Ads" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "String Theory Ads | Local attention, in context",
    description,
    images: ["/brand/string-theory-ads-wordmark.png"]
  },
  alternates: { canonical: siteUrl },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/brand/string-theory-ads-mark.png" }
};

export const viewport: Viewport = {
  themeColor: "#08154d",
  width: "device-width",
  initialScale: 1
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "String Theory Ads",
  alternateName: "String Theory",
  url: siteUrl,
  description,
  publisher: {
    "@type": "Organization",
    name: "Rarestar Studio",
    url: "https://rarestar.studio"
  }
};

export default function StringTheoryAdsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
