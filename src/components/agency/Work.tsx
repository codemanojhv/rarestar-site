"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/types/case-study";
import { scrollToId } from "@/lib/lenisSingleton";

export default function Work({ projects }: { projects: CaseStudy[] }) {
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
  }, [projects]);

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId("contact");
  };

  return (
    <section id="work" ref={ref} className="relative border-t border-paper/10 bg-ink px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="eyebrow flex items-center gap-3">
            <span className="inline-block h-1 w-1 rounded-full bg-ember" />
            <span>§04 · Selected work</span>
          </div>
          <h2 className="display max-w-3xl text-paper text-[9vw] leading-[0.95] md:text-[5vw]">
            Recent <span className="accent-italic">projects.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => {
            const inner = (
              <>
                <div
                  className="relative aspect-[4/3] w-full scale-[1.02] transition-transform duration-700 group-hover:scale-[1.06]"
                  style={!p.image ? { background: p.bg } : undefined}
                >
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.client}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70">
                      {p.type} · {projectPageLink(p.id)}
                    </div>
                    <h3 className="mt-2 display text-paper text-[8vw] leading-[1] md:text-[3vw]">
                      {p.client}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70 transition-transform duration-500 group-hover:translate-x-1">
                    View Case →
                  </span>
                </div>
              </>
            );
            
            // Link projects to internal dynamic pages
            return (
              <article key={p.id} data-work className="group relative overflow-hidden rounded-2xl border border-paper/10">
                <Link href={`/work/${p.id}`} className="block text-left">
                  {inner}
                </Link>
              </article>
            );
          })}
        </div>

        {/* Section CTA */}
        <div className="mt-24 flex flex-col items-center text-center">
          <p className="max-w-xl text-lg text-paper/40 mb-8 font-sans">
            Every project is built with the same attention to performance and brand detail. Yours could be next.
          </p>
          <a
            href="#contact"
            onClick={handleCTA}
            className="group inline-flex items-center gap-3 rounded-full border border-paper/20 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-paper transition-all hover:bg-paper hover:text-ink"
          >
            <span>Discuss your project</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function projectPageLink(id: string) {
  return <span className="text-ember/60">Case Study</span>;
}
