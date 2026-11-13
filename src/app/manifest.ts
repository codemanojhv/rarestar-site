import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getSiteFromHostname } from "@/lib/subdomain";
import { SITES } from "@/types/site";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const headersList = await headers();
  const host = headersList.get("host") || "rarestar.studio";
  const siteKey = getSiteFromHostname(host);
  const site = SITES[siteKey];

  return {
    name: site.name,
    short_name: site.name,
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: site.themeColor,
    theme_color: site.themeColor,
    icons: [
      {
        src: site.icon,
        sizes: "any",
        type: "image/png"
      },
      {
        src: site.icon,
        sizes: "192x192",
        type: "image/png"
      }
    ]
  };
}
