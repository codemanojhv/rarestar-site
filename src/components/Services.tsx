"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    n: "01",
    title: "Visual Brand Identity",
    desc: "Logo systems, typography, palette, motion principles, and a guidelines doc your team will actually use."
  },
  {
    n: "02",
    title: "Landing Pages",
    desc: "High-converting, motion-forward single-pagers for launches, campaigns, and category bets."
  },
  {
    n: "03",
    title: "Websites — With or Without CMS",
    desc: "Marketing sites in Next.js. Sanity when you need to edit often, static when you don’t. Never bloated."
  },
  {
    n: "04",
    title: "Headless E-commerce",
    desc: "Custom storefronts on Shopify + Next.js. Product pages that sell, cart flows that don’t leak."
  },
  {
    n: "05",
    title: "Custom Shopify Stores",
    desc: "Shopify themes designed from scratch when headless is overkill. Zero template vibes."
  },
  {
    n: "06",
    title: "Domain · SEO · Indexing",
    desc: "Domain purchase and config, technical SEO, Google Search Console, schema, sitemaps. Shipped live."
  }
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ctx: { revert: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, mod]) => {
      gsap.registerPlugin(mod.ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll("[data-svc]"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%" }
          }
        );
      }, el);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section id="services" ref={ref} data-cursor-section="paper" className="relative border-t border-paper/10 bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
        <div className="mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="eyebrow flex items-center gap-3" style={{ color: "rgba(10,10,10,0.55)" }}>
            <span className="inline-block h-1 w-1 rounded-full bg-ember" />
            <span>§03 · Agency Services</span>
          </div>
          <h2 className="display max-w-3xl text-[9vw] leading-[0.95] md:text-[5vw]">
            What we ship — <span style={{ WebkitTextStroke: "1px #0a0a0a", color: "transparent" }}>end to end.</span>
          </h2>
        </div>

        <div className="grid gap-px bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.n}
              data-svc
              className="group relative bg-paper p-8 transition-colors duration-300 hover:bg-bone md:p-10"
            >
              <div className="mb-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-ink/50">
                <span>{s.n}</span>
                <span className="transition-transform duration-500 group-hover:rotate-45">+</span>
              </div>
              <h3 className="display text-[8vw] leading-[1] md:text-[2.4vw]">{s.title}</h3>
              <p className="mt-6 max-w-md text-base text-ink/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
