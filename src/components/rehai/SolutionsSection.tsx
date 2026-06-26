"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Magnetic from "@/components/Magnetic";

export default function SolutionsSection() {
  const container = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    let ctx: gsap.Context;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(".solutions-cell", {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%"
          }
        });
      }, container);
    };

    init();
    return () => ctx?.revert();
  }, []);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 3000);
  };

  return (
    <section ref={container} id="solutions" className="px-6 py-24 md:px-10 md:py-32 bg-ink border-b border-white/5 relative">
      
      {/* Dynamic light glows */}
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] rounded-full bg-[#00C9A7]/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        
        {/* Top Part: Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-32">
          
          {/* Column A: Title & Description */}
          <div className="lg:col-span-4 flex flex-col items-start solutions-cell">
            <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#00C9A7] uppercase block mb-4">
              Solutions
            </span>
            <h2 className="display text-3xl md:text-4xl tracking-tight text-white mb-6 leading-tight">
              Clinically‑backed <br />
              <span className="italic text-dust font-light">cognitive modules.</span>
            </h2>
            <p className="font-sans text-paper/60 text-xs md:text-sm leading-relaxed mb-8 max-w-xs">
              Rehai isolates specific auditory, acoustic, and cognitive pathways to restore naming fluency and focus.
            </p>

            <Magnetic strength={0.12} radius={60}>
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-transparent px-5 py-3 font-mono text-[9px] uppercase tracking-wider text-white hover:border-[#00C9A7] hover:text-[#00C9A7] transition-all"
              >
                <span>Browse Modules</span>
                <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Magnetic>
          </div>

          {/* Column B: The Two Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 solutions-cell">
            
            {/* Card 1: Speech Rehab */}
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 min-h-[300px]">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[#00C9A7] mb-6">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="font-sans font-bold text-sm text-white mb-2">Speech Rehab</h3>
                <p className="font-sans text-[11px] text-paper/40 leading-relaxed mb-6">
                  Targets verbal naming, repetition, articulation accuracy, and motor speech planning.
                </p>
                <ul className="space-y-2 mb-8 text-[9px] font-mono text-paper/60">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#00C9A7]" />
                    <span>Word Retrieval</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#00C9A7]" />
                    <span>Phonemic Fluency</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#00C9A7]" />
                    <span>Auditory Comprehension</span>
                  </li>
                </ul>
              </div>
              <a href="#waitlist" className="text-[9px] font-mono uppercase tracking-wider text-[#00C9A7] hover:underline flex items-center gap-1 mt-auto">
                <span>Configure</span>
                <span>→</span>
              </a>
            </div>

            {/* Card 2: Cognitive Rehab */}
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 min-h-[300px]">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[#8bee0f] mb-6">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-sans font-bold text-sm text-white mb-2">Cognitive Rehab</h3>
                <p className="font-sans text-[11px] text-paper/40 leading-relaxed mb-6">
                  Strengthens executive planning, attention span, visual logic, and working memory.
                </p>
                <ul className="space-y-2 mb-8 text-[9px] font-mono text-paper/60">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#8bee0f]" />
                    <span>Working Memory</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#8bee0f]" />
                    <span>Attention & Focus</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#8bee0f]" />
                    <span>Executive Logic</span>
                  </li>
                </ul>
              </div>
              <a href="#waitlist" className="text-[9px] font-mono uppercase tracking-wider text-[#8bee0f] hover:underline flex items-center gap-1 mt-auto">
                <span>Configure</span>
                <span>→</span>
              </a>
            </div>

          </div>

          {/* Column C: Visual Photo Overlay */}
          <div className="lg:col-span-3 w-full aspect-[1.3] lg:aspect-[0.75] relative rounded-2xl overflow-hidden border border-white/5 solutions-cell">
            <Image src="/rehai/therapy_session.png" alt="Rehai clinical session" fill className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            
            {/* Clinically Informed badge overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#050505]/95 border border-white/5 rounded-xl p-4 backdrop-blur-md">
              <div className="flex gap-3 items-start">
                <span className="font-mono text-[10px] text-[#00C9A7] font-bold mt-0.5">+</span>
                <div>
                  <h4 className="text-[10px] font-bold text-white font-mono uppercase tracking-wider">Clinically Guided</h4>
                  <p className="text-[9px] text-paper/40 mt-1 leading-relaxed">Created alongside experienced clinical speech therapists.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Part: Impact Stats & Testimonial */}
        <div className="border-t border-white/5 pt-24 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Title Column */}
          <div className="lg:col-span-4 flex flex-col items-start text-left solutions-cell">
            <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#8bee0f] uppercase block mb-4">
              Performance
            </span>
            <h2 className="display text-3xl md:text-4xl tracking-tight text-white mb-6 leading-tight">
              A measurable <br />
              <span className="italic text-dust font-light">impact in recovery.</span>
            </h2>
            <p className="font-sans text-paper/60 text-xs md:text-sm leading-relaxed mb-8 max-w-sm">
              Empowering clinics with accurate performance datasets while patients execute structured practice paths.
            </p>
          </div>

          {/* Stats 1px Grid Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden solutions-cell">
            
            {/* Stat 1 */}
            <div className="bg-ink p-6 flex flex-col justify-between min-h-[120px]">
              <span className="display text-3xl text-white font-bold">10k+</span>
              <div>
                <h4 className="font-sans text-[10px] font-bold text-white uppercase tracking-wider font-mono">Sessions</h4>
                <p className="text-[9px] text-paper/40 mt-0.5 font-mono">Patient exercises completed</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-ink p-6 flex flex-col justify-between min-h-[120px]">
              <span className="display text-3xl text-[#00C9A7] font-bold">250+</span>
              <div>
                <h4 className="font-sans text-[10px] font-bold text-white uppercase tracking-wider font-mono">Clinics</h4>
                <p className="text-[9px] text-paper/40 mt-0.5 font-mono">Therapist centers enrolled</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-ink p-6 flex flex-col justify-between min-h-[120px]">
              <span className="display text-3xl text-[#8bee0f] font-bold">85%</span>
              <div>
                <h4 className="font-sans text-[10px] font-bold text-white uppercase tracking-wider font-mono">Retention</h4>
                <p className="text-[9px] text-paper/40 mt-0.5 font-mono">Therapist daily utilization</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-ink p-6 flex flex-col justify-between min-h-[120px]">
              <span className="display text-3xl text-white font-bold">72%</span>
              <div>
                <h4 className="font-sans text-[10px] font-bold text-white uppercase tracking-wider font-mono">Accuracy</h4>
                <p className="text-[9px] text-paper/40 mt-0.5 font-mono">Average recovery metric gain</p>
              </div>
            </div>

          </div>

          {/* Premium Testimonial Column */}
          <div className="lg:col-span-3 flex flex-col justify-between solutions-cell text-left h-full">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-wider text-paper/40 block mb-6">/ Feedback</span>
              <p className="font-sans text-xs md:text-sm text-paper/85 leading-relaxed italic mb-8">
                "Rehai has transformed how I track patient progress. The acoustic logs are precise, the tasks keep patients motivated at home, and I get concrete diagnostics."
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-white/5 flex-shrink-0">
                <Image src="/rehai/doctor_priya.png" alt="Dr. Priya S." fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] font-bold text-white font-mono uppercase tracking-wider truncate">Dr. Priya S.</h4>
                <p className="text-[9px] text-paper/40 truncate">Senior Speech Therapist</p>
              </div>
            </div>
          </div>

        </div>

        {/* Brochure Download Banner (Minimal Border-only box) */}
        <div id="waitlist" className="border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 solutions-cell shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#00C9A7]/5 blur-[60px] pointer-events-none" />
          
          <div className="flex items-center gap-4 flex-1">
            <span className="font-mono text-[10px] text-[#00C9A7] font-bold mt-0.5">// WAITLIST</span>
            <div>
              <h3 className="font-sans font-bold text-sm text-white">Join the Rehai Waitlist</h3>
              <p className="font-sans text-[11px] text-paper/40 mt-0.5">Request clinician access or get enrollment details for your recovery center.</p>
            </div>
          </div>

          <form onSubmit={handleDownload} className="flex gap-2 w-full md:w-auto items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vocalist@clinical.org"
              required
              className="rounded-lg border border-white/10 bg-white/[0.01] px-4 py-2.5 text-[11px] text-white placeholder:text-paper/20 focus:border-[#00C9A7] focus:outline-none transition-all w-full md:w-56 font-mono"
            />
            <Magnetic strength={0.12} radius={60}>
              <button
                type="submit"
                className="rounded-lg bg-[#00C9A7] text-ink px-4 py-2.5 font-mono text-[9px] uppercase tracking-wider font-bold flex items-center gap-2 hover:opacity-90 transition-all flex-shrink-0"
              >
                <span>{downloaded ? "Joined ✓" : "Join Waitlist"}</span>
              </button>
            </Magnetic>
          </form>

        </div>

      </div>
    </section>
  );
}
