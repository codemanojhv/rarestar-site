---
type: "Automation"
title: "Knowledge Update Automation"
description: "Single command and git hooks that keep graphify, the Obsidian vault, and OKF current."
resource: "file:///E:/rarestar-site/scripts/update-knowledge.mjs"
tags: ["automation", "git-hooks", "obsidian", "okf", "graphify"]
timestamp: "2026-07-19T20:24:35.613Z"
---
# Command

```powershell
npm run knowledge:update
```

# Sequence

1. Run `graphify update .`.
2. Export graphify to `E:/rarestar-site-vault`.
3. Generate the [OKF bundle](/knowledge/okf.md).

# Hooks

`npm run knowledge:hooks` installs local `.git/hooks/pre-commit` and `.git/hooks/post-merge` hooks. The pre-commit hook refreshes generated knowledge and stages `graphify-out/` plus `okf/`.
