import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, lazy, Suspense } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};
import Index from "./pages/Index";

// Route-level code splitting: keeps the initial bundle small on every entry route.
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GenerateWireframe = lazy(() => import("./pages/GenerateWireframe"));
const OGImage = lazy(() => import("./pages/OGImage"));
const Resume = lazy(() => import("./pages/Resume"));
const ResumeAlt = lazy(() => import("./pages/ResumeAlt"));
const Hire = lazy(() => import("./pages/Hire"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:id" element={<ProjectPage />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/resume/alt" element={<ResumeAlt />} />
            <Route path="/senior-ux-designer" element={<Hire />} />
            <Route path="/hire" element={<Hire />} />
            <Route path="/generate-wireframe" element={<GenerateWireframe />} />
            <Route path="/og" element={<OGImage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;

