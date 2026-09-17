import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "./lib/analytics";

const root = document.getElementById("root")!;
const html = document.documentElement;

// Public routes are prerendered at build time (scripts/prerender.mjs); hydrate them
// instead of re-rendering. If the host served a prerendered file for a different URL
// (SPA fallback), the inline script in index.html flagged it: discard that markup and
// render from scratch so the user never sees the wrong page.
const mismatch = html.classList.contains("route-mismatch");
if (root.hasChildNodes() && !mismatch) {
  hydrateRoot(root, <App />);
} else {
  root.replaceChildren();
  createRoot(root).render(<App />);
  html.classList.remove("route-mismatch");
}

// Analytics never competes with first render.
const idle = (cb: () => void) => {
  if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(cb);
  else window.setTimeout(cb, 1500);
};
idle(initAnalytics);
