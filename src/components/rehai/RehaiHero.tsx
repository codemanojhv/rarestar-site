"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";

export default function RehaiHero() {
  const container = useRef<HTMLDivElement>(null);
  const leftCol = useRef<HTMLDivElement>(null);
  const rightCol = useRef<HTMLDivElement>(null);
  const trustBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".reveal-item", {
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1
        })
        .from(rightCol.current, {
          x: 60,
          opacity: 0,
          duration: 1.5
        }, "-=1.0")
        .from(trustBar.current, {
          y: 30,
          opacity: 0,
          duration: 1.2
        }, "-=1.2");
      }, container);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={container}
      id="top"
      className="relative min-h-[100dvh] bg-ink pt-32 pb-16 px-6 md:px-10 overflow-hidden flex flex-col justify-between"
    >
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-10 right-10 w-[600px] h-[600px] rounded-full bg-[#8bee0f]/15 blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] rounded-full bg-[#00C9A7]/10 blur-[130px] mix-blend-screen" />
      </div>

      <div className="mx-auto max-w-7xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        
        {/* Left Content Column */}
        <div ref={leftCol} className="lg:col-span-5 flex flex-col items-start text-left">
          
          {/* Pill Badge */}
          <div className="reveal-item mb-6 inline-flex items-center gap-2 rounded-full border border-[#8bee0f]/30 bg-[#8bee0f]/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#8bee0f]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8bee0f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8bee0f]"></span>
            </span>
            <span>✦ AI-Powered Neuro Recovery</span>
          </div>

          {/* Heading */}
          <h1 className="reveal-item display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-white mb-6">
            Rehabilitation,<br />
            Reimagined.<br />
            <span className="text-[#8bee0f]">Recovery, Personalized.</span>
          </h1>

          {/* Paragraph */}
          <p className="reveal-item font-sans text-paper/70 text-base md:text-lg max-w-lg leading-relaxed mb-10">
            Rehai is an AI-powered platform that delivers personalized speech and cognitive rehabilitation for individuals recovering from stroke, aphasia, TBI, and other neurological conditions.
          </p>

          {/* CTA Buttons */}
          <div className="reveal-item flex flex-wrap gap-4 items-center">
            <Magnetic strength={0.2} radius={80}>
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-2 rounded-full bg-[#8bee0f] px-7 py-4 font-sans text-sm font-bold text-ink hover:opacity-95 transition-all shadow-[0_0_25px_rgba(139,238,15,0.25)] hover:shadow-[0_0_35px_rgba(139,238,15,0.4)]"
              >
                <span>Request Early Access</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </Magnetic>

            <Magnetic strength={0.15} radius={70}>
              <a
                href="#dual-audience"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-7 py-4 font-sans text-sm font-semibold text-white hover:border-[#8bee0f] hover:text-[#8bee0f] transition-all"
              >
                <span>For Therapists</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right Visual mockups Column */}
        <div ref={rightCol} className="lg:col-span-7 relative flex justify-center items-center h-[520px] md:h-[620px] lg:h-[650px] w-full">
          
          {/* Mockup 1: Dashboard (Behind, shifted right) */}
          <div className="absolute right-0 top-4 w-[85%] md:w-[75%] aspect-[1.4] bg-[#0c0c0e]/95 border border-white/10 rounded-2xl p-4 shadow-2xl z-0 scale-95 md:scale-100 origin-right transition-transform">
            
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#8bee0f]/15 flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#8bee0f]" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M12.5 6C8.91 6 6 8.91 6 12.5c0 2.82 1.8 5.21 4.3 6.1.5.18.7.67.7 1.18v2.72c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5v-2.72c0-.51.2-.99.7-1.18 2.5-.89 4.3-3.28 4.3-6.1C26 8.91 23.09 6 19.5 6c-2.36 0-4.4 1.27-5.5 3.16C12.9 7.27 10.86 6 12.5 6z" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-paper/40 font-mono">Patient Overview</span>
              </div>
              <div className="w-3.5 h-3.5 rounded-full bg-white/5 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
            </div>

            {/* Content Row 1 */}
            <div className="grid grid-cols-12 gap-3 mb-3">
              {/* Profile Card */}
              <div className="col-span-6 bg-white/5 border border-white/5 rounded-xl p-3 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/10 flex-shrink-0">
                  <Image src="/rehai/patient_arjun.png" alt="Arjun Shetty" fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">Arjun Shetty</h4>
                  <p className="text-[9px] text-paper/40 truncate">Stroke · Left Hemiplegia</p>
                  {/* Progress bar */}
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[72%] h-full bg-[#8bee0f]" />
                    </div>
                    <span className="text-[9px] text-[#8bee0f] font-mono">72%</span>
                  </div>
                </div>
              </div>

              {/* Stats blocks */}
              <div className="col-span-6 grid grid-cols-3 gap-2">
                <div className="bg-white/5 border border-white/5 rounded-xl p-2 text-center flex flex-col justify-center">
                  <span className="text-[8px] text-paper/30 uppercase block">Sessions</span>
                  <span className="text-sm font-bold text-white block mt-0.5">24</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-2 text-center flex flex-col justify-center">
                  <span className="text-[8px] text-paper/30 uppercase block">Streak</span>
                  <span className="text-sm font-bold text-[#8bee0f] block mt-0.5">12d</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-2 text-center flex flex-col justify-center">
                  <span className="text-[8px] text-paper/30 uppercase block">Done</span>
                  <span className="text-sm font-bold text-white block mt-0.5">128</span>
                </div>
              </div>
            </div>

            {/* Content Row 2 */}
            <div className="grid grid-cols-2 gap-3">
              {/* Progress Chart */}
              <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold text-white">Progress Over Time</span>
                  <span className="text-[8px] text-paper/40 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 font-mono">Last 3M</span>
                </div>
                {/* SVG Line Chart */}
                <div className="w-full h-16 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M 0,35 Q 25,25 50,15 T 100,5" fill="none" stroke="#8bee0f" strokeWidth="2" />
                    <circle cx="0" cy="35" r="1.5" fill="#8bee0f" />
                    <circle cx="25" cy="27" r="1.5" fill="#8bee0f" />
                    <circle cx="50" cy="15" r="1.5" fill="#8bee0f" />
                    <circle cx="100" cy="5" r="1.5" fill="#8bee0f" />
                  </svg>
                  <div className="flex justify-between text-[7px] text-paper/30 mt-1 font-mono">
                    <span>Apr 10</span>
                    <span>May 08</span>
                    <span>Jun 19</span>
                  </div>
                </div>
              </div>

              {/* Performance by Domain */}
              <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                <span className="text-[9px] font-bold text-white block mb-2">Performance by Domain</span>
                <div className="flex gap-2 items-center">
                  {/* SVG Donut */}
                  <svg className="w-12 h-12 flex-shrink-0" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.91" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    {/* Speech (75% - green) */}
                    <circle cx="18" cy="18" r="15.91" fill="none" stroke="#8bee0f" strokeWidth="3" strokeDasharray="75 25" strokeDashoffset="25" />
                    {/* Cognition (62% - teal) */}
                    <circle cx="18" cy="18" r="15.91" fill="none" stroke="#00C9A7" strokeWidth="3" strokeDasharray="62 38" strokeDashoffset="100" />
                  </svg>
                  <div className="text-[7px] space-y-0.5 text-paper/50">
                    <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#8bee0f]" /> <span>Speech: 75%</span></div>
                    <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00C9A7]" /> <span>Cognition: 62%</span></div>
                    <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> <span>Attention: 70%</span></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Mockup 2: Phone (In front, shifted left) */}
          <div className="absolute left-0 bottom-12 w-[48%] md:w-[42%] aspect-[0.5] bg-[#0c0c0e] border-[3px] border-white/10 rounded-[2rem] p-3.5 shadow-2xl z-10 scale-95 md:scale-100 origin-left transition-transform">
            
            {/* Phone Speaker/Camera punchhole */}
            <div className="w-16 h-3.5 bg-black rounded-full mx-auto mb-3 flex items-center justify-center border border-white/5">
              <div className="w-8 h-1 bg-white/15 rounded-full" />
            </div>

            {/* App UI */}
            <div className="flex flex-col justify-between h-[92%]">
              
              {/* App Header */}
              <div className="flex justify-between items-center text-paper/50 text-[9px] font-mono mb-2">
                <span className="flex items-center gap-1">
                  <svg className="w-2.5 h-2.5 text-[#8bee0f]" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M12.5 6C8.91 6 6 8.91 6 12.5c0 2.82 1.8 5.21 4.3 6.1.5.18.7.67.7 1.18v2.72c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5v-2.72c0-.51.2-.99.7-1.18 2.5-.89 4.3-3.28 4.3-6.1C26 8.91 23.09 6 19.5 6c-2.36 0-4.4 1.27-5.5 3.16C12.9 7.27 10.86 6 12.5 6z" />
                  </svg>
                  <span>Naming - Animals</span>
                </span>
                <span>5/10</span>
              </div>

              {/* Main App Content - Elephant card */}
              <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col justify-between items-center text-center">
                <span className="text-[9px] text-paper/40 font-mono mb-2">Identify the object</span>
                
                {/* Elephant outline/shape */}
                <div className="w-24 h-24 rounded-lg bg-white/5 flex items-center justify-center relative overflow-hidden group">
                  <svg className="w-16 h-16 text-paper/30 transition-transform duration-500 group-hover:scale-105" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 13h-2v-2h2v2zm-4-2h-2v2h2v-2zm-4 0h-2v2h2v-2zm-4 0H8v2h2v-2zm-4 0H4v2h2v-2zm-4 0H0v2h2v-2zm22-3h-2v2h2V8zm-4 0h-2v2h2V8zm-4 0h-2v2h2V8zm-4 0H8v2h2V8zm-4 0H4v2h2V8zm-4 0H0v2h2V8zm19 12H5c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2z" />
                  </svg>
                  <div className="absolute inset-0 bg-[#8bee0f]/5 flex items-center justify-center text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    🐘 Elephant
                  </div>
                </div>

                <p className="text-xs font-bold text-white mt-3">"Say the name of the object shown"</p>
                <span className="text-[9px] text-[#8bee0f] font-mono mt-1">00:05 / Recording</span>
              </div>

              {/* App controls mic button */}
              <div className="mt-4 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-[#8bee0f] flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>

            </div>

          </div>

          {/* Overlay Photo (Bottom-right, front of dashboard, behind phone) */}
          <div className="absolute right-0 bottom-4 w-[50%] md:w-[45%] aspect-[1.3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-20 hover:scale-[1.02] transition-transform duration-500">
            <Image src="/rehai/therapy_session.png" alt="Rehai therapy session" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] uppercase tracking-wider text-white font-mono">Live Session Session</span>
            </div>
          </div>

        </div>

      </div>

      {/* Trust Features Bar (Bottom) */}
      <div ref={trustBar} className="relative z-10 mx-auto max-w-7xl w-full border-t border-white/5 pt-10 mt-16 lg:mt-0">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-paper/35 mb-8">
          Trusted by therapists and rehabilitation centers
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 items-start">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3.5 pl-0 md:pl-6 border-l-0 md:border-l border-white/5">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#8bee0f] border border-white/5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">AI Personalization</h4>
              <p className="text-[10px] text-paper/40 mt-1 leading-relaxed max-w-[180px]">Fully adaptive therapy plans tailored to patients.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3.5 pl-0 md:pl-6 border-l border-white/5">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#00C9A7] border border-white/5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Speech & Cognitive</h4>
              <p className="text-[10px] text-paper/40 mt-1 leading-relaxed max-w-[180px]">Comprehensive exercises for recovery.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3.5 pl-0 md:pl-6 border-l border-white/5">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#8bee0f] border border-white/5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Objective Progress</h4>
              <p className="text-[10px] text-paper/40 mt-1 leading-relaxed max-w-[180px]">Clear visual tracking and analytics tools.</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3.5 pl-0 md:pl-6 border-l border-white/5">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#00C9A7] border border-white/5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Therapist Supervised</h4>
              <p className="text-[10px] text-paper/40 mt-1 leading-relaxed max-w-[180px]">Bridging tech with expert clinical care.</p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
