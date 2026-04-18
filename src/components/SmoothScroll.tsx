"use client";

import { useEffect } from "react";
import { setLenis } from "@/lib/lenisSingleton";

/**
 * Lenis smooth scroll, globally initialised once, tied into GSAP's ticker so
 * every ScrollTrigger pin/scrub stays frame-accurate with Lenis's inertia.
 *
 * Key integration notes (from Lenis + GSAP docs):
 *  - `lenis.on("scroll", ScrollTrigger.update)` → ScrollTrigger recalculates on
 *    every Lenis frame, not just native scroll events.
 *  - `gsap.ticker.add((time) => lenis.raf(time * 1000))` → Lenis piggybacks on
 *    GSAP's RAF instead of running its own, so the two are in lockstep.
 *  - `gsap.ticker.lagSmoothing(0)` → disable lag smoothing; smooth scroll hates
 *    variable frame deltas being averaged.
 */
export default function SmoothScroll() {
  useEffect(() => {
    let dispose: (() => void) | null = null;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
        infinite: false
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      setLenis(lenis);

      dispose = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        setLenis(null);
      };
    })();

    return () => {
      dispose?.();
    };
  }, []);

  return null;
}
