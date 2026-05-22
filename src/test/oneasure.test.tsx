import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProjectPage from "../pages/ProjectPage";
import { projects } from "../lib/projects";
import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
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
  const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeAll(() => {
    window.scrollTo = vi.fn();
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.prototype.observe = vi.fn();
    mockIntersectionObserver.prototype.unobserve = vi.fn();
    mockIntersectionObserver.prototype.disconnect = vi.fn();
    window.IntersectionObserver = mockIntersectionObserver;
  });

  beforeEach(() => {
    consoleErrorMock.mockClear();
  });

  it("renders the case study for oneasure-portal and checks for console errors", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/project/oneasure-portal"]}>
          <Routes>
            <Route path="/project/:id" element={<ProjectPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    // Verify title in H1
    const titles = await screen.findAllByText(/OneAsure Portal/i);
    expect(titles.length).toBeGreaterThan(0);
    
    // Verify case study content
    expect(screen.getByText(/Fragmented systems, fractured workflows/i)).toBeDefined();
    
    // Check for console errors
    expect(consoleErrorMock).not.toHaveBeenCalled();
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

    await screen.findAllByText(/OneAsure Portal/i);

    // Check for masked salary
    expect(screen.getAllByText(/● ● ● ●/i).length).toBeGreaterThan(0);

    // Toggle salary
    const netPayLabel = screen.getByText(/Net Pay/i);
    const toggleButton = netPayLabel.parentElement?.querySelector('button');
    
    if (toggleButton) {
      fireEvent.click(toggleButton);
      // Use a more flexible matcher for the amount
      await waitFor(() => {
        expect(screen.getByText((content) => content.includes(',262.79'))).toBeDefined();
      });
    }
    
    expect(consoleErrorMock).not.toHaveBeenCalled();
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

    await screen.findAllByText(/OneAsure Portal/i);

    // Find "Begin Enrollment" button
    const beginEnrollmentBtn = await screen.findByText(/Begin Enrollment/i);
    fireEvent.click(beginEnrollmentBtn);

    // Should show the overlay
    expect(await screen.findByText(/Open Enrollment/i)).toBeDefined();
    
    // Click "Continue to Review"
    const continueBtn = screen.getByText(/Continue to Review/i);
    fireEvent.click(continueBtn);
    
    expect(screen.getByText(/Review your selections/i)).toBeDefined();

    expect(consoleErrorMock).not.toHaveBeenCalled();
  });
});
