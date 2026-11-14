"use client";

import { useEffect, useState, type FormEvent } from "react";

export default function ContactForm() {
  const [kind, setKind] = useState("brand");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    function chooseEnquiry(event: MouseEvent) {
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[data-enquiry]");
      if (link?.dataset.enquiry) setKind(link.dataset.enquiry);
    }
    document.addEventListener("click", chooseEnquiry);
    return () => document.removeEventListener("click", chooseEnquiry);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Unable to send");
      form.reset();
      setKind("brand");
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
        <label>Work email <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label>
        <label>Company or venue <input name="organization" autoComplete="organization" required maxLength={120} placeholder="Where you work" /></label>
        <label>I&apos;m interested in
          <select name="kind" value={kind} onChange={(event) => setKind(event.target.value)}>
            <option value="brand">Advertising with String Theory</option>
            <option value="venue">A venue partnership</option>
            <option value="other">Something else</option>
          </select>
        </label>
      </div>
      <label>Neighbourhood or city <span className="sta-optional">Optional</span>
        <input name="location" maxLength={120} placeholder="Where do you have in mind?" />
      </label>
      <label>Tell us a little about it
        <textarea name="message" required minLength={10} maxLength={2000} rows={4} placeholder="A few details about your idea, space or campaign." />
      </label>
      <div className="sta-honeypot" aria-hidden="true">
        <label>Leave this field empty <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="sta-form-bottom">
        <div>
          <p>We&apos;ll use these details to respond to your enquiry.</p>
          <p role="status" aria-live="polite" className="sta-form-status">
            {status === "sent" && "Thank you. Your enquiry has been sent."}
            {status === "error" && <>We couldn&apos;t send that. Please email <a href="mailto:hello@rarestar.studio">hello@rarestar.studio</a>.</>}
          </p>
        </div>
        <button className="sta-button sta-button-light" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send your enquiry"} <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}
