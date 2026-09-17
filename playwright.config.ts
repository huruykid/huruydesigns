import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests run against a local production build (`vite preview`), never the
 * live site, so they cost nothing and never depend on the network. The chat spec
 * mocks the edge function.
 *
 *   npm run build && npm run test:e2e
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
    // PW_CHROMIUM_PATH reuses a preinstalled Chromium instead of downloading one;
    // PW_NO_SANDBOX=1 is needed when the tests run as root inside a container.
    launchOptions: {
      executablePath: process.env.PW_CHROMIUM_PATH || undefined,
      args: process.env.PW_NO_SANDBOX ? ["--no-sandbox"] : [],
    },
  },
  webServer: {
    command: "npx vite preview --port 4173 --strictPort --host 127.0.0.1",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
});
