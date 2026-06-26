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
            <span>Clinical Neurorehabilitation</span>
          </div>

          {/* Hopeful, Calm Typography Heading */}
          <h1 className="reveal-item display text-[clamp(2.4rem,6.2vw,4.6rem)] leading-[0.92] tracking-tight text-white mb-6">
            A partner in <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] via-[#8bee0f] to-[#00C9A7] font-light bg-size-200">
              neurological recovery.
            </span>
          </h1>

          {/* Core Vision Statement */}
          <p className="reveal-item font-sans text-paper/60 text-sm md:text-[15px] leading-relaxed max-w-md mb-9">
            Rehai couples clinician supervision with personalized speech and cognitive exercises to support recovery from stroke, aphasia, and brain injuries.
          </p>

          {/* Inline Waitlist Sign Up */}
          <div className="reveal-item w-full max-w-sm">
            <form onSubmit={handleWaitlist} className="flex gap-2 w-full items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="clinician@hospital.org"
                required
                className="flex-1 rounded-lg border border-white/10 bg-white/[0.01] px-4 py-2.5 text-[11px] text-white placeholder:text-paper/20 focus:border-[#00C9A7] focus:outline-none focus:ring-1 focus:ring-[#00C9A7]/20 transition-all font-mono"
              />
              <Magnetic strength={0.12} radius={60}>
                <button
                  type="submit"
                  className="rounded-lg bg-[#00C9A7] text-ink px-4 py-2.5 font-mono text-[9px] uppercase tracking-wider font-bold flex items-center gap-1.5 hover:opacity-90 transition-all hover:shadow-[0_0_15px_rgba(0,201,167,0.25)] flex-shrink-0 cursor-pointer"
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
          <div className="w-full max-w-2xl bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
            {/* Subtle glow inside card */}
            <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[#00C9A7]/5 blur-[80px] pointer-events-none" />
            
            {/* Console Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C9A7] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C9A7]"></span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-paper/50">Clinician Portal v1.0</span>
              </div>
              <span className="text-[9px] font-mono text-[#00C9A7] bg-[#00C9A7]/5 border border-[#00C9A7]/15 rounded px-2.5 py-0.5 tracking-wider uppercase font-semibold">Live Telemetry</span>
            </div>

            {/* Console Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Patient info & metrics (Left inside console) */}
              <div className="md:col-span-5 flex flex-col justify-between gap-5">
                
                {/* EHR Patient Badge */}
                <div className="flex items-center gap-3.5 bg-white/[0.01] border border-white/[0.03] rounded-xl p-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
                    <Image src="/rehai/patient_arjun.png" alt="Arjun Shetty" fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">Arjun Shetty</h4>
                    <p className="text-[9px] font-mono text-paper/30 tracking-wider mt-0.5">STROKE RECOVERY</p>
                    <p className="text-[9px] text-[#00C9A7] font-mono mt-0.5">Day 24 · NIMHANS</p>
                  </div>
                </div>

                {/* Progress Circle & Text */}
                <div className="flex items-center gap-4 py-2 bg-white/[0.01] border border-white/5 rounded-xl p-3.5">
                  <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3.5" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="url(#rehaiGradient)" strokeWidth="3.5" strokeDasharray="72 28" strokeDashoffset="25" />
                    <defs>
                      <linearGradient id="rehaiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00C9A7" />
                        <stop offset="100%" stopColor="#8bee0f" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div>
                    <span className="text-[9px] text-paper/30 uppercase tracking-wider block font-mono">Vocal Accuracy</span>
                    <span className="text-sm font-bold text-white block mt-0.5">72.8% <span className="text-[9px] text-[#00C9A7] font-semibold font-mono ml-1">+4.2%</span></span>
                  </div>
                </div>

                {/* Status card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 flex justify-between items-center">
                  <div>
                    <span className="text-[8px] text-paper/30 uppercase tracking-wider block font-mono">Completed Exercises</span>
                    <span className="text-[11px] font-bold text-white mt-0.5 block">128 Sessions</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-paper/30 uppercase tracking-wider block font-mono">Practice Streak</span>
                    <span className="text-[11px] font-bold text-[#8bee0f] mt-0.5 block">12 Days</span>
                  </div>
                </div>
              </div>

              {/* Speech assessment interface (Right inside console) */}
              <div className="md:col-span-7 flex flex-col justify-between gap-5 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-6">
                
                {/* Word naming card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col items-center text-center relative flex-1 justify-center">
                  <div className="absolute top-3 left-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8bee0f] animate-pulse" />
                    <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-[#8bee0f]">Signal Active</span>
                  </div>
                  
                  {/* Task Object */}
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-3 shadow-inner">
                    🐘
                  </div>
                  <h5 className="text-[8px] font-mono text-paper/40 uppercase tracking-widest">Active Target Word</h5>
                  <p className="text-sm font-bold text-white mt-0.5">"Elephant"</p>
                  <p className="text-[9px] font-mono text-paper/30 italic">/ˈel.ɪ.fənt/</p>
                  
                  {/* Staggered Animated Waveform */}
                  <div className="w-full flex items-center justify-center gap-[3px] h-8 mt-5">
                    {[25, 45, 65, 30, 75, 95, 55, 100, 75, 45, 60, 50, 70, 90, 60, 40, 25, 15, 20, 45].map((h, i) => (
                      <span 
                        key={i} 
                        className="w-[2px] bg-gradient-to-t from-[#00C9A7] to-[#8bee0f] rounded-full animate-rehai-wave" 
                        style={{ 
                          height: `${h}%`,
                          animationDelay: `${i * 0.04}s`,
                          animationDuration: `${0.65 + (i % 4) * 0.15}s`
                        }} 
                      />
                    ))}
                  </div>
                  
                  <span className="text-[8px] font-mono text-[#8bee0f] tracking-wider mt-3">Acoustic Latency: 1.4s</span>
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
