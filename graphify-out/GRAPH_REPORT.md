# Graph Report - rarestar-site  (2026-06-26)

## Corpus Check
- 63 files · ~153,983 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 243 nodes · 268 edges · 28 communities (18 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6051897b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `Rarestar.studio — Standalone Deployment Guide` - 11 edges
3. `scrollToId()` - 7 edges
4. `CaseStudy` - 6 edges
5. `scripts` - 5 edges
6. `getSiteFromHostname()` - 5 edges
7. `GRAPHIFY — rarestar.studio codebase context` - 5 edges
8. `getCaseStudiesFilePath()` - 4 edges
9. `getLenis()` - 4 edges
10. `validateList()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `manifest()` --calls--> `getSiteFromHostname()`  [EXTRACTED]
  src/app/manifest.ts → src/lib/subdomain.ts
- `middleware()` --calls--> `getSiteFromHostname()`  [EXTRACTED]
  src/middleware.ts → src/lib/subdomain.ts
- `GET()` --calls--> `getCaseStudiesFilePath()`  [EXTRACTED]
  src/app/api/case-studies/route.ts → src/lib/case-studies-path.ts
- `POST()` --calls--> `getCaseStudiesFilePath()`  [EXTRACTED]
  src/app/api/case-studies/route.ts → src/lib/case-studies-path.ts
- `HeroContent()` --calls--> `scrollToId()`  [EXTRACTED]
  src/components/agency/Hero.tsx → src/lib/lenisSingleton.ts

## Import Cycles
- None detected.

## Communities (28 total, 10 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (15): NAV_LINKS, SOCIAL_LINKS, HeroContent(), splitChars(), jsonLd, metadata, LINKS, MobileMenuProps (+7 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (6): steps, Services, stack, TestimonialCardProps, testimonials, CaseStudy

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (24): dependencies, gsap, lenis, next, react, react-dom, three, devDependencies (+16 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (4): FieldProps, Status, MagneticProps, STEPS

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): compilerOptions, allowJs, baseUrl, esModuleInterop, ignoreDeprecations, incremental, isolatedModules, jsx (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (15): 1. Extract from Monorepo, 2. Update package.json, 3. Environment Variables (Optional), 4. Local Test, 5. Deploy to Vercel, 6. Post-Deploy Checklist, 7. Domain Setup, 8. Troubleshooting (+7 more)

### Community 6 - "Community 6"
Cohesion: 0.31
Nodes (7): manifest(), getSiteFromHostname(), config, middleware(), SiteConfig, SiteKey, SITES

### Community 7 - "Community 7"
Cohesion: 0.18
Nodes (3): CursorMode, jsonLd, metadata

### Community 8 - "Community 8"
Cohesion: 0.20
Nodes (9): 1. Global Components (Layout), 2. Homepage Sections (`src/app/page.tsx`), Case Study Dashboard, Contact Engine, Design Tokens & Utilities, Feature Systems, GRAPHIFY — rarestar.studio codebase context, Technical Core (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.29
Nodes (5): fraunces, inter, jetbrains, metadata, viewport

### Community 11 - "Community 11"
Cohesion: 0.52
Nodes (4): GET(), POST(), validateList(), getCaseStudiesFilePath()

### Community 12 - "Community 12"
Cohesion: 0.53
Nodes (4): loadAssetDataUrl(), loadFontFile(), OpenGraphImage(), size

### Community 13 - "Community 13"
Cohesion: 0.60
Nodes (3): ensureCtx(), playTick(), playWhoosh()

### Community 14 - "Community 14"
Cohesion: 0.67
Nodes (3): ContactBody, isValidEmail(), POST()

## Knowledge Gaps
- **98 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+93 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CaseStudy` connect `Community 1` to `Community 11`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `scrollToId()` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _98 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0773109243697479 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07741935483870968 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09486166007905138 - nodes in this community are weakly interconnected._