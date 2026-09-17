/**
 * Build-time prerender. Runs after `vite build`:
 *
 *   1. builds a server bundle of src/entry-server.tsx (vite --ssr),
 *   2. renders every public route to dist/<route>/index.html with its own <title>,
 *      description, canonical, Open Graph tags and JSON-LD already in the HTML,
 *   3. writes dist/404.html and dist/sitemap.xml.
 *
 * Each route is written twice, dist/about/index.html and dist/about.html, so it is
 * found whether the host resolves directories or "clean URLs". The client bundle
 * hydrates the prerendered markup (see src/main.tsx); if a host falls back to
 * index.html for a deep link instead, main.tsx notices the route mismatch and
 * client-renders, so nothing depends on the host's routing rules.
 *
 * Any failure here is logged and the plain SPA build is kept, so a prerender bug can
 * never take the site down.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const DIST = path.join(ROOT, "dist");
const SERVER_DIR = path.join(ROOT, "dist-server");
const SITE_URL = "https://huruy.tech";

async function main() {
  const template = await readFile(path.join(DIST, "index.html"), "utf8");

  const ssr = spawnSync("npx", ["vite", "build", "--ssr", "src/entry-server.tsx", "--outDir", "dist-server", "--logLevel", "warn"], {
    cwd: ROOT,
    stdio: "inherit",
    env: { ...process.env, PRERENDER: "1" },
  });
  if (ssr.status !== 0) throw new Error(`SSR build failed with exit code ${ssr.status}`);

  const entryFile = ["entry-server.js", "entry-server.mjs"].map((f) => path.join(SERVER_DIR, f)).find(existsSync);
  if (!entryFile) throw new Error("SSR build produced no entry-server bundle");
  const { render, prerenderRoutes } = await import(pathToFileURL(entryFile).href);

  const written = [];
  for (const route of [...prerenderRoutes, { path: "/404", file: "404.html" }]) {
    const url = route.path === "/404" ? "/this-page-does-not-exist" : route.path;
    const { html, head } = await render(url);
    const page = injectIntoTemplate(template, html, head, route.path);
    const outFiles = route.file
      ? [path.join(DIST, route.file)]
      : route.path === "/"
      ? [path.join(DIST, "index.html")]
      : [path.join(DIST, route.path.replace(/^\//, ""), "index.html"), path.join(DIST, `${route.path.replace(/^\//, "")}.html`)];
    for (const outFile of outFiles) {
      await mkdir(path.dirname(outFile), { recursive: true });
      await writeFile(outFile, page);
    }
    written.push(path.relative(DIST, outFiles[0]));
  }

  await writeFile(path.join(DIST, "sitemap.xml"), buildSitemap(prerenderRoutes, await lastModified()));
  await rm(SERVER_DIR, { recursive: true, force: true });
  console.log(`prerendered ${written.length} pages: ${written.join(", ")}; wrote sitemap.xml`);
}

function injectIntoTemplate(template, bodyHtml, headHtml, routePath) {
  let out = template;
  // The static shell's title/description are placeholders for the route's own tags.
  out = out.replace(/<title>[\s\S]*?<\/title>\s*/, "");
  out = out.replace(/<meta name="description"[^>]*>\s*/, "");
  let head = headHtml;
  if (routePath === "/") {
    // index.html doubles as the SPA fallback on hosts that don't resolve directory
    // indexes. Without a canonical/og:url it can never claim another URL is the homepage;
    // the client adds them back after hydration.
    head = head.replace(/<link[^>]*rel="canonical"[^>]*\/?>/, "").replace(/<meta[^>]*property="og:url"[^>]*\/?>/, "");
  }
  out = out.replace("</head>", `    ${head}\n  </head>`);
  out = out.replace("<html lang=\"en\">", `<html lang="en" data-route="${routePath === "/404" ? "*" : routePath}">`);
  out = out.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  return out;
}

function buildSitemap(routes, lastmod) {
  const urls = routes
    .filter((r) => typeof r.priority === "number")
    .map(
      (r) =>
        `  <url><loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc><lastmod>${lastmod}</lastmod><changefreq>${r.changefreq ?? "monthly"}</changefreq><priority>${r.priority.toFixed(1)}</priority></url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/** Date of the last commit that touched site content, falling back to today. */
async function lastModified() {
  const git = spawnSync("git", ["log", "-1", "--format=%cs", "--", "src", "public", "index.html"], { cwd: ROOT, encoding: "utf8" });
  const date = git.status === 0 ? git.stdout.trim() : "";
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : new Date().toISOString().slice(0, 10);
}

main().catch((err) => {
  console.warn("prerender skipped:", err?.message ?? err);
  console.warn("The SPA build in dist/ is intact; crawlers will see the static shell until this is fixed.");
});
