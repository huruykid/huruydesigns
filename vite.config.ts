import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // The prerender bundle (scripts/prerender.mjs) is self-contained so it runs under
  // plain Node without CommonJS/ESM interop surprises from dependencies.
  ssr: isSsrBuild ? { noExternal: true } : undefined,
  build: {
    sourcemap: false,
  },
}));
