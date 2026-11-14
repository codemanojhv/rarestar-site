import { SITES, type SiteKey } from "@/types/site";

/** Resolve the product domain; all other hosts remain the Rarestar site. */
export function getSiteFromHostname(host: string): SiteKey {
  const hostname = host.toLowerCase().split(":")[0];
  return hostname === SITES.stringtheoryads.domain || hostname === `www.${SITES.stringtheoryads.domain}` || hostname === "stringtheoryads.localhost"
    ? "stringtheoryads"
    : "studio";
}
