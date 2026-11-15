"use client";

import { ContextLink } from "@/components/string-theory/ExperienceContext";

export default function MobileNav({ className, links }: { className: string; links: [string, string][] }) {
  return (
    <details className={className}>
      <summary aria-label="Toggle navigation"><span></span><span></span></summary>
      <nav aria-label="Mobile navigation" onClick={(event) => {
        if ((event.target as Element).closest("a")) event.currentTarget.closest("details")?.removeAttribute("open");
      }}>
        {links.map(([label, href]) => href.startsWith("https://")
          ? <ContextLink href={href} key={href}>{label}</ContextLink>
          : <a href={href} key={href}>{label}</a>)}
      </nav>
    </details>
  );
}
