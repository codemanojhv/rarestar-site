import Image from "next/image";

const principles = [
  ["01", "Place", "Start with the spaces and communities where local audiences gather."],
  ["02", "Moment", "Treat context and timing as part of the media plan."],
  ["03", "Message", "Shape creative to fit the setting, not just fill a screen."]
] as const;

export default function StudioHome() {
  return (
    <main className="overflow-hidden bg-ink text-paper">
      <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden border-b border-paper/10">
        <Image src="/hero-poster.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/70 to-ink/15" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/20" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 pb-16 pt-36 md:grid-cols-[1fr_auto] md:items-end md:px-10 md:pb-24">
          <div className="max-w-4xl rise-in">
            <p className="eyebrow text-ember">Independent venture studio · Bengaluru, India</p>
            <h1 className="display mt-7 text-[clamp(3.4rem,11vw,8.5rem)] leading-[0.88]">
              Attention,<br />
              <span className="accent-italic">in context.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-paper/75 md:text-xl">
              We&apos;re building String Theory, a hyperlocal indoor digital out-of-home network designed to bring brands closer to local audiences and the moments that matter.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#string-theory" className="inline-flex min-h-12 items-center gap-3 bg-ember px-5 text-sm font-semibold text-paper transition hover:bg-paper hover:text-ink">
                Explore String Theory <span aria-hidden="true">↘</span>
              </a>
              <a href="mailto:hello@rarestar.studio?subject=String%20Theory%20campaign" className="inline-flex min-h-12 items-center border border-paper/30 px-5 text-sm font-semibold text-paper transition hover:border-paper hover:bg-paper/10">
                Talk about a campaign <span className="ml-3" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <p className="eyebrow hidden border-l border-paper/40 pl-4 text-paper/70 md:block">
            In development<br />Bengaluru pilot planned
          </p>
        </div>
      </section>

      <section id="studio" className="scroll-mt-24 border-b border-paper/10 px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <p className="eyebrow text-ember">01 / The studio</p>
          <div>
            <h2 className="display max-w-4xl text-[clamp(2.6rem,6.4vw,6rem)] leading-[0.96]">
              Independent studio.<br />One focused venture.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-paper/65 md:text-lg">
              Rarestar is an independent venture studio based in Bengaluru. We build String Theory around a simple idea: a brand message can be more useful when it fits the place and the moment in which people see it.
            </p>
          </div>
        </div>
      </section>

      <section id="string-theory" className="scroll-mt-24 bg-bone px-5 py-24 text-ink md:px-10 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-24">
          <div>
            <p className="eyebrow text-ember">02 / What we&apos;re building</p>
            <h2 className="display mt-6 text-[clamp(3.5rem,9vw,8rem)] leading-[0.86]">String<br />Theory</h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70 md:text-xl">
              A hyperlocal, context-aware indoor DOOH network in development. The ambition is to connect brands with nearby audiences through digital screens in the places they already visit.
            </p>
            <p className="eyebrow mt-8 inline-flex border border-ink/20 px-3 py-2 text-ink/65">
              In development · Bengaluru pilot planned
            </p>
          </div>

          <div className="bg-ink p-5 text-paper md:p-8" role="img" aria-label="String Theory's working idea: place, moment, message">
            <p className="eyebrow text-paper/45">The working idea</p>
            <div className="mt-7 grid grid-cols-3 gap-px border border-paper/15 bg-paper/15">
              {principles.map(([number, title, description]) => (
                <div key={number} className="flex min-h-40 flex-col justify-between bg-ink p-3 md:min-h-56 md:p-5">
                  <span className="font-mono text-xs text-ember">{number}</span>
                  <div>
                    <span className="mb-4 block h-3 w-3 rounded-full bg-ember" />
                    <h3 className="display text-base md:text-3xl">{title}</h3>
                    <p className="mt-3 hidden text-xs leading-relaxed text-paper/55 sm:block">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/40">Place → moment → message</p>
          </div>
        </div>
      </section>

      <section id="partners" className="scroll-mt-24 px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <p className="eyebrow text-ember">03 / Who we work with</p>
            <div>
              <h2 className="display max-w-4xl text-[clamp(2.6rem,6.4vw,6rem)] leading-[0.96]">
                Bringing brands and spaces into the same conversation.
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-paper/60 md:text-lg">
                String Theory is taking shape. We&apos;re interested in hearing from people who want to explore what a local-first indoor media pilot could look like.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <article className="flex min-h-72 flex-col border border-paper/15 p-7 md:p-9">
              <p className="eyebrow text-ember">For brands &amp; media planners</p>
              <h3 className="display mt-8 text-3xl md:text-4xl">Planning a local campaign?</h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper/60 md:text-base">
                Tell us the audience, neighbourhood, and experience you have in mind. We&apos;ll talk through whether String Theory could be a fit.
              </p>
              <a className="mt-auto inline-flex items-center gap-3 pt-8 text-sm font-semibold text-paper hover:text-ember" href="mailto:hello@rarestar.studio?subject=String%20Theory%20campaign">
                Discuss a campaign <span aria-hidden="true">↗</span>
              </a>
            </article>

            <article className="flex min-h-72 flex-col border border-paper/15 p-7 md:p-9">
              <p className="eyebrow text-ember">For venues &amp; screen partners</p>
              <h3 className="display mt-8 text-3xl md:text-4xl">Have a space people return to?</h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper/60 md:text-base">
                If you manage an indoor screen or a venue with a strong local community, tell us about the space and the people who use it.
              </p>
              <a className="mt-auto inline-flex items-center gap-3 pt-8 text-sm font-semibold text-paper hover:text-ember" href="mailto:hello@rarestar.studio?subject=String%20Theory%20venue%20partnership">
                Explore a partnership <span aria-hidden="true">↗</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="team" className="scroll-mt-24 border-y border-paper/10 bg-smoke px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <p className="eyebrow text-ember">04 / The team</p>
            <h2 className="display mt-6 text-[clamp(2.7rem,6vw,5.4rem)] leading-[0.94]">Small studio.<br />Close to the work.</h2>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-paper/60">
              Rarestar is based in Bengaluru, where we&apos;re developing String Theory around the needs of local brands, venues, and audiences.
            </p>
          </div>
          <div className="flex flex-col justify-end border-t border-paper/20 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-paper/40">Rarestar Studio · Bengaluru</p>
              <h3 className="display mt-4 text-4xl md:text-5xl">Manoj H V</h3>
              <p className="mt-2 text-sm text-paper/60">Building String Theory at Rarestar.</p>
            </div>
            <a className="mt-6 inline-flex items-center gap-2 text-sm text-paper hover:text-ember sm:mt-0" href="https://in.linkedin.com/in/manojhv" target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section id="careers" className="scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <p className="eyebrow text-ember">05 / Careers</p>
          <div>
            <h2 className="display max-w-4xl text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.94]">Make early ideas real.</h2>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-paper/60 md:text-lg">
              As the work grows, we&apos;re keen to meet thoughtful builders across product, design, engineering, operations, and growth. Send a short note about what you&apos;ve made and the work you want to do next.
            </p>
            <a className="mt-8 inline-flex items-center gap-3 border-b border-ember pb-2 text-sm font-semibold text-paper hover:text-ember" href="mailto:hello@rarestar.studio?subject=Careers%20at%20Rarestar">
              Share your work <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-paper/10 bg-ember px-5 py-20 text-paper md:px-10 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-paper/65">Brands · venues · collaborators</p>
            <h2 className="display mt-5 max-w-4xl text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.94]">Have a place in mind?</h2>
          </div>
          <a className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-ink px-5 text-sm font-semibold text-paper transition hover:bg-paper hover:text-ink" href="mailto:hello@rarestar.studio?subject=Hello%20Rarestar">
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
