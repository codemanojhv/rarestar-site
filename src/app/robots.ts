import type { MetadataRoute } from "next";
import { headers } from "next/headers";

/**
 * Subdomain-aware robots.txt generator.
 * Points to the sitemap of the current requesting host.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") || "rarestar.studio";
  
  // Set protocol based on localhost vs production
  const protocol = host.includes("localhost") ? "http" : "https";
  const canonicalUrl = `${protocol}://${host}`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      }
    ],
    sitemap: `${canonicalUrl}/sitemap.xml`
  };
}
