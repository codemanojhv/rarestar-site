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
        gsap.from(".fade-up-item", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center relative">
          
          {/* Left Column: For Therapists */}
          <div className="lg:col-span-5 flex flex-col items-start fade-up-item">
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#8bee0f] uppercase mb-4">
              ✦ For Therapists
            </span>
            <h2 className="display text-3xl md:text-4xl tracking-tight text-white mb-6 leading-tight">
              Data that empowers<br />better decisions
            </h2>
            <p className="font-sans text-paper/70 text-sm md:text-base leading-relaxed mb-8">
              Rehai's dashboard gives therapists actionable insights, saves time, and helps deliver consistent, high-quality care at scale.
            </p>

            {/* Checklist */}
            <ul className="space-y-4 mb-10 w-full">
              {[
                "Real-time patient insights",
                "Objective progress tracking",
                "Smart therapy recommendations"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-sans text-paper/80">
                  <div className="w-5 h-5 rounded-full bg-[#8bee0f]/15 border border-[#8bee0f]/30 flex items-center justify-center text-[#8bee0f] flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Magnetic strength={0.15} radius={70}>
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3.5 font-sans text-xs font-semibold text-white hover:border-[#8bee0f] hover:text-[#8bee0f] transition-all"
              >
                <span>Explore Therapist Dashboard</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </Magnetic>

            {/* CSS Dashboard Mockup */}
            <div className="w-full aspect-[1.3] bg-[#0c0c0e]/95 border border-white/10 rounded-2xl p-4 shadow-2xl mt-12 overflow-hidden scale-95 md:scale-100 origin-left">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                <span className="text-[9px] uppercase tracking-wider text-paper/40 font-mono">Patient Progress</span>
                <span className="text-[9px] text-[#8bee0f] font-mono">Dashboard View</span>
              </div>

              <div className="grid grid-cols-12 gap-3 mb-3">
                <div className="col-span-7 bg-white/5 border border-white/5 rounded-xl p-3 flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                    <Image src="/rehai/patient_arjun.png" alt="Arjun Shetty" fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[10px] font-bold text-white truncate">Arjun Shetty</h4>
                    <p className="text-[8px] text-paper/30 truncate">Stroke · Left Hemiplegia</p>
                  </div>
                </div>
                <div className="col-span-5 bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                  <span className="text-[7px] text-paper/30 uppercase">Overall Progress</span>
                  <span className="text-xs font-bold text-[#8bee0f] mt-0.5">72% <span className="text-[7px] text-paper/30 font-normal ml-1">+12% this month</span></span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Performance by Domain */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                  <span className="text-[8px] font-bold text-white block mb-2">Performance by Domain</span>
                  <div className="flex gap-2 items-center">
                    <svg className="w-10 h-10" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.91" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.91" fill="none" stroke="#8bee0f" strokeWidth="3" strokeDasharray="75 25" strokeDashoffset="25" />
                    </svg>
                    <div className="text-[7px] space-y-0.5 text-paper/50">
                      <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-[#8bee0f]" /> <span>Speech: 75%</span></div>
                      <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-[#00C9A7]" /> <span>Cognition: 62%</span></div>
                      <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-blue-500" /> <span>Memory: 60%</span></div>
                    </div>
                  </div>
                </div>

                {/* Recent Sessions */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-[8px] font-bold text-white block mb-1">Recent Sessions</span>
                  <div className="space-y-1 text-[7px] text-paper/60">
                    <div className="flex justify-between border-b border-white/5 pb-0.5"><span>Naming - Animals</span> <span className="text-[#8bee0f] font-bold">85%</span></div>
                    <div className="flex justify-between border-b border-white/5 pb-0.5"><span>Repetition - Words</span> <span className="text-[#8bee0f] font-bold">78%</span></div>
                    <div className="flex justify-between"><span>Memory - Word List</span> <span className="text-[#8bee0f] font-bold">80%</span></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Central Logo Divider (Fades out on mobile, sticky-like absolute on desktop) */}
          <div className="hidden lg:flex absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              {/* Pulsing circles */}
              <div className="absolute w-24 h-24 rounded-full border border-[#8bee0f]/20 animate-ping opacity-35" />
              <div className="absolute w-16 h-16 rounded-full border border-[#00C9A7]/40 animate-pulse" />
              
              {/* Logo block */}
              <div className="w-12 h-12 rounded-full bg-ink border border-white/15 flex items-center justify-center shadow-[0_0_20px_rgba(139,238,15,0.15)]">
                <svg className="w-6 h-6 text-[#8bee0f]" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M12.5 6C8.91 6 6 8.91 6 12.5c0 2.82 1.8 5.21 4.3 6.1.5.18.7.67.7 1.18v2.72c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5v-2.72c0-.51.2-.99.7-1.18 2.5-.89 4.3-3.28 4.3-6.1C26 8.91 23.09 6 19.5 6c-2.36 0-4.4 1.27-5.5 3.16C12.9 7.27 10.86 6 12.5 6z" />
                </svg>
              </div>
            </div>
            {/* Vertically running indicator glow line */}
            <div className="w-px h-24 bg-gradient-to-b from-[#8bee0f]/50 via-[#00C9A7]/40 to-transparent mt-4" />
          </div>

          {/* Right Column: For Patients */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col items-start fade-up-item">
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#00C9A7] uppercase mb-4">
              ✦ For Patients
            </span>
            <h2 className="display text-3xl md:text-4xl tracking-tight text-white mb-6 leading-tight">
              Therapy that fits<br />your journey
            </h2>
            <p className="font-sans text-paper/70 text-sm md:text-base leading-relaxed mb-8">
              An intuitive app experience that makes rehabilitation engaging, accessible, and effective—anytime, anywhere.
            </p>

            {/* Checklist */}
            <ul className="space-y-4 mb-10 w-full">
              {[
                "Engaging exercises",
                "Real-time feedback",
                "Track your improvement"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-sans text-paper/80">
                  <div className="w-5 h-5 rounded-full bg-[#00C9A7]/15 border border-[#00C9A7]/30 flex items-center justify-center text-[#00C9A7] flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Magnetic strength={0.15} radius={70}>
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3.5 font-sans text-xs font-semibold text-white hover:border-[#00C9A7] hover:text-[#00C9A7] transition-all"
              >
                <span>View Patient App</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </Magnetic>

            {/* CSS Mobile Mockup */}
            <div className="w-full flex justify-center mt-12">
              <div className="w-[70%] md:w-[60%] lg:w-[75%] aspect-[0.52] bg-[#0c0c0e] border-[3px] border-white/10 rounded-[2rem] p-3 shadow-2xl overflow-hidden scale-95 md:scale-100 origin-center">
                <div className="w-12 h-2.5 bg-black rounded-full mx-auto mb-3 flex items-center justify-center border border-white/5">
                  <div className="w-6 h-0.5 bg-white/10 rounded-full" />
                </div>

                <div className="flex flex-col justify-between h-[92%]">
                  <div className="flex items-center justify-between text-white text-[8px] font-semibold mb-2">
                    <span>Good morning, Arjun 🌟</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8bee0f] animate-pulse" />
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex items-center justify-between mb-2">
                    <div>
                      <span className="text-[7px] text-paper/40 block">Today's Plan</span>
                      <span className="text-[9px] font-bold text-white block mt-0.5">4 Activities</span>
                    </div>
                    <button className="text-[7.5px] font-bold bg-[#8bee0f] text-black px-2.5 py-1 rounded-md hover:scale-105 transition-transform">Start</button>
                  </div>

                  {/* Your Progress */}
                  <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex-grow mb-2 flex flex-col justify-between">
                    <span className="text-[7px] text-paper/40 block font-bold text-white uppercase tracking-wider">Your Progress</span>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-9 h-9" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.91" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.91" fill="none" stroke="#00C9A7" strokeWidth="3" strokeDasharray="72 28" />
                      </svg>
                      <div>
                        <span className="text-xs font-black text-white block">72%</span>
                        <span className="text-[6.5px] text-paper/40 block">This Week</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommended activity */}
                  <div className="bg-white/5 border border-white/5 rounded-xl p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#8bee0f]/15 flex items-center justify-center text-[#8bee0f]">
                        🐘
                      </div>
                      <div>
                        <span className="text-[8px] font-bold text-white block">Naming - Animals</span>
                        <span className="text-[6.5px] text-paper/40 block">Medium · 5 min</span>
                      </div>
                    </div>
                    <svg className="w-2.5 h-2.5 text-paper/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Mobile nav bar mockup */}
                  <div className="border-t border-white/5 pt-1.5 mt-2 flex justify-between text-[6.5px] text-paper/30 font-mono">
                    <span className="text-[#00C9A7] font-bold">Home</span>
                    <span>Activities</span>
                    <span>Progress</span>
                    <span>Profile</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Hospital Logos Bar at the Bottom */}
        <div className="border-t border-white/5 pt-12 mt-24 text-center">
          <p className="font-mono text-[9px] font-bold tracking-[0.3em] text-[#8bee0f] uppercase mb-8">
            Trusted by therapists and healthcare institutions
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16 opacity-40">
            {/* NIMHANS */}
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity">
              <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center font-mono text-[8px] font-black text-white">N</div>
              <span className="font-sans font-black text-[11px] tracking-wider text-white">NIMHANS <span className="text-[9px] font-normal opacity-50 block md:inline md:ml-1">Bengaluru</span></span>
            </div>

            {/* AIISH */}
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity">
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-mono text-[8px] font-black text-[#8bee0f]">A</div>
              <span className="font-sans font-black text-[11px] tracking-wider text-white">AIISH <span className="text-[9px] font-normal opacity-50 block md:inline md:ml-1">Mysuru</span></span>
            </div>

            {/* Columbia Asia */}
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity">
              <div className="w-5 h-5 bg-white/10 flex items-center justify-center font-mono text-[10px] text-white">+</div>
              <span className="font-sans font-black text-[11px] tracking-wider text-white">COLUMBIAASIA <span className="text-[9px] font-normal opacity-50 block md:inline md:ml-1">Hospitals</span></span>
            </div>

            {/* Sahyadri */}
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4l6 12H6l6-12z"/></svg>
              <span className="font-sans font-black text-[11px] tracking-wider text-white">SAHYADRI <span className="text-[9px] font-normal opacity-50 block md:inline md:ml-1">Hospitals</span></span>
            </div>

            {/* Apollo */}
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity">
              <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center font-mono text-[8px] font-black text-white">🏥</div>
              <span className="font-sans font-black text-[11px] tracking-wider text-white">APOLLO <span className="text-[9px] font-normal opacity-50 block md:inline md:ml-1">Hospitals</span></span>
            </div>

            {/* and more... */}
            <span className="font-sans text-[11px] font-medium text-paper/40 italic">
              and more...
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
