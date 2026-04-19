"use client";

import { useEffect, useRef } from "react";
import HeroVideo from "./HeroVideo";

const TITLE_LINE_1 = "We design";
const TITLE_LINE_2 = "the unforgettable.";
const TAGLINE =
  "A creative studio for founders who sweat every pixel. Brand systems, websites, commerce — and the AI that makes motion graphics look directed.";

function splitChars(text: string) {
  return Array.from(text).map((ch, i) => (
    <span key={i} className="reveal-char" aria-hidden="true">
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));
}

/**
 * Hero content renders TWICE — once as the visible paper layer, once as
 * an ink clone masked to a circle. Both layers are absolutely positioned
 * at inset-0 inside .reveal-root, so they share the same coordinate box as
 * the ember disc. Identical classes = pixel-perfect auto-alignment without
 * manual offset math.
 */
function HeroContent({
  ink = false,
  withEntrance = true
}: {
  ink?: boolean;
  withEntrance?: boolean;
}) {
  const titleColor = ink ? "text-ink" : "text-paper";
  const taglineColor = ink ? "text-ink" : "text-paper/80";
  // ink clone drops entrance states (no animation on it — entrance only
  // targets .reveal-char / .reveal-up inside the paper layer)
  const revealUp = withEntrance ? "reveal-up" : "";

  const TitleTag = ink ? "div" : "h1";

  return (
    <div
      className={[
        "absolute inset-0 flex h-full flex-col justify-end px-5 pb-24 md:px-10 md:pb-20",
        ink ? "pointer-events-none" : ""
      ].join(" ")}
    >
      <div className="max-w-[min(90rem,95vw)]">
        <TitleTag
          data-reveal-target={ink ? undefined : ""}
          data-hover={ink ? undefined : "reveal"}
          className={`display ${titleColor} text-[14vw] leading-[0.92] md:text-[10.5vw] md:leading-[0.9]`}
        >
          <span data-hero-title-1 className="block md:whitespace-nowrap">
            {withEntrance ? splitChars(TITLE_LINE_1) : TITLE_LINE_1}
          </span>
          <span
            data-hero-title-2
            className={`block md:whitespace-nowrap ${ink ? "" : "outline-type"}`}
          >
            {withEntrance ? splitChars(TITLE_LINE_2) : TITLE_LINE_2}
          </span>
        </TitleTag>

        <div data-hero-tagline className="mt-8">
          <p
            data-reveal-target={ink ? undefined : ""}
            data-hover={ink ? undefined : "reveal"}
            className={`${revealUp} max-w-xl font-sans text-base md:text-lg ${taglineColor}`}
          >
            {TAGLINE}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const reveal = revealRef.current;
    if (!root || !reveal) return;

    let ctx: { revert: () => void } | null = null;
    let cleanup: (() => void) | null = null;

    import("gsap").then(({ gsap }) => {
      // entrance timeline
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(
          root.querySelectorAll("[data-hero-title-1] .reveal-char"),
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.025 },
          0.6
        );

        tl.to(
          root.querySelectorAll("[data-hero-title-2] .reveal-char"),
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.02 },
          0.9
        );

        tl.to(
          root.querySelectorAll("[data-hero-tagline] .reveal-up"),
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          1.4
        );

        tl.to(
          root.querySelector("[data-hero-scroll]"),
          { opacity: 1, y: 0, duration: 0.8 },
          1.8
        );
      }, root);

      // reveal (masked-cursor-reveal) wiring
      if (
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const setCx = gsap.quickSetter(reveal, "--cx", "px") as (v: number) => void;
      const setCy = gsap.quickSetter(reveal, "--cy", "px") as (v: number) => void;

      // Position tracker — always updates cursor coords relative to the
      // reveal box, whether or not the disc is currently visible.
      const onMove = (e: PointerEvent) => {
        const rect = reveal.getBoundingClientRect();
        setCx(e.clientX - rect.left);
        setCy(e.clientY - rect.top);
      };

      // Disc grow/shrink — only when the pointer is over a text target.
      // Using `pointerover`/`pointerout` on the reveal root (which bubbles)
      // + the closest() check so we stay in the "on" state while moving
      // between chars (split-char spans) and across the h1→p gap if needed.
      const onOver = (e: PointerEvent) => {
        const t = e.target as Element | null;
        if (t?.closest("[data-reveal-target]")) {
          gsap.to(reveal, { "--cr": "110px", duration: 0.4, ease: "power3.out" });
        }
      };

      const onOut = (e: PointerEvent) => {
        const related = (e as PointerEvent & { relatedTarget: EventTarget | null })
          .relatedTarget as Element | null;
        const leavingTarget =
          !related || !related.closest?.("[data-reveal-target]");
        const fromTarget = (e.target as Element | null)?.closest(
          "[data-reveal-target]"
        );
        if (fromTarget && leavingTarget) {
          gsap.to(reveal, { "--cr": "0px", duration: 0.35, ease: "power3.in" });
        }
      };

      reveal.addEventListener("pointermove", onMove);
      reveal.addEventListener("pointerover", onOver);
      reveal.addEventListener("pointerout", onOut);

      cleanup = () => {
        reveal.removeEventListener("pointermove", onMove);
        reveal.removeEventListener("pointerover", onOver);
        reveal.removeEventListener("pointerout", onOut);
      };
    });

    return () => {
      ctx?.revert();
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      data-cursor-section="hero"
      id="top"
      className="relative h-[100svh] w-full overflow-hidden bg-ink"
      aria-label="Rarestar Creative Studio"
    >
      <HeroVideo />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink/80" />

{/* ===== MASKED-REVEAL STAGE ===============================
          Three layers inside .reveal-root, all absolute inset-0, so the
          ember disc and the ink clone's mask share the same coordinate
          box as the paper content. CSS vars driven by the pointermove +
          GSAP tween in useEffect above.
          ======================================================== */}
      <div
        ref={revealRef}
        className="reveal-root absolute inset-0 z-10"
        style={
          {
            "--cx": "50%",
            "--cy": "50%",
            "--cr": "0px"
          } as React.CSSProperties
        }
      >
        {/* Layer 1: paper (normal) */}
        <HeroContent />

        {/* Layer 2: ember disc */}
        <div
          aria-hidden="true"
          className="reveal-blob pointer-events-none absolute rounded-full bg-ember"
        />

        {/* Layer 3: ink clone, masked to the disc */}
        <div
          aria-hidden="true"
          className="reveal-clone pointer-events-none absolute inset-0"
        >
          <HeroContent ink withEntrance={false} />
        </div>
      </div>

      <div
        data-hero-scroll
        className="reveal-up absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/60"
      >
        <span>Scroll</span>
        <span className="inline-block h-10 w-px bg-paper/40 animate-pulse" />
      </div>
    </section>
  );
}
