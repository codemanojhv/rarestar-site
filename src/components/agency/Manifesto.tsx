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
    "We help brands move faster. We design systems that scale, build sites that perform, and launch commerce that converts. No fluff, just results-driven design and code.";

  return (
    <section ref={ref} className="relative bg-ink px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-6xl">
        <h2 className="eyebrow mb-10 flex items-center gap-3">
          <span className="inline-block h-1 w-1 rounded-full bg-ember" />
          <span>§01 · About</span>
        </h2>
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
