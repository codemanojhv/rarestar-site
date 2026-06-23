"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Testimonials — social proof section.
 *
 * Styled to match the site's ink/paper/ember theme with the editorial
 * design language. Features a horizontally draggable card strip on mobile
 * and a staggered masonry-ish grid on desktop. Each card uses the
 * characteristic dotted borders, mono eyebrow labels, and display type.
 *
 * Scroll-triggered GSAP stagger entrance, consistent with other sections.
 */

const testimonials = [
  {
    quote: "Good communication and delivery on time.",
    name: "Alex Kim",
    role: "Founder",
    company: "Northline",
    tag: "Brand and web"
  },
  {
    quote: "Our headless store went live without drama.",
    name: "Sam Rivera",
    role: "E-commerce lead",
    company: "Field & Co.",
    tag: "Commerce"
  },
  {
    quote: "Straight answers and clean handoffs.",
    name: "Jordan Patel",
    role: "Product manager",
    company: "Brightstack",
    tag: "Website"
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let ctx: { revert: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, mod]) => {
      gsap.registerPlugin(mod.ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll("[data-testimonial]"),
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.9, stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 78%" }
          }
        );
        gsap.fromTo(
          el.querySelectorAll("[data-t-header]"),
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" }
          }
        );
      }, el);
    });

    return () => ctx?.revert();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll("[data-testimonial]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            if (!isNaN(idx)) setActiveIdx(idx);
          }
        }
      },
      { root: track, threshold: [0.6] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="relative border-t border-paper/10 bg-ink px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-4 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div data-t-header className="eyebrow flex items-center gap-3">
            <span className="inline-block h-1 w-1 rounded-full bg-ember" />
            <span>§05 · Testimonials</span>
          </div>
          <h2 data-t-header className="display max-w-3xl text-paper text-[9vw] leading-[0.95] md:text-[5vw]">
            What <span className="accent-italic">clients</span> say.
          </h2>
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} idx={i} />
          ))}
        </div>

        <div className="md:hidden">
          <div ref={trackRef} className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {testimonials.map((t, i) => (
              <div key={i} className="w-[85vw] flex-none snap-center">
                <TestimonialCard {...t} idx={i} />
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <span key={i} className={["h-1.5 rounded-full transition-all duration-300", i === activeIdx ? "w-6 bg-ember" : "w-1.5 bg-paper/20"].join(" ")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  quote: string; name: string; role: string; company: string; tag: string; idx: number;
}

function TestimonialCard({ quote, name, role, company, tag, idx }: TestimonialCardProps) {
  const isFeature = idx === 0;
  return (
    <article data-testimonial data-idx={idx} className={["group relative flex flex-col justify-between rounded-2xl border border-paper/10 bg-paper/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:border-paper/20 hover:bg-paper/[0.04]", isFeature ? "md:row-span-1" : ""].join(" ")}>
      <div className="mb-8 flex items-center justify-between">
        <span className="inline-block rounded-full border border-ember/30 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ember">{tag}</span>
        <span aria-hidden="true" className="display text-[3rem] leading-none text-paper/10 transition-colors duration-300 group-hover:text-ember/20">&ldquo;</span>
      </div>
      <blockquote className="flex-1">
        <p className="font-sans text-base leading-[1.7] text-paper/80 md:text-[1.05rem]">&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <div className="mt-8 flex items-center gap-4 border-t border-paper/10 pt-6">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-paper/10 font-mono text-[11px] uppercase text-paper/60">
          {name.split(" ").map((w) => w[0]).join("")}
        </div>
        <div>
          <p className="font-sans text-sm font-medium text-paper">{name}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">{role} · {company}</p>
        </div>
      </div>
    </article>
  );
}
