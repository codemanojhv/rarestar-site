"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { dayparts, useExperience, venues, type EnquiryKind } from "./ExperienceContext";

export default function ContactForm() {
  const [kind, setKind] = useState<EnquiryKind>("campaign");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const submission = useRef<{ fingerprint: string; id: string } | null>(null);
  const { selection, touched } = useExperience();

  useEffect(() => {
    function chooseEnquiry(event: MouseEvent) {
      const target = event.target;
      const link = target instanceof Element ? target.closest<HTMLAnchorElement>("a[data-enquiry]") : null;
      if (link?.dataset.enquiry === "campaign" || link?.dataset.enquiry === "venue" || link?.dataset.enquiry === "careers") {
        setKind(link.dataset.enquiry);
        setStatus("idle");
      }
    }
    document.addEventListener("click", chooseEnquiry);
    return () => document.removeEventListener("click", chooseEnquiry);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const payload = { ...values, context: touched ? selection : null };
    const fingerprint = JSON.stringify(payload);
    if (!submission.current || submission.current.fingerprint !== fingerprint) {
      submission.current = { fingerprint, id: crypto.randomUUID() };
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, submissionId: submission.current.id })
      });
      if (!response.ok) throw new Error("Unable to send");
      form.reset();
      submission.current = null;
      setKind("campaign");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="sta-form" method="post" action="/api/contact" onSubmit={submit}>
      <noscript><p className="sta-no-script">To get in touch without JavaScript, email <a href="mailto:hello@rarestar.studio">hello@rarestar.studio</a>.</p></noscript>
      <div className="sta-form-grid">
        <label>Your name <input name="name" autoComplete="name" required maxLength={100} placeholder="Name" /></label>
        <label>Email <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
        <label>I&apos;m interested in
          <select name="kind" value={kind} onChange={(event) => { setKind(event.target.value as EnquiryKind); setStatus("idle"); }}>
            <option value="campaign">Discussing a campaign</option>
            <option value="venue">A venue partnership</option>
            <option value="careers">Careers and collaboration</option>
          </select>
        </label>
        {kind !== "careers" && <label>{kind === "venue" ? "Venue name" : "Organisation"} <input name="organization" autoComplete="organization" required maxLength={120} placeholder={kind === "venue" ? "Your venue" : "Your organisation"} /></label>}
        {kind !== "careers" && <label>{kind === "venue" ? "Venue area" : "Target area"} <input name="location" required maxLength={120} placeholder="Neighbourhood or city" /></label>}
        {kind === "campaign" && <label>Timing <span className="sta-optional">Optional</span><input name="timing" maxLength={120} placeholder="When are you thinking?" /></label>}
        {kind === "campaign" && <label>Budget <span className="sta-optional">Optional</span><input name="budget" maxLength={120} placeholder="A rough range, if known" /></label>}
        {kind === "venue" && <label>Does your venue have a screen? <span className="sta-optional">Optional</span><select name="screenStatus" defaultValue=""><option value="">Select one</option><option value="yes">Yes</option><option value="no">No</option><option value="unsure">Not sure</option></select></label>}
        {kind === "careers" && <label>Portfolio or profile URL <span className="sta-optional">Optional</span><input name="portfolio" type="url" maxLength={500} placeholder="https://" /></label>}
      </div>
      <label>Your message <textarea name="message" required minLength={10} maxLength={2000} rows={4} placeholder="Tell us a little about your idea, space or work." /></label>
      {touched && <p className="sta-form-context">Illustrative context included: {venues[selection.venue]} · {dayparts[selection.daypart]}{selection.sampleMessage ? ` · “${selection.sampleMessage}”` : ""}</p>}
      <div className="sta-honeypot" aria-hidden="true"><label>Leave this field empty <input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="sta-form-bottom">
        <div>
          <p>We&apos;ll use these details to respond to your enquiry. Read our <a href="https://www.rarestar.studio/privacy">privacy information</a>.</p>
          <p role="status" aria-live="polite" className="sta-form-status">
            {status === "sent" && "Thank you. Your enquiry has been sent."}
            {status === "error" && <>We couldn&apos;t send that. Please retry or email <a href="mailto:hello@rarestar.studio">hello@rarestar.studio</a>.</>}
          </p>
        </div>
        <button className="sta-button sta-button-light" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : status === "error" ? "Retry enquiry" : "Send your enquiry"} <span aria-hidden="true">↗</span></button>
      </div>
      <p className="sta-direct-email">Prefer email? <a href="mailto:hello@rarestar.studio">hello@rarestar.studio ↗</a></p>
    </form>
  );
}
