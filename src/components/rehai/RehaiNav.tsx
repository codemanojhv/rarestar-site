"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";

const links = ["How It Works", "Technology", "For Therapists", "About Us"];

export default function RehaiNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/45 bg-[#fdfbf8]/72 backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-[1180px] items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Rehai home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#23aaa6]">
            <Image src="/rehai/logo.png" alt="" width={24} height={24} className="h-6 w-6 object-contain brightness-0 invert" />
          </span>
          <span className="text-[31px] font-semibold tracking-[0.02em] text-[#1c2235]">REHAI</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replaceAll(" ", "-")}`} className="text-[13px] font-medium text-[#1c2235]/80 transition-colors hover:text-[#23aaa6]">
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#login" className="hidden rounded-full border border-[#d9e5e4] bg-white/65 px-6 py-3 text-[13px] font-medium text-[#1c2235] shadow-[0_12px_35px_rgba(28,34,53,0.04)] md:inline-flex">
            Login
          </a>
          <a href="#waitlist" className="inline-flex items-center gap-2 rounded-full bg-[#23aaa6] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_16px_38px_rgba(35,170,166,0.22)] transition-transform hover:scale-[1.03]">
            Join Waitlist
            <ChevronRight size={16} strokeWidth={2.6} />
          </a>
        </div>
      </div>
    </header>
  );
}
