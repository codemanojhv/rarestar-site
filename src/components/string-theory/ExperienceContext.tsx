"use client";

import { createContext, useContext, useEffect, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";

export const venues = { cafe: "Café", shop: "Neighbourhood shop", workspace: "Shared workspace" } as const;
export const dayparts = { morning: "Morning", afternoon: "Afternoon", evening: "Evening" } as const;
export type ContextSelection = {
  venue: keyof typeof venues;
  daypart: keyof typeof dayparts;
  sampleMessage: string;
};
export type EnquiryKind = "campaign" | "venue" | "careers";

type ExperienceState = {
  selection: ContextSelection;
  touched: boolean;
  motion: boolean;
  setVenue: (venue: ContextSelection["venue"]) => void;
  setDaypart: (daypart: ContextSelection["daypart"]) => void;
  setSample: (sampleMessage: string) => void;
  useSelection: () => void;
  toggleMotion: () => void;
};

const ExperienceContext = createContext<ExperienceState | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<ContextSelection>({ venue: "cafe", daypart: "morning", sampleMessage: "" });
  const [touched, setTouched] = useState(false);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const venue = params.get("place");
    const daypart = params.get("moment");
    if (venue && daypart && Object.hasOwn(venues, venue) && Object.hasOwn(dayparts, daypart)) {
      setSelection((current) => ({ ...current, venue: venue as ContextSelection["venue"], daypart: daypart as ContextSelection["daypart"] }));
      setTouched(true);
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let savedMotion: string | null = null;
    try { savedMotion = sessionStorage.getItem("rarestar-motion"); } catch {}
    setMotion(savedMotion === "off" ? false : !reduced.matches);
    const onPreferenceChange = () => { if (reduced.matches) setMotion(false); };
    reduced.addEventListener("change", onPreferenceChange);
    return () => reduced.removeEventListener("change", onPreferenceChange);
  }, []);

  const update = (next: Partial<ContextSelection>) => {
    setSelection((current) => ({ ...current, ...next }));
    setTouched(true);
  };

  return (
    <ExperienceContext.Provider value={{
      selection, touched, motion,
      setVenue: (venue) => update({ venue }),
      setDaypart: (daypart) => update({ daypart }),
      setSample: (sampleMessage) => update({ sampleMessage: sampleMessage.slice(0, 60) }),
      useSelection: () => setTouched(true),
      toggleMotion: () => {
        const next = !motion;
        setMotion(next);
        try { sessionStorage.setItem("rarestar-motion", next ? "on" : "off"); } catch {}
      }
    }}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) throw new Error("ExperienceProvider is missing");
  return context;
}

export function ContextLink({ href, children, ...props }: ComponentPropsWithoutRef<"a"> & { href: string }) {
  const { selection, touched } = useExperience();
  let destination = href;
  if (touched) {
    const url = new URL(href);
    url.searchParams.set("place", selection.venue);
    url.searchParams.set("moment", selection.daypart);
    destination = url.toString();
  }
  return <a href={destination} {...props}>{children}</a>;
}
