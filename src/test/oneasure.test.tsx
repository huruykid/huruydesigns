import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProjectPage from "../pages/ProjectPage";
import { projects } from "../lib/projects";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { HelmetProvider } from "react-helmet-async";

// Mock Supabase
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    }))
  }
}));

// Mock useIsMobile
vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => false
}));

describe("OneAsure Project Page", () => {
  beforeAll(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  it("renders the case study for oneasure-portal", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/project/oneasure-portal"]}>
          <Routes>
            <Route path="/project/:id" element={<ProjectPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    // Verify title
    expect(await screen.findByText(/OneAsure Portal/i)).toBeDefined();
    
    // Verify case study content
    expect(screen.getByText(/Fragmented systems, fractured workflows/i)).toBeDefined();
    
    // Verify interactive shells are present
    expect(screen.getAllByText(/Pay Module/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Benefits Module/i).length).toBeGreaterThan(0);
  });

  it("PayModuleDemo interactivity works", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/project/oneasure-portal"]}>
          <Routes>
            <Route path="/project/:id" element={<ProjectPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    // Wait for the page to load
    await screen.findByText(/OneAsure Portal/i);

    // The eye icon toggle in PayModuleDemo
    // Check for masked salary
    expect(screen.getAllByText(/● ● ● ●/i).length).toBeGreaterThan(0);

    // Click the toggle button
    const toggleButtons = screen.getAllByRole("button").filter(b => b.innerHTML.includes("svg"));
    // The first one in Pay card should be the one
    fireEvent.click(toggleButtons[0]);

    // Now it should show the amount
    expect(await screen.findByText(/$4,262.79/i)).toBeDefined();
  });

  it("BenefitsModuleDemo interactivity works", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/project/oneasure-portal"]}>
          <Routes>
            <Route path="/project/:id" element={<ProjectPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    await screen.findByText(/OneAsure Portal/i);

    // Find "Begin Enrollment" button
    const beginEnrollmentBtn = await screen.findByText(/Begin Enrollment/i);
    fireEvent.click(beginEnrollmentBtn);

    // Should show the overlay
    expect(await screen.findByText(/Open Enrollment/i)).toBeDefined();
    expect(screen.getByText(/Select plans to enroll in/i)).toBeDefined();
    
    // Click "Continue to Review"
    const continueBtn = screen.getByText(/Continue to Review/i);
    fireEvent.click(continueBtn);
    
    expect(screen.getByText(/Review your selections/i)).toBeDefined();
  });

  it("Checks if /project/oneasure works (expected to FAIL or REDIRECT if not an alias)", async () => {
    // If it's a Navigate to "/", it won't render the project page
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/project/oneasure"]}>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/project/:id" element={<ProjectPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    // If it redirects to home, "OneAsure Portal" should NOT be found
    const portalTitle = screen.queryByText(/OneAsure Portal/i);
    if (!portalTitle) {
      console.log("/project/oneasure redirected or did not render the project.");
    } else {
      console.log("/project/oneasure RENDERED the project.");
    }
  });
});
