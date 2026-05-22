import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProjectPage from "../pages/ProjectPage";
import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { HelmetProvider } from "react-helmet-async";

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    }))
  }
}));

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

    const h1 = await screen.findAllByRole('heading', { level: 1 });
    expect(h1.some(h => h.textContent === "OneAsure Portal")).toBe(true);
    expect(screen.getByText(/Fragmented systems, fractured workflows/i)).toBeDefined();
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
    const masks = screen.getAllByText(/● ● ● ●/i);
    expect(masks.length).toBeGreaterThan(0);

    const netPayLabel = screen.getAllByText(/Net Pay/i).find(el => el.tagName === 'SPAN');
    const toggleButton = netPayLabel?.parentElement?.querySelector('button');
    
    if (toggleButton) {
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(screen.getAllByText((content) => content.includes(',262.79')).length).toBeGreaterThan(0);
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
    const beginEnrollmentBtns = await screen.findAllByText(/Begin Enrollment/i);
    // Click the one in the main content, usually the last one rendered or first in main
    fireEvent.click(beginEnrollmentBtns[beginEnrollmentBtns.length - 1]);

    const overlays = await screen.findAllByText(/Open Enrollment/i);
    expect(overlays.length).toBeGreaterThan(0);
    
    const continueBtns = screen.getAllByText(/Continue to Review/i);
    fireEvent.click(continueBtns[0]);
    
    expect(screen.getByText(/Review your selections/i)).toBeDefined();
    expect(consoleErrorMock).not.toHaveBeenCalled();
  });
});
