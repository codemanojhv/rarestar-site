import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-paper/10 bg-ink px-6 py-10 md:px-10 md:py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/60">
          <Image
            src="/brand/mark.png"
            alt="Rarestar"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          <span>Rarestar / Creative Studio</span>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/40">
          © {year} Rarestar. Built in Next.js · treated with GSAP + WebGL.
        </div>
      </div>
    </footer>
  );
}
