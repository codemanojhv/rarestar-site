import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import caseStudies from "@/data/case-studies.json";

const STUDIO = "https://rarestar.studio";
const AGENCY = "https://agency.rarestar.studio";
const REHAI = "https://rehai.rarestar.studio";

/**
 * Subdomain-aware dynamic sitemap generator.
 * Serves only URLs corresponding to the requesting host to prevent Search Console cross-domain errors.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("host") || "rarestar.studio";
  const now = new Date();

  // Agency Subdomain
  if (host.includes("agency.rarestar.studio") || host.includes("site=agency")) {
    return [
      {
        url: AGENCY,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 1.0
      },
      ...caseStudies.map((cs: { id: string }) => ({
        url: `${AGENCY}/work/${cs.id}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8
      }))
    ];
  }

  // Rehai Subdomain
  if (host.includes("rehai.rarestar.studio") || host.includes("site=rehai")) {
    return [
      {
        url: REHAI,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 1.0
      }
    ];
  }

  // Default: Studio Root Domain
  return [
    {
      url: STUDIO,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0
    }
  ];
}
