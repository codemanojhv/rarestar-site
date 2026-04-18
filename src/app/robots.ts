import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://rarestar.studio/sitemap.xml",
    host: "https://rarestar.studio"
  };
}
