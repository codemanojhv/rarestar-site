---
type: "Knowledge Graph"
title: "Graphify Codebase Graph"
description: "Graphify extracts codebase relationships into graphify-out and powers scoped codebase queries."
resource: "file:///E:/rarestar-site/graphify-out/graph.json"
tags: ["graphify", "knowledge-graph", "code-navigation"]
timestamp: "2026-07-10T01:09:02.263Z"
graph_nodes: 613
graph_edges: 713
---
# Purpose

Graphify is the repo's code knowledge graph. Agents should query it before broad source browsing when `graphify-out/graph.json` exists.

# Commands

```powershell
graphify query "question"
graphify explain "concept"
graphify path "A" "B"
graphify update .
graphify export obsidian --dir E:/rarestar-site-vault
```

# Related Concepts

* [Obsidian vault](/knowledge/obsidian.md)
* [Knowledge update automation](/knowledge/update-flow.md)
* [Codebase overview](/codebase/overview.md)
