import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/agency/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import SoundDesign from "@/components/agency/SoundDesign";

export const metadata: Metadata = {
  metadataBase: new URL("https://agency.rarestar.studio"),
  title: {
    default: "Rarestar Agency — Design, Development & AI Solutions",
    template: "%s · Rarestar Agency"
  },
  description:
    "Rarestar Agency is a creative agency for brand identity, marketing websites, headless Shopify commerce, and AI solutions. Design through launch.",
  keywords: [
    "creative agency",
    "brand identity design",
    "headless commerce agency",
    "Next.js agency",
    "Sanity CMS development",
    "landing pages",
    "custom Shopify themes",
    "Rarestar Agency",
    "UI UX design agency",
    "digital product design",
    "AI solutions agency"
  ],
  openGraph: {
    type: "website",
    url: "https://agency.rarestar.studio",
    title: "Rarestar Agency — Design, Development & AI Solutions",
    description:
      "Brand systems, marketing sites, headless commerce, and AI solutions. Clear process and production-ready delivery.",
    siteName: "Rarestar Agency",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rarestar Agency — Creative agency for brand, web, commerce & AI"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rarestar Agency — Design, Development & AI Solutions",
    description:
      "Brand identity, websites, headless commerce, and AI solutions from design through launch.",
    creator: "@rarestarstudio",
    images: ["/twitter-image"]
  },
  alternates: {
    canonical: "https://agency.rarestar.studio"
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://agency.rarestar.studio#organization",
      name: "Rarestar Agency",
      url: "https://agency.rarestar.studio",
      logo: {
        "@type": "ImageObject",
        url: "https://agency.rarestar.studio/brand/mark.png",
        width: "512",
        height: "512"
      },
      image: "https://agency.rarestar.studio/opengraph-image",
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@rarestar.studio",
        contactType: "customer service"
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "India",
        addressCountry: "IN"
      },
      priceRange: "$$$",
      parentOrganization: {
        "@type": "Organization",
        name: "Rarestar Creative Studio LLP",
        url: "https://rarestar.studio"
      },
      sameAs: [
        "https://twitter.com/rarestarstudio",
        "https://www.linkedin.com/company/rarestar-studio"
      ],
      description:
        "Creative agency for brand identity, marketing websites, headless Shopify commerce, and AI solutions."
    },
    {
      "@type": "WebSite",
      "@id": "https://agency.rarestar.studio#website",
      url: "https://agency.rarestar.studio",
      name: "Rarestar Agency",
      publisher: { "@id": "https://agency.rarestar.studio#organization" },
      inLanguage: "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://agency.rarestar.studio#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://agency.rarestar.studio"
        }
      ]
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://agency.rarestar.studio#navigation",
      name: "Primary Navigation",
      url: "https://agency.rarestar.studio",
      hasPart: [
        { "@type": "WebPage", name: "Services", url: "https://agency.rarestar.studio#services" },
        { "@type": "WebPage", name: "Work", url: "https://agency.rarestar.studio#work" },
        { "@type": "WebPage", name: "Testimonials", url: "https://agency.rarestar.studio#testimonials" },
        { "@type": "WebPage", name: "Contact", url: "https://agency.rarestar.studio#contact" }
      ]
    },
    {
      "@type": "Service",
      name: "Visual Brand Identity",
      provider: { "@id": "https://agency.rarestar.studio#organization" },
      serviceType: "Design Service",
      description: "Logo, typography, color systems, and written brand guidelines."
    },
    {
      "@type": "Service",
      name: "Headless E-commerce",
      provider: { "@id": "https://agency.rarestar.studio#organization" },
      serviceType: "Development Service",
      description:
        "High-performance headless stores built with Shopify and Next.js for maximum conversion."
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Arjun Mehta" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "RareStar delivered our brand system and site on schedule with clear handoffs.",
      itemReviewed: { "@id": "https://agency.rarestar.studio#organization" }
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Priya Sharma" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "Headless Next.js storefront with faster checkout and more completed orders.",
      itemReviewed: { "@id": "https://agency.rarestar.studio#organization" }
    }
  ]
};

/**
 * Agency layout — wraps the agency subdomain (agency.rarestar.studio).
 * Contains all agency-specific SEO, JSON-LD, and UI chrome (nav, cursor, etc.).
 */
export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
    </>
  );
}
