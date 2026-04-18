"use client";

import { useEffect, useRef } from "react";

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ctx: { revert: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, mod]) => {
      gsap.registerPlugin(mod.ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll("[data-word]"),
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              end: "bottom 40%",
              scrub: 0.8
            }
          }
        );
      }, el);
    });

    return () => ctx?.revert();
  }, []);

  const text =
    "Two arms. One obsession with craft. Rarestar builds the unforgettable — brand systems, websites, and commerce for the founders who can tell the difference, and the AI that makes motion graphics finally look directed.";

  return (
    <section ref={ref} className="relative bg-ink px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-6xl">
        <div className="eyebrow mb-10 flex items-center gap-3">
          <span className="inline-block h-1 w-1 rounded-full bg-ember" />
          <span>§01 · Manifesto</span>
        </div>
        <p className="display text-paper text-[7vw] leading-[1.05] md:text-[4.2vw]">
          {text.split(" ").map((w, i) => (
            <span key={i} data-word className="inline-block pr-[0.25em]">
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
