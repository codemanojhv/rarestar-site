"use client";

const stack = [
  "Next.js",
  "Sanity",
  "Shopify",
  "GSAP",
  "Three.js",
  "Tailwind",
  "Vercel",
  "Framer Motion",
  "TypeScript",
  "Figma"
];

export default function StackMarquee() {
  const items = [...stack, ...stack];
  return (
    <section className="relative overflow-hidden border-y border-paper/10 bg-ink py-10">
      <div className="marquee-track">
        {items.map((s, i) => (
          <span
            key={i}
            className="display flex items-center gap-10 px-10 text-[8vw] leading-[1] text-paper md:text-[5vw]"
          >
            {/* Alternate outlined / solid labels so the marquee has rhythm
                without every word being outlined. Keeps outline-type feeling
                precious (only used here + hero line 2). */}
            <span className={i % 2 === 0 ? "outline-type" : ""}>{s}</span>
            <span className="inline-block h-2 w-2 rounded-full bg-ember" />
          </span>
        ))}
      </div>
    </section>
  );
}
