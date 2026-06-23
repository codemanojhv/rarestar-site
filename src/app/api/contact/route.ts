import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * For now this just validates the payload, logs server-side, and returns ok.
 * When we wire up an email provider (Resend is the plan — free tier handles
 * our volume for the next 12+ months), drop the API key into env as
 * RESEND_API_KEY and replace the `TODO` block below with a send call.
 *
 * Keeping this endpoint intentionally thin + dependency-free so the inline
 * form already works end-to-end in production today. A visitor submitting
 * gets a confirmation; we pick up the lead from Vercel logs until Resend is
 * plugged in.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ContactBody {
  name?: string;
  email?: string;
  project?: string;
  message?: string;
  /** Honeypot — if filled, it's a bot. */
  company?: string;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: silently succeed so bots don't retry.
  if (body.company && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const project = (body.project ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || name.length < 2) {
    return NextResponse.json({ ok: false, error: "name_required" }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "email_invalid" }, { status: 400 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ ok: false, error: "message_too_short" }, { status: 400 });
  }

  // TODO(ramp): swap for Resend when RESEND_API_KEY is provisioned.
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "RareStar <noreply@rarestar.studio>",
  //     to: "hello@rarestar.studio",
  //     replyTo: email,
  //     subject: `New lead from ${name}${project ? " · " + project : ""}`,
  //     text: `${message}\n\n— ${name} (${email})`
  //   });
  console.info("[contact] new lead", { name, email, project, messageLen: message.length });

  return NextResponse.json({ ok: true });
}
