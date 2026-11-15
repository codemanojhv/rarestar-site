import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import ContactForm from "@/components/string-theory/ContactForm";
import Story, { Opening } from "@/components/string-theory/Story";
import { ContextLink } from "@/components/string-theory/ExperienceContext";

const questions = [
  ["Is String Theory Ads available now?", "String Theory Ads is in development. We’re speaking with potential advertisers and venue partners as we prepare a first pilot in Bengaluru."],
  ["What would an early pilot involve?", "We would discuss a campaign’s objective, potential venues, creative and timing together. The details depend on the pilot and partners involved."],
  ["Can my venue take part?", "We’d love to hear about your space and any indoor screens you manage. A conversation will help us understand whether it could be a fit for a future pilot."],
  ["What can be measured?", "Where available, player records can show logged playback. They don’t tell us who saw an ad or prove a campaign’s sales or business results."],
  ["What creative would I need?", "We’ll discuss screen format and creative requirements with each pilot partner before anything runs."]
] as const;

export default function StringTheoryAdsHome() {
  return (
    <main id="top" className="string-theory-ads sta">
        <header className="sta-header">
          <div className="sta-header-inner sta-container">
            <a className="sta-brand" href="#top" aria-label="String Theory Ads home"><Image src="/brand/string-theory-ads-mark.png" alt="" width={44} height={44} priority /><span>STRING THEORY <b>ADS</b></span></a>
            <nav className="sta-nav" aria-label="Main navigation"><a href="#story">The story</a><a href="#partners">For partners</a><a href="#pilot">The pilot</a><ContextLink href="https://www.rarestar.studio/#team">Team</ContextLink></nav>
            <div className="sta-header-actions"><a className="sta-nav-cta" href="#contact" data-enquiry="campaign">Discuss a pilot <span aria-hidden="true">↗</span></a><MobileNav className="sta-mobile-menu" links={[["The story", "#story"], ["For partners", "#partners"], ["The pilot", "#pilot"], ["Team", "https://www.rarestar.studio/#team"], ["Careers", "https://www.rarestar.studio/#careers"], ["Contact", "#contact"]]} /></div>
          </div>
        </header>

        <Opening />
        <Story compact />

        <section id="partners" className="sta-partners">
          <div className="sta-container">
            <div className="sta-partners-heading"><p className="sta-label">02 / LET&apos;S MAKE A CONNECTION</p><h2>There&apos;s a place<br />for <em>you here.</em></h2></div>
            <div className="sta-partner-grid">
              <article><div className="sta-partner-top"><span>01 / FOR BRANDS</span><span>↗</span></div><h3>Have a story<br />to put out there?</h3><p>Explore a campaign in the places your customers already go.</p><a href="#contact" data-enquiry="campaign" className="sta-partner-link">Discuss an advertiser pilot <span aria-hidden="true">↗</span></a></article>
              <article><div className="sta-partner-top"><span>02 / FOR VENUES</span><span>↗</span></div><h3>Have a space<br />people love?</h3><p>Explore whether your venue or screen could be part of a local network.</p><a href="#contact" data-enquiry="venue" className="sta-partner-link">Talk about a venue partnership <span aria-hidden="true">↗</span></a></article>
            </div>
          </div>
        </section>

        <section id="pilot" className="sta-pilot">
          <div className="sta-container">
            <div className="sta-section-intro"><p className="sta-label">03 / THE FIRST CHAPTER</p><div><h2>Start with one<br /><em>neighbourhood.</em></h2><p>We&apos;re preparing a Bengaluru pilot with people who believe local media can be more thoughtful. Here&apos;s the approach we want to explore together.</p></div></div>
            <div className="sta-pilot-steps"><article><span>01</span><h3>Share a brief.</h3><p>Tell us about the campaign, neighbourhood and audience you have in mind.</p></article><article><span>02</span><h3>Discuss the fit.</h3><p>Explore possible venues, screen requirements and creative together.</p></article><article><span>03</span><h3>Agree the scope.</h3><p>Work out the pilot details with the people involved before anything runs.</p></article></div>
            <p className="sta-pilot-note">A proposed approach · Details will be agreed with pilot partners</p>
          </div>
        </section>

        <section id="idea" className="sta-faq">
          <div className="sta-container sta-faq-grid"><div><p className="sta-label">04 / A FEW DETAILS</p><h2>Curious?<br /><em>Good.</em></h2><p>Some answers as we get started.</p></div><div className="sta-questions">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div>
        </section>

        <section id="team" className="sta-team"><div className="sta-container sta-team-grid"><div><p className="sta-label">THE PEOPLE BEHIND IT</p><h2>Built by<br /><em>Rarestar.</em></h2></div><div><p>String Theory Ads is being developed by Rarestar Studio in Bengaluru.</p><ContextLink className="sta-text-link" href="https://www.rarestar.studio/#team">Meet the team <span aria-hidden="true">↗</span></ContextLink><ContextLink id="careers" className="sta-text-link" href="https://www.rarestar.studio/#careers">Careers at Rarestar <span aria-hidden="true">↗</span></ContextLink></div></div></section>

        <section id="contact" className="sta-contact"><div className="sta-container"><div className="sta-contact-heading"><p className="sta-label sta-light-label">05 / START A CONVERSATION</p><h2>Where should your<br /><em>message go?</em></h2><p>Tell us a little about your idea. We&apos;ll take it from there.</p></div><ContactForm /></div></section>

        <footer className="sta-footer"><div className="sta-container"><div className="sta-footer-main"><div><Image src="/brand/string-theory-ads-wordmark.png" alt="String Theory" width={2731} height={1081} className="sta-footer-wordmark" /><p>Local attention, in context.<br />A venture by <ContextLink href="https://www.rarestar.studio/">Rarestar Studio ↗</ContextLink></p></div><div><span>EXPLORE</span><a href="#story">The story</a><a href="#pilot">The pilot</a><a href="#partners">For partners</a><ContextLink href="https://www.rarestar.studio/#careers">Careers ↗</ContextLink></div><div><span>GET IN TOUCH</span><a href="mailto:hello@rarestar.studio">hello@rarestar.studio ↗</a><a href="https://www.rarestar.studio/privacy">Privacy</a><p>Bengaluru, India</p></div></div><div className="sta-footer-bottom"><span>© {new Date().getFullYear()} RARESTAR CREATIVE STUDIO LLP</span><span>MADE FOR THE PLACES IN BETWEEN.</span></div></div></footer>
    </main>
  );
}
