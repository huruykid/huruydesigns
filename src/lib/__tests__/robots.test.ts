import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

import { DEFAULT_OG_IMAGE, SITE_URL } from "../seo";
import { publicProjects } from "../projects";

// robots.txt rules match by prefix: "Disallow: /og" once silently blocked /og/default.png,
// so X and other crawlers that honor robots.txt showed no preview image.
describe("robots.txt", () => {
  const disallowed = readFileSync("public/robots.txt", "utf8")
    .split("\n")
    .map((l) => /^Disallow:\s*(\S+)/i.exec(l.trim())?.[1])
    .filter((p): p is string => !!p);

  it("never blocks a social preview image", () => {
    const images = [
      DEFAULT_OG_IMAGE.replace(SITE_URL, ""),
      "/og/book.png",
      ...publicProjects().map((p) => p.ogImage ?? p.image),
    ];
    for (const img of images) {
      for (const rule of disallowed) expect(img.startsWith(rule), `${rule} blocks ${img}`).toBe(false);
    }
  });
});
