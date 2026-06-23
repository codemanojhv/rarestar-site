/** Identifies which subdomain the current request targets. */
export type SiteKey = "studio" | "agency" | "rehai";

export interface SiteConfig {
  key: SiteKey;
  name: string;
  tagline: string;
  domain: string;
  baseUrl: string;
  themeColor: string;
}

/** Canonical config for every subdomain. */
export const SITES: Record<SiteKey, SiteConfig> = {
  studio: {
    key: "studio",
    name: "Rarestar Studio",
    tagline: "Building products that matter",
    domain: "rarestar.studio",
    baseUrl: "https://rarestar.studio",
    themeColor: "#0a0a0a"
  },
  agency: {
    key: "agency",
    name: "Rarestar Agency",
    tagline: "Design, development, and AI solutions",
    domain: "agency.rarestar.studio",
    baseUrl: "https://agency.rarestar.studio",
    themeColor: "#0a0a0a"
  },
  rehai: {
    key: "rehai",
    name: "Rehai",
    tagline: "AI-powered neurological rehabilitation",
    domain: "rehai.rarestar.studio",
    baseUrl: "https://rehai.rarestar.studio",
    themeColor: "#0a0a0a"
  }
} as const;
