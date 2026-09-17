import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "./lib/analytics";

const root = document.getElementById("root")!;

// Public routes are prerendered at build time; hydrate them instead of re-rendering.
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}

// Analytics never competes with first render.
const idle = (cb: () => void) => {
  if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(cb);
  else window.setTimeout(cb, 1500);
};
idle(initAnalytics);
