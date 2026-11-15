import { NextResponse } from "next/server";

const venueNames: Record<string, string> = { cafe: "Café", shop: "Neighbourhood shop", workspace: "Shared workspace" };
const daypartNames: Record<string, string> = { morning: "Morning", afternoon: "Afternoon", evening: "Evening" };

export async function POST(request: Request) {
  const correlationId = crypto.randomUUID();
  const origin = request.headers.get("origin");
  try {
    if (origin && new URL(origin).host !== request.headers.get("host")) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "Invalid request" }, { status: 415 });
  }

  let data: Record<string, unknown>;
  try {
    if (Number(request.headers.get("content-length") || 0) > 16_000) return NextResponse.json({ error: "Request too large" }, { status: 413 });
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
  const timing = field("timing");
  const budget = field("budget");
  const screenStatus = field("screenStatus");
  const portfolio = field("portfolio");
  const submissionId = field("submissionId");
  let validPortfolio = true;
  if (portfolio) {
    try { validPortfolio = ["http:", "https:"].includes(new URL(portfolio).protocol); } catch { validPortfolio = false; }
  }

  let context = "";
  if (data.context !== null && data.context !== undefined) {
    const value = data.context;
    if (!value || typeof value !== "object" || Array.isArray(value)) return NextResponse.json({ error: "Invalid context" }, { status: 400 });
    const selected = value as Record<string, unknown>;
    const venue = typeof selected.venue === "string" ? selected.venue : "";
    const daypart = typeof selected.daypart === "string" ? selected.daypart : "";
    const sample = typeof selected.sampleMessage === "string" ? selected.sampleMessage.trim() : "";
    if (!Object.hasOwn(venueNames, venue) || !Object.hasOwn(daypartNames, daypart) || sample.length > 60) {
      return NextResponse.json({ error: "Invalid context" }, { status: 400 });
    }
    context = `\nIllustrative context: ${venueNames[venue]} / ${daypartNames[daypart]}${sample ? `\nSample headline: ${sample}` : ""}`;
  }

  if (!name || name.length > 100 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      /[\r\n]/.test(email) || !["campaign", "venue", "careers"].includes(kind) ||
      (kind !== "careers" && (!organization || !location)) || organization.length > 120 || location.length > 120 ||
      timing.length > 120 || budget.length > 120 || !["", "yes", "no", "unsure"].includes(screenStatus) ||
      portfolio.length > 500 || !validPortfolio || message.length < 10 || message.length > 2000 ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) {
    return NextResponse.json({ error: "Please check your details" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_RECEIVER_EMAIL || "hello@rarestar.studio";
  if (!apiKey || !from) {
    console.error(JSON.stringify({ event: "contact_unavailable", correlationId }));
    return NextResponse.json({ error: "Enquiries are temporarily unavailable" }, { status: 503 });
  }

  const details = kind === "careers"
    ? `Portfolio: ${portfolio || "Not provided"}`
    : `${kind === "venue" ? "Venue" : "Organisation"}: ${organization}\nArea: ${location}${kind === "venue" ? `\nExisting screen: ${screenStatus || "Not provided"}` : `\nTiming: ${timing || "Not provided"}\nBudget: ${budget || "Not provided"}`}`;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `contact/${submissionId}` },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Rarestar enquiry: ${kind}`,
        text: `Name: ${name}\nEmail: ${email}\nEnquiry: ${kind}\n${details}${context}\n\n${message}`
      })
    });
    if (!response.ok) throw new Error("Email provider rejected request");
    console.info(JSON.stringify({ event: "contact_accepted", correlationId, kind }));
    return NextResponse.json({ ok: true });
  } catch {
    console.error(JSON.stringify({ event: "contact_failed", correlationId, kind }));
    return NextResponse.json({ error: "Enquiries are temporarily unavailable" }, { status: 503 });
  }
}
