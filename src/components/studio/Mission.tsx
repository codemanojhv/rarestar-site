"use client";

import { useEffect, useRef } from "react";

export default function Mission() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const legalRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (!textRef.current) return;
        const words = textRef.current.querySelectorAll(".word");
        
        gsap.fromTo(
          words,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top 75%",
              end: "bottom 75%",
              scrub: 0.5
            }
          }
        );

        gsap.from(legalRef.current, {
          y: 20,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: legalRef.current,
            start: "top 90%"
          }
        });
      }, container);
    };

    init();
    return () => ctx?.revert();
  }, []);

  const statement = "We identify meaningful problems, build innovative technology-driven solutions, and grow them into scalable products and businesses.";

  return (
    <section ref={container} className="px-5 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-5xl text-center">
        <p ref={textRef} className="display text-[clamp(2rem,6vw,4rem)] leading-[1.1] text-paper">
          {statement.split(" ").map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </p>

        <div className="mt-20 overflow-hidden">
          <p ref={legalRef} className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40">
            Operated by Rarestar Creative Studio LLP · India
          </p>
        </div>
      </div>
    </section>
  );
}
