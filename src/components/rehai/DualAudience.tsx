"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";

export default function DualAudience() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(".fade-up-cell", {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%"
          }
        });
      }, container);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={container} id="dual-audience" className="px-6 py-24 md:px-10 md:py-32 bg-ink border-b border-white/5 relative">
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#00C9A7]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[#8bee0f]/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 relative items-start">
          
          {/* Left Column: For Therapists */}
          <div className="lg:col-span-6 flex flex-col items-start fade-up-cell">
            <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#00C9A7] uppercase mb-4">
              Clinician Console
            </span>
            <h2 className="display text-3xl md:text-4xl tracking-tight text-white mb-6 leading-tight">
              Actionable insights. <br />
              <span className="italic text-dust font-light">Objective patient data.</span>
            </h2>
            <p className="font-sans text-paper/60 text-sm leading-relaxed mb-8 max-w-md">
              Rehai translates raw acoustic parameters and behavioral metrics into clean, standardized clinical insights, saving evaluation time.
            </p>

            {/* Checklist */}
            <ul className="space-y-3 mb-10 w-full">
              {[
                "Objective progress tracking metrics",
                "Acoustic phonetic diagnostic breakdowns",
                "Clinical dashboard export capabilities"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-sans text-paper/70">
                  <span className="font-mono text-[10px] text-[#00C9A7] font-bold">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Magnetic strength={0.12} radius={60}>
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-transparent px-5 py-3 font-mono text-[9px] uppercase tracking-wider text-white hover:border-[#00C9A7] hover:text-[#00C9A7] transition-all"
              >
                <span>Dashboard Features</span>
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Magnetic>

            {/* Minimalist Dashboard CSS Mockup */}
            <div className="w-full aspect-[1.3] bg-white/[0.01] border border-white/5 rounded-xl p-5 shadow-2xl mt-12 overflow-hidden relative">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="text-[9px] uppercase tracking-wider text-paper/40 font-mono">Patient Progress // Arjun</span>
                <span className="text-[8px] text-[#00C9A7] font-mono bg-[#00C9A7]/5 px-2 py-0.5 rounded border border-[#00C9A7]/10">72% Goal Match</span>
              </div>

              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-7 bg-white/[0.01] border border-white/5 rounded-xl p-3 flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-white/5">
                    <Image src="/rehai/patient_arjun.png" alt="Arjun Shetty" fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[11px] font-bold text-white truncate">Arjun Shetty</h4>
                    <p className="text-[9px] text-paper/40 truncate">Stroke · Left Hemiplegia</p>
                  </div>
                </div>
                <div className="col-span-5 bg-white/[0.01] border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                  <span className="text-[8px] text-paper/30 uppercase font-mono">Session Average</span>
                  <span className="text-xs font-bold text-white mt-0.5">85% accuracy</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Performance Chart Detail */}
                <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-paper/40 block mb-3">Domain Accuracy</span>
                  <div className="space-y-1.5 text-[8.5px] font-mono text-paper/50">
                    <div className="flex justify-between border-b border-white/5 pb-1"><span>Speech Acoustics</span> <span className="text-[#00C9A7] font-bold">75%</span></div>
                    <div className="flex justify-between border-b border-white/5 pb-1"><span>Cognitive Recall</span> <span className="text-[#8bee0f] font-bold">62%</span></div>
                    <div className="flex justify-between"><span>Auditory Memory</span> <span className="text-white font-bold">70%</span></div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-paper/40 block mb-2">Diagnostic Log</span>
                  <div className="space-y-1 text-[8.5px] text-paper/50 font-mono">
                    <div className="flex justify-between"><span>Word Retrieval</span> <span className="text-white/60">Success</span></div>
                    <div className="flex justify-between"><span>Vocal Latency</span> <span className="text-white/60">120ms</span></div>
                    <div className="flex justify-between"><span>Phoneme Jitter</span> <span className="text-[#8bee0f]">Optimal</span></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: For Patients */}
          <div className="lg:col-span-6 flex flex-col items-start fade-up-cell">
            <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#8bee0f] uppercase mb-4">
              Patient App
            </span>
            <h2 className="display text-3xl md:text-4xl tracking-tight text-white mb-6 leading-tight">
              Adaptive tasks. <br />
              <span className="italic text-dust font-light">Self‑paced recovery.</span>
            </h2>
            <p className="font-sans text-paper/60 text-sm leading-relaxed mb-8 max-w-md">
              Rehai translates dry therapy plans into engaging daily tasks, adapting to performance in real time so practice is never frustrating.
            </p>

            {/* Checklist */}
            <ul className="space-y-3 mb-10 w-full">
              {[
                "Highly engaging visual activities",
                "Instant, constructive verbal feedback",
                "Micro-milestones to chart improvement"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-sans text-paper/70">
                  <span className="font-mono text-[10px] text-[#8bee0f] font-bold">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Magnetic strength={0.12} radius={60}>
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-transparent px-5 py-3 font-mono text-[9px] uppercase tracking-wider text-white hover:border-[#8bee0f] hover:text-[#8bee0f] transition-all"
              >
                <span>Mobile Details</span>
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Magnetic>

            {/* Minimal Mobile App CSS Mockup */}
            <div className="w-full flex justify-center mt-12">
              <div className="w-[70%] md:w-[60%] lg:w-[68%] aspect-[0.52] bg-ink border-[2px] border-white/10 rounded-[1.8rem] p-3.5 shadow-2xl overflow-hidden relative">
                {/* Notch */}
                <div className="w-12 h-2.5 bg-[#050505] rounded-full mx-auto mb-4 border border-white/5" />

                <div className="flex flex-col justify-between h-[92%]">
                  <div className="flex items-center justify-between text-white text-[9px] font-mono mb-3">
                    <span>Active Module</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8bee0f] animate-pulse" />
                  </div>

                  <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[8px] text-paper/40 block font-mono">TODAY'S TARGET</span>
                      <span className="text-[10px] font-bold text-white block mt-0.5">4 Acoustic Exercises</span>
                    </div>
                    <button className="text-[8px] font-bold bg-[#8bee0f] text-black px-3 py-1 rounded hover:scale-105 transition-transform font-mono uppercase tracking-wider">Start</button>
                  </div>

                  {/* recommended task */}
                  <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 flex-grow mb-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] text-paper/40 block font-mono uppercase tracking-wider">Active Exercise</span>
                      <span className="text-xs font-bold text-white block mt-1">Naming Objects</span>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="w-8 h-8 rounded bg-[#8bee0f]/5 border border-[#8bee0f]/10 flex items-center justify-center text-base">
                        🐘
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-white block">Acoustic Task</span>
                        <span className="text-[8px] text-paper/40 block font-mono">Pronounce target word</span>
                      </div>
                    </div>
                  </div>

                  {/* App controls mic button */}
                  <div className="bg-white/[0.01] border border-white/5 rounded-xl p-2.5 flex items-center justify-between">
                    <span className="text-[8px] font-mono text-paper/40 uppercase">Mic Access Ready</span>
                    <div className="w-6 h-6 rounded-full bg-[#8bee0f] flex items-center justify-center cursor-pointer">
                      <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                  </div>

                  {/* Mobile nav bar mockup */}
                  <div className="border-t border-white/5 pt-2 mt-2 flex justify-between text-[7px] text-paper/30 font-mono">
                    <span className="text-[#8bee0f] font-bold">Home</span>
                    <span>Logs</span>
                    <span>Profile</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Hospital Logos Bar at the Bottom */}
        <div className="border-t border-white/5 pt-16 mt-24 text-center">
          <p className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#00C9A7] uppercase mb-8">
            Referenced Clinical Partnerships
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16 opacity-35 text-white font-mono text-[10px] uppercase tracking-[0.18em]">
            <span>NIMHANS Bengaluru</span>
            <span>AIISH Mysuru</span>
            <span>Columbia Asia</span>
            <span>Sahyadri Hospitals</span>
            <span>Apollo Clinics</span>
          </div>
        </div>

      </div>
    </section>
  );
}
