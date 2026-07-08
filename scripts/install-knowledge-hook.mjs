import { chmod, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const hooksDir = path.join(process.cwd(), ".git", "hooks");

const hooks = {
  "pre-commit": `#!/bin/sh
echo "Updating graphify, Obsidian vault, and OKF bundle..."
npm run knowledge:update
status=$?
if [ $status -ne 0 ]; then
  echo "knowledge:update failed; aborting commit."
  exit $status
fi
git add graphify-out okf 2>/dev/null || true
`,
  "post-merge": `#!/bin/sh
echo "Refreshing graphify, Obsidian vault, and OKF bundle after merge..."
npm run knowledge:update || true
`
};

await mkdir(hooksDir, { recursive: true });

for (const [name, body] of Object.entries(hooks)) {
  const target = path.join(hooksDir, name);
  await writeFile(target, body, "utf8");
  await chmod(target, 0o755);
  console.log(`Installed ${target}`);
}
