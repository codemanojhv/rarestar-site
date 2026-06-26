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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-ink/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Logo and Brand */}
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Image src="/rehai/logo.png" alt="Rehai Logo" fill className="object-contain" />
          </div>
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-white">
            REHAI
          </span>
        </a>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="font-mono text-[10px] uppercase tracking-wider text-paper/50 hover:text-[#00C9A7] transition-colors">
            Method
          </a>
          <a href="#dual-audience" className="font-mono text-[10px] uppercase tracking-wider text-paper/50 hover:text-[#00C9A7] transition-colors">
            Features
          </a>
          <a href="#solutions" className="font-mono text-[10px] uppercase tracking-wider text-paper/50 hover:text-[#00C9A7] transition-colors">
            Solutions
          </a>
        </nav>

        {/* CTA Request Access */}
        <div>
          <Magnetic strength={0.1} radius={40}>
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-transparent px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-white hover:text-ink transition-all hover:bg-[#00C9A7] hover:border-[#00C9A7]"
            >
              <span>Access</span>
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
