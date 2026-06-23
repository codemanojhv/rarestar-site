import type { SiteKey } from "@/types/site";

/**
 * Resolve the active site from a hostname string.
 *
 * Production:
 *   agency.rarestar.studio  → "agency"
 *   rehai.rarestar.studio   → "rehai"
 *   rarestar.studio         → "studio"
 *
 * Local dev (localhost / 127.0.0.1):
 *   Falls through to "studio" unless overridden via `?site=agency` etc.
 *   You can also add `agency.localhost` to your hosts file for real subdomain dev.
 */
export function getSiteFromHostname(host: string): SiteKey {
  // Strip port if present
  const hostname = host.split(":")[0].toLowerCase();

  // Production subdomains
  if (hostname === "agency.rarestar.studio" || hostname === "agency.localhost") {
    return "agency";
  }
  if (hostname === "rehai.rarestar.studio" || hostname === "rehai.localhost") {
    return "rehai";
  }

  // Main domain or localhost → studio
  return "studio";
}
