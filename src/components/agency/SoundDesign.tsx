"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * SoundDesign — sound toggle + lightweight UI feedback sounds.
 *
 * The main ambient audio is the breeze from the hero video itself
 * (handled by HeroVideo via the rarestar:sound event).
 *
 * This component provides:
 *   - A toggle button (fixed bottom-right) that broadcasts state
 *   - Hover tick: Short sine burst on links/buttons
 *   - Menu whoosh: Filtered noise sweep on menu open
 */

/* ── Audio engine (module-level singletons) ────────────────────────── */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;

function ensureCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === "suspended") void audioCtx.resume();
  return { ctx: audioCtx, master: masterGain! };
}

function playTick() {
  if (!audioCtx || !masterGain) return;
  const { ctx, master } = ensureCtx();

  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 1600;

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.08, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(g);
  g.connect(master);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
}

function playWhoosh() {
  if (!audioCtx || !masterGain) return;
  const { ctx, master } = ensureCtx();

  const len = ctx.sampleRate * 0.4;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.5;

  const src = ctx.createBufferSource();
  src.buffer = buf;

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 2;
  bp.frequency.setValueAtTime(80, ctx.currentTime);
  bp.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15);
  bp.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.4);

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.12, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

  src.connect(bp);
  bp.connect(g);
  g.connect(master);

  src.start(ctx.currentTime);
  src.stop(ctx.currentTime + 0.45);
}

/* ── React component ───────────────────────────────────────────────── */

export default function SoundDesign() {
  const [on, setOn] = useState(false);
  const onRef = useRef(false);

  useEffect(() => {
    onRef.current = on;
  }, [on]);

  /* Toggle handler */
  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = !prev;

      // Lazy-init audio context on first enable
      if (next) ensureCtx();

      // Broadcast state so HeroVideo can unmute/mute the breeze audio
      window.dispatchEvent(
        new CustomEvent("rarestar:sound", { detail: { enabled: next } })
      );

      return next;
    });
  }, []);

  /* Hover tick on interactive elements */
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (!onRef.current) return;
      const t = e.target as Element | null;
      if (t?.closest("a, button, [role='button'], [data-hover-sound]")) {
        playTick();
      }
    };
    document.addEventListener("pointerover", handler, { passive: true });
    return () => document.removeEventListener("pointerover", handler);
  }, []);

  /* Bass whoosh when the mobile-menu overlay opens */
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      if (!onRef.current) return;
      for (const m of mutations) {
        if (m.type !== "attributes") continue;
        const el = m.target as Element;
        if (
          (m.attributeName === "aria-expanded" && el.getAttribute("aria-expanded") === "true") ||
          (m.attributeName === "aria-hidden" && el.getAttribute("aria-hidden") === "false")
        ) {
          playWhoosh();
          break;
        }
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["aria-expanded", "aria-hidden"],
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={on ? "Mute ambient sound" : "Enable ambient sound"}
      title={on ? "Sound on — click to mute" : "Sound off — click to enable"}
      className="fixed bottom-6 right-6 z-[150] flex h-10 w-10 items-center justify-center
                 rounded-full border border-paper/20 bg-ink/80 backdrop-blur-md
                 transition-all duration-300 hover:border-paper/40 hover:bg-ink/90
                 hover:scale-110 active:scale-95"
    >
      {on ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-paper/80"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-paper/40"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
