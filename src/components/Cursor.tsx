"use client";

import { useEffect, useRef } from "react";

/**
 * Section-aware custom cursor.
 *
 * Mode (section-level, via `data-cursor-section`):
 *   - "hero"    → white ring on dark hero video. Over
 *                 `[data-hover="reveal"]` the cursor hides entirely and
 *                 Hero.tsx renders its own ember disc reveal effect.
 *   - "default" → white ring (for dark ink/smoke sections).
 *   - "paper"   → dark ring (for light bg sections like Services).
 *
 * Scope (element-level, via `data-hover`):
 *   - "idle"        → baseline size.
 *   - "interactive" → scale up over links/buttons.
 *   - "text"        → scale up a touch more over text hover targets.
 *   - "reveal"      → hide entirely (hero owns this zone).
 *
 * Auto-disabled on touch + reduced-motion.
 */
type CursorMode = "hero" | "default" | "paper";
export default function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return;

    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      root.style.display = "none";
      return;
    }

    let cleanup: (() => void) | null = null;

    import("gsap").then(({ gsap }) => {
      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

      const dotX = gsap.quickTo(dot, "x", { duration: 0, ease: "none" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0, ease: "none" });
      const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

      let visible = false;
      let mode: CursorMode = "default";
      let scope: "idle" | "interactive" | "text" | "reveal" = "idle";

      const applyState = () => {
        if (scope === "reveal") {
          gsap.to([ring, dot], { opacity: 0, duration: 0.2 });
        } else if (visible) {
          gsap.to([ring, dot], { opacity: 1, duration: 0.2 });
        }
        root.dataset.mode = mode;
        root.dataset.scope = scope;
      };

      const onMove = (e: PointerEvent) => {
        if (!visible) {
          visible = true;
          if (scope !== "reveal") {
            gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
          }
        }
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);

        const t = e.target as Element | null;

        const sectionEl = t?.closest<HTMLElement>("[data-cursor-section]");
        const nextMode: CursorMode =
          (sectionEl?.dataset.cursorSection as CursorMode | undefined) ??
          "default";

        // scope precedence: reveal > text > interactive > idle
        let nextScope: typeof scope = "idle";
        if (t?.closest("[data-hover='reveal']")) nextScope = "reveal";
        else if (t?.closest("[data-hover='text']")) nextScope = "text";
        else if (
          t?.closest(
            "a, button, [role='button'], input, textarea, select, [data-hover]"
          )
        )
          nextScope = "interactive";

        if (nextMode !== mode || nextScope !== scope) {
          mode = nextMode;
          scope = nextScope;
          applyState();
        }
      };

      const onLeave = () => {
        gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
        visible = false;
      };

      const onDown = () =>
        gsap.to(ring, { scale: 0.75, duration: 0.18, ease: "power3.out" });
      const onUp = () =>
        gsap.to(ring, { scale: 1, duration: 0.25, ease: "power3.out" });

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerleave", onLeave);
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);

      applyState();

      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
      };
    });

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-cursor-root
      data-mode="default"
      data-scope="idle"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] hidden md:block"
    >
      <div
        ref={ringRef}
        data-cursor-ring
        className="fixed left-0 top-0 rounded-full"
        style={{ willChange: "transform, opacity" }}
      />
      <div
        ref={dotRef}
        data-cursor-dot
        className="fixed left-0 top-0 h-[5px] w-[5px] rounded-full"
        style={{ willChange: "transform, opacity" }}
      />
    </div>
  );
}
