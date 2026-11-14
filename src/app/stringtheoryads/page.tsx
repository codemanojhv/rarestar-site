import Image from "next/image";
import Story, { StoryArt } from "@/components/string-theory/Story";
import ContactForm from "@/components/string-theory/ContactForm";
import MobileNav from "@/components/MobileNav";

const questions = [
  ["Is String Theory Ads available now?", "String Theory Ads is in development. We’re speaking with potential advertisers and venue partners as we plan a first pilot in Bengaluru."],
  ["What would an early pilot involve?", "We would discuss a campaign’s objective, potential venues, creative and timing together. The details will depend on the pilot and the partners involved."],
  ["Can my venue take part?", "We’d love to hear about your space and any indoor screens you manage. A conversation will help us understand whether it could be a fit for a future pilot."],
  ["What can be measured?", "Where available, player records can show logged playback. They don’t tell us who saw an ad or prove a campaign’s sales or business results."],
  ["What creative would I need?", "We’ll discuss the screen format and creative requirements with each pilot partner before anything runs."]
] as const;

export default function StringTheoryAdsHome() {
  return (
    <main id="top" className="string-theory-ads sta">
      <header className="sta-header">
        <div className="sta-header-inner sta-container">
          <a className="sta-brand" href="#top" aria-label="String Theory Ads home">
            <Image src="/brand/string-theory-ads-mark.png" alt="" width={44} height={44} priority />
            <span>STRING THEORY <b>ADS</b></span>
          </a>
          <nav className="sta-nav" aria-label="Main navigation">
            <a href="#story">The story</a><a href="#pilot">The pilot</a><a href="#partners">For partners</a><a href="#team">Team</a>
          </nav>
          <div className="sta-header-actions">
            <a className="sta-nav-cta" href="#contact">Discuss a pilot <span aria-hidden="true">↗</span></a>
            <MobileNav className="sta-mobile-menu" links={[["The story", "#story"], ["The pilot", "#pilot"], ["For partners", "#partners"], ["Team", "#team"], ["Careers", "#careers"], ["Contact", "#contact"]]} />
          </div>
        </div>
      </header>

      <section className="sta-hero">
        <div className="sta-hero-glow" aria-hidden="true" />
        <div className="sta-container sta-hero-grid">
          <div className="sta-hero-copy">
            <p className="sta-label sta-light-label"><span className="sta-live-dot" /> A RARESTAR STUDIO VENTURE · BENGALURU</p>
            <h1>A message<br /><em>finds its place.</em></h1>
            <p className="sta-hero-description">We&apos;re developing local advertising on indoor screens, connecting brands with the places people already go.</p>
            <div className="sta-hero-actions">
              <a className="sta-button sta-button-light" href="#contact" data-enquiry="brand">Discuss a Bengaluru pilot <span aria-hidden="true">↗</span></a>
              <a className="sta-text-link sta-text-link-light" href="#story">Follow the story <span aria-hidden="true">↓</span></a>
            </div>
            <p className="sta-hero-status"><span /> IN DEVELOPMENT &nbsp; / &nbsp; BENGALURU PILOT PLANNED</p>
          </div>
          <div className="sta-hero-art">
            <StoryArt step={3} />
            <span className="sta-hero-art-caption">A MESSAGE / A PLACE / A MOMENT</span>
          </div>
        </div>
        <div className="sta-hero-foot sta-container"><span>LOCAL ATTENTION, IN CONTEXT.</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="sta-intro-band">
        <div className="sta-container sta-intro-grid">
          <p className="sta-label">A LITTLE CONTEXT</p>
          <p>Good advertising doesn&apos;t just appear.<br /><em>It belongs somewhere.</em></p>
          <span>↓</span>
        </div>
      </section>

      <Story />

      <section id="idea" className="sta-idea">
        <div className="sta-container">
          <div className="sta-section-intro sta-section-intro-light">
            <p className="sta-label">02 / THE IDEA</p>
            <div>
              <h2>Built around<br /><em>real places.</em></h2>
              <p>We&apos;re developing a local-first indoor screen product that brings brands and venues into the same conversation.</p>
            </div>
          </div>
          <div className="sta-principles">
            <article><span>01 / PLACE</span><div className="sta-principle-symbol">◎</div><h3>Start local.</h3><p>Begin with a neighbourhood and the places people choose to spend time.</p></article>
            <article><span>02 / MOMENT</span><div className="sta-principle-symbol">◌</div><h3>Consider the setting.</h3><p>Think about the space and the experience around the screen.</p></article>
            <article><span>03 / MESSAGE</span><div className="sta-principle-symbol">↗</div><h3>Make it fit.</h3><p>Give the creative a reason to belong in the place it appears.</p></article>
          </div>
        </div>
      </section>

      <section id="pilot" className="sta-pilot">
        <div className="sta-container">
          <div className="sta-section-intro">
            <p className="sta-label">03 / THE FIRST CHAPTER</p>
            <div>
              <h2>Start with one<br /><em>neighbourhood.</em></h2>
              <p>We&apos;re planning a Bengaluru pilot with people who believe local media can be more thoughtful. Here&apos;s the approach we want to explore together.</p>
            </div>
          </div>
          <div className="sta-pilot-steps">
            <article><span>01</span><h3>Find the fit.</h3><p>Talk through the campaign, neighbourhood and audience you have in mind.</p></article>
            <article><span>02</span><h3>Shape the pilot.</h3><p>Explore participating venues, screen requirements and creative together.</p></article>
            <article><span>03</span><h3>Learn from it.</h3><p>Review the pilot and available playback records, then decide what comes next.</p></article>
          </div>
          <p className="sta-pilot-note">A proposed approach · Details will be agreed with pilot partners</p>
        </div>
      </section>

      <section id="partners" className="sta-partners">
        <div className="sta-container">
          <div className="sta-partners-heading"><p className="sta-label">04 / LET&apos;S MAKE A CONNECTION</p><h2>There&apos;s a place<br />for <em>you here.</em></h2></div>
          <div className="sta-partner-grid">
            <article>
              <div className="sta-partner-top"><span>01 / FOR BRANDS</span><span>↗</span></div>
              <h3>Have a story<br />to put out there?</h3>
              <p>Explore a campaign in the places your customers already go.</p>
              <a href="#contact" data-enquiry="brand" className="sta-partner-link">Discuss an advertiser pilot <span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <div className="sta-partner-top"><span>02 / FOR VENUES</span><span>↗</span></div>
              <h3>Have a space<br />people love?</h3>
              <p>Explore whether your venue or screen could be part of a local network.</p>
              <a href="#contact" data-enquiry="venue" className="sta-partner-link">Talk about a venue partnership <span aria-hidden="true">↗</span></a>
            </article>
          </div>
        </div>
      </section>

      <section className="sta-faq">
        <div className="sta-container sta-faq-grid">
          <div><p className="sta-label">05 / A FEW DETAILS</p><h2>Curious?<br /><em>Good.</em></h2><p>Some answers as we get started.</p></div>
          <div className="sta-questions">
            {questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section id="team" className="sta-team">
        <div className="sta-container sta-team-grid">
          <div><p className="sta-label">06 / THE PEOPLE BEHIND IT</p><h2>Small team.<br /><em>Big curiosity.</em></h2></div>
          <div><p>String Theory Ads is being developed by Rarestar Studio in Bengaluru. We&apos;re shaping the idea through conversations with the brands, venues and communities it is made for.</p><a className="sta-text-link" href="https://www.rarestar.studio">Meet Rarestar Studio <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>

      <section id="careers" className="sta-careers">
        <div className="sta-container sta-careers-grid"><p className="sta-label">07 / CAREERS</p><div><h2>Make something<br /><em>with us.</em></h2><p>Interested in what we&apos;re building? We&apos;d like to hear about your work and what you care about. There are no open roles listed right now.</p><a className="sta-text-link" href="mailto:hello@rarestar.studio?subject=Careers%20at%20String%20Theory%20Ads">Share your work <span aria-hidden="true">↗</span></a></div></div>
      </section>

      <section id="contact" className="sta-contact">
        <div className="sta-container">
          <div className="sta-contact-heading"><p className="sta-label sta-light-label">08 / START A CONVERSATION</p><h2>Have a place<br /><em>in mind?</em></h2><p>Tell us a little about your idea. We&apos;ll take it from there.</p></div>
          <ContactForm />
        </div>
      </section>

      <footer className="sta-footer">
        <div className="sta-container">
          <div className="sta-footer-main">
            <div><Image src="/brand/string-theory-ads-wordmark.png" alt="String Theory" width={2731} height={1081} className="sta-footer-wordmark" /><p>Local attention, in context.<br />A venture by <a href="https://www.rarestar.studio">Rarestar Studio ↗</a></p></div>
            <div><span>EXPLORE</span><a href="#story">The story</a><a href="#pilot">The pilot</a><a href="#partners">For partners</a><a href="#careers">Careers</a></div>
            <div><span>GET IN TOUCH</span><a href="mailto:hello@rarestar.studio">hello@rarestar.studio ↗</a><p>Bengaluru, India</p></div>
          </div>
          <div className="sta-footer-bottom"><span>© {new Date().getFullYear()} RARESTAR CREATIVE STUDIO LLP</span><span>MADE FOR THE PLACES IN BETWEEN.</span></div>
        </div>
      </footer>
    </main>
  );
}
