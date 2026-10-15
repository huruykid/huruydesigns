import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AppStoreLaunch from "../AppStoreLaunch";
import { BELES_APP_STORE_URL, EBT_FINDER_APP_STORE_URL, belesScreens, ebtProof, faqs, packages } from "@/lib/appStoreService";
import { imageDimensions } from "@/lib/imageDimensions";
import { prerenderRoutes } from "@/lib/routes";

const renderPage = () => render(<HelmetProvider><MemoryRouter><AppStoreLaunch /></MemoryRouter></HelmetProvider>);

describe("App Store launch page", () => {
  it("leads with the offer and links to intake and proof", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Get your Lovable app approved on the App Store");
    expect(screen.getByRole("link", { name: "Tell me about your app" })).toHaveAttribute("href", "#start");
    expect(screen.getByRole("link", { name: "See how Beles shipped" })).toHaveAttribute("href", "#beles");
  });

  it("shows every package with its price and pay-on-approval terms", () => {
    renderPage();
    const pricing = screen.getByRole("region", { name: "Packages" });
    for (const p of packages) {
      const card = within(pricing).getByRole("listitem", { name: p.name });
      expect(within(card).getByText(p.price)).toBeInTheDocument();
      expect(within(card).getByText(p.payment)).toBeInTheDocument();
    }
    expect(within(pricing).getByText(/Founding price \$995/)).toBeInTheDocument();
  });

  it("links the Beles proof to the live App Store listing and the design case study", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /Beles on the App Store/ })).toHaveAttribute("href", BELES_APP_STORE_URL);
    expect(screen.getByRole("link", { name: "Read the design case study" })).toHaveAttribute("href", "/project/beles");
  });

  it("shows the real App Store screenshots, each with alt text and known dimensions", () => {
    renderPage();
    const strip = screen.getByRole("list", { name: "Beles App Store screenshots" });
    const imgs = within(strip).getAllByRole("img");
    expect(imgs).toHaveLength(belesScreens.length);
    for (const s of belesScreens) {
      expect(imageDimensions[s.src]).toBeDefined();
      expect(within(strip).getByAltText(s.alt)).toHaveAttribute("src", s.src);
    }
  });

  it("shows EBT Finder as a second proof, with facts taken from its case study", () => {
    renderPage();
    expect(ebtProof.stats.map((s) => s.value)).toEqual(["264,000+", "13"]);
    expect(ebtProof.stories).toHaveLength(2);
    expect(ebtProof.frames.length).toBeGreaterThanOrEqual(3);
    const strip = screen.getByRole("list", { name: "EBT Finder App Store screenshots" });
    for (const f of ebtProof.frames) expect(imageDimensions[f.src]).toBeDefined();
    expect(within(strip).getAllByRole("img")).toHaveLength(ebtProof.frames.length);
    expect(screen.getByRole("link", { name: /EBT Finder on the App Store/ })).toHaveAttribute("href", EBT_FINDER_APP_STORE_URL);
    expect(screen.getByRole("link", { name: "Read the EBT Finder case study" })).toHaveAttribute("href", "/project/ebtfinder");
  });

  it("never promises Apple's decision", () => {
    renderPage();
    expect(document.body.textContent).not.toMatch(/guaranteed approval|100% approval/i);
    expect(faqs.find((f) => /guarantee/i.test(f.q))?.a).toMatch(/No one can promise/);
  });

  it("does not name the current employer", () => {
    renderPage();
    expect(document.body.textContent).not.toMatch(/capital group|luxoft/i);
  });

  it("has an intake form with required app link and stage", () => {
    renderPage();
    const form = screen.getByRole("form", { name: "App Store intake" });
    expect(within(form).getByLabelText("Link to your app")).toBeRequired();
    expect(within(form).getByLabelText("Where it stands")).toBeRequired();
  });

  it("is prerendered and in the sitemap", () => {
    expect(prerenderRoutes.find((r) => r.path === "/appstore")?.priority).toBeGreaterThan(0);
  });
});
