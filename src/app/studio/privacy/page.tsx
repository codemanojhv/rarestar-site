import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | Rarestar Studio",
  description: "How Rarestar Studio handles information sent through its enquiry forms.",
  alternates: { canonical: "https://www.rarestar.studio/privacy" }
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="rs-container privacy-content">
        <p className="rs-label">RARESTAR STUDIO / PRIVACY</p>
        <h1>A note on<br /><em>your details.</em></h1>
        <p className="privacy-intro">This page explains how we handle information you choose to send through the Rarestar Studio and String Theory Ads enquiry forms.</p>
        <section><h2>What you share</h2><p>Depending on your enquiry, we may receive your name, email, organisation or venue, location, message, and optional campaign or portfolio details. If you use the illustrative demo, your selected context and sample headline are included only when shown beside the form.</p></section>
        <section><h2>How we use it</h2><p>We use these details to receive and respond to your enquiry and discuss a possible campaign, venue partnership or collaboration. The form sends your enquiry to the Rarestar team by email.</p></section>
        <section><h2>Service providers</h2><p>Our website is hosted by Vercel, and enquiry emails are processed through Resend. Operational logs record delivery status and a reference ID; our application does not intentionally log the contents of your enquiry.</p></section>
        <section><h2>Questions or requests</h2><p>To ask about the information you sent, or request its correction or deletion, contact <a href="mailto:hello@rarestar.studio">hello@rarestar.studio</a>.</p></section>
        <a href="/#contact" className="rs-link">Back to contact ↗</a>
      </div>
    </main>
  );
}
