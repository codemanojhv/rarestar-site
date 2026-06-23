import path from "node:path";

/** Absolute path to committed JSON (read/write from API in Node runtime). */
export function getCaseStudiesFilePath(): string {
  return path.join(process.cwd(), "src", "data", "case-studies.json");
}
