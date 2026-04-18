"use client";

import { useEffect, useRef } from "react";

const divisions = [
  {
    id: "rares-ai",
    tag: "Product",
    name: "RARES.AI",
    pitch:
      "The first AI tool whose output does not look AI-generated. Prompt in → directed, beat-quantized, AE-level motion graphics out.",
    href: "https://rares.ai",
    external: true,
    bullets: [
      "AE-level motion from a single prompt",
      "4 art-directed Looks · 12 choreography motifs",
      "Server-only taste layer · signed render plans"
    ]
  },
  {
    id: "agency",
    tag: "Services",
    name: "Rarestar Agency",
    pitch:
      "Brand systems, landing pages, CMS sites, and headless commerce — designed and built for founders who treat their website like a product.",
    href: "#services",
    external: false,
    bullets: [
      "Visual identity · web · headless commerce",
      "Next.js · Sanity · Shopify — done right",
      "Domain, SEO, indexing, analytics — handled"
    ]
  }
];

/**
 * Divisions is the studio's "here's what we actually do" surface. Two cards,
 * each representing one arm. This section is where a casual visitor usually
 * decides whether to keep scrolling or bounce, so it earns a signature
 * interaction:
 *
 *   - A cursor-following ember spotlight that only brightens on hover
 *     (tracked via CSS vars + pointermove)
 *   - A gentle 3D tilt based on pointer position (max 6°) to make the card
 *     feel like a physical object — clear at a glance, never gimmicky.
 *   - Inner content parallax: the title and the bullets shift at different
 *     amounts so the card feels layered when you move across it.
 *   - Full `prefers-reduced-motion` bypass so visitors who opt out still
 *     get a clean static card.
 *
 * All motion is CSS-variable-driven and updated with `requestAnimationFrame`
 * throttling, so multiple cards on-screen stay smooth.
 */
export default function Divisions() {
  const ref = useRef<HTMLDivElement>(null);

  // Entrance animation (unchanged from before).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ctx: { revert: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, mod]) => {
      gsap.registerPlugin(mod.ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll("[data-div-card]"),
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 70%" }
          }
        );
      }, el);
    });

    return () => ctx?.revert();
  }, []);

  // Signature pointer interactions wired per card.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Skip tilt/spotlight on touch devices — pointerenter fires on tap-start
    // and leaves the card mid-tilt when the finger lifts, which reads as a
    // lag glitch rather than a deliberate interaction. Static cards on mobile.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const cards = Array.from(
      el.querySelectorAll<HTMLElement>("[data-div-card]")
    );
    const cleanups: Array<() => void> = [];

    for (const card of cards) {
      let rafId = 0;
      let targetX = 50;
      let targetY = 50;
      let targetRx = 0;
      let targetRy = 0;
      let active = false;

      const setVars = () => {
        card.style.setProperty("--mx", `${targetX}%`);
        card.style.setProperty("--my", `${targetY}%`);
        card.style.setProperty("--rx", `${targetRx}deg`);
        card.style.setProperty("--ry", `${targetRy}deg`);
      };

      const onMove = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        targetX = px * 100;
        targetY = py * 100;
        // Tilt: invert Y so top pushes away from you, feels right physically.
        targetRy = (px - 0.5) * 6;
        targetRx = (0.5 - py) * 5;
        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            setVars();
            rafId = 0;
          });
        }
      };

      const onEnter = () => {
        active = true;
        card.dataset.tilt = "on";
      };

      const onLeave = () => {
        active = false;
        targetX = 50;
        targetY = 50;
        targetRx = 0;
        targetRy = 0;
        card.dataset.tilt = "off";
        setVars();
      };

      card.addEventListener("pointerenter", onEnter);
      card.addEventListener("pointerleave", onLeave);
      card.addEventListener("pointermove", onMove);

      cleanups.push(() => {
        card.removeEventListener("pointerenter", onEnter);
        card.removeEventListener("pointerleave", onLeave);
        card.removeEventListener("pointermove", onMove);
        if (rafId) cancelAnimationFrame(rafId);
        // Prevent TS unused-var complaint while preserving readability.
        void active;
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      id="divisions"
      ref={ref}
      className="relative border-t border-paper/10 bg-ink px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="eyebrow flex items-center gap-3">
            <span className="inline-block h-1 w-1 rounded-full bg-ember" />
            <span>§02 · The Studio</span>
          </div>
          <h2 className="display text-paper text-[9vw] leading-[0.95] md:text-[5vw]">
            Two arms. <span className="accent-italic">One studio.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8" style={{ perspective: "1400px" }}>
          {divisions.map((d) => (
            <a
              key={d.id}
              href={d.href}
              target={d.external ? "_blank" : undefined}
              rel={d.external ? "noreferrer" : undefined}
              data-div-card
              data-tilt="off"
              className="group division-card relative flex min-h-[28rem] flex-col justify-between overflow-hidden rounded-2xl border border-paper/15 bg-smoke p-8 transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-paper/40 md:p-10"
              style={{
                transform:
                  "perspective(1400px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Ember spotlight that follows the cursor. Soft edges so it
                  feels like a warm lamp, not a flashlight. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(450px 360px at var(--mx, 30%) var(--my, 20%), rgba(255,74,28,0.26), transparent 65%)"
                }}
              />

              {/* Subtle grid sheen layer — becomes visible under the spotlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(242,239,232,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(242,239,232,0.04) 1px, transparent 1px)",
                  backgroundSize: "28px 28px"
                }}
              />

              <div
                className="relative z-10 flex items-start justify-between"
                style={{ transform: "translateZ(24px)" }}
              >
                <span className="eyebrow">{d.tag}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50 transition-transform duration-500 group-hover:translate-x-1">
                  {d.external ? "Visit →" : "Explore ↓"}
                </span>
              </div>

              <div
                className="relative z-10 mt-16"
                style={{ transform: "translateZ(36px)" }}
              >
                <h3 className="display text-paper text-[12vw] leading-[0.95] md:text-[5vw]">
                  {d.name}
                </h3>
                <p className="mt-6 max-w-lg text-base text-paper/75 md:text-lg">
                  {d.pitch}
                </p>
              </div>

              <ul
                className="relative z-10 mt-10 space-y-2 border-t border-paper/10 pt-6 font-mono text-xs text-paper/60"
                style={{ transform: "translateZ(16px)" }}
              >
                {d.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[7px] inline-block h-px w-3 bg-paper/40" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
