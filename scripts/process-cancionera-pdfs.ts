/**
 * Run once when both PDFs arrive:
 *   npx tsx scripts/process-cancionera-pdfs.ts <en-pdf> <es-pdf>
 *
 * Requires: poppler-utils (pdftoppm) and cwebp installed on the machine.
 *   brew install poppler webp
 *
 * Outputs:
 *   data/cancionera/pages/en/page-NNN.webp
 *   data/cancionera/pages/es/page-NNN.webp
 *   data/cancionera/manifest.json  (you review and tag each page as "commentary" | "music")
 */

import { execSync } from "child_process";
import { readdirSync, writeFileSync, mkdirSync } from "fs";
import path from "path";

const [, , enPdf, esPdf] = process.argv;

if (!enPdf || !esPdf) {
  console.error("Usage: npx tsx scripts/process-cancionera-pdfs.ts <en.pdf> <es.pdf>");
  process.exit(1);
}

const root = path.resolve(__dirname, "..");
const pagesRoot = path.join(root, "data/cancionera/pages");

for (const lang of ["en", "es"] as const) {
  const src = lang === "en" ? enPdf : esPdf;
  const outDir = path.join(pagesRoot, lang);
  const tmpDir = path.join(outDir, "tmp_ppm");
  mkdirSync(tmpDir, { recursive: true });

  console.log(`\nConverting ${lang} PDF → 150 DPI PPM…`);
  execSync(`pdftoppm -r 150 "${src}" "${tmpDir}/page"`, { stdio: "inherit" });

  const ppmFiles = readdirSync(tmpDir)
    .filter((f) => f.endsWith(".ppm"))
    .sort();

  console.log(`Converting ${ppmFiles.length} pages → WebP…`);
  for (const ppm of ppmFiles) {
    const match = ppm.match(/page-(\d+)\.ppm$/);
    if (!match) continue;
    const n = parseInt(match[1], 10);
    const outFile = path.join(outDir, `page-${String(n).padStart(3, "0")}.webp`);
    execSync(`cwebp -q 85 "${path.join(tmpDir, ppm)}" -o "${outFile}"`, { stdio: "pipe" });
  }

  // Remove tmp ppm files
  execSync(`rm -rf "${tmpDir}"`);
  console.log(`Done: ${ppmFiles.length} pages in data/cancionera/pages/${lang}/`);
}

// Count pages from en/
const enPages = readdirSync(path.join(pagesRoot, "en"))
  .filter((f) => f.endsWith(".webp"))
  .sort();

const manifestPath = path.join(root, "data/cancionera/manifest.json");
const existing = JSON.parse(require("fs").readFileSync(manifestPath, "utf8"));

existing.totalPages = enPages.length;
// Generate placeholder page entries — manually tag each as "commentary" or "music" afterward
existing.pages = enPages.map((_, i) => ({
  page: i + 1,
  type: "music", // default; review and correct in manifest.json
}));

writeFileSync(manifestPath, JSON.stringify(existing, null, 2));
console.log(
  `\nmanifest.json updated: ${enPages.length} pages.\n` +
  `Review data/cancionera/manifest.json and tag each page as "commentary" or "music".`
);
