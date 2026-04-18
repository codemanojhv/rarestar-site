import type { MetadataRoute } from "next";

const BASE = "https://rarestar.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/#divisions`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/#services`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/#work`, lastModified: now, priority: 0.7 },
    { url: `${BASE}/#contact`, lastModified: now, priority: 0.9 }
  ];
}
