import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it, vi } from "vitest";
import Contact from "../Contact";
import { person } from "@/lib/resume";

function renderContact() {
  render(<HelmetProvider><MemoryRouter initialEntries={["/contact?role=senior-ux-designer"]}><Contact /></MemoryRouter></HelmetProvider>);
}

describe("direct contact", () => {
  it("copies the address and confirms success without requiring a form", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    renderContact();
    expect(screen.getByRole("link", { name: "Email Huruy" })).toHaveAttribute("href", `mailto:${person.email}?subject=Senior%20UX%20Designer%20opportunity`);
    fireEvent.click(screen.getByRole("button", { name: "Copy email" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Email address copied."));
    expect(writeText).toHaveBeenCalledWith(person.email);
  });

  it("keeps an accessible fallback when clipboard permission is denied", async () => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) } });
    renderContact();
    fireEvent.click(screen.getByRole("button", { name: "Copy email" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Select and copy the address above."));
    expect(screen.getByRole("link", { name: person.email })).toBeVisible();
  });
});
