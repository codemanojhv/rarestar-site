import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getSiteFromHostname } from "@/lib/subdomain";
import { SITES } from "@/types/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const host = (await headers()).get("host") || "rarestar.studio";
  const site = SITES[getSiteFromHostname(host)];
  return [
    {
      url: site.baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0
    }
  ];
}
