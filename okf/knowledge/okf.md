---
type: "Knowledge Format"
title: "Open Knowledge Format Bundle"
description: "Repo-local OKF v0.1 bundle generated as Markdown concept files with YAML frontmatter."
resource: "file:///E:/rarestar-site/okf"
tags: ["okf", "knowledge", "markdown", "frontmatter"]
timestamp: "2026-07-21T07:49:00.667Z"
---
# Implementation

This bundle follows OKF v0.1 by storing one concept per Markdown file with YAML frontmatter. The generator keeps `type` present on every concept, writes indexes for progressive discovery, and uses bundle-root absolute links for relationships.

# Producer

The producer is [scripts/generate-okf.mjs](/source/scripts/generate-okf.md). It scans source files, package metadata, graphify metadata, imports, routes, and component locations to regenerate the bundle.

# Update Flow

Run [knowledge update automation](/knowledge/update-flow.md) with:

```powershell
npm run knowledge:update
```

# Citations

[1] [GoogleCloudPlatform knowledge-catalog OKF specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
[2] [Google Cloud OKF announcement](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)
