---
type: "Package Manifest"
title: "Package Scripts and Dependencies"
description: "NPM scripts and runtime packages that define local development, build, and knowledge automation."
resource: "file:///E:/rarestar-site/package.json"
tags: ["npm", "scripts", "dependencies"]
timestamp: "2026-07-10T01:09:02.263Z"
---
# Scripts

* `dev`: `next dev -p 3001`
* `build`: `next build`
* `start`: `next start -p 3001`
* `typecheck`: `tsc --noEmit`
* `graph:update`: `graphify update .`
* `obsidian:export`: `graphify export obsidian --dir E:/rarestar-site-vault`
* `okf:generate`: `node scripts/generate-okf.mjs`
* `knowledge:update`: `node scripts/update-knowledge.mjs`
* `knowledge:hooks`: `node scripts/install-knowledge-hook.mjs`
* `prepare`: `node scripts/install-knowledge-hook.mjs`

# Runtime Dependencies

* `framer-motion`
* `gsap`
* `lenis`
* `lucide-react`
* `next`
* `react`
* `react-dom`
* `sharp`
* `three`

# Development Dependencies

* `@tailwindcss/postcss`
* `@types/node`
* `@types/react`
* `@types/react-dom`
* `@types/three`
* `postcss`
* `tailwindcss`
* `typescript`
