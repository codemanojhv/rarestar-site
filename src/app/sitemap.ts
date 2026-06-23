import type { MetadataRoute } from "next";
import caseStudies from "@/data/case-studies.json";

const STUDIO = "https://rarestar.studio";
const AGENCY = "https://agency.rarestar.studio";
const REHAI = "https://rehai.rarestar.studio";

/**
 * Multi-subdomain sitemap covering all three properties.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    /* ── Studio ─────────────────────────────────────────── */
    {
      url: STUDIO,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1
    },

    /* ── Agency ─────────────────────────────────────────── */
    {
      url: AGENCY,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9
    },
    // Case study pages
    ...caseStudies.map((cs: { id: string }) => ({
      url: `${AGENCY}/work/${cs.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7
    })),

    /* ── Rehai ──────────────────────────────────────────── */
    {
      url: REHAI,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9
    }
  ];

  return entries;
}
