/**
 * Captures the 1200x630 social preview cards rendered at /og into public/og/*.png.
 *
 *   npm run build && npx vite preview --port 4173 &
 *   node scripts/build-og-images.mjs [http://127.0.0.1:4173]
 *
 * Optional env: PW_CHROMIUM_PATH (browser binary), PW_NO_SANDBOX=1,
 * OG_FONT_CSS (a CSS file of @font-face rules to inject where Google Fonts can't load).
 */
import { chromium } from "@playwright/test";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const ROOT = new URL("..", import.meta.url).pathname;
const OUT = path.join(ROOT, "public/og");

const cards = [
  { file: "default.png", query: "" },
  { file: "book.png", query: "?card=book" },
  { file: "appstore.png", query: "?card=appstore" },
  { file: "asure-compliance.png", query: "?card=asure-compliance" },
  { file: "oneasure-portal.png", query: "?card=oneasure-portal" },
  { file: "doula-care-portal.png", query: "?card=doula-care-portal" },
  { file: "ebtfinder.png", query: "?card=ebtfinder" },
  { file: "beles.png", query: "?card=beles" },
];

await mkdir(OUT, { recursive: true });
const fontCss = process.env.OG_FONT_CSS ? await readFile(process.env.OG_FONT_CSS, "utf8") : "";
const browser = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || undefined,
  args: process.env.PW_NO_SANDBOX ? ["--no-sandbox", "--allow-file-access-from-files"] : [],
});
const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 });
for (const { file, query } of cards) {
  await page.goto(`${base}/og${query}`, { waitUntil: "networkidle" });
  if (fontCss) await page.addStyleTag({ content: fontCss });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.locator("[data-og-card]").screenshot({ path: path.join(OUT, file) });
  console.log(`wrote public/og/${file}`);
}
await browser.close();
