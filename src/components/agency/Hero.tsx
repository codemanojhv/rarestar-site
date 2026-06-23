"use client";

import { useEffect, useRef } from "react";
import { scrollToId } from "@/lib/lenisSingleton";
import HeroVideo from "./HeroVideo";

const TITLE_LINE_1 = "We design";
const TITLE_LINE_2 = "brands that convert.";
const TAGLINE =
  "We design brand systems, build high-performance websites, and launch custom Shopify stores — from strategy to go-live in weeks, not months.";

function splitChars(text: string, animate = false) {
  return Array.from(text).map((ch, i) => (
    <span key={i} className={animate ? "reveal-char" : ""} aria-hidden="true">
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));
}

function HeroContent({
  ink = false,
  animate = false
}: {
  ink?: boolean;
  animate?: boolean;
}) {
  const titleColor = ink ? "text-ink" : "text-paper";
  const taglineColor = ink ? "text-ink" : "text-paper/80";
  const revealUp = animate ? "reveal-up" : "opacity-100";
  const TitleTag = ink ? "div" : "h1";

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId("contact");
  };

  return (
    <div className={["absolute inset-0 flex h-full flex-col items-start justify-end px-6 pb-24 text-left md:px-12 md:pb-24", ink ? "pointer-events-none" : ""].join(" ")}>
      <div className="flex w-full max-w-7xl flex-col items-start">
        <TitleTag data-reveal-target={ink ? undefined : ""} data-hover={ink ? undefined : "reveal"} className={`display ${titleColor} text-left text-[12vw] leading-[0.9] md:text-[8.5vw] md:leading-[0.85]`}>
          <span data-hero-title-1 className="block">
            {splitChars(TITLE_LINE_1, animate)}
          </span>
          <span data-hero-title-2 className={`block ${ink ? "" : "outline-type"}`}>
            {splitChars(TITLE_LINE_2, animate)}
          </span>
        </TitleTag>

        <div data-hero-tagline className="mt-10 flex w-full flex-col items-start">
          <p data-reveal-target={ink ? undefined : ""} data-hover={ink ? undefined : "reveal"} className={`${revealUp} max-w-md text-left font-sans text-base leading-relaxed md:text-lg ${taglineColor}`}>
            {TAGLINE}
          </p>

          {/* 
              CRITICAL: Both layers must render the CTA row to keep the flex layout in perfect sync.
              We just make it invisible in the 'ink' layer so it doesn't reveal black text for the button.
          */}
          <div className={`mt-10 flex w-full items-center justify-end gap-6 ${revealUp} ${ink ? "opacity-0" : ""}`}>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40">Reply &lt; 24h</span>
            <a href="#contact" onClick={handleCTA} className="group inline-flex items-center gap-3 rounded-full bg-ember px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-ink transition-all hover:bg-paper hover:text-ink md:px-10">
              <span>Start a Project</span>
              <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </div>
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
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.to(root.querySelectorAll(".reveal-char"), { opacity: 1, y: 0, duration: 1.2, stagger: 0.02 }, 0.5);
        tl.to(root.querySelectorAll(".reveal-up"), { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 1.2);
        tl.to(root.querySelector("[data-hero-scroll]"), { opacity: 1, y: 0, duration: 1 }, 1.6);
      }, root);

      if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      
      const setCx = gsap.quickSetter(reveal, "--cx", "px") as (v: number) => void;
      const setCy = gsap.quickSetter(reveal, "--cy", "px") as (v: number) => void;
      
      const onMove = (e: PointerEvent) => {
        const rect = reveal.getBoundingClientRect();
        setCx(e.clientX - rect.left);
        setCy(e.clientY - rect.top);
      };
      
      const onOver = (e: PointerEvent) => {
        if ((e.target as Element | null)?.closest("[data-reveal-target]")) {
          gsap.to(reveal, { "--cr": "130px", duration: 0.5, ease: "power3.out" });
        }
      };
      
      const onOut = (e: PointerEvent) => {
        const related = (e as PointerEvent & { relatedTarget: EventTarget | null }).relatedTarget as Element | null;
        if (!related?.closest?.("[data-reveal-target]")) {
          gsap.to(reveal, { "--cr": "0px", duration: 0.4, ease: "power3.in" });
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
    return () => { ctx?.revert(); cleanup?.(); };
  }, []);

  return (
    <section ref={rootRef} data-cursor-section="hero" id="top" className="relative h-[100svh] w-full overflow-hidden bg-ink" aria-label="RareStar creative agency">
      <HeroVideo />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/10 to-ink/90" />
      
      <div ref={revealRef} className="reveal-root absolute inset-0 z-10" style={{ "--cx": "50%", "--cy": "50%", "--cr": "0px" } as React.CSSProperties}>
        <HeroContent animate />
        <div aria-hidden="true" className="reveal-blob pointer-events-none absolute rounded-full bg-ember shadow-[0_0_60px_rgba(255,87,34,0.3)]" />
        <div aria-hidden="true" className="reveal-clone pointer-events-none absolute inset-0">
          <HeroContent ink animate />
        </div>
      </div>
      
      <div data-hero-scroll className="reveal-up absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-paper/40">
        <span>Scroll</span>
        <span className="inline-block h-12 w-px bg-paper/20 animate-pulse" />
      </div>
    </section>
  );
}
