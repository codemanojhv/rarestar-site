import { readFile, writeFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import type { CaseStudy } from "@/types/case-study";
import { getCaseStudiesFilePath } from "@/lib/case-studies-path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isCaseStudy(x: unknown): x is CaseStudy {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    o.id.length > 0 &&
    typeof o.client === "string" &&
    typeof o.type === "string" &&
    typeof o.year === "string" &&
    typeof o.bg === "string" &&
    (o.href === undefined || typeof o.href === "string")
  );
}

function validateList(data: unknown): CaseStudy[] | null {
  if (!Array.isArray(data)) return null;
  const list = data.filter(isCaseStudy);
  if (list.length !== data.length) return null;
  const ids = new Set(list.map((c) => c.id));
  if (ids.size !== list.length) return null;
  return list;
}

/** Public read for dashboard + could be used by client fetch. */
export async function GET() {
  try {
    const raw = await readFile(getCaseStudiesFilePath(), "utf8");
    const parsed = JSON.parse(raw) as unknown;
    const list = validateList(parsed);
    if (!list) {
      return NextResponse.json({ error: "invalid_stored_data" }, { status: 500 });
    }
    return NextResponse.json(list);
  } catch {
    return NextResponse.json({ error: "read_failed" }, { status: 500 });
  }
}

/**
 * Replace entire case study list. Requires `CASE_STUDY_DASHBOARD_SECRET` in env
 * and matching `secret` in JSON body. File write works on local Node; on
 * serverless hosts the filesystem is often read-only — then use the JSON
 * the dashboard offers to copy into `src/data/case-studies.json` and commit.
 */
export async function POST(req: Request) {
  const secret = process.env.CASE_STUDY_DASHBOARD_SECRET;
  if (!secret || secret.length < 8) {
    return NextResponse.json(
      { ok: false, error: "server_misconfigured", hint: "Set CASE_STUDY_DASHBOARD_SECRET in .env.local" },
      { status: 503 }
    );
  }

  let body: { secret?: string; studies?: unknown };
  try {
    body = (await req.json()) as { secret?: string; studies?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (body.secret !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const list = validateList(body.studies);
  if (!list) {
    return NextResponse.json(
      { ok: false, error: "invalid_studies", hint: "Each item needs id, client, type, year, bg. IDs must be unique." },
      { status: 400 }
    );
  }

  const serialized = `${JSON.stringify(list, null, 2)}\n`;

  try {
    await writeFile(getCaseStudiesFilePath(), serialized, "utf8");
    return NextResponse.json({ ok: true, written: true, count: list.length });
  } catch (e) {
    const message = e instanceof Error ? e.message : "write_failed";
    return NextResponse.json(
      {
        ok: true,
        written: false,
        count: list.length,
        payload: list,
        hint: "Filesystem not writable here. Copy `payload` into src/data/case-studies.json and commit.",
        message
      },
      { status: 200 }
    );
  }
}
