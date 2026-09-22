import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import { useEffect, lazy, Suspense, type ReactNode } from "react";
import { trackPageView } from "@/lib/analytics";
import Layout from "@/components/Layout";
import Index from "./pages/Index";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Retry briefly: the target section may shift as content/fonts settle.
      let attempts = 0;
      const scrollToTarget = () => {
        const el = document.getElementById(hash.slice(1));
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth" });
        attempts += 1;
        if (attempts < 8 && Math.abs(el.getBoundingClientRect().top - 64) > 4) {
          setTimeout(scrollToTarget, 150);
        }
      };
      requestAnimationFrame(scrollToTarget);
    } else {
      window.scrollTo(0, 0);
    }
    trackPageView(pathname);
  }, [pathname, hash]);
  return null;
};

// Route-level code splitting: keeps the initial bundle small on every entry route.
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const OGImage = lazy(() => import("./pages/OGImage"));
const Resume = lazy(() => import("./pages/Resume"));

const RouteFallback = () => (
  <div className="container mx-auto px-4 py-24" aria-busy="true" aria-live="polite">
    <div className="h-8 w-48 rounded bg-muted animate-pulse mb-6" />
    <div className="h-4 w-full max-w-xl rounded bg-muted animate-pulse mb-3" />
    <div className="h-4 w-full max-w-md rounded bg-muted animate-pulse" />
  </div>
);

/** Providers shared by the browser app and the build-time prerenderer. */
export const AppProviders = ({
  children,
  helmetContext,
}: {
  children: ReactNode;
  helmetContext?: Record<string, unknown>;
}) => (
  <HelmetProvider context={helmetContext}>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </HelmetProvider>
);

/** Everything that needs a router. Layout is mounted once so chat history survives navigation. */
export const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/senior-ux-designer" element={<Navigate to="/#hire" replace />} />
          <Route path="/hire" element={<Navigate to="/#hire" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/og" element={<OGImage />} />
      </Routes>
    </Suspense>
  </>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
