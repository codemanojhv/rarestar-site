---
type: "Codebase Overview"
title: "RareStar Site Codebase"
description: "Next.js App Router site with agency, studio, and Rehai experiences plus graphify and OKF knowledge automation."
resource: "file:///E:/rarestar-site"
tags: ["rarestar", "nextjs", "codebase", "knowledge"]
timestamp: "2026-07-26T15:48:52.209Z"
okf_version: "0.1"
---
# Architecture

RareStar Site is a Next.js App Router codebase. It uses React, TypeScript, Tailwind CSS, GSAP, Lenis, Three.js, and static JSON content.

# Entrypoints

* [Agency homepage](/source/src/app/agency/page.md) composes the main RareStar agency landing flow.
* [Studio homepage](/source/src/app/studio/page.md) composes the studio venture flow.
* [Rehai homepage](/source/src/app/rehai/page.md) renders the Rehai landing experience.
* [Case study API](/source/src/app/api/case-studies/route.md), [contact API](/source/src/app/api/contact/route.md), and [upload API](/source/src/app/api/upload/route.md) are server endpoints.

# Knowledge System

* [Graphify automation](/knowledge/graphify.md) maintains the graph at `graphify-out/`.
* [Obsidian vault](/knowledge/obsidian.md) exports graphify knowledge to `E:/rarestar-site-vault`.
* [OKF automation](/knowledge/okf.md) generates this `okf/` bundle.

# Citations

[1] [Google Cloud: Introducing the Open Knowledge Format](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)
[2] [GoogleCloudPlatform knowledge-catalog OKF specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
