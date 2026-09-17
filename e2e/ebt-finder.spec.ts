import { test, expect } from "@playwright/test";

test.describe("EBT Finder case study", () => {
  test("renders the case study, the interactive demo works, images load", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    // React reports recoverable hydration errors through window.reportError, not console.
    page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));
    // The image-override lookup is a network call; answer it locally.
    // Third-party hosts (fonts, analytics, Supabase) are stubbed so the run is hermetic.
    await page.route(/googleapis\.com|gstatic\.com|googletagmanager\.com|google-analytics\.com|supabase\.co/, (route) =>
      route.fulfill({ status: 200, body: "" }),
    );
    await page.route("**/rest/v1/case_study_images**", (route) => route.fulfill({ json: [] }));

    await page.goto("/project/ebtfinder");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("EBT Finder");
    await expect(page.getByRole("heading", { name: "From prototype to the App Store" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Problem & Context" })).toBeVisible();

    // Interactive demo inside the hero shell.
    const viewDetails = page.getByRole("button", { name: /view details/i }).first();
    await expect(viewDetails).toBeVisible();
    await viewDetails.click();
    await expect(page.getByText("Open Now").first()).toBeVisible();

    // Every rendered image has intrinsic dimensions and actually loaded.
    const images = page.locator("main img");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(async () => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0), { timeout: 10_000 })
        .toBe(true);
    }

    expect(consoleErrors).toEqual([]);
  });

  test("the passcode-gated study shows its teaser and a passcode form", async ({ page }) => {
    // Third-party hosts (fonts, analytics, Supabase) are stubbed so the run is hermetic.
    await page.route(/googleapis\.com|gstatic\.com|googletagmanager\.com|google-analytics\.com|supabase\.co/, (route) =>
      route.fulfill({ status: 200, body: "" }),
    );
    await page.route("**/rest/v1/case_study_images**", (route) => route.fulfill({ json: [] }));
    await page.goto("/project/asure-compliance");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Asure Compliance Engine");
    await expect(page.getByLabel("Passcode")).toBeVisible();
    // The proprietary narrative is never in the page source.
    const html = await page.content();
    expect(html).not.toContain("forcing a conversation that hadn't happened yet");
  });
});
