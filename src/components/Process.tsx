"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    n: "01",
    title: "Discover",
    body:
      "We interrogate the brief. Who is this for, what does winning look like, and what is the single thing we refuse to compromise on. No kickoff kabuki."
  },
  {
    n: "02",
    title: "Design",
    body:
      "Identity, system, site. We design in prototype, not in static frames — every interaction is a decision, every transition has intent."
  },
  {
    n: "03",
    title: "Develop",
    body:
      "Next.js 15 App Router, TypeScript, Sanity or Shopify where it earns its keep. Performance and accessibility are baseline, not upsells."
  },
  {
    n: "04",
    title: "Deploy",
    body:
      "Domain, DNS, SSL, SEO, schema, indexing, analytics, monitoring. We ship it live and hand over a runbook you can actually use."
  }
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ctx: { revert: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, mod]) => {
      gsap.registerPlugin(mod.ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll("[data-step]"),
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 70%" }
          }
        );
      }, el);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="relative border-t border-paper/10 bg-ink px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="eyebrow flex items-center gap-3">
            <span className="inline-block h-1 w-1 rounded-full bg-ember" />
            <span>§04 · How We Work</span>
          </div>
          <h2 className="display max-w-3xl text-paper text-[9vw] leading-[0.95] md:text-[5vw]">
            Four steps. <span className="accent-italic">Zero theatre.</span>
          </h2>
        </div>

        <ol className="divide-y divide-paper/10 border-y border-paper/10">
          {steps.map((s) => (
            <li
              key={s.n}
              data-step
              className="grid grid-cols-12 items-start gap-6 py-10 md:gap-10 md:py-14"
            >
              <span className="col-span-2 font-mono text-xs uppercase tracking-[0.22em] text-paper/50 md:col-span-1">
                {s.n}
              </span>
              <h3 className="col-span-10 display text-paper text-[9vw] leading-[0.95] md:col-span-4 md:text-[3.5vw]">
                {s.title}
              </h3>
              <p className="col-span-12 max-w-xl text-base text-paper/70 md:col-span-7">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
