import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WaitlistRole = "patient" | "therapist";

interface WaitlistBody {
  email?: unknown;
  role?: unknown;
}

function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isWaitlistRole(value: unknown): value is WaitlistRole {
  return value === "patient" || value === "therapist";
}

export async function POST(request: Request) {
  let body: WaitlistBody;
  try {
    body = ((await request.json()) as WaitlistBody | null) ?? {};
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const role = body.role;

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "email_invalid" }, { status: 400 });
  }
  if (!isWaitlistRole(role)) {
    return NextResponse.json({ ok: false, error: "role_invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "waitlist_not_configured" }, { status: 503 });
  }

  const headers = {
    authorization: `Bearer ${apiKey}`,
    "content-type": "application/json"
  };
  let contactResponse: Response;
  try {
    contactResponse = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        unsubscribed: false,
        properties: { role, source: "rehai-site" }
      })
    });
  } catch (error) {
    console.error("[waitlist] contact request failed", error);
    return NextResponse.json({ ok: false, error: "storage_failed" }, { status: 502 });
  }

  if (!contactResponse.ok && contactResponse.status !== 409) {
    console.error("[waitlist] contact storage failed", { status: contactResponse.status });
    return NextResponse.json({ ok: false, error: "storage_failed" }, { status: 502 });
  }

  let notified = false;
  const receiver = process.env.WAITLIST_RECEIVER_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (receiver && sender) {
    try {
      const notificationResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers,
        body: JSON.stringify({
          from: sender,
          to: [receiver],
          subject: `New Rehai ${role} waitlist signup`,
          text: `Role: ${role}\nEmail: ${email}\nSource: Rehai waitlist`
        })
      });
      notified = notificationResponse.ok;
      if (!notified) console.error("[waitlist] notification failed", { status: notificationResponse.status });
    } catch (error) {
      console.error("[waitlist] notification request failed", error);
    }
  }

  return NextResponse.json({ ok: true, existing: contactResponse.status === 409, notified });
}
