"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    tag: "ASSESSMENT",
    title: "Clinical Assessment",
    desc: "Therapists evaluate the patient's unique cognitive and speech needs to set up a personalized recovery path.",
    icon: (
      <svg className="w-4 h-4 text-[#00C9A7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  {
    num: "02",
    tag: "PRACTICE",
    title: "Vocal & Cognitive Practice",
    desc: "Patients complete daily exercises at home, recording speech responses and performing cognitive tasks.",
    icon: (
      <svg className="w-4 h-4 text-[#8bee0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    )
  },
  {
    num: "03",
    tag: "ADAPTATION",
    title: "Adaptive Calibration",
    desc: "The platform dynamically adjusts task complexities in real time based on vocal latency and performance.",
    icon: (
      <svg className="w-4 h-4 text-[#00C9A7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
      </svg>
    )
  },
  {
    num: "04",
    tag: "SUPERVISION",
    title: "Therapist Review",
    desc: "Clinicians monitor objective recovery metrics, track progress over time, and recalibrate plans remotely.",
    icon: (
      <svg className="w-4 h-4 text-[#8bee0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

export default function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(".step-cell", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".steps-grid",
            start: "top 80%"
          }
        });
      }, container);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={container} id="how-it-works" className="px-6 py-24 md:px-10 md:py-32 bg-ink border-b border-white/5 relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#00C9A7]/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-left">
          <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#00C9A7] uppercase block mb-4">
            Methodology
          </span>
          <h2 className="display text-3xl md:text-5xl tracking-tight text-white mb-6">
            AI‑assisted, <br />
            <span className="italic text-dust font-light">clinically‑guided recovery.</span>
          </h2>
          <p className="font-sans text-paper/60 text-sm md:text-base leading-relaxed max-w-xl">
            Rehai couples clinician supervision with home‑based practice, creating a continuous feedback loop that accelerates neurological recovery.
          </p>
        </div>

        {/* 1px Grid Layout for Steps (4-column grid on desktop) */}
        <div className="steps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl">
          
          {STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;
            const glowColor = isEven ? "hover:shadow-[inset_0_0_30px_rgba(0,201,167,0.035)]" : "hover:shadow-[inset_0_0_30px_rgba(139,238,15,0.035)]";
            const hoverBorder = isEven ? "group-hover:border-[#00C9A7]/25" : "group-hover:border-[#8bee0f]/25";
            
            return (
              <div 
                key={idx} 
                className={[
                  "step-cell group bg-ink p-8 hover:bg-white/[0.01] transition-all duration-500 flex flex-col justify-between min-h-[250px] relative overflow-hidden",
                  glowColor
                ].join(" ")}
              >
                {/* Subtle cell glow spot */}
                <div className={[
                  "absolute -bottom-20 -right-20 w-44 h-44 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[50px] pointer-events-none",
                  isEven ? "bg-[#00C9A7]/5" : "bg-[#8bee0f]/5"
                ].join(" ")} />

                {/* Card Header */}
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <span className="font-mono text-[9px] text-paper/30 tracking-widest font-semibold flex items-center gap-1">
                    <span>{step.num}</span>
                    <span className="text-paper/20">//</span>
                    <span className={isEven ? "text-[#00C9A7]" : "text-[#8bee0f]"}>{step.tag}</span>
                  </span>
                  
                  <div className={[
                    "w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-white/10",
                    hoverBorder
                  ].join(" ")}>
                    <div className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[15deg]">
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="mt-auto relative z-10">
                  <h3 className="font-sans font-bold text-sm text-white tracking-wide mb-2.5 transition-colors duration-300 group-hover:text-white">
                    {step.title}
                  </h3>
                  <p className="font-sans text-[11px] text-paper/40 leading-relaxed group-hover:text-paper/50 transition-colors duration-350">
                    {step.desc}
                  </p>
                </div>

                {/* Flow Indicators: directional arrow or cycle loop */}
                <div className="absolute top-4 right-4 opacity-15 group-hover:opacity-30 transition-opacity duration-300 font-mono text-[10px] text-white">
                  {idx < 3 ? "→" : "↺"}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
