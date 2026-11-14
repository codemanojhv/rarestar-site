export type SiteKey = "studio" | "stringtheoryads";

export interface SiteConfig {
  key: SiteKey;
  name: string;
  tagline: string;
  domain: string;
  baseUrl: string;
  themeColor: string;
  icon: string;
}

/** Canonical config for each public hostname. */
export const SITES: Record<SiteKey, SiteConfig> = {
  studio: {
    key: "studio",
    name: "Rarestar Studio",
    tagline: "Independent venture studio building String Theory Ads.",
    domain: "rarestar.studio",
    baseUrl: "https://www.rarestar.studio",
    themeColor: "#050505",
    icon: "/icon.png"
  },
  stringtheoryads: {
    key: "stringtheoryads",
    name: "String Theory Ads",
    tagline: "Local attention, in context.",
    domain: "stringtheoryads.in",
    baseUrl: "https://stringtheoryads.in",
    themeColor: "#050030",
    icon: "/brand/string-theory-ads-mark.png"
  }
} as const;
