import Image from "next/image";

const focus = [
  ["01", "Place", "Build around the venues and neighbourhoods where local audiences already spend time."],
  ["02", "Moment", "Explore how timing and local context can make a campaign feel more relevant."],
  ["03", "Message", "Make the creative fit the screen, the space, and the people who use it."]
] as const;

export default function StringTheoryAdsHome() {
  return (
    <main id="top" className="string-theory-ads overflow-hidden bg-[#f7f8ff] text-[#081239]">
      <header className="sticky top-0 z-50 border-b border-[#0a1b55]/10 bg-[#f7f8ff]/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-5 md:px-10">
          <a href="#top" aria-label="String Theory Ads home" className="flex shrink-0 items-center gap-3">
            <Image src="/brand/string-theory-ads-mark.png" alt="" width={48} height={48} priority className="size-10 rounded-xl" />
            <span className="text-sm font-semibold tracking-[-0.04em] sm:text-base">String Theory <span className="text-[#3154ff]">Ads</span></span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
            <a className="text-xs text-[#081239]/65 transition hover:text-[#3154ff]" href="#idea">The idea</a>
            <a className="text-xs text-[#081239]/65 transition hover:text-[#3154ff]" href="#partners">For partners</a>
            <a className="text-xs text-[#081239]/65 transition hover:text-[#3154ff]" href="#team">Team</a>
            <a className="text-xs text-[#081239]/65 transition hover:text-[#3154ff]" href="#careers">Careers</a>
          </nav>
          <a href="#contact" className="inline-flex min-h-10 shrink-0 items-center rounded-full bg-[#1738de] px-4 text-xs font-semibold text-white transition hover:bg-[#08154d] sm:px-5">
            Talk to us <span className="ml-2" aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#07103a] text-white">
        <div aria-hidden="true" className="absolute -right-48 -top-56 -z-10 size-[42rem] rounded-full bg-[#2446ff]/50 blur-[100px]" />
        <div aria-hidden="true" className="absolute -bottom-64 left-1/3 -z-10 size-[38rem] rounded-full bg-[#8197ff]/25 blur-[110px]" />
        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-3xl">
            <p className="eyebrow text-[#a8b6ff]">A Rarestar Studio venture · Bengaluru, India</p>
            <h1 className="mt-7 text-[clamp(3.25rem,8.2vw,7.5rem)] font-semibold leading-[0.91] tracking-[-0.075em]">
              Local reach.<br />In context.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/75 md:text-xl">
              String Theory Ads is building a hyperlocal, context-aware digital out-of-home product for brands that want to connect with people in the places they already choose.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="mailto:hello@rarestar.studio?subject=String%20Theory%20Ads%20campaign" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#081239] transition hover:bg-[#aebaff]">
                Talk about a campaign <span className="ml-3" aria-hidden="true">↗</span>
              </a>
              <a href="#partners" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-6 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
                Partner with us <span className="ml-3" aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/65">
              <span className="size-1.5 rounded-full bg-[#9aabff]" /> In development · Bengaluru pilot planned
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:justify-self-end">
            <div aria-hidden="true" className="absolute inset-8 rounded-[2rem] bg-[#4562ff]/40 blur-3xl" />
            <Image
              src="/brand/string-theory-ads-wordmark.png"
              alt="String Theory Ads wordmark on the brand's blue gradient"
              width={1400}
              height={700}
              priority
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="relative h-auto w-full rounded-[2rem] shadow-[0_28px_100px_rgba(1,8,45,0.5)]"
            />
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">A new way to think about local media</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#0a1b55]/10 bg-white px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
          <p className="eyebrow text-[#3154ff]">01 / What we do</p>
          <div>
            <h2 className="max-w-4xl text-[clamp(2.7rem,6.4vw,5.75rem)] font-semibold leading-[0.96] tracking-[-0.065em]">
              Advertising shaped by where people are.
            </h2>
            <p className="mt-7 max-w-3xl text-base leading-relaxed text-[#081239]/65 md:text-lg">
              We&apos;re developing a local-first indoor screen network that brings brands, media planners, and venue partners into one conversation. The focus is simple: make place, timing, and creative part of the plan from the start.
            </p>
          </div>
        </div>
      </section>

      <section id="idea" className="scroll-mt-28 bg-[#f7f8ff] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
            <p className="eyebrow text-[#3154ff]">02 / The working idea</p>
            <div>
              <h2 className="max-w-4xl text-[clamp(2.6rem,6vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.065em]">Place. Moment. Message.</h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#081239]/60 md:text-lg">
                A useful local campaign begins with the setting. We&apos;re exploring how a screen, its surroundings, and the message can work together without losing sight of the people on the other side of it.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {focus.map(([number, title, description]) => (
              <article key={number} className="flex min-h-64 flex-col justify-between rounded-3xl border border-[#0a1b55]/10 bg-white p-6 md:min-h-72 md:p-8">
                <span className="font-mono text-xs text-[#3154ff]">{number} / 03</span>
                <div>
                  <span className="mb-4 block h-1.5 w-12 rounded-full bg-linear-to-r from-[#1836d8] to-[#94a5ff]" />
                  <h3 className="text-3xl font-semibold tracking-[-0.06em] md:text-4xl">{title}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#081239]/60 md:text-base">{description}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#081239]/35">A product direction in development</p>
        </div>
      </section>

      <section id="partners" className="scroll-mt-28 bg-[#0a1545] px-5 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
            <p className="eyebrow text-[#a8b6ff]">03 / Who we work with</p>
            <div>
              <h2 className="max-w-4xl text-[clamp(2.6rem,6vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.065em]">Better local media takes both sides.</h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
                String Theory Ads is still taking shape. We&apos;re speaking with people who want to help shape a thoughtful Bengaluru pilot.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <article className="flex min-h-72 flex-col rounded-3xl border border-white/15 bg-white/[0.04] p-7 md:p-9">
              <p className="eyebrow text-[#a8b6ff]">Brands &amp; media planners</p>
              <h3 className="mt-7 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.055em] md:text-4xl">Have a local audience in mind?</h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
                Tell us about the campaign, the neighbourhood, and the kind of experience you want to create. We&apos;ll explore whether an early pilot could fit.
              </p>
              <a href="mailto:hello@rarestar.studio?subject=String%20Theory%20Ads%20campaign" className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-white transition hover:text-[#a8b6ff]">
                Share a campaign brief <span aria-hidden="true">↗</span>
              </a>
            </article>
            <article className="flex min-h-72 flex-col rounded-3xl border border-white/15 bg-white/[0.04] p-7 md:p-9">
              <p className="eyebrow text-[#a8b6ff]">Venues &amp; screen partners</p>
              <h3 className="mt-7 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.055em] md:text-4xl">Run a space with a local community?</h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
                If you manage an indoor venue or display, tell us about the setting, the screens, and the people who come through.
              </p>
              <a href="mailto:hello@rarestar.studio?subject=String%20Theory%20Ads%20venue%20partnership" className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-white transition hover:text-[#a8b6ff]">
                Explore a partnership <span aria-hidden="true">↗</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="team" className="scroll-mt-28 border-b border-[#0a1b55]/10 bg-white px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
          <p className="eyebrow text-[#3154ff]">04 / The team</p>
          <div>
            <h2 className="max-w-4xl text-[clamp(2.7rem,6.4vw,5.75rem)] font-semibold leading-[0.96] tracking-[-0.065em]">A focused venture, close to the work.</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#081239]/60 md:text-lg">
              String Theory Ads is a venture built by Rarestar Studio in Bengaluru. The team is developing the product alongside the conversations that will shape its first local pilot.
            </p>
            <div className="mt-10 flex flex-col gap-5 border-t border-[#0a1b55]/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-[#081239]/40">Rarestar Studio · Bengaluru</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.06em] md:text-4xl">Manoj H V</h3>
                <p className="mt-1 text-sm text-[#081239]/60">Building String Theory at Rarestar.</p>
              </div>
              <a href="https://in.linkedin.com/in/manojhv" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1738de] hover:text-[#081239]">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="careers" className="scroll-mt-28 bg-[#eef0ff] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
          <p className="eyebrow text-[#3154ff]">05 / Careers</p>
          <div>
            <h2 className="max-w-4xl text-[clamp(2.7rem,6.4vw,5.75rem)] font-semibold leading-[0.96] tracking-[-0.065em]">Help shape what comes next.</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#081239]/65 md:text-lg">
              We&apos;re keen to meet thoughtful people interested in local media, partnerships, operations, product, design, and growth. Share a little about what you do and the work you want to help build.
            </p>
            <a href="mailto:hello@rarestar.studio?subject=Careers%20at%20String%20Theory%20Ads" className="mt-7 inline-flex items-center gap-2 border-b border-[#3154ff] pb-2 text-sm font-semibold text-[#081239] transition hover:text-[#3154ff]">
              Get in touch about careers <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 bg-linear-to-br from-[#09133f] via-[#1939dd] to-[#7c91ff] px-5 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-white/65">Campaigns · venues · collaborators</p>
            <h2 className="mt-5 max-w-4xl text-[clamp(2.8rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.07em]">Let&apos;s make local matter.</h2>
          </div>
          <a href="mailto:hello@rarestar.studio?subject=String%20Theory%20Ads%20enquiry" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#081239] transition hover:bg-[#dfe4ff]">
            hello@rarestar.studio <span className="ml-3" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer className="bg-[#07103a] px-5 py-12 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_auto_auto] lg:items-start">
          <div>
            <a href="#top" className="inline-flex items-center gap-3">
              <Image src="/brand/string-theory-ads-mark.png" alt="" width={40} height={40} className="size-8 rounded-lg" />
              <span className="text-sm font-semibold tracking-[-0.04em]">String Theory Ads</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">A local-first digital out-of-home product in development at Rarestar Studio.</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-col gap-3 text-sm text-white/65">
            <a href="#idea" className="hover:text-white">The idea</a>
            <a href="#partners" className="hover:text-white">Partners</a>
            <a href="#team" className="hover:text-white">Team</a>
            <a href="#careers" className="hover:text-white">Careers</a>
          </nav>
          <div className="flex flex-col gap-3 text-sm text-white/65">
            <a href="mailto:hello@rarestar.studio" className="hover:text-white">hello@rarestar.studio</a>
            <a href="https://rarestar.studio" className="hover:text-white">A venture by Rarestar Studio ↗</a>
            <p>Bengaluru, India</p>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-5 text-[10px] text-white/35 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Rarestar Creative Studio LLP</p>
          <p>String Theory Ads · Bengaluru</p>
        </div>
      </footer>
    </main>
  );
}
