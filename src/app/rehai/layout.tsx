import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import RehaiNav from "@/components/rehai/RehaiNav";
import RehaiFooter from "@/components/rehai/RehaiFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://rehai.rarestar.studio"),
  title: "Rehai — AI-Powered Neurological Rehabilitation",
  description:
    "Rehai is an AI-powered neurological rehabilitation platform focused on speech and cognitive recovery. Adapts to each patient's unique journey.",
  keywords: [
    "neurological rehabilitation",
    "speech therapy AI",
    "cognitive recovery",
    "brain injury recovery",
    "stroke rehabilitation",
    "Rehai platform"
  ],
  openGraph: {
    type: "website",
    url: "https://rehai.rarestar.studio",
    title: "Rehai — AI-Powered Neurological Rehabilitation",
    description: "AI-powered neurological rehabilitation focused on speech and cognitive recovery.",
    siteName: "Rehai",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://rehai.rarestar.studio#application",
      name: "Rehai",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      url: "https://rehai.rarestar.studio",
      description: "AI-powered neurological rehabilitation platform for speech and cognitive recovery.",
      publisher: {
        "@type": "Organization",
        name: "Rarestar Studio",
        url: "https://rarestar.studio"
      }
    },
    {
      "@type": "MedicalOrganization",
      "@id": "https://rehai.rarestar.studio#organization",
      name: "Rehai",
      url: "https://rehai.rarestar.studio",
      parentOrganization: {
        "@type": "Organization",
        name: "Rarestar Creative Studio LLP",
        url: "https://rarestar.studio"
      }
    }
  ]
};

export default function RehaiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SmoothScroll />
      <ScrollProgress />
      <RehaiNav />
      {children}
      <RehaiFooter />
      <Cursor />
    </>
  );
}
