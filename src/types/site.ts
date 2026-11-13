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
    baseUrl: "https://rarestar.studio",
    themeColor: "#050505",
    icon: "/icon.png"
  },
  stringtheoryads: {
    key: "stringtheoryads",
    name: "String Theory Ads",
    tagline: "Local attention, in context.",
    domain: "stringtheoryads.rarestar.studio",
    baseUrl: "https://stringtheoryads.rarestar.studio",
    themeColor: "#08154d",
    icon: "/brand/string-theory-ads-mark.png"
  }
} as const;
