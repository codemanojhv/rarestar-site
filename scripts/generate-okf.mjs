import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const okfDir = path.join(root, "okf");
const now = new Date().toISOString();

const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".css", ".md"]);
const ignoredDirs = new Set([".git", ".next", "node_modules", "graphify-out", "okf", ".tmp"]);

async function readJson(relativePath, fallback = null) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

async function walk(dir, files = []) {
  const entries = await import("node:fs/promises").then((fs) => fs.readdir(dir, { withFileTypes: true }));
  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, files);
      continue;
    }
    if (sourceExtensions.has(path.extname(entry.name))) {
      files.push(path.relative(root, fullPath).replaceAll("\\", "/"));
    }
  }
  return files.sort();
}

function yamlValue(value) {
  if (Array.isArray(value)) return `[${value.map((item) => JSON.stringify(item)).join(", ")}]`;
  return JSON.stringify(value ?? "");
}

function frontmatter(fields) {
  return [
    "---",
    ...Object.entries(fields).map(([key, value]) => `${key}: ${yamlValue(value)}`),
    "---",
    ""
  ].join("\n");
}

function titleFromPath(filePath) {
  const base = path.basename(filePath, path.extname(filePath));
  if (base === "page") return `${path.dirname(filePath).replaceAll("/", " / ")} page`;
  if (base === "layout") return `${path.dirname(filePath).replaceAll("/", " / ")} layout`;
  if (base === "route") return `${path.dirname(filePath).replaceAll("/", " / ")} route`;
  return base.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function conceptPathForSource(filePath) {
  return `/source/${filePath.replace(/\.[^.]+$/, "").replace(/\[(.+?)\]/g, "$1")}.md`;
}

function classify(filePath) {
  if (filePath.startsWith("src/app/api/")) return "API Endpoint";
  if (filePath.startsWith("src/app/") && filePath.endsWith("/page.tsx")) return "Route Page";
  if (filePath.startsWith("src/app/") && filePath.endsWith("/layout.tsx")) return "Route Layout";
  if (filePath.startsWith("src/components/")) return "React Component";
  if (filePath.startsWith("src/lib/")) return "Library Module";
  if (filePath.startsWith("src/data/")) return "Data Asset";
  if (filePath.startsWith("src/types/")) return "Type Definition";
  if (filePath.startsWith("public/")) return "Public Asset";
  if (filePath.endsWith(".md")) return "Documentation";
  return "Source File";
}

function importsFrom(text) {
  const imports = [];
  const importRegex = /from\s+["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)/g;
  let match;
  while ((match = importRegex.exec(text))) {
    imports.push(match[1] || match[2]);
  }
  return [...new Set(imports)].sort();
}

function routeFromFile(filePath) {
  if (!filePath.startsWith("src/app/")) return null;
  const parts = filePath.split("/");
  const appParts = parts.slice(2, -1);
  if (appParts[0] === "api") return `/${appParts.join("/")}`;
  return `/${appParts.filter((part) => !part.startsWith("(")).join("/")}`.replace(/\/$/, "") || "/";
}

function summarizeFile(filePath, text) {
  const headings = [...text.matchAll(/^#{1,3}\s+(.+)$/gm)].map((match) => match[1]).slice(0, 8);
  const exports = [...text.matchAll(/export\s+(?:default\s+)?(?:async\s+)?(?:function|const|class|type|interface)\s+([A-Za-z0-9_]+)/g)]
    .map((match) => match[1])
    .slice(0, 12);
  return { headings, exports, imports: importsFrom(text), route: routeFromFile(filePath) };
}

async function writeConcept(relativePath, fields, body) {
  const outputPath = path.join(okfDir, relativePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${frontmatter(fields)}${body.trim()}\n`, "utf8");
}

async function writeIndex(relativePath, title, sections) {
  const lines = [`# ${title}`, ""];
  for (const [heading, entries] of sections) {
    if (!entries.length) continue;
    lines.push(`## ${heading}`);
    for (const entry of entries) lines.push(`* [${entry.title}](${entry.href}) - ${entry.description}`);
    lines.push("");
  }
  const outputPath = path.join(okfDir, relativePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, lines.join("\n").trim() + "\n", "utf8");
}

async function main() {
  const packageJson = await readJson("package.json", {});
  const graph = await readJson("graphify-out/graph.json", { nodes: [], links: [] });
  const manifest = await readJson("graphify-out/manifest.json", {});
  const files = await walk(root);
  const codeFiles = files.filter((file) => file.startsWith("src/") || ["package.json", "next.config.ts", "tsconfig.json"].includes(file));
  const routeFiles = codeFiles.filter((file) => file.startsWith("src/app/") && /\/(page|layout|route)\.tsx?$/.test(file));
  const componentFiles = codeFiles.filter((file) => file.startsWith("src/components/"));
  const apiFiles = codeFiles.filter((file) => file.startsWith("src/app/api/"));

  await rm(okfDir, { recursive: true, force: true });
  await mkdir(okfDir, { recursive: true });

  await writeConcept("codebase/overview.md", {
    type: "Codebase Overview",
    title: "RareStar Site Codebase",
    description: "Next.js App Router site with agency, studio, and Rehai experiences plus graphify and OKF knowledge automation.",
    resource: "file:///E:/rarestar-site",
    tags: ["rarestar", "nextjs", "codebase", "knowledge"],
    timestamp: now,
    okf_version: "0.1"
  }, `
# Architecture

RareStar Site is a Next.js App Router codebase. It uses React, TypeScript, Tailwind CSS, GSAP, Lenis, Three.js, and static JSON content.

# Entrypoints

* [Agency homepage](/source/src/app/agency/page.md) composes the main RareStar agency landing flow.
* [Studio homepage](/source/src/app/studio/page.md) composes the studio venture flow.
* [Rehai homepage](/source/src/app/rehai/page.md) renders the Rehai landing experience.
* [Case study API](/source/src/app/api/case-studies/route.md), [contact API](/source/src/app/api/contact/route.md), and [upload API](/source/src/app/api/upload/route.md) are server endpoints.

# Knowledge System

* [Graphify automation](/knowledge/graphify.md) maintains the graph at \`graphify-out/\`.
* [Obsidian vault](/knowledge/obsidian.md) exports graphify knowledge to \`E:/rarestar-site-vault\`.
* [OKF automation](/knowledge/okf.md) generates this \`okf/\` bundle.

# Citations

[1] [Google Cloud: Introducing the Open Knowledge Format](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)
[2] [GoogleCloudPlatform knowledge-catalog OKF specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
`);

  await writeConcept("knowledge/okf.md", {
    type: "Knowledge Format",
    title: "Open Knowledge Format Bundle",
    description: "Repo-local OKF v0.1 bundle generated as Markdown concept files with YAML frontmatter.",
    resource: "file:///E:/rarestar-site/okf",
    tags: ["okf", "knowledge", "markdown", "frontmatter"],
    timestamp: now
  }, `
# Implementation

This bundle follows OKF v0.1 by storing one concept per Markdown file with YAML frontmatter. The generator keeps \`type\` present on every concept, writes indexes for progressive discovery, and uses bundle-root absolute links for relationships.

# Producer

The producer is [scripts/generate-okf.mjs](/source/scripts/generate-okf.md). It scans source files, package metadata, graphify metadata, imports, routes, and component locations to regenerate the bundle.

# Update Flow

Run [knowledge update automation](/knowledge/update-flow.md) with:

\`\`\`powershell
npm run knowledge:update
\`\`\`

# Citations

[1] [GoogleCloudPlatform knowledge-catalog OKF specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
[2] [Google Cloud OKF announcement](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)
`);

  await writeConcept("knowledge/graphify.md", {
    type: "Knowledge Graph",
    title: "Graphify Codebase Graph",
    description: "Graphify extracts codebase relationships into graphify-out and powers scoped codebase queries.",
    resource: "file:///E:/rarestar-site/graphify-out/graph.json",
    tags: ["graphify", "knowledge-graph", "code-navigation"],
    timestamp: now,
    graph_nodes: graph.nodes?.length ?? 0,
    graph_edges: graph.links?.length ?? graph.edges?.length ?? 0
  }, `
# Purpose

Graphify is the repo's code knowledge graph. Agents should query it before broad source browsing when \`graphify-out/graph.json\` exists.

# Commands

\`\`\`powershell
graphify query "question"
graphify explain "concept"
graphify path "A" "B"
graphify update .
graphify export obsidian --dir E:/rarestar-site-vault
\`\`\`

# Related Concepts

* [Obsidian vault](/knowledge/obsidian.md)
* [Knowledge update automation](/knowledge/update-flow.md)
* [Codebase overview](/codebase/overview.md)
`);

  await writeConcept("knowledge/obsidian.md", {
    type: "Knowledge Sink",
    title: "Obsidian Vault Export",
    description: "The graphify Obsidian vault is regenerated at E:/rarestar-site-vault.",
    resource: "file:///E:/rarestar-site-vault",
    tags: ["obsidian", "vault", "graphify"],
    timestamp: now
  }, `
# Vault

The Obsidian vault path is \`E:/rarestar-site-vault\`.

# Export

\`\`\`powershell
graphify export obsidian --dir E:/rarestar-site-vault
\`\`\`

# Automation

[Knowledge update automation](/knowledge/update-flow.md) runs the export after graphify updates the code graph.
`);

  await writeConcept("knowledge/update-flow.md", {
    type: "Automation",
    title: "Knowledge Update Automation",
    description: "Single command and git hooks that keep graphify, the Obsidian vault, and OKF current.",
    resource: "file:///E:/rarestar-site/scripts/update-knowledge.mjs",
    tags: ["automation", "git-hooks", "obsidian", "okf", "graphify"],
    timestamp: now
  }, `
# Command

\`\`\`powershell
npm run knowledge:update
\`\`\`

# Sequence

1. Run \`graphify update .\`.
2. Export graphify to \`E:/rarestar-site-vault\`.
3. Generate the [OKF bundle](/knowledge/okf.md).

# Hooks

\`npm run knowledge:hooks\` installs local \`.git/hooks/pre-commit\` and \`.git/hooks/post-merge\` hooks. The pre-commit hook refreshes generated knowledge and stages \`graphify-out/\` plus \`okf/\`.
`);

  await writeConcept("dependencies/package.md", {
    type: "Package Manifest",
    title: "Package Scripts and Dependencies",
    description: "NPM scripts and runtime packages that define local development, build, and knowledge automation.",
    resource: "file:///E:/rarestar-site/package.json",
    tags: ["npm", "scripts", "dependencies"],
    timestamp: now
  }, `
# Scripts

${Object.entries(packageJson.scripts ?? {}).map(([name, command]) => `* \`${name}\`: \`${command}\``).join("\n")}

# Runtime Dependencies

${Object.keys(packageJson.dependencies ?? {}).map((name) => `* \`${name}\``).join("\n")}

# Development Dependencies

${Object.keys(packageJson.devDependencies ?? {}).map((name) => `* \`${name}\``).join("\n")}
`);

  for (const filePath of codeFiles) {
    const fullPath = path.join(root, filePath);
    const text = await readFile(fullPath, "utf8");
    const info = summarizeFile(filePath, text);
    const fileStat = await stat(fullPath);
    const links = info.imports
      .filter((item) => item.startsWith("@/") || item.startsWith("."))
      .map((item) => `* \`${item}\``)
      .join("\n") || "* No local imports detected.";
    await writeConcept(conceptPathForSource(filePath).replace(/^\//, ""), {
      type: classify(filePath),
      title: titleFromPath(filePath),
      description: `${classify(filePath)} at ${filePath}.`,
      resource: `file:///E:/rarestar-site/${filePath}`,
      tags: [classify(filePath).toLowerCase().replaceAll(" ", "-"), filePath.split("/")[1] ?? "root"],
      timestamp: fileStat.mtime.toISOString(),
      source_path: filePath
    }, `
# Role

\`${filePath}\` is classified as ${classify(filePath)}.${info.route ? ` It maps to \`${info.route}\`.` : ""}

# Exports

${info.exports.length ? info.exports.map((name) => `* \`${name}\``).join("\n") : "* No named exports detected by the lightweight scanner."}

# Local Imports

${links}

${info.headings.length ? `# Markdown Headings\n\n${info.headings.map((heading) => `* ${heading}`).join("\n")}` : ""}
`);
  }

  await writeIndex("index.md", "RareStar Site OKF Bundle", [
    ["Core Knowledge", [
      { title: "Codebase Overview", href: "codebase/overview.md", description: "Architecture and primary surfaces." },
      { title: "Open Knowledge Format Bundle", href: "knowledge/okf.md", description: "How this OKF bundle is produced." },
      { title: "Knowledge Update Automation", href: "knowledge/update-flow.md", description: "How graphify, Obsidian, and OKF stay updated." },
      { title: "Graphify Codebase Graph", href: "knowledge/graphify.md", description: "Repo graph and query workflow." },
      { title: "Obsidian Vault Export", href: "knowledge/obsidian.md", description: "Vault connection at E:/rarestar-site-vault." }
    ]],
    ["Source Areas", [
      { title: "Routes", href: "routes/index.md", description: `${routeFiles.length} route and layout concepts.` },
      { title: "Components", href: "components/index.md", description: `${componentFiles.length} component concepts.` },
      { title: "API Endpoints", href: "api/index.md", description: `${apiFiles.length} endpoint concepts.` },
      { title: "Package Manifest", href: "dependencies/package.md", description: "Scripts and dependencies." }
    ]]
  ]);

  await writeIndex("routes/index.md", "Routes", [["Route Concepts", routeFiles.map((file) => ({
    title: titleFromPath(file),
    href: `..${conceptPathForSource(file)}`,
    description: `${classify(file)} for ${routeFromFile(file) ?? file}.`
  }))]]);

  await writeIndex("components/index.md", "Components", [["Component Concepts", componentFiles.map((file) => ({
    title: titleFromPath(file),
    href: `..${conceptPathForSource(file)}`,
    description: `React component at ${file}.`
  }))]]);

  await writeIndex("api/index.md", "API Endpoints", [["Endpoint Concepts", apiFiles.map((file) => ({
    title: titleFromPath(file),
    href: `..${conceptPathForSource(file)}`,
    description: `Server endpoint at ${routeFromFile(file) ?? file}.`
  }))]]);

  await writeFile(path.join(okfDir, "log.md"), [
    "# OKF Update Log",
    "",
    `## ${now.slice(0, 10)}`,
    `* **Update**: Generated OKF bundle from ${codeFiles.length} source files, ${graph.nodes?.length ?? 0} graph nodes, and ${Object.keys(manifest).length} graphify manifest entries.`
  ].join("\n") + "\n", "utf8");

  console.log(`Generated OKF bundle at ${okfDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
