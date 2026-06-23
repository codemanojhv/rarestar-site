"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { CaseStudy } from "@/types/case-study";

const emptyRow = (): CaseStudy => ({
  id: `case-${Date.now()}`,
  client: "",
  type: "",
  year: new Date().getFullYear().toString(),
  bg: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #3a3a5e 100%)",
  description: "",
  content: {
    challenge: "",
    solution: "",
    results: [""]
  },
  testimonial: {
    text: "",
    author: "",
    role: ""
  }
});

export default function CaseStudiesDashboardPage() {
  const [rows, setRows] = useState<CaseStudy[]>([]);
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/case-studies", { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as CaseStudy[];
      setRows(data);
    } catch {
      setMessage("Could not load case studies.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const update = (i: number, patch: Partial<CaseStudy>) => {
    setRows((prev) => prev.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  };

  const addRow = () => setRows((prev) => [...prev, emptyRow()]);
  const removeRow = (i: number) => setRows((prev) => prev.filter((_, j) => j !== i));

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/case-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, studies: rows })
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        hint?: string;
        written?: boolean;
        payload?: CaseStudy[];
        message?: string;
      };

      if (!res.ok) {
        setMessage(
          data.error === "unauthorized"
            ? "Wrong secret."
            : data.error === "server_misconfigured"
              ? "Set CASE_STUDY_DASHBOARD_SECRET in .env.local (8+ characters)."
              : (data.hint ?? data.error ?? `Save failed (${res.status}).`)
        );
        setSaving(false);
        return;
      }

      if (data.written) {
        setMessage(`Saved ${rows.length} case study(ies) to src/data/case-studies.json.`);
        await load();
      } else if (data.payload) {
        const blob = new Blob([JSON.stringify(data.payload, null, 2) + "\n"], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "case-studies.json";
        a.click();
        URL.revokeObjectURL(a.href);
        setMessage(
          data.hint ??
            "Server could not write the file. Downloaded case-studies.json — replace src/data/case-studies.json and commit."
        );
      } else {
        setMessage(data.hint ?? "Unexpected response.");
      }
    } catch {
      setMessage("Network error while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink px-4 py-10 text-paper md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-paper/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">Dashboard</p>
            <h1 className="display mt-2 text-3xl md:text-4xl">Case studies</h1>
            <p className="mt-3 max-w-xl text-sm text-paper/65">
              Edit tiles shown in the Work section. Save writes <code className="font-mono text-ember/90">src/data/case-studies.json</code> when
              run locally with <code className="font-mono text-ember/90">CASE_STUDY_DASHBOARD_SECRET</code> set. On read-only hosts, you get a
              JSON download instead.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/60 hover:text-paper"
          >
            ← Back to site
          </Link>
        </div>

        <div className="mb-8 space-y-3 rounded-xl border border-paper/10 bg-paper/[0.03] p-4">
          <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">Dashboard secret</label>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="From .env.local: CASE_STUDY_DASHBOARD_SECRET"
            className="w-full rounded-lg border border-paper/15 bg-ink px-3 py-2 font-sans text-sm text-paper placeholder:text-paper/30 focus:border-ember focus:outline-none"
            autoComplete="off"
          />
        </div>

        {loading ? (
          <p className="font-mono text-xs text-paper/50">Loading…</p>
        ) : (
          <div className="space-y-6">
            {rows.map((row, i) => (
              <div
                key={`${row.id}-${i}`}
                className="grid gap-4 rounded-xl border border-paper/10 bg-paper/[0.02] p-4 md:grid-cols-2"
              >
                <div className="space-y-3 md:col-span-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">Case {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeRow(i)}
                      className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember/80 hover:text-ember"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <Field label="ID (slug, unique)" value={row.id} onChange={(v) => update(i, { id: v })} mono />
                <Field label="Client / title on card" value={row.client} onChange={(v) => update(i, { client: v })} />
                <Field label="Type line" value={row.type} onChange={(v) => update(i, { type: v })} />
                <Field label="Year" value={row.year} onChange={(v) => update(i, { year: v })} />
                <div className="md:col-span-2">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">Background (CSS or Image Path)</label>
                  <textarea
                    value={row.bg}
                    onChange={(e) => update(i, { bg: e.target.value })}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-paper/15 bg-ink px-3 py-2 font-mono text-xs text-paper focus:border-ember focus:outline-none"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-3">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">Project Image / Thumbnail</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file || !secret) return;
                        
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("secret", secret);
                        
                        try {
                          const res = await fetch("/api/upload", { method: "POST", body: formData });
                          const data = await res.json();
                          if (data.success) {
                            update(i, { image: data.url, bg: `url(${data.url}) center/cover no-repeat` });
                          } else {
                            alert("Upload failed: " + data.error);
                          }
                        } catch (err) {
                          alert("Upload error.");
                        }
                      }}
                      className="block w-full text-xs text-paper/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-mono file:uppercase file:tracking-wider file:bg-ember/20 file:text-ember hover:file:bg-ember/30"
                    />
                    {row.image && (
                      <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest">Uploaded ✓</span>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">Preview</label>
                  <div
                    className="mt-2 h-32 w-full max-w-md rounded-lg border border-paper/10 overflow-hidden"
                    style={{ background: row.bg || "#1a1a1a" }}
                  >
                    {row.image && !row.bg.includes("url") && (
                      <img src={row.image} alt="Preview" className="h-full w-full object-cover" />
                    )}
                  </div>
                </div>
                <Field
                  label="Link (external, optional)"
                  value={row.href ?? ""}
                  onChange={(v) => update(i, { href: v.trim() ? v.trim() : undefined })}
                  placeholder="https://…"
                />
                
                <div className="md:col-span-2 space-y-4 pt-4 border-t border-paper/10">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember/80">Page Content</h4>
                  
                  <Field 
                    label="Summary Description" 
                    value={row.description} 
                    onChange={(v) => update(i, { description: v })} 
                  />
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">Challenge</label>
                      <textarea
                        value={row.content.challenge}
                        onChange={(e) => update(i, { content: { ...row.content, challenge: e.target.value } })}
                        rows={4}
                        className="mt-1 w-full rounded-lg border border-paper/15 bg-ink px-3 py-2 font-sans text-sm text-paper focus:border-ember focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">Solution</label>
                      <textarea
                        value={row.content.solution}
                        onChange={(e) => update(i, { content: { ...row.content, solution: e.target.value } })}
                        rows={4}
                        className="mt-1 w-full rounded-lg border border-paper/15 bg-ink px-3 py-2 font-sans text-sm text-paper focus:border-ember focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">Results (One per line)</label>
                    <textarea
                      value={row.content.results.join("\n")}
                      onChange={(e) => update(i, { content: { ...row.content, results: e.target.value.split("\n") } })}
                      rows={3}
                      placeholder="2.4s improvement in LCP&#10;100% increase in conversion"
                      className="w-full rounded-lg border border-paper/15 bg-ink px-3 py-2 font-mono text-xs text-paper focus:border-ember focus:outline-none"
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-paper/10">
                    <h5 className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember/60">Project Testimonial</h5>
                    <div className="space-y-3">
                      <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">Quote Text</label>
                      <textarea
                        value={row.testimonial?.text ?? ""}
                        onChange={(e) => update(i, { testimonial: { ...(row.testimonial || { author: "", role: "" }), text: e.target.value } })}
                        rows={3}
                        className="w-full rounded-lg border border-paper/15 bg-ink px-3 py-2 font-sans text-sm text-paper focus:border-ember focus:outline-none"
                      />
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field 
                          label="Author Name" 
                          value={row.testimonial?.author ?? ""} 
                          onChange={(v) => update(i, { testimonial: { ...(row.testimonial || { text: "", role: "" }), author: v } })} 
                        />
                        <Field 
                          label="Author Role" 
                          value={row.testimonial?.role ?? ""} 
                          onChange={(v) => update(i, { testimonial: { ...(row.testimonial || { text: "", author: "" }), role: v } })} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addRow}
              className="w-full rounded-lg border border-dashed border-paper/25 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/55 hover:border-paper/40 hover:text-paper/80"
            >
              + Add case study
            </button>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-4 border-t border-paper/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            disabled={saving || loading}
            onClick={() => void save()}
            className="rounded-full bg-ember px-8 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          <button
            type="button"
            onClick={() => void load()}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50 hover:text-paper/80"
          >
            Reload from disk
          </button>
        </div>

        {message ? <p className="mt-6 text-sm text-paper/75">{message}</p> : null}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  mono,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  mono?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-1 w-full rounded-lg border border-paper/15 bg-ink px-3 py-2 text-sm text-paper placeholder:text-paper/30 focus:border-ember focus:outline-none ${mono ? "font-mono" : "font-sans"}`}
      />
    </div>
  );
}
