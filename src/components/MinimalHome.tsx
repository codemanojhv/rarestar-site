import Image from "next/image";

export default function MinimalHome({ product = false }: { product?: boolean }) {
  return (
    <main className="minimal">
      <section className="minimal-inner" aria-labelledby="intro-title">
        <div className="minimal-header">
          <a href="https://www.rarestar.studio/" aria-label="Rarestar Studio home">
            <Image className="minimal-studio-logo" src="/brand/studio-lockup-paper.png" alt="Rarestar Studio" width={2516} height={631} sizes="155px" priority />
          </a>
          <span>Bengaluru, India</span>
        </div>

        <div className="minimal-content">
          <div className="minimal-copy">
            <p className="minimal-label">{product ? "A Rarestar Studio venture" : "An independent venture studio"}</p>
            <h1 id="intro-title">
              {product ? <>Local attention,<br /><em>in context.</em></> : <>Ideas for<br /><em>the everyday.</em></>}
            </h1>
            <p className="minimal-description">
              {product
                ? "String Theory Ads is a local-first indoor advertising product in development at Rarestar Studio."
                : "Rarestar is a Bengaluru venture studio building String Theory Ads, a local-first indoor advertising product."}
            </p>
            <a className="minimal-contact" href="mailto:hello@rarestar.studio">Get in touch <span aria-hidden="true">↗</span></a>
          </div>

          <div className="minimal-venture">
            <div className="minimal-venture-top"><span>Our venture</span><span>01 / 01</span></div>
            <Image className="minimal-venture-logo" src="/brand/string-theory-ads-wordmark.png" alt="String Theory" width={2731} height={1081} sizes="(max-width: 800px) 90vw, 40vw" priority />
            <div className="minimal-venture-bottom"><span>String Theory Ads</span><span>By Rarestar Studio</span></div>
          </div>
        </div>

        <div className="minimal-footer">
          <span>© {new Date().getFullYear()} Rarestar Studio</span>
          <div>
            <a href={product ? "https://www.rarestar.studio/" : "https://stringtheoryads.in/"}>
              {product ? "Rarestar Studio" : "String Theory Ads"} <span aria-hidden="true">↗</span>
            </a>
            <a href="https://www.rarestar.studio/privacy">Privacy</a>
          </div>
        </div>
      </section>
    </main>
  );
}
