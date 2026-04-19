import type { MetadataRoute } from "next";

const BASE = "https://rarestar.studio";

/**
 * World-class sitemap configuration.
 * Only includes the primary canonical URL for this single-page high-intent
 * creative studio site. Fragment identifiers (#) are excluded as they are 
 * not crawlable page-level entities and can dilute search signals.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
