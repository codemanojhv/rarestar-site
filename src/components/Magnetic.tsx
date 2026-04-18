"use client";

import { useEffect, useRef } from "react";

/**
 * <Magnetic> — wraps any child element and pulls it gently toward the
 * cursor when the pointer is within `radius`. On leave we spring back to
 * (0,0). Uses GSAP quickTo for buttery 120fps transforms.
 *
 * Usage:
 *   <Magnetic strength={0.35}>
 *     <a className="btn ...">Start a Project</a>
 *   </Magnetic>
 *
 * Design intent: used on the highest-intent CTAs only (primary contact
 * button, email link). If you sprinkle it everywhere it loses the "alive"
 * quality and starts feeling gimmicky.
 *
 * Accessibility: respects `prefers-reduced-motion` by disabling the pull
 * entirely and rendering the child unwrapped visually.
 */
interface MagneticProps {
  children: React.ReactNode;
  /** How hard the child follows the cursor. 0.3–0.4 feels best. */
  strength?: number;
  /** Activation radius in px around the element's center. */
  radius?: number;
  /** Passthrough class on the wrapping span. */
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.35,
  radius = 140,
  className
}: MagneticProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // Lazy-load GSAP so this component never blocks SSR.
    let destroyed = false;
    let cleanup: (() => void) | null = null;

    import("gsap").then(({ gsap }) => {
      if (destroyed) return;
      const target = wrap.firstElementChild as HTMLElement | null;
      if (!target) return;

      const xTo = gsap.quickTo(target, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(target, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const rect = wrap.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > radius) {
          xTo(0);
          yTo(0);
          return;
        }
        xTo(dx * strength);
        yTo(dy * strength);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      window.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        wrap.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, [radius, strength]);

  return (
    <span ref={wrapRef} className={["inline-block", className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
