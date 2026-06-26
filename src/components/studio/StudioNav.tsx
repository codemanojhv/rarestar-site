"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function StudioNav() {
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
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-paper/10 py-4" : "bg-transparent py-6"
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="/" className="flex items-center transition-opacity hover:opacity-80">
          <Image
            src="/brand/studio-lockup-paper.png"
            alt="Rarestar Studio"
            width={190}
            height={48}
            priority
            className="h-8 w-auto"
          />
        </a>

        <nav className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/60">
          <a
            href={process.env.NODE_ENV === "development" ? "/?site=agency" : "https://agency.rarestar.studio"}
            className="transition-colors hover:text-paper"
          >
            Agency
          </a>
          <a
            href={process.env.NODE_ENV === "development" ? "/?site=rehai" : "https://rehai.rarestar.studio"}
            className="transition-colors hover:text-paper"
          >
            Rehai
          </a>
        </nav>
      </div>
    </header>
  );
}
