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
    background_color: "#0a0a0a",
    theme_color: site.themeColor,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon"
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png"
      }
    ]
  };
}
