---
type: "Knowledge Graph"
title: "Graphify Codebase Graph"
description: "Graphify extracts codebase relationships into graphify-out and powers scoped codebase queries."
resource: "file:///E:/rarestar-site/graphify-out/graph.json"
tags: ["graphify", "knowledge-graph", "code-navigation"]
timestamp: "2026-07-19T21:00:11.790Z"
graph_nodes: 642
graph_edges: 747
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
