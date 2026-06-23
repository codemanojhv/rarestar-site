"use client";

import { useEffect, useRef } from "react";
import Magnetic from "@/components/Magnetic";

const VENTURES = [
  {
    id: "agency",
    name: "Rarestar Agency",
    description: "Design, development, and AI solutions for modern brands.",
    href: process.env.NODE_ENV === "development" ? "/?site=agency" : "https://agency.rarestar.studio",
    label: "SERVICES",
    color: "ember"
  },
  {
    id: "rehai",
    name: "Rehai",
    description: "AI-powered neurological rehabilitation focused on speech and cognitive recovery.",
    href: process.env.NODE_ENV === "development" ? "/?site=rehai" : "https://rehai.rarestar.studio",
    label: "PLATFORM",
    color: "rehai-primary"
  }
];

export default function Ventures() {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    let ctx: gsap.Context;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(cardsRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%"
          }
        });
      }, container);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={container} id="ventures" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/40 md:mb-16">
          Our Ventures
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-10">
          {VENTURES.map((v, i) => (
            <Magnetic key={v.id} strength={0.05}>
              <a
                ref={(el) => { cardsRef.current[i] = el; }}
                href={v.href}
                className="product-card group block p-8 md:p-12"
                style={{ 
                  "--hover-glow": v.color === "ember" ? "rgba(255, 74, 28, 0.08)" : "rgba(0, 201, 167, 0.08)" 
                } as React.CSSProperties}
              >
                <div className="flex h-full flex-col justify-between gap-12">
                  <div>
                    <p className="eyebrow mb-6 text-paper/50">{v.label}</p>
                    <h3 className="display mb-4 text-4xl md:text-5xl">{v.name}</h3>
                    <p className="font-sans text-lg text-paper/70 max-w-sm">
                      {v.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/90 transition-colors group-hover:text-paper">
                      Explore
                    </span>
                    <span className="font-mono text-[12px] text-paper/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-paper">
                      →
                    </span>
                  </div>
                </div>
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
      <style jsx>{`
        .product-card::before {
          background: radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            var(--hover-glow),
            transparent 40%
          );
        }
      `}</style>
    </section>
  );
}
