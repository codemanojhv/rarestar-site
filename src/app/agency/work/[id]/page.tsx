import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import projects from "@/data/case-studies.json";
import type { CaseStudy } from "@/types/case-study";

/**
 * Dynamic Project Template
 * Renders a high-fidelity project page based on the ID.
 */
export default async function ProjectPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = (projects as CaseStudy[]).find((p) => p.id === id);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-ink pt-32 pb-20 md:pt-48">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-20">
          <Link
            href="/#work"
            className="eyebrow mb-12 inline-flex items-center gap-2 text-paper/40 transition-colors hover:text-ember"
          >
            <span>← Back to work</span>
          </Link>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow text-paper/50 mb-4">
                {project.type} · {project.year}
              </div>
              <h1 className="display text-paper text-[12vw] leading-[0.9] md:text-[7vw]">
                {project.client}
              </h1>
            </div>
          </div>
        </div>

        {/* Hero Image / Placeholder */}
        <div
          className="aspect-[16/9] w-full rounded-3xl mb-24 overflow-hidden border border-paper/10"
          style={{ background: project.bg }}
        />

        {/* Content Grid */}
        <div className="grid gap-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="eyebrow text-ember mb-6 uppercase tracking-widest">
              The Challenge
            </h2>
            <p className="font-sans text-lg text-paper/80 leading-relaxed md:text-xl">
              {project.content.challenge}
            </p>

            <h2 className="eyebrow text-ember mt-16 mb-6 uppercase tracking-widest">
              The Solution
            </h2>
            <p className="font-sans text-lg text-paper/80 leading-relaxed md:text-xl">
              {project.content.solution}
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-2xl border border-paper/10 bg-paper/[0.02] p-8 backdrop-blur-sm">
              <h2 className="eyebrow text-paper/40 mb-8 uppercase tracking-widest">
                Key Results
              </h2>
              <ul className="flex flex-col gap-6">
                {project.content.results.map((res, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-2 h-px w-4 flex-none bg-ember" />
                    <span className="font-sans text-base text-paper">
                      {res}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <a
                href="/#contact"
                className="group flex items-center justify-between border-t border-paper/10 py-6 text-paper transition-colors hover:text-ember"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em]">
                  Start a similar project
                </span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        {project.testimonial && project.testimonial.text && (
          <div className="mt-32 border-t border-paper/10 pt-24">
            <div className="mx-auto max-w-4xl text-center">
              <svg className="mx-auto h-12 w-12 text-ember/20 mb-8" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H7.1c.5-1.7 2-3 3.9-3V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6.9c.5-1.7 2-3 3.9-3V8z" />
              </svg>
              <blockquote className="display text-paper text-3xl leading-snug md:text-5xl italic">
                "{project.testimonial.text}"
              </blockquote>
              <div className="mt-10 flex flex-col items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper">
                  {project.testimonial.author}
                </span>
                <span className="font-sans text-sm text-paper/40 italic">
                  {project.testimonial.role}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id
  }));
}
