"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
        scrolled 
          ? "bg-ink/75 backdrop-blur-xl border-b border-white/5 py-3" 
          : "bg-ink/35 backdrop-blur-md border-b border-white/[0.03] py-4.5"
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        
        {/* Logo and Brand */}
        <a href="#top" className="flex items-center gap-2.5 group relative">
          <div className="relative w-6 h-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="/rehai/logo.png" 
              alt="Rehai Logo" 
              fill 
              className="object-contain transition-all duration-300 group-hover:brightness-125" 
            />
          </div>
          <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-white transition-colors duration-300 group-hover:text-[#00C9A7]">
            REHAI
          </span>
        </a>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-9">
          {["Method", "Features", "Solutions"].map((name, i) => {
            const hrefs = ["#how-it-works", "#dual-audience", "#solutions"];
            return (
              <a 
                key={i}
                href={hrefs[i]} 
                className="relative font-mono text-[9px] uppercase tracking-wider text-paper/40 hover:text-[#00C9A7] transition-colors duration-300 group py-1"
              >
                <span>{name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00C9A7] transition-all duration-300 group-hover:w-full" />
              </a>
            );
          })}
        </nav>

        {/* CTA Request Access */}
        <div>
          <Magnetic strength={0.1} radius={40}>
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-4.5 py-2 font-mono text-[9px] uppercase tracking-wider text-white transition-all duration-300 hover:text-ink hover:bg-[#00C9A7] hover:border-[#00C9A7] hover:shadow-[0_0_15px_rgba(0,201,167,0.3)]"
            >
              <span>Access</span>
              <svg className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </Magnetic>
        </div>
        
      </div>
    </header>
  );
}

