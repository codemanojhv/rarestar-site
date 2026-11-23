import type { Metadata } from "next";

const description = "Rarestar Studio is a Bengaluru venture building String Theory Ads, a local-first indoor advertising product.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rarestar.studio"),
  title: "Rarestar Studio | Building String Theory Ads in Bengaluru",
  description,
  openGraph: {
    type: "website",
    url: "https://www.rarestar.studio",
    title: "Rarestar Studio | Building String Theory Ads in Bengaluru",
    description,
    siteName: "Rarestar Studio",
    locale: "en_IN",
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
    title: "Rarestar Studio | Building String Theory Ads in Bengaluru",
    description,
    creator: "@rarestarstudio",
    images: ["/twitter-image"]
  },
  alternates: {
    canonical: "https://www.rarestar.studio"
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
  "@id": "https://www.rarestar.studio#organization",
  name: "Rarestar Creative Studio LLP",
  url: "https://www.rarestar.studio",
  description,
  logo: {
    "@type": "ImageObject",
    url: "https://www.rarestar.studio/brand/studio-lockup-red-bg.png",
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
      {children}
    </>
  );
}
