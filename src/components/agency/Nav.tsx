"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { scrollToId, getLenis } from "@/lib/lenisSingleton";
import Magnetic from "@/components/Magnetic";

const LINKS = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" }
];

/**
 * Unified top nav that morphs with scroll position + a full-screen mobile
 * menu overlay on small viewports (md: hides desktop links and shows a
 * hamburger instead).
 *
 * Skin states (desktop + mobile):
 *   - "over-hero":  transparent bg, no border.
 *   - "sticky":     frosted backdrop + hairline border.
 *                   Auto-hides on sustained down-scroll past AUTO_HIDE_AFTER.
 *
 * Mobile menu:
 *   - Hamburger → X morph button in the bar.
 *   - Full-screen ink overlay with large links, availability pill, email,
 *     and "Book a Call". Locks body scroll via Lenis.stop() while open.
 *   - Closes on link tap, Escape key, or CTA tap.
 */
const STICKY_AFTER = 80;
const AUTO_HIDE_AFTER = 600;
const DELTA_THRESHOLD = 6;
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/rarestar/intro";
const EMAIL = "hello@rarestar.studio";

type Visibility = "shown" | "hidden";
type Skin = "over-hero" | "sticky";

export default function Nav() {
  const [skin, setSkin] = useState<Skin>("over-hero");
  const [visibility, setVisibility] = useState<Visibility>("shown");
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Active-section tracking via IntersectionObserver.
  useEffect(() => {
    const ids = LINKS.map((l) => l.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        setActive(bestRatio > 0.25 ? bestId : null);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = (y: number) => {
      const delta = y - lastY.current;
      setSkin(y > STICKY_AFTER ? "sticky" : "over-hero");
      if (y < AUTO_HIDE_AFTER) {
        setVisibility("shown");
      } else if (Math.abs(delta) > DELTA_THRESHOLD) {
        setVisibility(delta > 0 ? "hidden" : "shown");
      }
      lastY.current = y;
    };

    let unbind: (() => void) | null = null;
    let rafId: number | null = null;

    const attach = () => {
      const lenis = getLenis();
      if (lenis) {
        const handler = (ev: { scroll: number }) => onScroll(ev.scroll);
        lenis.on("scroll", handler);
        unbind = () => lenis.off("scroll", handler);
      } else {
        const handler = () => onScroll(window.scrollY);
        window.addEventListener("scroll", handler, { passive: true });
        unbind = () => window.removeEventListener("scroll", handler);
      }
    };

    rafId = requestAnimationFrame(attach);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      unbind?.();
    };
  }, []);

  // Body-scroll lock while menu is open. Lenis.stop() halts the smooth
  // scroller cleanly; we also freeze the html element so the URL bar doesn't
  // jump on iOS when the overlay is open.
  useEffect(() => {
    if (!menuOpen) return;
    const lenis = getLenis();
    lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleNav = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    // Allow the overlay to begin closing before we start the smooth scroll
    // so the visitor sees motion begin, not finish.
    requestAnimationFrame(() => scrollToId(id));
  };

  const handleHome = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const l = getLenis();
    if (l) l.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // When menu is open force the sticky (opaque) skin so the bar reads
  // against the overlay. Also pin visibility shown.
  const effectiveSkin: Skin = menuOpen ? "sticky" : skin;
  const effectiveVisibility: Visibility = menuOpen ? "shown" : visibility;

  const wrapClass = [
    "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
    effectiveSkin === "sticky"
      ? "backdrop-blur-xl bg-ink/70 border-b border-paper/10"
      : "bg-transparent border-b border-transparent"
  ].join(" ");

  return (
    <>
      <header
        data-cursor-section="default"
        data-nav-entered={mounted ? "true" : "false"}
        className={[
          "nav-header fixed inset-x-0 top-0 z-[100]",
          effectiveVisibility === "shown" ? "translate-y-0" : "-translate-y-full"
        ].join(" ")}
      >
        <div className={wrapClass}>
          <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
            <a
              href="#top"
              onClick={handleHome}
              aria-label="RareStar home"
              className="group flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/85 transition-colors hover:text-paper md:text-[11px]"
            >
              <Image
                src="/brand/mark.png"
                alt="RareStar"
                width={22}
                height={22}
                priority
                className="h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 md:h-[22px] md:w-[22px]"
              />
              <span className="hidden sm:inline">RareStar</span>
              <span className="sm:hidden">RareStar</span>
            </a>

            <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70 md:flex">
              {LINKS.map((l) => {
                const isActive = active === l.id;
                return (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={handleNav(l.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "relative transition-colors",
                      isActive ? "text-paper" : "hover:text-paper"
                    ].join(" ")}
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={[
                        "pointer-events-none absolute -bottom-1.5 left-0 h-[1px] w-full origin-left bg-ember",
                        "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive ? "scale-x-100" : "scale-x-0"
                      ].join(" ")}
                    />
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 md:gap-4">
              {/* Desktop CTA — hidden on mobile, menu overlay carries it there */}
              <div className="hidden md:block">
                <Magnetic strength={0.3} radius={110}>
                  <a
                    href="#contact"
                    onClick={handleNav("contact")}
                    className="inline-block rounded-full border border-paper/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/90 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                  >
                    Start a Project
                  </a>
                </Magnetic>
              </div>

              {/* Mobile hamburger / close */}
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 transition-colors hover:border-paper/60 md:hidden"
              >
                <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
                <span
                  aria-hidden="true"
                  className={[
                    "absolute left-1/2 top-1/2 block h-[1.5px] w-5 -translate-x-1/2 bg-paper transition-all duration-300",
                    menuOpen ? "rotate-45" : "-translate-y-[5px]"
                  ].join(" ")}
                />
                <span
                  aria-hidden="true"
                  className={[
                    "absolute left-1/2 top-1/2 block h-[1.5px] w-5 -translate-x-1/2 bg-paper transition-all duration-300",
                    menuOpen ? "-rotate-45" : "translate-y-[5px]"
                  ].join(" ")}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MOBILE MENU OVERLAY ─────────────────────────────────────────── */}
      <MobileMenu
        open={menuOpen}
        active={active}
        onNav={handleNav}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

interface MobileMenuProps {
  open: boolean;
  active: string | null;
  onNav: (id: string) => (e: React.MouseEvent) => void;
  onClose: () => void;
}

function MobileMenu({ open, active, onNav, onClose }: MobileMenuProps) {
  return (
    <div
      aria-hidden={!open}
      className={[
        "fixed inset-0 z-[95] bg-ink/95 backdrop-blur-2xl md:hidden",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      ].join(" ")}
    >
      {/* The bar itself is z-100, so the overlay sits just below the close
          button while still covering the page content. */}
      <div className="flex h-full flex-col justify-between px-5 pb-10 pt-24">
        <nav className="flex flex-col">
          {LINKS.map((l, i) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={onNav(l.id)}
                aria-current={isActive ? "true" : undefined}
                style={{
                  transitionDelay: open ? `${80 + i * 50}ms` : "0ms"
                }}
                className={[
                  "display group flex items-baseline justify-between border-b border-paper/10 py-5",
                  "text-[clamp(2.25rem,10vw,3.5rem)] leading-[1] transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  isActive ? "text-ember" : "text-paper"
                ].join(" ")}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40">
                    0{i + 1}
                  </span>
                  <span>{l.label}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/40 transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            );
          })}
        </nav>

        <div
          className={[
            "mt-10 flex flex-col gap-6 transition-all duration-500",
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          ].join(" ")}
          style={{ transitionDelay: open ? "340ms" : "0ms" }}
        >
          <a
            href={`mailto:${EMAIL}`}
            onClick={onClose}
            className="font-sans text-xl text-paper underline decoration-paper/30 decoration-1 underline-offset-8"
          >
            {EMAIL}
          </a>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="#contact"
              onClick={onNav("contact")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/40 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Start a Project
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-90"
            >
              Book a Call ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
