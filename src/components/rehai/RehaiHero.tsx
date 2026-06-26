"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";

export default function RehaiHero() {
  const container = useRef<HTMLDivElement>(null);
  const leftCol = useRef<HTMLDivElement>(null);
  const rightCol = useRef<HTMLDivElement>(null);
  const trustBar = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let ctx: gsap.Context;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".reveal-item", {
          y: 30,
          opacity: 0,
          duration: 1.2,
          stagger: 0.08
        })
        .from(rightCol.current, {
          x: 40,
          opacity: 0,
          duration: 1.4
        }, "-=0.9")
        .from(trustBar.current, {
          y: 20,
          opacity: 0,
          duration: 1.2
        }, "-=1.0");
      }, container);
    };

    init();
    return () => ctx?.revert();
  }, []);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section
      ref={container}
      id="top"
      className="relative min-h-[100dvh] bg-ink pt-32 pb-20 px-6 md:px-10 overflow-hidden flex flex-col justify-between"
    >
      {/* Softer Atmospheric Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full bg-[#00C9A7]/10 blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full bg-[#8bee0f]/5 blur-[130px] mix-blend-screen" />
      </div>

      <div className="mx-auto max-w-7xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center my-auto">
        
        {/* Left Content Column */}
        <div ref={leftCol} className="lg:col-span-5 flex flex-col items-start text-left">
          
          {/* Refined Pill Badge */}
          <div className="reveal-item mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#00C9A7]/20 bg-[#00C9A7]/5 px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.2em] text-[#00C9A7]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C9A7] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00C9A7]"></span>
            </span>
            <span>Clinical Rehabilitation</span>
          </div>

          {/* Hopeful, Calm Typography Heading */}
          <h1 className="reveal-item display text-[clamp(2.4rem,6.2vw,4.6rem)] leading-[0.92] tracking-tight text-white mb-6">
            A partner in <br />
            <span className="italic text-dust font-light">neurological recovery.</span>
          </h1>

          {/* Core Vision Statement */}
          <p className="reveal-item font-sans text-paper/60 text-sm md:text-base leading-relaxed max-w-md mb-8">
            Rehai is an adaptive neurorehabilitation platform. We couple clinician expertise with personalized speech and cognitive exercises to support recovery from stroke, aphasia, and brain injuries.
          </p>

          {/* Inline Waitlist Sign Up */}
          <div className="reveal-item w-full max-w-sm">
            <form onSubmit={handleWaitlist} className="flex gap-2 w-full items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vocalist@clinical.org"
                required
                className="flex-1 rounded-lg border border-white/10 bg-white/[0.01] px-4 py-2.5 text-[11px] text-white placeholder:text-paper/20 focus:border-[#00C9A7] focus:outline-none transition-all font-mono"
              />
              <Magnetic strength={0.12} radius={60}>
                <button
                  type="submit"
                  className="rounded-lg bg-[#00C9A7] text-ink px-4 py-2.5 font-mono text-[9px] uppercase tracking-wider font-bold flex items-center gap-1.5 hover:opacity-90 transition-all flex-shrink-0"
                >
                  <span>{submitted ? "Joined ✓" : "Join Waitlist"}</span>
                </button>
              </Magnetic>
            </form>
            <span className="text-[9px] font-mono text-paper/30 mt-2 block pl-1">Join the waitlist for clinician access.</span>
          </div>
        </div>

        {/* Right Unified Mockup Column */}
        <div ref={rightCol} className="lg:col-span-7 relative flex justify-center items-center w-full">
          {/* Unified Clinical Console Mockup */}
          <div className="w-full max-w-2xl bg-white/[0.01] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden group hover:border-white/15 transition-colors duration-500">
            {/* Subtle glow inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#00C9A7]/5 blur-[80px] pointer-events-none" />
            
            {/* Console Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-paper/40">Clinical Interface</span>
              </div>
              <span className="text-[9px] font-mono text-[#00C9A7] bg-[#00C9A7]/5 border border-[#00C9A7]/10 rounded px-2.5 py-0.5">Active Session</span>
            </div>

            {/* Console Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Patient info & metrics (Left inside console) */}
              <div className="md:col-span-5 flex flex-col justify-between gap-6">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
                    <Image src="/rehai/patient_arjun.png" alt="Arjun Shetty" fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">Arjun Shetty</h4>
                    <p className="text-[10px] text-paper/40 truncate">Stroke Recovery · Day 24</p>
                  </div>
                </div>

                {/* Progress Circle & Text */}
                <div className="flex items-center gap-4 py-2 bg-white/[0.01] border border-white/5 rounded-xl p-3">
                  <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#00C9A7" strokeWidth="3" strokeDasharray="72 28" strokeDashoffset="25" />
                  </svg>
                  <div>
                    <span className="text-[9px] text-paper/30 uppercase tracking-wider block font-mono">Accuracy</span>
                    <span className="text-sm font-bold text-white block mt-0.5">72.8% <span className="text-[9px] text-[#00C9A7] font-normal font-mono">+4.2%</span></span>
                  </div>
                </div>

                {/* Status card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <span className="text-[8px] text-paper/30 uppercase tracking-wider block font-mono">Exercises Completed</span>
                    <span className="text-xs font-bold text-white mt-0.5 block">128 Completed</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-paper/30 uppercase tracking-wider block font-mono">Streak</span>
                    <span className="text-xs font-bold text-[#8bee0f] mt-0.5 block">12 Days</span>
                  </div>
                </div>
              </div>

              {/* Speech assessment interface (Right inside console) */}
              <div className="md:col-span-7 flex flex-col justify-between gap-5 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-6">
                
                {/* Word naming card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col items-center text-center relative flex-1 justify-center">
                  <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#00C9A7] mb-4">Speech Practice</span>
                  
                  {/* Task Object */}
                  <div className="w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xl mb-3">
                    🐘
                  </div>
                  <h5 className="text-[10px] font-mono text-paper/40 uppercase tracking-widest">Active Task</h5>
                  <p className="text-sm font-bold text-white mt-1">"Elephant"</p>
                  
                  {/* Live Waveform graphic */}
                  <div className="w-full flex items-center justify-center gap-0.5 h-6 mt-4">
                    {[15, 30, 45, 30, 60, 80, 50, 90, 75, 40, 60, 50, 75, 95, 60, 40, 20, 10].map((h, i) => (
                      <span key={i} className="w-0.5 bg-[#8bee0f] rounded-full transition-all duration-300" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono text-[#8bee0f] tracking-wider mt-2.5">Recording... 00:05</span>
                </div>

                {/* Bottom session label */}
                <div className="flex justify-between items-center text-[9px] font-mono text-paper/30 px-1">
                  <span>Therapist Supervised</span>
                  <span>Mysuru Center</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Clean Trust Features Bar (Bottom) */}
      <div ref={trustBar} className="relative z-10 mx-auto max-w-7xl w-full border-t border-white/5 pt-12 mt-16 lg:mt-0">
        <p className="text-center font-mono text-[9px] uppercase tracking-[0.25em] text-paper/30 mb-8">
          The core pillars of the recovery loop
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-start">
          {/* Feature 1 */}
          <div className="flex flex-col items-start gap-2 pl-6 border-l border-white/5">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">01 / Personalization</h4>
            <p className="text-[11px] text-paper/40 leading-relaxed max-w-[200px]">Tailored cognitive pathways that adapt based on verbal response times and accuracy.</p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-start gap-2 pl-6 border-l border-white/5">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">02 / Dual Modality</h4>
            <p className="text-[11px] text-paper/40 leading-relaxed max-w-[200px]">Integrates speech acoustics and neurological cognitive exercises in a unified patient app.</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-start gap-2 pl-6 border-l border-white/5">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">03 / Recovery Tracking</h4>
            <p className="text-[11px] text-paper/40 leading-relaxed max-w-[200px]">Empowers therapists with clinical logs, vocal markers, and objective charting data.</p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-start gap-2 pl-6 border-l border-white/5">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">04 / Therapist Control</h4>
            <p className="text-[11px] text-paper/40 leading-relaxed max-w-[200px]">Connects clinical visits with daily home practice, keeping the therapist in control.</p>
          </div>
        </div>
      </div>
      
    </section>
  );
}
