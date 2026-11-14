import Image from "next/image";

export default function StudioHome() {
  return (
    <main className="rs">
      <section className="rs-hero">
        <div className="rs-container">
          <div className="rs-hero-top"><span>INDEPENDENT VENTURE STUDIO</span><span>BENGALURU, INDIA &nbsp; / &nbsp; 12.97° N</span></div>
          <div className="rs-hero-grid">
            <div>
              <p className="rs-label"><span /> IDEAS WORTH BRINGING TO LIFE</p>
              <h1>Ideas with<br /><em>somewhere</em><br />to go<span className="rs-red">.</span></h1>
              <p className="rs-hero-text">Rarestar is an independent venture studio in Bengaluru. Right now, we&apos;re building String Theory Ads: a new idea for local advertising.</p>
              <div className="rs-actions"><a className="rs-button" href="https://stringtheoryads.in">Explore String Theory Ads <span aria-hidden="true">↗</span></a><a className="rs-link rs-link-light" href="#studio">Get to know us <span aria-hidden="true">↓</span></a></div>
            </div>
            <a className="rs-venture-window" href="https://stringtheoryads.in" aria-label="Explore String Theory Ads">
              <div className="rs-window-top"><span>THE CURRENT VENTURE</span><span>↗</span></div>
              <div className="rs-window-art"><div className="rs-window-orbit rs-orbit-one" /><div className="rs-window-orbit rs-orbit-two" /><Image src="/brand/string-theory-ads-mark.png" alt="" width={1081} height={1081} priority /></div>
              <div className="rs-window-bottom"><div><span>01 / IN DEVELOPMENT</span><strong>String Theory Ads</strong></div><span>BENGALURU<br />PILOT PLANNED</span></div>
            </a>
          </div>
          <div className="rs-hero-bottom"><span>MAKE THE IDEA REAL.</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>
      </section>

      <section id="studio" className="rs-statement">
        <div className="rs-container rs-split"><p className="rs-label">01 / THE STUDIO</p><div><h2>Curious about<br />what <em>could be.</em></h2><p>We start with a real-world question, follow it somewhere interesting, and build towards an answer. Rarestar is a small studio with a close connection to the work and the people it&apos;s for.</p></div></div>
      </section>

      <section id="venture" className="rs-feature">
        <div className="rs-container">
          <div className="rs-feature-top"><p className="rs-label">02 / WHAT WE&apos;RE BUILDING</p><p>ONE FOCUSED VENTURE &nbsp; / &nbsp; 01</p></div>
          <div className="rs-feature-grid">
            <div><p className="rs-blue-label">IN DEVELOPMENT · BENGALURU PILOT PLANNED</p><h2>String<br />Theory <em>Ads.</em></h2><p>What if a message felt more at home in the place you saw it? We&apos;re developing a local-first indoor advertising product around that idea.</p><a className="rs-button rs-button-blue" href="https://stringtheoryads.in">Explore the venture <span aria-hidden="true">↗</span></a></div>
            <div className="rs-feature-visual"><div className="rs-feature-ring" /><Image src="/brand/string-theory-ads-wordmark.png" alt="String Theory" width={2731} height={1081} /><span>PLACE &nbsp; / &nbsp; MOMENT &nbsp; / &nbsp; MESSAGE</span></div>
          </div>
        </div>
      </section>

      <section id="process" className="rs-process">
        <div className="rs-container">
          <div className="rs-split"><p className="rs-label">03 / HOW WE WORK</p><div><h2>Thoughtful ideas.<br /><em>Actual work.</em></h2><p>We like a good question. We like getting closer to an answer even more.</p></div></div>
          <div className="rs-process-grid">
            <article><span>01</span><h3>Notice.</h3><p>Pay attention to a problem and the people who live with it.</p></article>
            <article><span>02</span><h3>Make.</h3><p>Turn an idea into something specific enough to experience.</p></article>
            <article><span>03</span><h3>Learn.</h3><p>Bring it into the real world, listen closely and keep improving.</p></article>
          </div>
        </div>
      </section>

      <section id="team" className="rs-team">
        <div className="rs-container rs-split"><p className="rs-label">04 / THE PEOPLE</p><div><h2>Close to<br /><em>the work.</em></h2><p>We&apos;re based in Bengaluru, building String Theory Ads alongside the conversations that will shape its first local pilot.</p><a className="rs-link" href="https://stringtheoryads.in/#team">Meet the venture <span aria-hidden="true">↗</span></a></div></div>
      </section>

      <section id="careers" className="rs-careers">
        <div className="rs-container rs-split"><p className="rs-label">05 / CAREERS</p><div><h2>Good things start<br /><em>with good people.</em></h2><p>Curious about working together? Tell us what you make and what you&apos;d like to explore. We don&apos;t have open roles listed right now, but we&apos;re always glad to meet thoughtful people.</p><a className="rs-link rs-link-light" href="mailto:hello@rarestar.studio?subject=Careers%20at%20Rarestar">Share your work <span aria-hidden="true">↗</span></a></div></div>
      </section>

      <section id="contact" className="rs-contact">
        <div className="rs-container"><p className="rs-label">06 / SAY HELLO</p><div className="rs-contact-content"><h2>Let&apos;s make<br /><em>something</em> happen.</h2><div><p>Have an idea or want to get to know the studio?</p><a className="rs-button rs-button-dark" href="mailto:hello@rarestar.studio">hello@rarestar.studio <span aria-hidden="true">↗</span></a><a className="rs-link" href="https://stringtheoryads.in/#contact">For String Theory enquiries ↗</a></div></div></div>
      </section>
    </main>
  );
}
