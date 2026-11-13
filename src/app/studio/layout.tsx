import type { Metadata } from "next";
import StudioNav from "@/components/studio/StudioNav";
import StudioFooter from "@/components/studio/StudioFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://rarestar.studio"),
  title: "Rarestar Studio | Building String Theory in Bengaluru",
  description:
    "Rarestar is an independent venture studio in Bengaluru building String Theory, a hyperlocal indoor digital out-of-home network.",
  openGraph: {
    type: "website",
    url: "https://rarestar.studio",
    title: "Rarestar Studio | Building String Theory in Bengaluru",
    description: "A Bengaluru venture studio developing a hyperlocal, context-aware indoor DOOH network.",
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
    title: "Rarestar Studio | Building String Theory in Bengaluru",
    description: "A Bengaluru venture studio developing a hyperlocal, context-aware indoor DOOH network.",
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
  description: "An independent Bengaluru venture studio building String Theory, a hyperlocal indoor DOOH network.",
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
      <StudioNav />
      {children}
      <StudioFooter />
    </>
  );
}
