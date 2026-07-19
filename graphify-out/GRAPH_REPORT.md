# Graph Report - rarestar-site  (2026-07-20)

## Corpus Check
- 137 files · ~543,895 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 636 nodes · 740 edges · 100 communities (85 shown, 15 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5d4e69c2`
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
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 88|Community 88]]
- [[_COMMUNITY_Community 89|Community 89]]
- [[_COMMUNITY_Community 90|Community 90]]
- [[_COMMUNITY_Community 91|Community 91]]
- [[_COMMUNITY_Community 92|Community 92]]
- [[_COMMUNITY_Community 93|Community 93]]
- [[_COMMUNITY_Community 94|Community 94]]
- [[_COMMUNITY_Community 95|Community 95]]
- [[_COMMUNITY_Community 96|Community 96]]
- [[_COMMUNITY_Community 97|Community 97]]
- [[_COMMUNITY_Community 99|Community 99]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `scrollToId()` - 12 edges
3. `CaseStudy` - 12 edges
4. `scripts` - 11 edges
5. `Rarestar.studio — Standalone Deployment Guide` - 11 edges
6. `main()` - 9 edges
7. `getSiteFromHostname()` - 8 edges
8. `getLenis()` - 7 edges
9. `getCaseStudiesFilePath()` - 6 edges
10. `GRAPHIFY — rarestar.studio codebase context` - 5 edges

## Surprising Connections (you probably didn't know these)
- `GET()` --calls--> `getCaseStudiesFilePath()`  [EXTRACTED]
  src/app/api/case-studies/route.ts → src/lib/case-studies-path.ts
- `POST()` --calls--> `getCaseStudiesFilePath()`  [EXTRACTED]
  src/app/api/case-studies/route.ts → src/lib/case-studies-path.ts
- `manifest()` --calls--> `getSiteFromHostname()`  [EXTRACTED]
  src/app/manifest.ts → src/lib/subdomain.ts
- `HeroContent()` --calls--> `scrollToId()`  [EXTRACTED]
  src/components/agency/Hero.tsx → src/lib/lenisSingleton.ts
- `middleware()` --calls--> `getSiteFromHostname()`  [EXTRACTED]
  src/middleware.ts → src/lib/subdomain.ts

## Import Cycles
- None detected.

## Communities (100 total, 15 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (18): Footer(), NAV_LINKS, SOCIAL_LINKS, Hero(), HeroContent(), splitChars(), HeroVideo(), LINKS (+10 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (25): Manifesto(), Home(), Process(), steps, Services, stack, StackMarquee(), TestimonialCard() (+17 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (34): dependencies, framer-motion, gsap, lenis, lucide-react, next, react, react-dom (+26 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (18): CalendarIcon(), Contact(), Field(), FieldProps, humanError(), Status, Magnetic(), MagneticProps (+10 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): compilerOptions, allowJs, baseUrl, esModuleInterop, ignoreDeprecations, incremental, isolatedModules, jsx (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (15): 1. Extract from Monorepo, 2. Update package.json, 3. Environment Variables (Optional), 4. Local Test, 5. Deploy to Vercel, 6. Post-Deploy Checklist, 7. Domain Setup, 8. Troubleshooting (+7 more)

### Community 6 - "Community 6"
Cohesion: 0.30
Nodes (7): manifest(), getSiteFromHostname(), config, middleware(), SiteConfig, SiteKey, SITES

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (19): AgencyLayout(), jsonLd, metadata, ensureCtx(), playTick(), playWhoosh(), SoundDesign(), Cursor() (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.20
Nodes (9): 1. Global Components (Layout), 2. Homepage Sections (`src/app/page.tsx`), Case Study Dashboard, Contact Engine, Design Tokens & Utilities, Feature Systems, GRAPHIFY — rarestar.studio codebase context, Technical Core (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.40
Nodes (4): Architecture, Citations, Entrypoints, Knowledge System

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (8): fraunces, inter, jetbrains, manrope, metadata, playfair, RootLayout(), viewport

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (4): Citations, Implementation, Producer, Update Flow

### Community 12 - "Community 12"
Cohesion: 0.50
Nodes (4): loadAssetDataUrl(), loadFontFile(), OpenGraphImage(), size

### Community 14 - "Community 14"
Cohesion: 0.70
Nodes (3): ContactBody, isValidEmail(), POST()

### Community 28 - "Community 28"
Cohesion: 0.11
Nodes (18): RehaiIconName, benefits, capabilities, Capability, Challenge, challenges, fade(), faq (+10 more)

### Community 29 - "Community 29"
Cohesion: 0.17
Nodes (17): classify(), conceptPathForSource(), frontmatter(), ignoredDirs, importsFrom(), main(), now, okfDir (+9 more)

### Community 30 - "Community 30"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 33 - "Community 33"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 34 - "Community 34"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 35 - "Community 35"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 36 - "Community 36"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 37 - "Community 37"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 38 - "Community 38"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 39 - "Community 39"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 40 - "Community 40"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 41 - "Community 41"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 42 - "Community 42"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 43 - "Community 43"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 44 - "Community 44"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 45 - "Community 45"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 46 - "Community 46"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 47 - "Community 47"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 48 - "Community 48"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 49 - "Community 49"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 50 - "Community 50"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 51 - "Community 51"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 52 - "Community 52"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 53 - "Community 53"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 54 - "Community 54"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 55 - "Community 55"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 56 - "Community 56"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 57 - "Community 57"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 58 - "Community 58"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 59 - "Community 59"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 60 - "Community 60"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 61 - "Community 61"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 62 - "Community 62"
Cohesion: 0.50
Nodes (3): Development Dependencies, Runtime Dependencies, Scripts

### Community 63 - "Community 63"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 64 - "Community 64"
Cohesion: 0.50
Nodes (3): Commands, Purpose, Related Concepts

### Community 65 - "Community 65"
Cohesion: 0.50
Nodes (3): Automation, Export, Vault

### Community 66 - "Community 66"
Cohesion: 0.50
Nodes (3): Command, Hooks, Sequence

### Community 67 - "Community 67"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 68 - "Community 68"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 69 - "Community 69"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 70 - "Community 70"
Cohesion: 0.50
Nodes (3): Core Knowledge, RareStar Site OKF Bundle, Source Areas

### Community 71 - "Community 71"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 72 - "Community 72"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 73 - "Community 73"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 74 - "Community 74"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 75 - "Community 75"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 76 - "Community 76"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 77 - "Community 77"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 78 - "Community 78"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 79 - "Community 79"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 80 - "Community 80"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 81 - "Community 81"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 82 - "Community 82"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 83 - "Community 83"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 84 - "Community 84"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 85 - "Community 85"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 86 - "Community 86"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 87 - "Community 87"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 88 - "Community 88"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 89 - "Community 89"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 90 - "Community 90"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 91 - "Community 91"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 92 - "Community 92"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 93 - "Community 93"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 96 - "Community 96"
Cohesion: 0.50
Nodes (3): 2026-07-08, 2026-07-10, OKF Update Log

### Community 99 - "Community 99"
Cohesion: 0.36
Nodes (6): createParticleGeometry(), createProgram(), createShader(), links, RehaiFooter(), seeded()

## Knowledge Gaps
- **291 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+286 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `scrollToId()` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _291 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12903225806451613 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07239819004524888 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07179487179487179 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._