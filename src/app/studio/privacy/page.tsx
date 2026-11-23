import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | Rarestar Studio",
  description: "How Rarestar Studio handles information sent by email.",
  alternates: { canonical: "https://www.rarestar.studio/privacy" }
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-content">
        <p className="privacy-label">RARESTAR STUDIO / PRIVACY</p>
        <h1>A note on<br /><em>your details.</em></h1>
        <p className="privacy-intro">This page explains how we handle information you choose to send to Rarestar Studio.</p>
        <section><h2>What you share</h2><p>When you email us, we receive your email address and anything you choose to include in your message. We may also hold information submitted through an earlier enquiry form.</p></section>
        <section><h2>How we use it</h2><p>We use these details to respond to your enquiry and discuss a possible campaign, venue partnership or collaboration.</p></section>
        <section><h2>Website hosting</h2><p>Our website is hosted by Vercel.</p></section>
        <section><h2>Questions or requests</h2><p>To ask about the information you sent, or request its correction or deletion, contact <a href="mailto:hello@rarestar.studio">hello@rarestar.studio</a>.</p></section>
        <a href="/" className="privacy-home">Back to Rarestar Studio ↗</a>
      </div>
    </main>
  );
}
