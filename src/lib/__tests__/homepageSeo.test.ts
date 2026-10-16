import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

const script = readFileSync("scripts/prerender.mjs", "utf8");
const start = script.indexOf("function injectIntoTemplate(");
const end = script.indexOf("function buildSitemap(");
const inject = runInNewContext(`${script.slice(start, end)}\ninjectIntoTemplate`) as (
  template: string, body: string, head: string, route: string
) => string;

describe("homepage search metadata", () => {
  it("preserves one self-referencing canonical and og:url in raw homepage HTML", () => {
    const template = readFileSync("index.html", "utf8");
    const head = '<title>Home</title><meta name="description" content="Fintech in Los Angeles" /><link rel="canonical" href="https://huruy.tech/" /><meta property="og:url" content="https://huruy.tech/" />';
    const html = inject(template, "<h1>Home</h1>", head, "/");
    expect(html.match(/rel="canonical"/g)).toHaveLength(1);
    expect(html).toContain('rel="canonical" href="https://huruy.tech/"');
    expect(html).toContain('property="og:url" content="https://huruy.tech/"');
    expect(html.match(/name="description"/g)).toHaveLength(1);
  });

  it("keeps the static and route descriptions synchronized", () => {
    const template = readFileSync("index.html", "utf8");
    const home = readFileSync("src/pages/Index.tsx", "utf8");
    const description = template.match(/name="description" content="([^"]+)"/)?.[1];
    expect(description).toContain("fintech");
    expect(description).toContain("Los Angeles");
    expect(home).toContain(`description="${description}"`);
  });
});