"use client";

import Image from "next/image";
import { scrollToId } from "@/lib/lenisSingleton";

const EMAIL = "hello@rarestar.studio";
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/rarestar/intro";

const NAV_LINKS = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" }
];

const SOCIAL_LINKS = [
  { label: "Twitter / X", href: "https://twitter.com/rarestarstudio" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/rarestar-studio" },
  { label: "Dribbble", href: "https://dribbble.com/rarestar" }
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <footer className="relative border-t border-paper/10 bg-ink px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <Image
                src="/brand/agency-lockup-paper.png"
                alt="Rarestar Agency"
                width={220}
                height={55}
                className="h-10 w-auto"
              />
            </div>
            <p className="max-w-xs font-sans text-sm text-paper/50">
              Creative agency for brand systems, marketing websites, and headless commerce.
            </p>
          </div>

          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-3 font-sans text-lg text-paper underline decoration-paper/30 decoration-1 underline-offset-8 transition-all hover:decoration-paper md:text-xl"
          >
            <span>{EMAIL}</span>
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
              -&gt;
            </span>
          </a>
        </div>

        <div className="mt-12 grid gap-8 border-t border-paper/10 pt-12 md:grid-cols-3">
          <nav aria-label="Footer navigation">
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={handleNav(l.id)}
                    className="font-sans text-sm text-paper/60 transition-colors hover:text-paper"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40">
              Connect
            </h3>
            <ul className="flex flex-col gap-2">
              {SOCIAL_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-sm text-paper/60 transition-colors hover:text-paper"
                  >
                    <span>{l.label}</span>
                    <span className="text-[10px] text-paper/30">ext</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40">
              Availability
            </h3>
            <div className="flex items-center gap-2 text-sm text-paper/60">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
              </span>
              <span>Booking Q2 2026</span>
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60 transition-all hover:border-paper/50 hover:text-paper"
            >
              <span>Book a free call</span>
              <span className="text-paper/30">ext</span>
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/30">
            (c) {year} Rarestar Agency. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/30">
            Built with Next.js, Tailwind, and GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
