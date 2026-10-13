/**
 * Prints the /resume page to public/resume/huruy-kidanemariam-resume.pdf so the
 * downloadable PDF always matches src/lib/resume.ts.
 *
 *   npm run build && npx vite preview --port 4173 &   (or any running server)
 *   node scripts/export-resume-pdf.mjs [http://localhost:4173]
 */
import { chromium } from "@playwright/test";
import path from "node:path";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const out = path.resolve(new URL("..", import.meta.url).pathname, "public/resume/huruy-kidanemariam-resume.pdf");

const browser = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || undefined,
  args: process.env.PW_NO_SANDBOX ? ["--no-sandbox"] : [],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 1650 } });
await page.emulateMedia({ media: "print", colorScheme: "light" });
await page.goto(`${base}/resume`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
// Margins and sizes come from the page's @page print CSS. If the resume spills
// onto page 2 by only a few lines, shrink up to ~5% to avoid a near-empty
// second page; otherwise keep 100% and let it run to two pages.
const countPages = (buf) => (buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
const render = (scale) => page.pdf({ format: "Letter", printBackground: true, preferCSSPageSize: true, scale });
let scale = 1;
let pdf = await render(1);
if (countPages(pdf) > 1) {
  for (const s of [0.98, 0.96, 0.94]) {
    const tryPdf = await render(s);
    if (countPages(tryPdf) === 1) { pdf = tryPdf; scale = s; break; }
  }
}
const { writeFile } = await import("node:fs/promises");
await writeFile(out, pdf);
console.log(`scale ${scale}, ${countPages(pdf)} page(s)`);
await browser.close();
console.log(`wrote ${path.relative(process.cwd(), out)}`);
