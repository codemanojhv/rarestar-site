"use client";

import { useEffect, useRef } from "react";
import { getLenis } from "@/lib/lenisSingleton";

/**
 * A 1px ember line pinned to the top of the viewport, filling left-to-right
 * as the user scrolls the document. Reads from Lenis when present so the
 * value tracks the smooth-scroll interpolation, not the jumpy window.scrollY.
 *
 * Kept as a class-based `transform: scaleX()` so it's cheap to update every
 * frame without re-layout. Fixed above the nav (z-[110]) so it reads even on
 * the frosted sticky state.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const setProgress = (ratio: number) => {
      bar.style.transform = `scaleX(${Math.max(0, Math.min(1, ratio))})`;
    };

    let rafId = 0;
    let unbind: (() => void) | null = null;

    const attach = () => {
      const lenis = getLenis();
      if (lenis) {
        const handler = ({ scroll, limit }: { scroll: number; limit: number }) => {
          setProgress(limit > 0 ? scroll / limit : 0);
        };
        lenis.on("scroll", handler);
        unbind = () => lenis.off("scroll", handler);
        // prime once so the bar reflects current position on hot reload
        const s = window.scrollY;
        const limit = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(limit > 0 ? s / limit : 0);
      } else {
        const handler = () => {
          const s = window.scrollY;
          const limit = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(limit > 0 ? s / limit : 0);
        };
        window.addEventListener("scroll", handler, { passive: true });
        unbind = () => window.removeEventListener("scroll", handler);
        handler();
      }
    };

    rafId = requestAnimationFrame(attach);

    return () => {
      cancelAnimationFrame(rafId);
      unbind?.();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[2px] origin-left bg-paper/10"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-ember"
        style={{ transform: "scaleX(0)", willChange: "transform" }}
      />
    </div>
  );
}
