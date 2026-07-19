"use client";

import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RehaiIcon, { RehaiIconName } from "./RehaiIcon";

gsap.registerPlugin(ScrollTrigger);

type Step = { number: string; title: string; copy: string; icon: RehaiIconName };
type Challenge = { title: string; detail: string; icon: RehaiIconName };
type Capability = { title: string; copy: string; icon: RehaiIconName };
type RehaiRole = "patient" | "therapist";

const steps: Step[] = [
  { number: "01", title: "Complete Exercises", copy: "Speech and cognitive exercises tailored to your needs.", icon: "waveform" },
  { number: "02", title: "Capture Responses", copy: "Your responses are recorded securely and instantly.", icon: "mic" },
  { number: "03", title: "AI Generates Metrics", copy: "Advanced models analyze performance and extract insights.", icon: "chart" },
  { number: "04", title: "Adaptive Recommendations", copy: "Rehai adapts the next tasks to maximize your recovery.", icon: "brain" },
  { number: "05", title: "Therapist Reviews", copy: "Therapists supervise, review and guide your journey.", icon: "therapist" },
  { number: "06", title: "Recovery Continues", copy: "Track progress over time with consistent, personalised support.", icon: "heart" }
];

const challenges: Challenge[] = [
  { title: "Severe shortage", detail: "of specialists", icon: "person" },
  { title: "High therapy", detail: "costs", icon: "cost" },
  { title: "Limited access", detail: "outside cities", icon: "location" },
  { title: "Manual tracking", detail: "is slow & inconsistent", icon: "clock" },
  { title: "Therapy is not", detail: "personalized", icon: "sliders" }
];

const capabilities: Capability[] = [
  { title: "Speech Recovery", copy: "Exercises that help improve pronunciation, fluency, naming and communication.", icon: "speech" },
  { title: "Cognitive Recovery", copy: "Tasks to strengthen memory, attention, problem solving and executive function.", icon: "brain" },
  { title: "Adaptive Therapy", copy: "AI adapts difficulty and content based on performance and recovery patterns.", icon: "sparkles" },
  { title: "Progress Intelligence", copy: "Objective metrics and trend analysis to track meaningful improvement.", icon: "chart" },
  { title: "Indian Languages", copy: "Built for India. Supporting Kannada, Tamil and more languages.", icon: "globe" },
  { title: "Therapist Oversight", copy: "Therapists stay in control with insights, reviews and clinical supervision.", icon: "shield" }
];

const faqs = [
  ["Is Rehai available to use right now?", "Rehai is being built with clinicians and patients. Join the waitlist to receive access updates."],
  ["Who is Rehai for?", "People recovering from stroke, aphasia, traumatic brain injury and related cognitive conditions."],
  ["Which languages will Rehai support?", "Rehai is designed for India, starting with English and Indian-language support."],
  ["How is my data protected?", "We use privacy-first workflows and secure clinical data handling."],
  ["How can therapists get involved?", "Therapists and clinics can join the waitlist to pilot Rehai with their patients."]
] as const;

const roleCopy: Record<RehaiRole, { label: string; copy: string; icon: RehaiIconName }> = {
  patient: {
    label: "I am seeking rehabilitation support",
    copy: "Join the waitlist to be among the first to access Rehai.",
    icon: "heart"
  },
  therapist: {
    label: "I am a therapist or clinician",
    copy: "Collaborate with us, get early access and help shape Rehai.",
    icon: "users"
  }
};

function WaitlistForm({ compact = false, idSuffix = "final" }: { compact?: boolean; idSuffix?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDone(true);
    setEmail("");
  }

  return (
    <form onSubmit={submit} className={compact ? "rehai-waitlist-form rehai-waitlist-form--compact" : "rehai-waitlist-form"}>
      <label className="sr-only" htmlFor={`rehai-email-${idSuffix}`}>Email address</label>
      <input
        id={`rehai-email-${idSuffix}`}
        aria-label="Email address"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
      />
      <button type="submit">{done ? "You're in" : "Join Waitlist"}</button>
    </form>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="rehai-section-heading rehai-reveal">
      <p className="rehai-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p className="rehai-section-copy">{copy}</p> : null}
    </div>
  );
}

export default function RehaiLanding() {
  const rootRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [waitlistRole, setWaitlistRole] = useState<RehaiRole>("patient");
  const [introOpen, setIntroOpen] = useState(false);

  function finishIntro() {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem("rehai-intro-seen", "1");
    const intro = introRef.current;
    if (!intro) {
      setIntroOpen(false);
      return;
    }
    gsap.to(intro, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut", onComplete: () => setIntroOpen(false) });
  }

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.sessionStorage.getItem("rehai-intro-seen") || reducedMotion) return;
    setIntroOpen(true);
  }, []);

  useEffect(() => {
    if (!introOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finishIntro();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [introOpen]);

  useLayoutEffect(() => {
    if (!introOpen) return;
    const context = gsap.context(() => {
      gsap.from(".rehai-intro-mark, .rehai-intro-kicker, .rehai-intro-title, .rehai-intro-copy, .rehai-intro-enter", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
      });
      gsap.from(".rehai-intro-ring", { scale: 0.68, opacity: 0, duration: 1.25, ease: "power3.out" });
    }, introRef);
    const timer = window.setTimeout(finishIntro, 2400);
    return () => {
      window.clearTimeout(timer);
      context.revert();
    };
  }, [introOpen]);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      gsap.from(".rehai-hero-copy > *", { duration: 0.8, y: 22, opacity: 0, stagger: 0.1, ease: "power3.out", delay: 0.12 });
      gsap.from(".rehai-hero-aside > *", { duration: 0.75, y: 18, opacity: 0, stagger: 0.1, ease: "power3.out", delay: 0.42 });
      gsap.to(".rehai-hero-art", {
        yPercent: 7,
        ease: "none",
        scrollTrigger: { trigger: ".rehai-hero", start: "top top", end: "bottom top", scrub: true }
      });
      const processPath = rootRef.current?.querySelector<SVGPathElement>(".rehai-process-path path");
      const processTrack = rootRef.current?.querySelector<HTMLElement>(".rehai-process-track");
      if (processPath && processTrack) {
        const length = processPath.getTotalLength();
        gsap.set(processPath, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(processPath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: processTrack, start: "top 78%", end: "bottom 68%", scrub: 1 }
        });
      }
      gsap.utils.toArray<HTMLElement>(".rehai-reveal").forEach((element) => {
        gsap.from(element, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true }
        });
      });
      gsap.to(".rehai-petal", { y: -12, x: 8, rotation: 8, duration: 4.5, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 0.9 });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <>
      {introOpen ? (
        <div ref={introRef} className="rehai-intro" role="dialog" aria-modal="true" aria-label="Rehai introduction">
          <div className="rehai-intro-ring" aria-hidden="true" />
          <Image src="/rehai/logo.png" alt="" width={88} height={88} className="rehai-intro-mark" />
          <p className="rehai-intro-kicker">REHAI / 01</p>
          <h2 className="rehai-intro-title">Recovery,<br /><em>in bloom.</em></h2>
          <p className="rehai-intro-copy">A new rhythm for speech, cognition and the people who guide recovery.</p>
          <button type="button" className="rehai-intro-enter" onClick={finishIntro}>Enter Rehai <RehaiIcon name="arrow" size={16} /></button>
          <button type="button" className="rehai-intro-skip" onClick={finishIntro}>Skip intro</button>
          <span className="rehai-intro-progress" aria-hidden="true" />
        </div>
      ) : null}
      <main ref={rootRef} className="rehai-page">
      <section id="top" className="rehai-hero" data-rehai-scene="hero">
        <Image src="/rehai/rehai-canopy-cinematic.jpg" alt="" fill priority sizes="100vw" className="rehai-hero-art" />
        <Image src="/rehai/logo.png" alt="" width={320} height={320} className="rehai-hero-mark" />
        <span className="rehai-petal rehai-petal--one" />
        <span className="rehai-petal rehai-petal--two" />
        <span className="rehai-petal rehai-petal--three" />
        <span className="rehai-petal rehai-petal--four" />
        <div className="rehai-shell rehai-hero-inner">
          <div className="rehai-hero-copy">
            <p className="rehai-eyebrow rehai-eyebrow--light">REHAI CARE, MADE PERSONAL</p>
            <h1>Speech and<br />Cognitive Recovery.<br /><span>Powered by <em>AI.</em></span></h1>
          </div>
          <div className="rehai-hero-aside">
            <p>AI-powered speech and cognitive rehabilitation in Indian languages, personalized for every patient&apos;s recovery.</p>
            <div className="rehai-actions">
              <a className="rehai-button rehai-hero-cta" href="#waitlist">Join Waitlist <RehaiIcon name="arrow" size={16} /></a>
              <a className="rehai-link rehai-link--light" href="#how-it-works">Contact Us <RehaiIcon name="arrow" size={16} /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="rehai-section rehai-problem-section" data-rehai-scene="problem">
        <div className="rehai-shell rehai-problem-grid">
          <div className="rehai-problem-copy rehai-reveal">
            <p className="rehai-eyebrow">THE PROBLEM</p>
            <h2>Recovery doesn&apos;t end after therapy. But support often does.</h2>
            <p>Millions of people in India live with speech and cognitive challenges due to stroke, aphasia, TBI and other neurological conditions.</p>
          </div>
          <div className="rehai-problem-art rehai-reveal">
            <Image src="/rehai/problem-watercolor-clean.png" alt="Watercolor cherry blossom tree over misty mountains" fill sizes="(min-width: 900px) 55vw, 100vw" />
          </div>
          <div className="rehai-challenges rehai-reveal">
            {challenges.map((challenge) => (
              <div className="rehai-challenge" key={challenge.title}>
                <span className="rehai-challenge-icon"><RehaiIcon name={challenge.icon} size={24} /></span>
                <p>{challenge.title}<br /><span>{challenge.detail}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="rehai-section rehai-process-section" data-rehai-scene="process">
        <div className="rehai-shell rehai-glass rehai-process-panel">
          <SectionHeading eyebrow="HOW REHAI WORKS" title="Personalized rehabilitation. Measurable progress." />
          <div className="rehai-process-track">
            <svg className="rehai-process-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 3 44 C 14 14, 20 14, 29 44 S 44 74, 51 44 S 67 14, 75 44 S 88 73, 97 44" />
            </svg>
          <div className="rehai-process-steps">
            {steps.map((step) => (
              <article className="rehai-step rehai-reveal" key={step.number} data-step={step.number}>
                <span className="rehai-step-number">{step.number}</span>
                <span className="rehai-step-icon"><RehaiIcon name={step.icon} size={28} /></span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section id="technology" className="rehai-section rehai-audience-section" data-rehai-scene="audience">
        <div className="rehai-shell rehai-audience-panel">
          <Image src="/rehai/rehai-canopy-cinematic.jpg" alt="" fill sizes="(min-width: 900px) 1280px, 100vw" className="rehai-audience-art" />
          <div className="rehai-audience-column rehai-reveal">
            <p className="rehai-eyebrow rehai-eyebrow--light">FOR PATIENTS</p>
            <h2>For Patients</h2>
            <ul>
              {["Personalized exercises that adapt to you", "Track your recovery over time", "Stay motivated with guided sessions", "Available in your preferred language"].map((item) => <li key={item}><RehaiIcon name="check" size={18} />{item}</li>)}
            </ul>
            <a className="rehai-button rehai-button--light" href="#waitlist">I want to start my journey <RehaiIcon name="arrow" size={15} /></a>
          </div>
          <div className="rehai-audience-divider" aria-hidden="true"><span><Image src="/rehai/logo.png" alt="" width={56} height={56} /></span></div>
          <div id="for-therapists" className="rehai-audience-column rehai-reveal">
            <p className="rehai-eyebrow rehai-eyebrow--light">FOR THERAPISTS</p>
            <h2>For Therapists</h2>
            <ul>
              {["Manage patients and sessions easily", "Objective insights and progress reports", "Save time with automated scoring", "Better outcomes with data-driven support"].map((item) => <li key={item}><RehaiIcon name="check" size={18} />{item}</li>)}
            </ul>
            <a className="rehai-button rehai-button--light" href="#waitlist">I&apos;m a therapist or clinician <RehaiIcon name="arrow" size={15} /></a>
          </div>
        </div>
      </section>

      <section className="rehai-section rehai-capabilities-section" data-rehai-scene="capabilities">
        <div className="rehai-shell">
          <SectionHeading eyebrow="WHAT WE'RE BUILDING" title="Rehabilitation, reimagined with AI" />
          <div className="rehai-capability-grid">
            {capabilities.map((capability) => (
              <article className="rehai-capability rehai-glass rehai-reveal" key={capability.title}>
                <span className="rehai-capability-icon"><RehaiIcon name={capability.icon} size={25} /></span>
                <div><h3>{capability.title}</h3><p>{capability.copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rehai-section rehai-why-section" data-rehai-scene="why">
        <div className="rehai-shell rehai-why-panel">
          <Image src="/rehai/rehai-watercolor-journey.jpg" alt="" fill sizes="(min-width: 900px) 1280px, 100vw" className="rehai-why-art" />
          <div className="rehai-why-copy rehai-reveal">
            <p className="rehai-eyebrow">WHY REHAI</p>
            <h2>Every recovery journey is unique. Rehabilitation should be too.</h2>
            <p>Rehai combines clinical science with AI to deliver continuous, meaningful and measurable rehabilitation - anytime, anywhere.</p>
            <div className="rehai-proof-points">
              <span><RehaiIcon name="science" size={18} />Science-backed approach</span>
              <span><RehaiIcon name="shield" size={18} />Privacy-first by design</span>
              <span><RehaiIcon name="therapist" size={18} />Therapist-guided and AI-powered</span>
              <span><RehaiIcon name="location" size={18} />Built in India for India</span>
            </div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="rehai-section rehai-waitlist-section" data-rehai-scene="waitlist">
        <div className="rehai-shell rehai-waitlist-grid">
          <div className="rehai-waitlist-copy rehai-reveal">
            <p className="rehai-eyebrow">HELP SHAPE THE FUTURE</p>
            <h2>Be part of something that matters.</h2>
            <p>Rehai is in early development and we&apos;re building with clinicians and patients. Join the waitlist to get early access, updates and opportunities to contribute.</p>
          </div>
           <div className="rehai-waitlist-cards">
             <article className="rehai-waitlist-card rehai-waitlist-card--primary rehai-glass rehai-reveal">
               <div className="rehai-role-switch" role="tablist" aria-label="Choose your Rehai role">
                 {(Object.keys(roleCopy) as RehaiRole[]).map((role) => (
                   <button key={role} type="button" role="tab" aria-selected={waitlistRole === role} className={waitlistRole === role ? "is-active" : ""} onClick={() => setWaitlistRole(role)}>
                     {role === "patient" ? "For patients" : "For therapists"}
                   </button>
                 ))}
               </div>
               <span className="rehai-card-icon"><RehaiIcon name={roleCopy[waitlistRole].icon} size={24} /></span>
               <h3>{roleCopy[waitlistRole].label}</h3>
               <p>{roleCopy[waitlistRole].copy}</p>
               <WaitlistForm compact idSuffix={waitlistRole} />
             </article>
             <p className="rehai-waitlist-note">No spam. Only meaningful updates.</p>
           </div>
         </div>
      </section>

      <section id="about-us" className="rehai-section rehai-faq-section">
        <div className="rehai-shell rehai-glass rehai-faq-panel">
          <div className="rehai-faq-intro rehai-reveal">
            <p className="rehai-eyebrow">REHAI / FAQ</p>
            <h2>Your questions,<br /><em>answered.</em></h2>
            <p className="rehai-faq-intro-copy">A clearer first step for patients, families and therapists.</p>
            <div className="rehai-faq-signal"><strong>05</strong><span>questions before your first session</span></div>
            <Image src="/rehai/problem-watercolor-clean.png" alt="" width={620} height={340} className="rehai-faq-art" />
          </div>
          <div className="rehai-faq-list">
            {faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              return (
                <div className={isOpen ? "rehai-faq-item rehai-faq-item--open rehai-reveal" : "rehai-faq-item rehai-reveal"} key={question}>
                  <button id={`rehai-faq-trigger-${index}`} type="button" aria-expanded={isOpen} aria-controls={`rehai-faq-answer-${index}`} onClick={() => setOpenFaq(isOpen ? null : index)}>
                    <span className="rehai-faq-index">0{index + 1}</span>
                    <span className="rehai-faq-question">{question}</span>
                    <span className="rehai-faq-toggle"><RehaiIcon name={isOpen ? "chevron-down" : "plus"} size={17} /></span>
                  </button>
                  {isOpen ? <div id={`rehai-faq-answer-${index}`} className="rehai-faq-answer" role="region" aria-labelledby={`rehai-faq-trigger-${index}`}><p>{answer}</p><span>REHAI / CLINICAL CLARITY</span></div> : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rehai-section rehai-final-section" data-rehai-scene="final">
        <div className="rehai-shell rehai-final-panel">
          <Image src="/rehai/blossom-branch.png" alt="" fill sizes="(min-width: 900px) 1280px, 100vw" className="rehai-final-art" />
          <div className="rehai-final-copy rehai-reveal">
            <h2>Recovery is personal.<br />Rehabilitation should be too.</h2>
            <p>Join the REHAI Early Access List.</p>
            <div className="rehai-actions"><a className="rehai-button rehai-final-cta" href="#waitlist">Join Waitlist <RehaiIcon name="arrow" size={15} /></a><a className="rehai-link rehai-link--light" href="#top">Contact Us <RehaiIcon name="arrow" size={15} /></a></div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
