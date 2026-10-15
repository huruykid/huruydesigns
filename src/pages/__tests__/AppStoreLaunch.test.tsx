import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const invoke = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke: (...args: unknown[]) => invoke(...args) } } }));
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AppStoreLaunch from "../AppStoreLaunch";
import {
  BELES_APP_STORE_URL,
  BOOKING_URL,
  EBT_FINDER_APP_STORE_URL,
  belesScreens,
  ebtProof,
  faqs,
  guidelines,
  packages,
  process,
  readinessCheck,
} from "@/lib/appStoreService";
import { imageDimensions } from "@/lib/imageDimensions";
import { prerenderRoutes } from "@/lib/routes";

const renderPage = (variant?: "launch" | "rescue") =>
  render(<HelmetProvider><MemoryRouter><AppStoreLaunch variant={variant} /></MemoryRouter></HelmetProvider>);

describe("App Store launch page", () => {
  it("leads with the offer and links to intake and proof", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Built it in Lovable? Let's get it on the App Store.");
    const hero = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(within(hero).getByRole("link", { name: "Tell me about your app" })).toHaveAttribute("href", "#start");
    expect(within(hero).getByRole("link", { name: "See pricing" })).toHaveAttribute("href", "#pricing");
  });

  it("shows every package with its price and pay-on-approval terms", () => {
    renderPage();
    const pricing = screen.getByRole("region", { name: /Fixed prices, quoted after the free diagnosis/ });
    for (const p of packages) {
      const card = within(pricing).getByRole("listitem", { name: p.name });
      expect(within(card).getByText(p.price)).toBeInTheDocument();
      expect(within(card).getByText(p.payment)).toBeInTheDocument();
    }
    expect(within(pricing).getByText(/Founding price \$995/)).toBeInTheDocument();
  });

  it("offers a $250 Readiness Check for never-submitted apps, credited toward Launch", () => {
    renderPage();
    const check = screen.getByRole("group", { name: "Readiness Check" });
    expect(within(check).getByText("$250")).toBeInTheDocument();
    expect(readinessCheck.payment).toMatch(/Credited in full toward Launch/);
    expect(faqs.find((f) => /start smaller/i.test(f.q))?.a).toMatch(/never been submitted/);
  });

  it("offers a free rejection diagnosis that preselects Rescue and a rejected stage", () => {
    renderPage();
    expect(faqs.find((f) => /diagnosis really free/i.test(f.q))?.a).toMatch(/No payment details/);
    fireEvent.click(screen.getByRole("link", { name: "Paste the message for a free diagnosis" }));
    expect(screen.getByLabelText("What you'd like")).toHaveValue("rescue");
    expect(screen.getByLabelText("Where it stands")).toHaveValue("rejected");
    expect(screen.getByRole("button", { name: "Get a free diagnosis" })).toBeInTheDocument();
  });

  it("preselects the package a visitor clicked in the intake form", () => {
    renderPage();
    fireEvent.click(screen.getByRole("link", { name: "Book a Readiness Check" }));
    expect(screen.getByLabelText("What you'd like")).toHaveValue("check");
  });

  it("links the Beles proof to the live App Store listing and the design case study", () => {
    renderPage();
    expect(screen.getByRole("link", { name: "Download Beles on the App Store" })).toHaveAttribute("href", BELES_APP_STORE_URL);
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
    expect(screen.getByRole("link", { name: "Download EBT Finder on the App Store" })).toHaveAttribute("href", EBT_FINDER_APP_STORE_URL);
    expect(screen.getByRole("link", { name: "Read the EBT Finder case study" })).toHaveAttribute("href", "/project/ebtfinder");
  });

  it("never promises Apple's decision", () => {
    renderPage();
    expect(document.body.textContent).not.toMatch(/guaranteed approval|100% approval/i);
    expect(faqs.find((f) => /guarantee/i.test(f.q))?.a).toMatch(/No one can promise/);
  });

  it("lists the guidelines in scope and the process in four steps", () => {
    renderPage();
    for (const g of guidelines) expect(screen.getByText(g.number)).toBeInTheDocument();
    expect(process).toHaveLength(4);
    for (const step of process) expect(screen.getByRole("heading", { level: 3, name: step.title })).toBeInTheDocument();
    expect(document.body.textContent).toMatch(/Never your Apple ID password/);
  });

  it("states refund terms, the business behind the service, and non-affiliation", () => {
    renderPage();
    expect(faqs.find((f) => /never approves/i.test(f.q))?.a).toMatch(/full refund/);
    expect(document.body.textContent).toMatch(/Appfinity Labs LLC/);
    expect(document.body.textContent).toMatch(/Not affiliated with or endorsed by Apple or Lovable/);
  });

  it("does not name the current employer", () => {
    renderPage();
    expect(document.body.textContent).not.toMatch(/capital group|luxoft/i);
  });

  it("offers a 15-minute call next to the intake form", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /Book a 15-minute call/ })).toHaveAttribute("href", BOOKING_URL);
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

  describe("rescue ad landing variant", () => {
    it("leads with the rejection and opens the form on Rescue", () => {
      renderPage("rescue");
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Rejected by App Review?");
      const hero = screen.getByRole("heading", { level: 1 }).closest("section")!;
      expect(within(hero).getByRole("link", { name: "Get a free diagnosis" })).toHaveAttribute("href", "#start");
      expect(screen.getByLabelText("What you'd like")).toHaveValue("rescue");
      expect(screen.getByLabelText("Where it stands")).toHaveValue("rejected");
      expect(screen.getByRole("link", { name: "Start with the launch service" })).toHaveAttribute("href", "/appstore");
    });

    it("is prerendered but kept out of the sitemap", () => {
      const route = prerenderRoutes.find((r) => r.path === "/appstore/rescue");
      expect(route).toBeDefined();
      expect(route?.priority).toBeUndefined();
    });
  });

  describe("intake form", () => {
    beforeEach(() => invoke.mockReset());

    const fill = () => {
      fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Sam" } });
      fireEvent.change(screen.getByLabelText("Email"), { target: { value: "sam@example.com" } });
      fireEvent.change(screen.getByLabelText("Link to your app"), { target: { value: "https://sam.lovable.app" } });
      fireEvent.change(screen.getByLabelText("Where it stands"), { target: { value: "rejected" } });
      fireEvent.submit(screen.getByRole("form", { name: "App Store intake" }));
    };

    it("saves the lead through the appstore-lead function and confirms", async () => {
      invoke.mockResolvedValue({ data: { ok: true }, error: null });
      window.dataLayer = [];
      renderPage();
      fill();
      expect(await screen.findByText(/Got it/)).toBeInTheDocument();
      const conversion = (window.dataLayer as IArguments[]).find((a) => a[0] === "event" && a[1] === "conversion");
      expect(conversion?.[2]).toMatchObject({ send_to: "AW-11554603785/Ig_zCOTzxZ0dEImG1YUr" });
      expect(invoke).toHaveBeenCalledWith("appstore-lead", {
        body: expect.objectContaining({ name: "Sam", email: "sam@example.com", appUrl: "https://sam.lovable.app", stage: "rejected", website: "" }),
      });
    });

    it("puts the chosen package at the top of the details", async () => {
      invoke.mockResolvedValue({ data: { ok: true }, error: null });
      renderPage();
      fireEvent.change(screen.getByLabelText("What you'd like"), { target: { value: "check" } });
      fill();
      await screen.findByText(/Got it/);
      expect(invoke.mock.calls[0][1].body.details).toMatch(/^Interested in: Readiness Check \(\$250\)/);
    });

    it("falls back to an email draft when saving fails", async () => {
      invoke.mockResolvedValue({ data: null, error: new Error("Request failed") });
      renderPage();
      fill();
      const alert = await screen.findByRole("alert");
      await waitFor(() => expect(within(alert).getByRole("link", { name: "Open in email" }).getAttribute("href")).toMatch(/^mailto:/));
    });
  });
});
