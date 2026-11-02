# Graph Report - rarestar-site  (2026-11-02)

## Corpus Check
- 105 files · ~30,798 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 519 nodes · 609 edges · 72 communities (59 shown, 13 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2fab414c`
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
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 88|Community 88]]
- [[_COMMUNITY_Community 90|Community 90]]
- [[_COMMUNITY_Community 91|Community 91]]
- [[_COMMUNITY_Community 92|Community 92]]
- [[_COMMUNITY_Community 93|Community 93]]
- [[_COMMUNITY_Community 94|Community 94]]
- [[_COMMUNITY_Community 95|Community 95]]
- [[_COMMUNITY_Community 96|Community 96]]
- [[_COMMUNITY_Community 97|Community 97]]
- [[_COMMUNITY_Community 100|Community 100]]
- [[_COMMUNITY_Community 101|Community 101]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `scripts` - 11 edges
3. `Rarestar.studio — Standalone Deployment Guide` - 11 edges
4. `main()` - 9 edges
5. `getSiteFromHostname()` - 8 edges
6. `scrollToId()` - 7 edges
7. `getLenis()` - 6 edges
8. `OKF Update Log` - 6 edges
9. `GRAPHIFY — rarestar.studio codebase context` - 5 edges
10. `summarizeFile()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `manifest()` --calls--> `getSiteFromHostname()`  [EXTRACTED]
  src/app/manifest.ts → src/lib/subdomain.ts
- `middleware()` --calls--> `getSiteFromHostname()`  [EXTRACTED]
  src/middleware.ts → src/lib/subdomain.ts

## Import Cycles
- None detected.

## Communities (72 total, 13 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (21): Exports, Local Imports, Role, Exports, Local Imports, Role, Exports, Local Imports (+13 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (18): Exports, Local Imports, Role, Exports, Local Imports, Role, Exports, Local Imports (+10 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (34): dependencies, framer-motion, gsap, lenis, lucide-react, next, react, react-dom (+26 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (23): Exports, Local Imports, Role, Magnetic(), MagneticProps, Exports, Local Imports, Role (+15 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): compilerOptions, allowJs, baseUrl, esModuleInterop, ignoreDeprecations, incremental, isolatedModules, jsx (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (15): 1. Extract from Monorepo, 2. Update package.json, 3. Environment Variables (Optional), 4. Local Test, 5. Deploy to Vercel, 6. Post-Deploy Checklist, 7. Domain Setup, 8. Troubleshooting (+7 more)

### Community 6 - "Community 6"
Cohesion: 0.30
Nodes (7): manifest(), getSiteFromHostname(), config, middleware(), SiteConfig, SiteKey, SITES

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

### Community 29 - "Community 29"
Cohesion: 0.17
Nodes (17): classify(), conceptPathForSource(), frontmatter(), ignoredDirs, importsFrom(), main(), now, okfDir (+9 more)

### Community 34 - "Community 34"
Cohesion: 0.29
Nodes (6): Exports, Local Imports, Role, Exports, Local Imports, Role

### Community 42 - "Community 42"
Cohesion: 0.60
Nodes (3): Exports, Local Imports, Role

### Community 45 - "Community 45"
Cohesion: 0.19
Nodes (9): Exports, Local Imports, Role, Exports, Local Imports, Role, Exports, Local Imports (+1 more)

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

### Community 54 - "Community 54"
Cohesion: 0.29
Nodes (6): Exports, Local Imports, Role, Exports, Local Imports, Role

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
Cohesion: 0.60
Nodes (3): Exports, Local Imports, Role

### Community 60 - "Community 60"
Cohesion: 0.60
Nodes (3): Exports, Local Imports, Role

### Community 61 - "Community 61"
Cohesion: 0.22
Nodes (7): sitemap(), Exports, Local Imports, Role, Exports, Local Imports, Role

### Community 62 - "Community 62"
Cohesion: 0.50
Nodes (3): Development Dependencies, Runtime Dependencies, Scripts

### Community 64 - "Community 64"
Cohesion: 0.50
Nodes (3): Commands, Purpose, Related Concepts

### Community 65 - "Community 65"
Cohesion: 0.50
Nodes (3): Automation, Export, Vault

### Community 66 - "Community 66"
Cohesion: 0.50
Nodes (3): Command, Hooks, Sequence

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
Cohesion: 0.60
Nodes (3): Exports, Local Imports, Role

### Community 72 - "Community 72"
Cohesion: 0.19
Nodes (9): Exports, Local Imports, Role, Exports, Local Imports, Role, Exports, Local Imports (+1 more)

### Community 74 - "Community 74"
Cohesion: 0.50
Nodes (3): Exports, Local Imports, Role

### Community 75 - "Community 75"
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
Cohesion: 0.20
Nodes (6): Mission(), StudioHome(), StudioHero(), Exports, Local Imports, Role

### Community 88 - "Community 88"
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
Cohesion: 0.29
Nodes (6): 2026-07-08, 2026-07-10, 2026-07-19, 2026-07-21, 2026-07-26, OKF Update Log

### Community 100 - "Community 100"
Cohesion: 0.60
Nodes (3): Exports, Local Imports, Role

### Community 101 - "Community 101"
Cohesion: 0.60
Nodes (3): Exports, Local Imports, Role

## Knowledge Gaps
- **186 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+181 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `scrollToId()` connect `Community 0` to `Community 34`, `Community 45`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _186 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08536585365853659 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09425287356321839 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07422402159244265 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._