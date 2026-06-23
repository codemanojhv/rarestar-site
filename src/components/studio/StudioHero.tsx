"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function StudioHero() {
  const container = useRef<HTMLDivElement>(null);
  const title1 = useRef<HTMLDivElement>(null);
  const title2 = useRef<HTMLDivElement>(null);
  const desc = useRef<HTMLParagraphElement>(null);
  const eyebrow = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const init = async () => {
      const gsap = (await import("gsap")).default;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.to(eyebrow.current, { y: 0, opacity: 1, duration: 1, delay: 0.2 })
          .to(title1.current, { y: 0, opacity: 1, duration: 1.2 }, "-=0.8")
          .to(title2.current, { y: 0, opacity: 1, duration: 1.2 }, "-=1")
          .to(desc.current, { y: 0, opacity: 1, duration: 1 }, "-=0.8");
      }, container);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={container}
      id="top"
      data-cursor-section="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-5 pt-32 pb-20 text-center md:px-10"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/brand/mark-large.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="overflow-hidden mb-6">
          <p ref={eyebrow} className="eyebrow reveal-up text-paper/60">
            RARESTAR STUDIO
          </p>
        </div>

        <h1 className="display text-[clamp(3.5rem,10vw,8rem)] leading-[0.9]">
          <div className="overflow-hidden">
            <div ref={title1} className="reveal-up">We build</div>
          </div>
          <div className="overflow-hidden">
            <div ref={title2} className="reveal-up">
              <span className="accent-italic">products</span> that matter.
            </div>
          </div>
        </h1>

        <div className="overflow-hidden mt-10">
          <p ref={desc} className="reveal-up mx-auto max-w-xl font-sans text-lg text-paper/70 md:text-xl">
            Rarestar Studio is a product studio operating ventures in software, AI, and digital products. We identify meaningful problems and build scalable solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
