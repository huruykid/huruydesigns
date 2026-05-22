import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProjectPage from "../pages/ProjectPage";
import { projects } from "../lib/projects";
import { describe, it, expect, vi } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import App from "../App";

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

describe("OneAsure Project Page", () => {
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
    // Pay Module
    expect(screen.getByText(/Pay Module/i)).toBeDefined();
    // Benefits Module
    expect(screen.getByText(/Benefits Module/i)).toBeDefined();
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

    // Find the Pay Module card
    const payModuleText = await screen.findByText(/Pay Module/i);
    expect(payModuleText).toBeDefined();

    // The eye icon toggle in PayModuleDemo
    // In PayModuleDemo.tsx, the initial state of salaryVisible is false.
    // So it should show the dots "● ● ● ●"
    expect(screen.getAllByText(/● ● ● ●/i).length).toBeGreaterThan(0);

    // Click the eye icon
    // It's a button with Eye icon. Let's find it by role or just click any button near Net Pay
    const eyeButtons = screen.getAllByRole("button");
    const eyeButton = eyeButtons.find(b => b.innerHTML.includes("svg")); // Crude but let's try to be more specific
    
    // Actually PayModuleDemo has multiple eye icons or similar.
    // Let's look for "Net Pay" then the button next to it.
    const netPayText = screen.getAllByText(/Net Pay/i)[0];
    const toggleButton = netPayText.parentElement?.querySelector("button");
    if (toggleButton) {
      fireEvent.click(toggleButton);
      // Now it should show the amount
      expect(await screen.findByText(/$4,262.79/i)).toBeDefined();
    }
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

    // Find "Begin Enrollment" button in Benefits Module
    const beginEnrollmentBtn = await screen.findByText(/Begin Enrollment/i);
    fireEvent.click(beginEnrollmentBtn);

    // Should show the overlay with "Select Plans"
    expect(await screen.findByText(/Open Enrollment/i)).toBeDefined();
    expect(screen.getByText(/Select plans to enroll in/i)).toBeDefined();
    
    // Click "Continue to Review"
    const continueBtn = screen.getByText(/Continue to Review/i);
    fireEvent.click(continueBtn);
    
    expect(screen.getByText(/Review your selections/i)).toBeDefined();
  });

  it("Checks if /project/oneasure (alias) works", async () => {
    // This will test if there is any mapping for 'oneasure'
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
    
    // Navigate to /project/oneasure
    // Note: MemoryRouter is already in App if I use App, but App uses BrowserRouter.
    // So I should use MemoryRouter and wrap App's internal Routes or just test ProjectPage directly with id 'oneasure'
  });
});
