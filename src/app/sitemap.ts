import type { MetadataRoute } from "next";

const STUDIO = "https://rarestar.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: STUDIO,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0
    }
  ];
}
