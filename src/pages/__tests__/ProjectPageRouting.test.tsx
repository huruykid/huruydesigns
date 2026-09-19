import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ProjectPage from "../ProjectPage";

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null })),
      })),
    })),
  },
}));

const renderAt = (path: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/" element={<div>Homepage fallback</div>} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );

describe("ProjectPage routing", () => {
  it("resolves hyphenated project ids", () => {
    renderAt("/project/ebt-finder");
    expect(screen.queryByText("Homepage fallback")).toBeNull();
    expect(screen.getAllByRole("heading", { level: 1 })[0]).toHaveTextContent("EBT Finder");
  });

  it("renders the not-found page for unknown ids instead of redirecting", () => {
    renderAt("/project/does-not-exist");
    expect(screen.queryByText("Homepage fallback")).toBeNull();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Page not found");
  });

  it("shows the passcode teaser, not the narrative, for the gated study", () => {
    renderAt("/project/asure-compliance");
    expect(screen.getByLabelText("Passcode")).toBeInTheDocument();
    expect(screen.queryByText(/forcing a conversation/i)).toBeNull();
  });
});
