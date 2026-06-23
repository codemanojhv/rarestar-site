"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Complete Exercises",
    desc: "Patients perform guided speech and cognitive exercises in the app.",
    icon: (
      <svg className="w-5 h-5 text-[#8bee0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    )
  },
  {
    num: "02",
    title: "Capture Responses",
    desc: "Speech and behavioral responses are captured securely and accurately.",
    icon: (
      <svg className="w-5 h-5 text-[#00C9A7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    num: "03",
    title: "AI Analysis",
    desc: "Our AI analyzes performance to generate clinical metrics instantly.",
    icon: (
      <svg className="w-5 h-5 text-[#8bee0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    num: "04",
    title: "Track Progress",
    desc: "Therapists get a clear view of progress over time with objective data.",
    icon: (
      <svg className="w-5 h-5 text-[#00C9A7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    num: "05",
    title: "Adaptive Recommendations",
    desc: "The AI suggests the next best tasks tailored to the patient's needs.",
    icon: (
      <svg className="w-5 h-5 text-[#8bee0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    num: "06",
    title: "Therapist Supervision",
    desc: "Therapists review, adjust and guide the therapy plan as needed.",
    icon: (
      <svg className="w-5 h-5 text-[#00C9A7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
        gsap.from(".step-card", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".steps-grid",
            start: "top 75%"
          }
        });
      }, container);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={container} id="how-it-works" className="px-6 py-24 md:px-10 md:py-32 bg-ink border-b border-white/5 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#8bee0f]/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs font-semibold tracking-[0.3em] text-[#8bee0f] uppercase block mb-4">
            ✦ How Rehai Works ✦
          </span>
          <h2 className="display text-3xl md:text-5xl tracking-tight text-white mb-6">
            AI meets therapy. <span className="text-[#8bee0f]">Better outcomes together.</span>
          </h2>
          <p className="font-sans text-paper/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Rehai combines advanced AI with clinical expertise to deliver personalized rehabilitation that adapts to every individual.
          </p>
        </div>

        {/* Steps Flow Grid */}
        <div className="steps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
          
          {STEPS.map((step, idx) => (
            <div key={idx} className="step-card group relative flex flex-col items-start bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 hover:border-white/10 hover:shadow-lg transition-all duration-300">
              
              {/* Card Step Number & Connecting Arrow Indicator */}
              <div className="flex justify-between items-center w-full mb-6">
                {/* Lobe logo circle icon */}
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  {step.icon}
                </div>
                
                <span className="font-mono text-xs font-semibold text-paper/30 tracking-widest">
                  {step.num}
                </span>
              </div>

              {/* Connecting Dot/Arrow for desktop */}
              {idx < STEPS.length - 1 && (
                <div className="hidden lg:flex absolute top-12 left-[calc(100%_-_12px)] w-6 h-6 items-center justify-center z-20 pointer-events-none opacity-60">
                  <svg className="w-4 h-4 text-[#8bee0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}

              {/* Text content */}
              <div>
                <h3 className="font-sans font-bold text-sm text-white tracking-wide mb-2 group-hover:text-[#8bee0f] transition-colors">
                  {step.title}
                </h3>
                <p className="font-sans text-[11px] text-paper/50 leading-relaxed">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
