import Image from "next/image";

export default function StudioFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper/10 bg-ink px-5 py-14 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_auto_auto] md:items-start">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <Image
              src="/brand/studio-lockup-paper.png"
              alt="Rarestar Studio"
              width={230}
              height={58}
              className="h-10 w-auto"
            />
          </div>
          <p className="max-w-xs font-sans text-sm text-paper/50">
            An independent venture studio building String Theory Ads, a local-first indoor advertising product in development.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-3">
          <h3 className="eyebrow text-paper/40">Explore</h3>
          <a href="#string-theory" className="text-sm text-paper/70 hover:text-paper">String Theory Ads</a>
          <a href="#team" className="text-sm text-paper/70 hover:text-paper">Team</a>
          <a href="#careers" className="text-sm text-paper/70 hover:text-paper">Careers</a>
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="eyebrow text-paper/40">Connect</h3>
          <a href="mailto:hello@rarestar.studio" className="text-sm text-paper/70 hover:text-paper">hello@rarestar.studio</a>
          <a href="https://www.linkedin.com/company/rarestar-studio" target="_blank" rel="noopener noreferrer" className="text-sm text-paper/70 hover:text-paper">LinkedIn ↗</a>
          <p className="text-sm text-paper/45">Bengaluru, India</p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-paper/10 pt-6 text-left sm:flex-row sm:items-center sm:justify-between">
        <p className="eyebrow text-paper/30">© {year} Rarestar Creative Studio LLP</p>
        <p className="eyebrow text-paper/30">Bengaluru · India</p>
      </div>
    </footer>
  );
}
