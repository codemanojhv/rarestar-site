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
        gsap.from(".solutions-animate", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
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
          <div className="lg:col-span-4 flex flex-col items-start solutions-animate">
            <span className="font-mono text-xs font-semibold tracking-[0.3em] text-[#8bee0f] uppercase block mb-4">
              ✦ Solutions That Matter
            </span>
            <h2 className="display text-3xl md:text-4xl tracking-tight text-white mb-6 leading-tight">
              Comprehensive<br />rehabilitation<br />
              <span className="text-[#8bee0f]">for real-world recovery.</span>
            </h2>
            <p className="font-sans text-paper/70 text-sm md:text-base leading-relaxed mb-8 max-w-xs">
              Rehai addresses speech and cognitive challenges through evidence-based exercises and intelligent progression.
            </p>

            <Magnetic strength={0.15} radius={70}>
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3.5 font-sans text-xs font-semibold text-white hover:border-[#8bee0f] hover:text-[#8bee0f] transition-all"
              >
                <span>Explore All Solutions</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </Magnetic>
          </div>

          {/* Column B: The Two Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 solutions-animate">
            
            {/* Card 1: Speech Rehab */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8bee0f] mb-6">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="font-sans font-bold text-base text-white mb-2">Speech Rehabilitation</h3>
                <p className="font-sans text-[11px] text-paper/50 leading-relaxed mb-6">
                  Target speech, language, and communication skills affected by neurological conditions.
                </p>
                <ul className="space-y-2 mb-8">
                  {["Naming & Word Retrieval", "Repetition & Articulation", "Fluency & Rhythm", "Comprehension"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[10px] text-paper/80 font-sans">
                      <span className="w-1 h-1 rounded-full bg-[#8bee0f]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#waitlist" className="text-[10px] font-mono uppercase tracking-wider text-[#8bee0f] hover:underline flex items-center gap-1">
                <span>Learn more</span>
                <span>→</span>
              </a>
            </div>

            {/* Card 2: Cognitive Rehab */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00C9A7] mb-6">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-sans font-bold text-base text-white mb-2">Cognitive Rehabilitation</h3>
                <p className="font-sans text-[11px] text-paper/50 leading-relaxed mb-6">
                  Strengthen memory, attention, processing, and executive functions.
                </p>
                <ul className="space-y-2 mb-8">
                  {["Memory Training", "Attention & Focus", "Problem Solving", "Executive Functions"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[10px] text-paper/80 font-sans">
                      <span className="w-1 h-1 rounded-full bg-[#00C9A7]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#waitlist" className="text-[10px] font-mono uppercase tracking-wider text-[#00C9A7] hover:underline flex items-center gap-1">
                <span>Learn more</span>
                <span>→</span>
              </a>
            </div>

          </div>

          {/* Column C: Visual Photo Overlay */}
          <div className="lg:col-span-3 w-full aspect-[1.3] lg:aspect-[0.75] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl solutions-animate">
            <Image src="/rehai/therapy_session.png" alt="Rehai clinical session" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Clinically Informed badge overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#0c0c0e]/90 border border-white/10 rounded-xl p-4 backdrop-blur-md">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#8bee0f]/15 border border-[#8bee0f]/30 flex items-center justify-center text-[#8bee0f] flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Clinically Informed</h4>
                  <p className="text-[10px] text-paper/40 mt-1 leading-relaxed">Built with therapists. Backed by science.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Middle Part: Impact Stats & Testimonial */}
        <div className="border-t border-white/5 pt-32 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Brain Graphic Column */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left solutions-animate">
            <span className="font-mono text-xs font-semibold tracking-[0.3em] text-[#00C9A7] uppercase block mb-4">
              ✦ Making An Impact
            </span>
            <h2 className="display text-3xl md:text-4xl tracking-tight text-white mb-6 leading-tight">
              Real progress.<br />
              <span className="text-[#8bee0f]">Real outcomes.</span>
            </h2>
            <p className="font-sans text-paper/70 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
              Rehai empowers therapists to deliver better care and helps patients achieve meaningful recovery.
            </p>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5 bg-white/5 max-w-xs">
              <Image src="/rehai/neural_brain.png" alt="Rehai Brain Neural Network" fill className="object-cover animate-pulse" />
              <div className="absolute inset-0 bg-[#00C9A7]/5 blur-lg mix-blend-screen" />
            </div>
          </div>

          {/* Stats Grid Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-x-8 gap-y-12 border-l border-white/5 pl-0 lg:pl-10 solutions-animate">
            
            {/* Stat 1 */}
            <div>
              <div className="display text-4xl md:text-5xl text-white mb-2">10,000+</div>
              <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Patients Supported</h4>
              <p className="text-[10px] text-paper/40 mt-1 leading-relaxed">Across stroke, aphasia, TBI & other conditions.</p>
            </div>

            {/* Stat 2 */}
            <div>
              <div className="display text-4xl md:text-5xl text-[#8bee0f] mb-2">250+</div>
              <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Therapists & Clinics</h4>
              <p className="text-[10px] text-paper/40 mt-1 leading-relaxed">Trust Rehai for better patient outcomes.</p>
            </div>

            {/* Stat 3 */}
            <div>
              <div className="display text-4xl md:text-5xl text-white mb-2">85%</div>
              <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Therapist Satisfaction</h4>
              <p className="text-[10px] text-paper/40 mt-1 leading-relaxed">Reported improved efficiency and insights.</p>
            </div>

            {/* Stat 4 */}
            <div>
              <div className="display text-4xl md:text-5xl text-[#00C9A7] mb-2">72%</div>
              <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Patients Show Progress</h4>
              <p className="text-[10px] text-paper/40 mt-1 leading-relaxed">Average improvement in key metrics*.</p>
            </div>

            <span className="col-span-2 text-[9px] text-paper/30 italic">
              *Based on pilot programs and early clinical data
            </span>
          </div>

          {/* Testimonial Column */}
          <div className="lg:col-span-3 bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-full hover:bg-white/10 transition-all solutions-animate">
            <div>
              {/* Green Quotes SVG */}
              <svg className="w-8 h-8 text-[#8bee0f] opacity-80 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.748-9.762 9-10.961l.696 1.28c-4.004 1.135-6.693 3.655-6.693 7.827h6.693V21H14.017zm-11 0v-7.391c0-5.704 3.748-9.762 9-10.961l.696 1.28C7.709 5.164 5.02 7.684 5.02 11.856h6.693V21H3.017z" />
              </svg>
              <p className="font-sans text-sm text-paper/90 leading-relaxed italic mb-8">
                "Rehai has transformed how I deliver therapy. The insights are accurate, the exercises are engaging, and my patients are improving consistently."
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/10">
                <Image src="/rehai/doctor_priya.png" alt="Dr. Priya S." fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Dr. Priya S.</h4>
                <p className="text-[10px] text-paper/40 mt-0.5">Senior Speech Therapist<br />Bengaluru</p>
              </div>
            </div>
          </div>

        </div>

        {/* Brochure Download Card Banner */}
        <div id="waitlist" className="bg-[#0c0c0e]/90 border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 solutions-animate shadow-2xl">
          
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8bee0f]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-sans font-bold text-lg text-white">Want to know more?</h3>
              <p className="font-sans text-sm text-paper/50 mt-1">Download our overview brochure for clinical details and features.</p>
            </div>
          </div>

          <form onSubmit={handleDownload} className="flex gap-3 w-full md:w-auto items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="rounded-full border border-white/20 bg-transparent px-5 py-3.5 text-xs text-white placeholder:text-paper/30 focus:border-[#8bee0f] focus:outline-none transition-all w-full md:w-64"
            />
            <Magnetic strength={0.2} radius={80}>
              <button
                type="submit"
                className="rounded-full bg-[#8bee0f] text-black px-6 py-3.5 font-sans text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-all flex-shrink-0"
              >
                <span>{downloaded ? "Sent ✓" : "Download Brochure"}</span>
                {!downloaded && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                )}
              </button>
            </Magnetic>
          </form>

        </div>

      </div>
    </section>
  );
}
