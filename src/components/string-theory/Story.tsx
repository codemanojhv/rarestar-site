"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ContextLink, dayparts, useExperience, venues, type ContextSelection } from "./ExperienceContext";

const captions = {
  morning: "A fresh start, when the neighbourhood is finding its rhythm.",
  afternoon: "A little pause in the middle of an ordinary day.",
  evening: "A softer moment as the day begins to wind down."
} as const;

const chapters = ["Place", "Moment", "Message", "Your pilot"] as const;

function World({ opening = false }: { opening?: boolean }) {
  const { selection } = useExperience();
  return (
    <div className={`journey-world${opening ? " journey-world-opening" : ""}`} data-venue={selection.venue} data-daypart={selection.daypart} aria-hidden="true">
      <div className="journey-world-label"><span>STRING THEORY ADS / AN IDEA IN MOTION</span><span>BLR 01</span></div>
      <svg className="journey-world-art" viewBox="0 0 720 570" fill="none">
        <path className="journey-sun" d="M75 167a66 66 0 1 0 132 0 66 66 0 0 0-132 0Z" />
        <path className="journey-horizon" d="M0 380h720v190H0z" />
        <path className="journey-line" d="M-20 444C89 393 116 491 218 455c102-36 90-127 170-122 81 5 95 125 197 89 60-22 95-90 160-75" />
        <g className="journey-venue journey-cafe">
          <path d="M37 375V171h286v204" className="journey-wall" />
          <path d="M74 375V236c0-58 47-105 105-105s105 47 105 105v139" className="journey-window" />
          <path d="M179 132v242M74 275h210" className="journey-outline" />
          <path d="M35 376h285M68 425h145m-72-50v50" className="journey-outline" />
          <ellipse cx="141" cy="375" rx="74" ry="12" className="journey-furniture" />
          <path d="M112 352h27v21h-27zM139 356h9c5 0 5 10 0 10h-9" className="journey-detail" />
          <path d="M279 372c-23-30-24-62-4-81 13 23 15 48 9 81m0 0c5-44 24-62 43-68 1 29-17 52-43 68" className="journey-plant" />
        </g>
        <g className="journey-venue journey-shop">
          <path d="M35 375V164h290v211" className="journey-wall" />
          <path d="M57 199h242v155H57z" className="journey-window" />
          <path d="M57 250h242M57 302h242M137 199v155M218 199v155" className="journey-outline" />
          <path d="M79 225h35v25H79zM160 212h31v38h-31zM241 221h30v29h-30zM81 274h34v28H81zM160 267h27v35h-27zM240 271h32v31h-32z" className="journey-product" />
          <path d="M35 376h290" className="journey-outline" />
        </g>
        <g className="journey-venue journey-workspace">
          <path d="M36 375V165h289v210" className="journey-wall" />
          <path d="M58 194h246v116H58z" className="journey-window" />
          <path d="M140 194v116m82-116v116M58 252h246" className="journey-outline" />
          <path d="M54 382h247m-213 0v55m179-55v55M116 352h67v30h-67z" className="journey-outline" />
          <path d="M143 352l-9-36h52l-6 36" className="journey-detail" />
          <path d="M272 379c-14-31-11-57 4-72 12 24 12 47-4 72" className="journey-plant" />
        </g>
        <path d="M42 465h253M69 487h152" className="journey-fine-line" />
      </svg>
      <div className="journey-screen">
        <div className="journey-screen-inner">
          <div className="journey-screen-top"><span>AN IDEA, IN PLACE</span><span>✳</span></div>
          <p>{selection.sampleMessage || "A little closer to home."}</p>
          <div className="journey-screen-bottom"><span>YOUR MESSAGE HERE</span><span>↗</span></div>
        </div>
        <span className="journey-screen-foot" />
      </div>
      <div className="journey-world-caption"><span>ILLUSTRATIVE PREVIEW</span><span>{venues[selection.venue].toUpperCase()} / {dayparts[selection.daypart].toUpperCase()}</span></div>
    </div>
  );
}

export function Opening({ studio = false }: { studio?: boolean }) {
  return (
    <section className={`journey-opening${studio ? " journey-opening-studio" : ""}`}>
      <div className="journey-container journey-opening-grid">
        <div className="journey-opening-copy">
          <p className="journey-kicker"><span /> A RARESTAR STUDIO VENTURE · BENGALURU</p>
          <h1>Your brand.<br /><em>In their everyday.</em></h1>
          <p>String Theory Ads is developing local advertising on indoor screens, bringing your message closer to the places people already go.</p>
          <div className="journey-actions">
            <a className="journey-button journey-button-white" href="#contact" data-enquiry="campaign">Discuss a pilot <span aria-hidden="true">↗</span></a>
            <a className="journey-inline-link" href="#story">Explore the story <span aria-hidden="true">↓</span></a>
          </div>
          <p className="journey-status"><span /> PREPARING OUR BENGALURU PILOT</p>
        </div>
        <div className="journey-opening-art"><World opening /><Image src="/brand/string-theory-ads-wordmark.png" alt="String Theory" width={2731} height={1081} priority className="journey-opening-wordmark" /></div>
      </div>
      <div className="journey-opening-foot journey-container"><span>ONE MESSAGE. MANY POSSIBLE PLACES.</span><a href="#contact">SKIP STORY ↗</a></div>
    </section>
  );
}

export default function Story({ compact = false }: { compact?: boolean }) {
  const { selection, setVenue, setDaypart, setSample, useSelection, motion, toggleMotion } = useExperience();
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = root.current?.querySelectorAll<HTMLElement>("[data-journey-chapter]") ?? [];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.journeyChapter));
    }, { rootMargin: "-30% 0px -48% 0px", threshold: 0 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!motion || !root.current) return;
    let disposed = false;
    let cleanup = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (disposed || !root.current) return;
      const gsap = gsapModule.gsap;
      gsap.registerPlugin(triggerModule.ScrollTrigger);
      const context = gsap.context(() => {
        const media = gsap.matchMedia();
        media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 75%", scrub: 0.7 } })
            .fromTo(".journey-sticky .journey-screen", { rotateY: -10, rotateZ: -4, scale: 1.04 }, { rotateY: 0, rotateZ: 0, scale: 1, duration: 1 })
            .to(".journey-sticky .journey-screen", { xPercent: -3, yPercent: -3, scale: 1.06, duration: 1 })
            .to(".journey-sticky .journey-screen", { xPercent: 0, yPercent: 0, scale: 1.14, duration: 1 })
            .to(".journey-sticky .journey-screen", { scale: 1, duration: 1 });
        });
        return () => media.revert();
      }, root);
      cleanup = () => context.revert();
    }).catch(() => { /* The static story remains usable if motion cannot load. */ });
    return () => { disposed = true; cleanup(); };
  }, [motion]);

  return (
    <section id="story" ref={root} className={`journey-story${compact ? " journey-story-compact" : ""}`} data-motion={motion ? "on" : "off"}>
      <div className="journey-container">
        <div className="journey-story-top">
          <div><p className="journey-kicker">01 / THE INTERACTIVE STORY</p><h2>A message<br /><em>finds its place.</em></h2><p>Choose a setting and follow an idea from screen to street.</p></div>
          <div className="journey-story-tools"><button type="button" onClick={toggleMotion} aria-pressed={motion}>Motion: {motion ? "on" : "off"}</button><a href="#contact">Skip story ↗</a></div>
        </div>
        <nav className="journey-chapter-nav journey-mobile-nav" aria-label="Story chapters">
          {chapters.map((chapter, index) => <a key={chapter} href={`#story-${index + 1}`} aria-current={active === index ? "step" : undefined}><span>0{index + 1}</span> {chapter}</a>)}
        </nav>
        <div className="journey-layout">
          <div className="journey-sticky">
            <World />
            <nav className="journey-chapter-nav" aria-label="Story chapters">
              {chapters.map((chapter, index) => <a key={chapter} href={`#story-${index + 1}`} aria-current={active === index ? "step" : undefined}><span>0{index + 1}</span> {chapter}</a>)}
            </nav>
          </div>
          <div className="journey-chapters">
            <article id="story-1" data-journey-chapter="0" className="journey-chapter">
              <div className="journey-mobile-world"><World /></div>
              <p className="journey-kicker">01 / THE PLACE</p><h3>Start with<br /><em>the place.</em></h3>
              <p>Every neighbourhood has its own rhythm. Imagine the setting where your message might feel at home.</p>
              <fieldset className="journey-choices"><legend>CHOOSE A PLACE</legend><div>{Object.entries(venues).map(([key, label]) => <button key={key} type="button" aria-pressed={selection.venue === key} onClick={() => setVenue(key as ContextSelection["venue"])}>{label}</button>)}</div></fieldset>
            </article>
            <article id="story-2" data-journey-chapter="1" className="journey-chapter">
              <div className="journey-mobile-world"><World /></div>
              <p className="journey-kicker">02 / THE MOMENT</p><h3>Find<br /><em>the moment.</em></h3>
              <p>{captions[selection.daypart]} The surroundings can shape how a message feels.</p>
              <fieldset className="journey-choices"><legend>CHOOSE A TIME OF DAY</legend><div>{Object.entries(dayparts).map(([key, label]) => <button key={key} type="button" aria-pressed={selection.daypart === key} onClick={() => setDaypart(key as ContextSelection["daypart"])}>{label}</button>)}</div></fieldset>
            </article>
            <article id="story-3" data-journey-chapter="2" className="journey-chapter">
              <div className="journey-mobile-world"><World /></div>
              <p className="journey-kicker">03 / THE MESSAGE</p><h3>Give your message<br /><em>a place.</em></h3>
              <p>Try a headline and see it on the screen. This is an illustrative preview, not a live campaign.</p>
              <label className="journey-sample">YOUR SAMPLE HEADLINE <span>{selection.sampleMessage.length}/60</span><input type="text" maxLength={60} value={selection.sampleMessage} onChange={(event) => setSample(event.target.value)} placeholder="A little closer to home." /></label>
            </article>
            <article id="story-4" data-journey-chapter="3" className="journey-chapter">
              <div className="journey-mobile-world"><World /></div>
              <p className="journey-kicker">04 / THE PILOT</p><h3>Let&apos;s find<br /><em>your fit.</em></h3>
              <p>Share a brief, discuss whether the idea is a fit, and agree the scope together.</p>
              <div className="journey-summary"><span>YOUR ILLUSTRATIVE CONTEXT</span><strong>{venues[selection.venue]} <span>×</span> {dayparts[selection.daypart]}</strong></div>
              <div className="journey-pilot-actions"><a href="#contact" data-enquiry="campaign" onClick={useSelection} className="journey-button journey-button-blue">Discuss this pilot <span aria-hidden="true">↗</span></a><a href="#contact" data-enquiry="venue" onClick={useSelection} className="journey-inline-link-dark">I have a venue ↗</a></div>
              {!compact && <ContextLink href="https://stringtheoryads.in/" className="journey-product-link">Explore String Theory Ads ↗</ContextLink>}
            </article>
          </div>
        </div>
        <p className="journey-disclaimer">Illustrative contexts only · not a map of current venues or available inventory</p>
      </div>
    </section>
  );
}
