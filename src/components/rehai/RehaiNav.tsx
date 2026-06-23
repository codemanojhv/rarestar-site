"use client";

import { useEffect, useState } from "react";
import Magnetic from "@/components/Magnetic";

export default function RehaiNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-ink/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Logo and Brand */}
        <a href="#top" className="flex items-center gap-3 group">
          {/* Custom double-lobe Rehai Logo */}
          <div className="relative flex items-center justify-center">
            <svg className="w-8 h-8 text-[#8bee0f] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 32 32" fill="currentColor">
              <path d="M12.5 6C8.91 6 6 8.91 6 12.5c0 2.82 1.8 5.21 4.3 6.1.5.18.7.67.7 1.18v2.72c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5v-2.72c0-.51.2-.99.7-1.18 2.5-.89 4.3-3.28 4.3-6.1C26 8.91 23.09 6 19.5 6c-2.36 0-4.4 1.27-5.5 3.16C12.9 7.27 10.86 6 12.5 6z" />
            </svg>
            <div className="absolute inset-0 bg-[#8bee0f]/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className="font-sans font-black text-xl tracking-[0.08em] text-white">
            REHAI
          </span>
        </a>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-1 text-sm font-medium text-paper/70 hover:text-[#8bee0f] cursor-pointer transition-colors">
            <span>Platform</span>
            <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="flex items-center gap-1 text-sm font-medium text-paper/70 hover:text-[#8bee0f] cursor-pointer transition-colors">
            <span>Solutions</span>
            <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <a href="#dual-audience" className="text-sm font-medium text-paper/70 hover:text-[#8bee0f] transition-colors">
            For Therapists
          </a>

          <div className="flex items-center gap-1 text-sm font-medium text-paper/70 hover:text-[#8bee0f] cursor-pointer transition-colors">
            <span>Resources</span>
            <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <a href="#solutions" className="text-sm font-medium text-paper/70 hover:text-[#8bee0f] transition-colors">
            About Us
          </a>
        </nav>

        {/* CTA Request Access */}
        <div className="flex items-center">
          <Magnetic strength={0.1} radius={40}>
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-2 rounded-full border border-[#8bee0f]/40 bg-transparent px-5 py-2 font-sans text-xs font-semibold text-paper hover:text-ink transition-all hover:bg-[#8bee0f] hover:border-[#8bee0f]"
            >
              <span>Request Access</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
