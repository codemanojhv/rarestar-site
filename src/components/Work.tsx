"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    id: "rares-ai",
    client: "RARES.AI",
    type: "Product · AI Motion Graphics",
    year: "2026",
    // warm film-lab gradient placeholder until real case studies ship
    bg: "linear-gradient(135deg, #2a1208 0%, #ff4a1c 45%, #ffcf8b 100%)"
  },
  {
    id: "agency-brand",
    client: "Confidential",
    type: "Brand Identity + Site",
    year: "2026",
    bg: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #3a3a5e 100%)"
  },
  {
    id: "headless-commerce",
    client: "Confidential",
    type: "Headless Shopify · Next.js",
    year: "2026",
    bg: "linear-gradient(135deg, #101a10 0%, #1e3a2e 50%, #9be8b8 100%)"
  },
  {
    id: "editorial",
    client: "Confidential",
    type: "Editorial CMS · Sanity",
    year: "2026",
    bg: "linear-gradient(135deg, #1a0a14 0%, #4a1e38 50%, #f2d9e8 100%)"
  }
];

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ctx: { revert: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, mod]) => {
      gsap.registerPlugin(mod.ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll("[data-work]"),
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%" }
          }
        );
      }, el);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section id="work" ref={ref} className="relative border-t border-paper/10 bg-ink px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="eyebrow flex items-center gap-3">
            <span className="inline-block h-1 w-1 rounded-full bg-ember" />
            <span>§05 · Selected Work</span>
          </div>
          <h2 className="display max-w-3xl text-paper text-[9vw] leading-[0.95] md:text-[5vw]">
            Recent <span className="accent-italic">obsessions.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.id}
              data-work
              className="group relative overflow-hidden rounded-2xl border border-paper/10"
            >
              <div
                className="aspect-[4/3] w-full scale-[1.02] transition-transform duration-700 group-hover:scale-[1.06]"
                style={{ background: p.bg }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70">
                    {p.type} · {p.year}
                  </div>
                  <h3 className="mt-2 display text-paper text-[8vw] leading-[1] md:text-[3vw]">
                    {p.client}
                  </h3>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70 transition-transform duration-500 group-hover:translate-x-1">
                  Case →
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-dust">
          Case studies coming soon · currently under NDA
        </p>
      </div>
    </section>
  );
}
