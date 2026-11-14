import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getSiteFromHostname } from "@/lib/subdomain";
import { SITES } from "@/types/site";

/**
 * Point crawlers to the canonical sitemap for the current site.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") || "rarestar.studio";
  
  const canonicalUrl = SITES[getSiteFromHostname(host)].baseUrl;

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
