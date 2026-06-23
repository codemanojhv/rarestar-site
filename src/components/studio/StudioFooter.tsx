import Image from "next/image";

export default function StudioFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper/10 bg-ink px-5 py-16 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image src="/brand/mark.png" alt="Rarestar" width={20} height={20} />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/90">
              Rarestar Studio
            </span>
          </div>
          <p className="max-w-xs font-sans text-sm text-paper/50">
            A product studio building meaningful software and AI solutions.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:gap-24">
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40">
              Ventures
            </h3>
            <a
              href={process.env.NODE_ENV === "development" ? "/?site=agency" : "https://agency.rarestar.studio"}
              className="font-sans text-sm text-paper/70 hover:text-paper"
            >
              Rarestar Agency
            </a>
            <a
              href={process.env.NODE_ENV === "development" ? "/?site=rehai" : "https://rehai.rarestar.studio"}
              className="font-sans text-sm text-paper/70 hover:text-paper"
            >
              Rehai Platform
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40">
              Connect
            </h3>
            <a
              href="mailto:hello@rarestar.studio"
              className="font-sans text-sm text-paper/70 hover:text-paper"
            >
              hello@rarestar.studio
            </a>
            <a
              href="https://twitter.com/rarestarstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-paper/70 hover:text-paper"
            >
              Twitter / X
            </a>
            <a
              href="https://www.linkedin.com/company/rarestar-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-paper/70 hover:text-paper"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-paper/10 pt-8 text-center md:text-left">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/30">
          © {year} Rarestar Creative Studio LLP. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
