"use client";

import { useEffect, useState } from "react";

const chapters = [
  {
    label: "The message",
    title: "Every message starts somewhere.",
    text: "A local brand has something to share. A new opening, a familiar favourite, a reason to stop by."
  },
  {
    label: "The place",
    title: "Then it finds its place.",
    text: "Think about the neighbourhoods, venues and everyday spaces where that message might feel at home."
  },
  {
    label: "The moment",
    title: "The setting becomes part of the story.",
    text: "A screen in a thoughtfully chosen space creates another way for a brand to show up locally."
  },
  {
    label: "The connection",
    title: "One message. A little more meaning.",
    text: "String Theory Ads is being built to bring the message, the place and the people around it closer together."
  }
] as const;

export function StoryArt({ step = 0 }: { step?: number }) {
  return (
    <div className="sta-world" data-step={step} aria-hidden="true">
      <div className="sta-world-grid" />
      <div className="sta-world-top"><span>AN IDEA IN MOTION</span><span>BLR / 01</span></div>
      <svg viewBox="0 0 800 590" fill="none" className="sta-world-svg">
        <path className="sta-orbit" d="M-24 412C95 352 120 455 228 412C334 370 285 224 404 216C523 208 504 355 622 352C689 351 741 282 834 302" />
        <path className="sta-orbit sta-orbit-ghost" d="M-28 439C95 379 125 482 233 439C339 397 291 251 410 243C529 235 509 382 627 379C694 378 746 309 839 329" />
        <circle cx="224" cy="413" r="7" fill="#c8d1ff" />
        <circle cx="405" cy="216" r="7" fill="#c8d1ff" />
        <circle cx="621" cy="352" r="7" fill="#c8d1ff" />
        <g className="sta-scene-piece sta-scene-message">
          <rect x="68" y="139" width="230" height="160" rx="15" fill="#9cacff" transform="rotate(-8 68 139)" />
          <rect x="93" y="157" width="172" height="114" rx="8" fill="#f5f6ff" transform="rotate(-8 93 157)" />
          <path d="M119 190l75-10M122 211l109-15M125 232l79-11" stroke="#263dab" strokeWidth="7" strokeLinecap="round" />
          <circle cx="255" cy="122" r="15" fill="#e4e9ff" />
          <path d="M255 114v16M247 122h16" stroke="#263dab" strokeWidth="2" />
        </g>
        <g className="sta-scene-piece sta-scene-place">
          <path d="M305 313V205l52-35 48 35v108M369 313V157l61-41 56 41v156M465 313V225l43-31 43 31v88" fill="#637eff" stroke="#d5ddff" strokeWidth="3" strokeLinejoin="round" />
          <path d="M320 222h21v23h-21zM320 260h21v23h-21zM380 181h22v25h-22zM380 224h22v25h-22zM422 181h22v25h-22zM422 224h22v25h-22zM479 241h18v22h-18z" fill="#dce3ff" />
          <path d="M292 314h270" stroke="#dce3ff" strokeWidth="4" strokeLinecap="round" />
        </g>
        <g className="sta-scene-piece sta-scene-screen">
          <rect x="548" y="94" width="166" height="239" rx="17" fill="#eef1ff" />
          <rect x="559" y="105" width="144" height="198" rx="10" fill="#2039df" />
          <path d="M581 218c35-53 69-66 102-76M581 243c27-16 63-17 102-4" stroke="#aebdff" strokeWidth="3" strokeLinecap="round" />
          <circle cx="630" cy="203" r="31" fill="#aebdff" />
          <path d="M615 203h30M630 188v30" stroke="#2039df" strokeWidth="3" strokeLinecap="round" />
          <path d="M610 333v28m41-28v28m-55 1h69" stroke="#eef1ff" strokeWidth="7" strokeLinecap="round" />
        </g>
        <g className="sta-scene-spark">
          <path d="M465 65v36M447 83h36M152 334v22M141 345h22" stroke="#dce3ff" strokeWidth="2" />
          <circle cx="322" cy="94" r="4" fill="#dce3ff" />
          <circle cx="744" cy="420" r="5" fill="#dce3ff" />
        </g>
      </svg>
      <div className="sta-world-bottom"><span>MESSAGE</span><span>PLACE</span><span>SCREEN</span></div>
    </div>
  );
}

export default function Story() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-story-chapter]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.storyChapter));
      }
    }, { rootMargin: "-30% 0px -50% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" className="sta-story">
      <div className="sta-container">
        <div className="sta-section-intro">
          <p className="sta-label">01 / THE STORY</p>
          <div>
            <h2>Place changes<br /><em>the message.</em></h2>
            <p>An idea for local advertising, told in four small chapters.</p>
          </div>
        </div>
        <div className="sta-story-layout">
          <div className="sta-story-sticky">
            <StoryArt step={active} />
            <nav className="sta-chapter-nav" aria-label="Story chapters">
              {chapters.map((chapter, index) => (
                <a key={chapter.label} href={`#story-${index + 1}`} aria-current={active === index ? "step" : undefined}>
                  <span>0{index + 1}</span><span>{chapter.label}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className="sta-story-copy">
            {chapters.map((chapter, index) => (
              <article id={`story-${index + 1}`} data-story-chapter={index} className="sta-chapter" key={chapter.label}>
                <div className="sta-mobile-world"><StoryArt step={index} /></div>
                <p className="sta-label">0{index + 1} / 04 &nbsp; {chapter.label}</p>
                <h3>{chapter.title}</h3>
                <p>{chapter.text}</p>
              </article>
            ))}
          </div>
        </div>
        <p className="sta-illustration-note">Illustration of the product direction · not a map of current locations</p>
      </div>
    </section>
  );
}
