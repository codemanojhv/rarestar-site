import type { SiteKey } from "@/types/site";

/** Resolve every request to the remaining Studio site. */
export function getSiteFromHostname(_host: string): SiteKey {
  return "studio";
}
