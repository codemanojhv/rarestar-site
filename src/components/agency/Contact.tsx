"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Magnetic from "@/components/Magnetic";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Calendly (or equivalent scheduler) URL for the "Book a Call" button.
 * Swap to Cal.com / Savvycal / Notion Calendar without changing markup. Set
 * NEXT_PUBLIC_CALENDLY_URL in env to override per-environment.
 */
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/rarestar/intro";
const EMAIL = "hello@rarestar.studio";

/**
 * The conversion surface. Rebuilt as TWO deliberately separated layers:
 *
 *   Layer 1 — Direct line.
 *     The big headline, the big email CTA, and a "Book a Call" button. This
 *     is the executive surface: visitors who already know they want to talk
 *     get the absolute shortest path. Zero form friction.
 *
 *   [ dotted divider with a small "Or write us the brief" caption ]
 *
 *   Layer 2 — The brief.
 *     The inline form for visitors who'd rather tee up details first. Lives
 *     in its own card with generous top spacing so it never feels like it's
 *     competing with the email. Three fields + project type.
 *
 * The separation is the point — the previous stacked-grid version made the
 * form feel like the only way in. Now the email + Calendly are the hero of
 * the section and the form is the alternative.
 */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ctx: { revert: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, mod]) => {
      gsap.registerPlugin(mod.ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll("[data-contact]"),
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 78%" }
          }
        );
      }, el);
    });

    return () => ctx?.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      project: String(fd.get("project") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? "") // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(humanError(json.error ?? "unknown"));
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network hiccup. Try again or email us directly.");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden border-t border-paper/10 bg-ink px-6 py-32 md:px-10 md:py-48"
    >
      {/* Giant brand signature — sits behind the content, low opacity,
          only on md+ so mobile stays clean. Decorative, aria-hidden. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[14%] -right-[8%] hidden md:block"
        data-contact
      >
        <Image
          src="/brand/mark-large.png"
          alt=""
          width={900}
          height={900}
          className="h-[70vh] w-auto max-w-none opacity-[0.06]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ─── LAYER 1 · Direct line ───────────────────────────────────── */}

        <div data-contact className="eyebrow mb-10 flex items-center gap-3">
          <span className="inline-block h-1 w-1 rounded-full bg-ember" />
          <span>§06 · Contact</span>
        </div>

        <h2
          data-contact
          className="display text-paper text-[14vw] leading-[0.9] md:text-[10vw]"
        >
          Start a
          <br />
          <span className="accent-italic">project with us</span>
        </h2>

        <div
          data-contact
          className="mt-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          {/* Big email — restored from the earlier version you liked. Full-
              size display link with arrow. This is the absolute shortest
              path for visitors who already know they want to reach out. */}
          <Magnetic strength={0.18} radius={220}>
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-4 font-sans text-2xl text-paper md:text-4xl"
            >
              <span className="underline decoration-paper/30 decoration-1 underline-offset-8 transition-all group-hover:decoration-paper group-hover:decoration-2">
                {EMAIL}
              </span>
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </a>
          </Magnetic>

          {/* Book-a-call CTA. Opens the scheduler in a new tab. Ember-filled
              so the visual weight matches the big email on the left. */}
          <Magnetic strength={0.3} radius={140}>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-ember px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-90"
            >
              <CalendarIcon />
              <span>Book a 20-min call</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
          </Magnetic>
        </div>

        <div
          data-contact
          className="mt-12 flex flex-col gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/60 md:flex-row md:items-center md:gap-8"
        >
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>Booking · Q2 2026</span>
          </div>
          <span className="hidden h-px w-8 bg-paper/20 md:block" />
          <span className="text-paper/40">Typical reply &lt; 24 hrs on weekdays</span>
        </div>

        {/* ─── Divider ────────────────────────────────────────────────────
            Deliberately huge top padding so the form feels like its own
            zone. A thin dotted rule + a one-word label creates a clear
            "or…" break without extra chrome. */}
        <div
          data-contact
          className="relative mt-32 flex items-center gap-6 md:mt-44"
        >
          <span className="dotted flex-1" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">
            Or send the full brief
          </span>
          <span className="dotted flex-1" aria-hidden="true" />
        </div>

        {/* ─── LAYER 2 · The brief (form) ─────────────────────────────── */}

        <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-[1fr,1.3fr] md:gap-16 md:items-start">
          <div data-contact className="max-w-sm">
            <h3 className="display text-paper text-[8vw] leading-[1] md:text-[2.4vw]">
              Drop us the brief.
            </h3>
            <p className="mt-6 font-sans text-base text-paper/70">
              We take a handful of projects per quarter so each engagement
              gets our full bandwidth. The more you share, the faster we can
              tell you if it&rsquo;s a fit.
            </p>
            <ul className="mt-8 space-y-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50">
              <li className="flex items-start gap-3">
                <span className="mt-[7px] inline-block h-px w-3 bg-ember" />
                <span>Timeline &amp; launch target</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[7px] inline-block h-px w-3 bg-ember" />
                <span>Budget ballpark (ranges are fine)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-[7px] inline-block h-px w-3 bg-ember" />
                <span>What &ldquo;good&rdquo; looks like to you</span>
              </li>
            </ul>
          </div>

          <form
            data-contact
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6 rounded-2xl border border-paper/10 bg-paper/[0.02] p-6 backdrop-blur-sm md:p-10"
          >
            {/* Honeypot — visually hidden, bots fill it, humans don't. */}
            <label
              className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
              aria-hidden="true"
            >
              Company
              <input type="text" name="company" tabIndex={-1} autoComplete="off" />
            </label>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Name" name="name" type="text" required placeholder="Your name" />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60">
                Project type
              </label>
              <select
                name="project"
                defaultValue=""
                className="appearance-none rounded-lg border border-paper/15 bg-ink/40 px-4 py-3 font-sans text-sm text-paper transition-colors focus:border-ember focus:outline-none"
              >
                <option value="" className="bg-ink text-paper">
                  Pick one (optional)
                </option>
                <option value="brand" className="bg-ink text-paper">
                  Brand identity
                </option>
                <option value="website" className="bg-ink text-paper">
                  Website / CMS
                </option>
                <option value="commerce" className="bg-ink text-paper">
                  Headless commerce
                </option>
                <option value="motion" className="bg-ink text-paper">
                  Motion or video
                </option>
                <option value="other" className="bg-ink text-paper">
                  Something else
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60">
                Tell us about it
              </label>
              <textarea
                name="message"
                required
                rows={5}
                minLength={10}
                placeholder="Timeline, budget range, what good looks like..."
                className="resize-none rounded-lg border border-paper/15 bg-ink/40 px-4 py-3 font-sans text-sm text-paper placeholder:text-paper/30 transition-colors focus:border-ember focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-4 border-t border-paper/10 pt-6 md:flex-row md:items-center md:justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40">
                {status === "success"
                  ? "✓ Got it. Talk soon."
                  : status === "error"
                    ? errorMsg
                    : "We review every brief within 24 hrs and reply with a scope estimate."}
              </p>

              <Magnetic strength={0.3} radius={120}>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {status === "submitting"
                    ? "Sending…"
                    : status === "success"
                      ? "Sent"
                      : "Send the brief"}
                  <span aria-hidden="true">→</span>
                </button>
              </Magnetic>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}

function Field({ label, name, type, required, placeholder }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60">
        {label}
        {required ? <span className="ml-1 text-ember">*</span> : null}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="rounded-lg border border-paper/15 bg-ink/40 px-4 py-3 font-sans text-sm text-paper placeholder:text-paper/30 transition-colors focus:border-ember focus:outline-none"
      />
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function humanError(code: string): string {
  switch (code) {
    case "name_required":
      return "Please add your name.";
    case "email_invalid":
      return "That email looks off — mind double-checking?";
    case "message_too_short":
      return "A little more context would help — 10+ chars.";
    default:
      return "Something broke on our end. Try again or email us.";
  }
}
