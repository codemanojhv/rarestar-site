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
              <span className="italic text-dust font-light">Therapist in control.</span>
            </h2>
            <p className="font-sans text-paper/60 text-sm leading-relaxed mb-8 max-w-md">
              Rehai acts as an assistant to your workflow. We translate daily home practice into standardized progress metrics, helping you monitor, personalize, and scale care. The clinical decision is always yours.
            </p>

            {/* Checklist */}
            <ul className="space-y-3 mb-10 w-full">
              {[
                "Objective progress tracking metrics",
                "Extend therapy reach beyond clinical visits",
                "Personalized recommendations based on clinical data"
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
                <span>Console Features</span>
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Magnetic>

            {/* Minimalist Dashboard CSS Mockup */}
            <div className="w-full aspect-[1.3] bg-white/[0.01] border border-white/5 rounded-2xl p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] mt-12 overflow-hidden relative group hover:border-[#00C9A7]/15 transition-all duration-500">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#00C9A7]/5 blur-[60px] pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="text-[9px] uppercase tracking-wider text-paper/40 font-mono">Telemetry Chart // Patient 04</span>
                <span className="text-[8px] text-[#00C9A7] font-mono bg-[#00C9A7]/5 px-2 py-0.5 rounded border border-[#00C9A7]/10">ACCURACY INDEX</span>
              </div>

              <div className="grid grid-cols-12 gap-4 mb-5">
                <div className="col-span-7 bg-white/[0.01] border border-white/[0.03] rounded-xl p-3 flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-white/5">
                    <Image src="/rehai/patient_arjun.png" alt="Arjun Shetty" fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[11px] font-bold text-white truncate">Arjun Shetty</h4>
                    <p className="text-[8.5px] text-paper/40 font-mono truncate">Broca's Aphasia · Wk 4</p>
                  </div>
                </div>
                <div className="col-span-5 bg-white/[0.01] border border-white/[0.03] rounded-xl p-3 flex flex-col justify-center">
                  <span className="text-[8px] text-paper/30 uppercase font-mono tracking-wider">Session Average</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">85.4% Accuracy</span>
                </div>
              </div>

              {/* High-Fidelity Performance Chart */}
              <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center text-[8px] font-mono text-paper/40 mb-3">
                  <span>Weekly Recovery Trend</span>
                  <span className="text-[#00C9A7] font-semibold">Goal Achieved (70%+)</span>
                </div>
                
                <svg className="w-full h-16 stroke-[#00C9A7] stroke-[1.5] fill-none overflow-visible" viewBox="0 0 100 30">
                  <path d="M 5,26 Q 25,24 45,15 T 75,8 T 95,3" />
                  <circle cx="5" cy="26" r="1.5" className="fill-[#00C9A7]" />
                  <circle cx="45" cy="15" r="1.5" className="fill-[#00C9A7]" />
                  <circle cx="75" cy="8" r="1.5" className="fill-[#8bee0f]" />
                  <circle cx="95" cy="3" r="1.5" className="fill-[#00C9A7] animate-pulse" />
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                  <line x1="0" y1="18" x2="100" y2="18" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                  <line x1="0" y1="6" x2="100" y2="6" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                </svg>
                
                <div className="flex justify-between text-[7px] font-mono text-paper/30 mt-2 px-1">
                  <span>Wk 1 (42%)</span>
                  <span>Wk 2 (54%)</span>
                  <span>Wk 3 (68%)</span>
                  <span>Wk 4 (72.8%)</span>
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
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-transparent px-5 py-3 font-mono text-[9px] uppercase tracking-wider text-white hover:border-[#8bee0f] hover:text-[#8bee0f] transition-all cursor-pointer"
              >
                <span>Mobile Details</span>
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Magnetic>

            {/* Premium iOS Mobile App CSS Mockup */}
            <div className="w-full flex justify-center mt-12">
              <div className="w-[70%] md:w-[60%] lg:w-[68%] aspect-[0.52] bg-[#0c0c0d] border-[3px] border-white/[0.08] rounded-[2.2rem] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden relative group hover:border-[#8bee0f]/15 transition-all duration-500">
                
                {/* Dynamic Island / Notch */}
                <div className="w-14 h-3.5 bg-[#030303] rounded-full mx-auto mb-4 border border-white/5 flex items-center justify-center" />

                <div className="flex flex-col justify-between h-[92%] relative z-10">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-white text-[8px] font-mono mb-4 px-1.5 opacity-60">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <span>5G</span>
                      <span className="w-2.5 h-1.5 border border-white/40 rounded-sm relative flex items-center p-0.5"><span className="w-full h-full bg-white rounded-2xs" /></span>
                    </div>
                  </div>

                  {/* Today's Target Panel */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 flex items-center justify-between mb-3.5">
                    <div>
                      <span className="text-[7.5px] text-paper/40 block font-mono uppercase tracking-wider">DAILY PRACTICE TARGET</span>
                      <span className="text-[10px] font-bold text-white block mt-0.5">4 Acoustic Exercises</span>
                    </div>
                    <button className="text-[7.5px] font-bold bg-[#8bee0f] text-black px-2.5 py-1 rounded hover:opacity-90 transition-opacity font-mono uppercase tracking-wider cursor-pointer">Start</button>
                  </div>

                  {/* recommended task */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 flex-grow mb-3.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[7.5px] text-paper/40 block font-mono uppercase tracking-wider">Module 02 // Vocal</span>
                      <span className="text-[11px] font-bold text-white block mt-1">Naming Practice</span>
                    </div>
                    <div className="flex items-center gap-3 mt-4 bg-white/[0.01] border border-white/[0.03] p-2.5 rounded-lg">
                      <div className="w-9 h-9 rounded bg-[#8bee0f]/5 border border-[#8bee0f]/10 flex items-center justify-center text-lg shadow-inner">
                        🐘
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-white block">Acoustic Task</span>
                        <span className="text-[8px] text-paper/40 block font-mono">Pronounce target word</span>
                      </div>
                    </div>
                  </div>

                  {/* App controls mic button */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <span className="text-[7.5px] font-mono text-paper/40 uppercase block">Microphone Access</span>
                      <span className="text-[9px] text-[#8bee0f] font-mono">Ready to Record</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#8bee0f] flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(139,238,15,0.3)] hover:scale-105 transition-transform duration-300">
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                  </div>

                  {/* Mobile nav bar mockup */}
                  <div className="border-t border-white/5 pt-2.5 mt-2.5 flex justify-between text-[7px] text-paper/30 font-mono px-3">
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
