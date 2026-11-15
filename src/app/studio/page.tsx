import Image from "next/image";
import ContactForm from "@/components/string-theory/ContactForm";
import Story, { Opening } from "@/components/string-theory/Story";
import { ContextLink } from "@/components/string-theory/ExperienceContext";

export default function StudioHome() {
  return (
    <main className="rs">
      <Opening studio />
      <Story />

      <section id="studio" className="rs-statement">
        <div className="rs-container rs-split"><p className="rs-label">02 / THE STUDIO</p><div><h2>Building from<br /><em>Bengaluru.</em></h2><p>Rarestar is an independent venture studio. We start with a real-world question, follow it somewhere interesting, and build towards an answer. Right now, that work is String Theory Ads.</p></div></div>
      </section>

      <section id="venture" className="rs-feature">
        <div className="rs-container"><div className="rs-feature-top"><p className="rs-label">03 / WHAT WE&apos;RE BUILDING</p><p>ONE FOCUSED VENTURE &nbsp; / &nbsp; 01</p></div><div className="rs-feature-grid"><div><p className="rs-blue-label">IN DEVELOPMENT · BENGALURU PILOT PLANNED</p><h2>String<br />Theory <em>Ads.</em></h2><p>What if a message felt more at home in the place you saw it? We&apos;re developing a local-first indoor advertising product around that idea.</p><ContextLink className="rs-button rs-button-blue" href="https://stringtheoryads.in/">Explore the venture <span aria-hidden="true">↗</span></ContextLink></div><div className="rs-feature-visual"><div className="rs-feature-ring" /><Image src="/brand/string-theory-ads-wordmark.png" alt="String Theory" width={2731} height={1081} /><span>PLACE &nbsp; / &nbsp; MOMENT &nbsp; / &nbsp; MESSAGE</span></div></div></div>
      </section>

      <section id="process" className="rs-process">
        <div className="rs-container"><div className="rs-split"><p className="rs-label">04 / HOW WE WORK</p><div><h2>Thoughtful ideas.<br /><em>Actual work.</em></h2><p>We like a good question. We like getting closer to an answer even more.</p></div></div><div className="rs-process-grid"><article><span>01</span><h3>Notice.</h3><p>Pay attention to a problem and the people who live with it.</p></article><article><span>02</span><h3>Make.</h3><p>Turn an idea into something specific enough to experience.</p></article><article><span>03</span><h3>Learn.</h3><p>Bring it into the real world, listen closely and keep improving.</p></article></div></div>
      </section>

      <section id="team" className="rs-team">
        <div className="rs-container rs-split"><p className="rs-label">05 / THE PEOPLE</p><div><h2>Close to<br /><em>the work.</em></h2><p>We&apos;re based in Bengaluru, building String Theory Ads alongside the conversations that will shape its first local pilot.</p><div className="rs-profile"><div><span>RARESTAR STUDIO · BENGALURU</span><h3>Manoj H V</h3><p>Building String Theory Ads at Rarestar.</p></div><a href="https://in.linkedin.com/in/manojhv" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div></div>
      </section>

      <section id="careers" className="rs-careers">
        <div className="rs-container rs-split"><p className="rs-label">06 / CAREERS</p><div><h2>Help shape<br /><em>the next chapter.</em></h2><p>We&apos;re interested in meeting thoughtful people across partnerships, operations, product, design and growth. Share what you make and what you&apos;d like to explore.</p><a className="rs-link rs-link-light" href="#contact" data-enquiry="careers">Share your work <span aria-hidden="true">↗</span></a></div></div>
      </section>

      <section id="contact" className="rs-enquiry">
        <div className="rs-container"><div className="rs-enquiry-heading"><p className="rs-label">07 / START A CONVERSATION</p><h2>Where should your<br /><em>message go?</em></h2><p>Share a brief, tell us about a venue, or introduce your work. You can also write to <a href="mailto:hello@rarestar.studio">hello@rarestar.studio</a>.</p></div><ContactForm /></div>
      </section>
    </main>
  );
}
