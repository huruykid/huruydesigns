import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Guides from "../Guides";
import GuidePage from "../GuidePage";
import { guides, guideBySlug, guidePath, plainText } from "@/lib/guides";
import { guidelines } from "@/lib/appStoreService";
import { prerenderRoutes } from "@/lib/routes";

const renderAt = (path: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/guides" element={<Guides />} />
          <Route path="/guides/:slug" element={<GuidePage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );

/** Every string a guide renders, for content checks. */
const allText = (g: (typeof guides)[number]) =>
  [g.title, g.short, g.fromExperience ?? "", ...g.sections.flatMap((s) => [...(s.body ?? []), ...(s.steps ?? [])]), ...g.faqs.flatMap((f) => [f.q, f.a])];

const KNOWN_PATHS = new Set(["/appstore", ...prerenderRoutes.map((r) => r.path)]);

describe("App Store guides content", () => {
  it("keeps titles and descriptions inside search-result limits", () => {
    for (const g of guides) {
      expect(g.seoTitle.length, g.slug).toBeLessThanOrEqual(60);
      expect(g.description.length, g.slug).toBeLessThanOrEqual(155);
    }
  });

  it("only links to pages that exist", () => {
    for (const g of guides) {
      for (const slug of g.related) expect(guideBySlug(slug), `${g.slug} → ${slug}`).toBeDefined();
      for (const text of allText(g)) {
        for (const [, href] of text.matchAll(/\]\(([^)]+)\)/g)) {
          expect(KNOWN_PATHS.has(href.split("#")[0]), `${g.slug} links to ${href}`).toBe(true);
        }
      }
    }
  });

  it("never promises approval and never names a guideline number in the reader's headline", () => {
    for (const g of guides) {
      for (const text of allText(g)) expect(plainText(text)).not.toMatch(/guarantee|100%|always approved/i);
      expect(g.title).not.toMatch(/\d\.\d/);
    }
  });

  it("prerenders and lists every guide in the sitemap, and links landing-page problems to them", () => {
    const sitemap = prerenderRoutes.filter((r) => typeof r.priority === "number").map((r) => r.path);
    expect(sitemap).toContain("/guides");
    for (const g of guides) expect(sitemap).toContain(guidePath(g.slug));
    for (const gl of guidelines.filter((x) => x.guide)) expect(guideBySlug(gl.guide!), gl.number).toBeDefined();
  });
});

describe("App Store guide pages", () => {
  it("lists every guide on the hub in two groups", () => {
    renderAt("/guides");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Built it with AI? Here's how to get it on the App Store.");
    for (const g of guides) expect(screen.getByRole("link", { name: new RegExp(g.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) })).toHaveAttribute("href", guidePath(g.slug));
    expect(screen.getByRole("region", { name: "Getting on the App Store" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Common rejections, in plain words" })).toBeInTheDocument();
  });

  it("leads a guide with the short answer, keeps Apple's term as a footnote, and ends on the free read", () => {
    const g = guideBySlug("app-rejected-just-a-website")!;
    renderAt(guidePath(g.slug));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(g.title);
    expect(screen.getByText("The short answer")).toBeInTheDocument();
    expect(screen.getByText(/Guideline 4\.2, Minimum Functionality/)).toBeInTheDocument();
    const cta = screen.getByRole("complementary", { name: "Get help with your app" });
    expect(within(cta).getByRole("link", { name: "Get a free read" })).toHaveAttribute("href", "/appstore/quote#chat");
    const related = screen.getByRole("navigation", { name: "Related guides" });
    for (const slug of g.related) expect(within(related).getByRole("link", { name: guideBySlug(slug)!.title })).toHaveAttribute("href", guidePath(slug));
  });

  it("shows the not-found page for an unknown guide", () => {
    renderAt("/guides/not-a-guide");
    expect(screen.queryByText("The short answer")).not.toBeInTheDocument();
  });
});
