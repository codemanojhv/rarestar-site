/** Identifies the only remaining site. */
export type SiteKey = "studio";

export interface SiteConfig {
  key: SiteKey;
  name: string;
  tagline: string;
  domain: string;
  baseUrl: string;
  themeColor: string;
}

/** Canonical config for the Studio site. */
export const SITES: Record<SiteKey, SiteConfig> = {
  studio: {
    key: "studio",
    name: "Rarestar Studio",
    tagline: "Building products that matter",
    domain: "rarestar.studio",
    baseUrl: "https://rarestar.studio",
    themeColor: "#050505"
  }
} as const;
