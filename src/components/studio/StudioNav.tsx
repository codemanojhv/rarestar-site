import Image from "next/image";
import MobileNav from "@/components/MobileNav";

export default function StudioNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-paper/10 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-5 px-5 md:px-10">
        <a href="/" aria-label="Rarestar Studio home" className="flex shrink-0 items-center transition-opacity hover:opacity-80">
          <Image
            src="/brand/studio-lockup-paper.png"
            alt="Rarestar Studio"
            width={190}
            height={48}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          <a className="text-xs text-paper/65 transition hover:text-paper" href="/#story">The story</a>
          <a className="text-xs text-paper/65 transition hover:text-paper" href="/#studio">Studio</a>
          <a className="text-xs text-paper/65 transition hover:text-paper" href="/#venture">The venture</a>
          <a className="text-xs text-paper/65 transition hover:text-paper" href="/#team">Team</a>
          <a className="text-xs text-paper/65 transition hover:text-paper" href="/#careers">Careers</a>
        </nav>
        <div className="flex items-center gap-2">
          <a className="inline-flex min-h-10 shrink-0 items-center border border-paper/25 px-3 text-xs font-semibold text-paper transition hover:border-paper hover:bg-paper hover:text-ink sm:px-4" href="/#contact" data-enquiry="campaign">
            Discuss a pilot <span className="ml-2" aria-hidden="true">↗</span>
          </a>
          <MobileNav className="rs-mobile-menu lg:hidden" links={[["The story", "/#story"], ["Studio", "/#studio"], ["The venture", "/#venture"], ["Our approach", "/#process"], ["Team", "/#team"], ["Careers", "/#careers"], ["Contact", "/#contact"]]} />
        </div>
      </div>
    </header>
  );
}
