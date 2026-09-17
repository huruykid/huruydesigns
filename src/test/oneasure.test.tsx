import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import ProjectPage from "../pages/ProjectPage";

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null })),
      })),
    })),
  },
}));

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/project/oneasure-portal"]}>
        <Routes>
          <Route path="/project/:id" element={<ProjectPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );

describe("OneAsure project page", () => {
  const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

  beforeEach(() => consoleErrorMock.mockClear());
  afterEach(() => consoleErrorMock.mockClear());

  it("renders the case study without console errors", async () => {
    renderPage();
    const h1 = await screen.findAllByRole("heading", { level: 1 });
    expect(h1.some((h) => h.textContent?.startsWith("OneAsure Portal"))).toBe(true);
    expect(screen.getByText(/Fragmented systems, fractured workflows/i)).toBeInTheDocument();
    expect(consoleErrorMock).not.toHaveBeenCalled();
  });

  it("reveals the masked net pay in the pay module demo", async () => {
    renderPage();
    await screen.findAllByText(/OneAsure Portal/i);
    expect(screen.getAllByText(/● ● ● ●/).length).toBeGreaterThan(0);

    const netPayLabel = screen.getAllByText(/Net Pay/i).find((el) => el.tagName === "SPAN");
    const toggleButton = netPayLabel?.parentElement?.querySelector("button");
    expect(toggleButton).toBeTruthy();

    fireEvent.click(toggleButton!);
    await waitFor(() => {
      expect(screen.getAllByText((content) => content.includes(",262.79")).length).toBeGreaterThan(0);
    });
    expect(consoleErrorMock).not.toHaveBeenCalled();
  });

  it("walks through the benefits enrollment demo", async () => {
    renderPage();
    await screen.findAllByText(/OneAsure Portal/i);
    const beginEnrollmentBtns = await screen.findAllByText(/Begin Enrollment/i);
    fireEvent.click(beginEnrollmentBtns[beginEnrollmentBtns.length - 1]);

    expect((await screen.findAllByText(/Open Enrollment/i)).length).toBeGreaterThan(0);
    fireEvent.click(screen.getAllByText(/Continue to Review/i)[0]);
    expect(screen.getByText(/Review your selections/i)).toBeInTheDocument();
    expect(consoleErrorMock).not.toHaveBeenCalled();
  });
});
