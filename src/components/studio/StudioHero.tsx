"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function StudioHero() {
  const container = useRef<HTMLDivElement>(null);
  const lockup = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const desc = useRef<HTMLParagraphElement>(null);
  const details = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const init = async () => {
      const gsap = (await import("gsap")).default;

      ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .to(lockup.current, { y: 0, opacity: 1, duration: 1, delay: 0.15 })
          .to(title.current, { y: 0, opacity: 1, duration: 1.1 }, "-=0.72")
          .to(desc.current, { y: 0, opacity: 1, duration: 0.9 }, "-=0.62")
          .to(details.current, { y: 0, opacity: 1, duration: 0.9 }, "-=0.55");
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
      className="relative flex min-h-[92svh] items-center overflow-hidden px-5 pb-20 pt-32 md:px-10 md:pb-24 md:pt-36"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-paper/10" />
      <div className="absolute bottom-10 right-[-8vw] hidden opacity-[0.08] md:block">
        <Image
          src="/brand/mark-red.png"
          alt=""
          width={520}
          height={510}
          priority
          className="h-auto w-[34vw] max-w-[520px]"
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-16 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <div ref={lockup} className="reveal-up mb-14">
            <Image
              src="/brand/studio-lockup-paper.png"
              alt="Rarestar Studio"
              width={460}
              height={115}
              priority
              className="h-auto w-full max-w-[360px] md:max-w-[460px]"
            />
          </div>

          <h1
            ref={title}
            className="display reveal-up max-w-4xl text-[clamp(2.75rem,12vw,4rem)] leading-[0.92] text-paper md:text-[clamp(3.8rem,10vw,8.8rem)]"
          >
            Products with a point of view.
          </h1>
        </div>

        <div className="flex flex-col gap-10">
          <p ref={desc} className="reveal-up max-w-xl font-sans text-lg leading-relaxed text-paper/70 md:text-xl">
            Rarestar Studio builds focused software, AI systems, and digital ventures under one sharp operating brand.
          </p>

          <div
            ref={details}
            className="reveal-up grid grid-cols-2 gap-px border border-paper/10 bg-paper/10 text-left"
          >
            {[
              ["01", "Software"],
              ["02", "AI Systems"],
              ["03", "Venture Builds"],
              ["04", "Studio Ops"]
            ].map(([number, label]) => (
              <div key={number} className="bg-ink p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">{number}</p>
                <p className="mt-3 font-sans text-sm text-paper/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
