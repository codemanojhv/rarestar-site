import type Lenis from "lenis";

// Module-level singleton so any component can call scrollTo without
// re-initialising Lenis. Set by <SmoothScroll /> after dynamic import.
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}

export function scrollToId(id: string, offset = -80) {
  const target = document.getElementById(id);
  if (!target) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
