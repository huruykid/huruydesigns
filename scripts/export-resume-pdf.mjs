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
await page.pdf({
  path: out,
  format: "Letter",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "0.2in", right: "0.2in", bottom: "0.2in", left: "0.2in" },
});
await browser.close();
console.log(`wrote ${path.relative(process.cwd(), out)}`);
