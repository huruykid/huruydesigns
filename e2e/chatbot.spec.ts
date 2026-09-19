import { test, expect } from "@playwright/test";

const sse = (chunks: string[]) =>
  chunks.map((c) => `data: ${JSON.stringify({ choices: [{ delta: { content: c } }] })}\n\n`).join("") + "data: [DONE]\n\n";

test.describe("portfolio chat", () => {
  test("streams a mocked reply, renders markdown, and keeps history across navigation", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    // React reports recoverable hydration errors through window.reportError, not console.
    page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));
    // Third-party hosts (fonts, analytics, Supabase) are stubbed so the run is hermetic.
    await page.route(/googleapis\.com|gstatic\.com|googletagmanager\.com|google-analytics\.com|supabase\.co/, (route) =>
      route.fulfill({ status: 200, body: "" }),
    );
    await page.route("**/rest/v1/case_study_images**", (route) => route.fulfill({ json: [] }));
    await page.route("**/functions/v1/portfolio-chat", (route) =>
      route.fulfill({
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
        body: sse(["Huruy's **top skills** are ", "design systems and research. ", "[Read the EBT Finder case study](/project/ebtfinder)"]),
      }),
    );

    await page.goto("/");

    const launcher = page.getByRole("button", { name: /open chat/i });
    await expect(launcher).toBeVisible();
    await launcher.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("textbox", { name: "Your question" })).toBeFocused();

    await dialog.getByRole("textbox", { name: "Your question" }).fill("What are Huruy's top skills?");
    await page.keyboard.press("Enter");

    await expect(dialog.getByText("What are Huruy's top skills?")).toBeVisible();
    await expect(dialog.locator("strong", { hasText: "top skills" })).toBeVisible();

    // Following a link the bot produced must not wipe the conversation.
    await dialog.getByRole("link", { name: "Read the EBT Finder case study" }).click();
    await expect(page).toHaveURL(/\/project\/ebtfinder$/);
    await expect(dialog.getByText("What are Huruy's top skills?")).toBeVisible();

    // Escape closes and returns focus to the launcher.
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("button", { name: /open chat/i })).toBeFocused();

    // Reopening keeps history.
    await page.getByRole("button", { name: /open chat/i }).click();
    await expect(page.getByRole("dialog").getByText("What are Huruy's top skills?")).toBeVisible();

    expect(consoleErrors).toEqual([]);
  });

  test("shows the server's message when the function rejects", async ({ page }) => {
    await page.route("**/functions/v1/portfolio-chat", (route) =>
      route.fulfill({ status: 429, json: { error: "Too many questions right now." } }),
    );
    await page.goto("/");
    await page.getByRole("button", { name: /open chat/i }).click();
    await page.getByRole("dialog").getByRole("textbox", { name: "Your question" }).fill("hello");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog").getByText("Too many questions right now.")).toBeVisible();
  });
});
