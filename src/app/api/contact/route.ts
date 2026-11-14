import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  try {
    if (origin && new URL(origin).host !== request.headers.get("host")) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Invalid request" }, { status: 415 });
  }

  let data: Record<string, unknown>;
  try {
    const body = await request.text();
    if (body.length > 8_000) return NextResponse.json({ error: "Request too large" }, { status: 413 });
    const parsed: unknown = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    data = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // shortcut: the honeypot filters simple bots; add shared rate limiting if abuse appears.
  if (data.website) return NextResponse.json({ ok: true });

  const field = (key: string) => typeof data[key] === "string" ? (data[key] as string).trim() : "";
  const name = field("name");
  const email = field("email");
  const organization = field("organization");
  const location = field("location");
  const message = field("message");
  const kind = field("kind");

  if (!name || name.length > 100 || !organization || organization.length > 120 ||
      email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      /[\r\n]/.test(email) || location.length > 120 || message.length < 10 ||
      message.length > 2000 || !["brand", "venue", "other"].includes(kind)) {
    return NextResponse.json({ error: "Please check your details" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json({ error: "Enquiries are temporarily unavailable" }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: ["hello@rarestar.studio"],
        reply_to: email,
        subject: `String Theory Ads enquiry: ${kind}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany or venue: ${organization}\nEnquiry: ${kind}\nLocation: ${location || "Not provided"}\n\n${message}`
      })
    });
    if (!response.ok) throw new Error("Email provider rejected request");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Enquiries are temporarily unavailable" }, { status: 503 });
  }
}
