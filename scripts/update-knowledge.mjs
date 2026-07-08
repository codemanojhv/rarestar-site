import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const obsidianDir = "E:/rarestar-site-vault";

function quoteArg(arg) {
  return /[\s"]/u.test(arg) ? `"${arg.replaceAll('"', '\\"')}"` : arg;
}

function run(label, commands, options = {}) {
  console.log(`\n> ${label}`);
  for (const command of commands) {
    const result = process.platform === "win32"
      ? spawnSync(command.map(quoteArg).join(" "), {
        stdio: "inherit",
        shell: true,
        ...options
      })
      : spawnSync(command[0], command.slice(1), {
      stdio: "inherit",
      ...options
    });
    if (result.status === 0) return;
  }
  throw new Error(`${label} failed`);
}

run("Update graphify graph", [
  ["graphify", "update", "."],
  ["python", "-m", "graphify", "update", "."]
]);

if (existsSync("graphify-out/graph.json")) {
  run("Export graphify Obsidian vault", [
    ["graphify", "export", "obsidian", "--dir", obsidianDir],
    ["python", "-m", "graphify", "export", "obsidian", "--dir", obsidianDir]
  ]);
} else {
  console.warn("Skipping Obsidian export because graphify-out/graph.json does not exist.");
}

run("Generate OKF bundle", [["node", "scripts/generate-okf.mjs"]]);
