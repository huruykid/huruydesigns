import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";

vi.mock("@/hooks/useTheme", () => ({ useTheme: () => ({ theme: "light", toggle: vi.fn() }) }));
vi.mock("@/hooks/useChat", () => ({ useChat: () => ({ openChat: vi.fn() }) }));

describe("Fintech navigation", () => {
  it("places Fintech after Work in desktop and mobile menus", () => {
    render(<MemoryRouter initialEntries={["/fintech-ux-designer"]}><Navbar /></MemoryRouter>);
    const primary = screen.getByRole("navigation", { name: "Primary" });
    const links = within(primary).getAllByRole("link");
    expect(links.slice(1, 3).map((link) => link.textContent)).toEqual(["Work", "Fintech"]);
    expect(within(primary).getByRole("link", { name: "Fintech" })).toHaveAttribute("aria-current", "page");
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
    const mobile = screen.getByRole("navigation", { name: "Mobile" });
    expect(within(mobile).getAllByRole("link").slice(0, 2).map((link) => link.textContent)).toEqual(["Work", "Fintech"]);
    expect(within(mobile).getByRole("link", { name: "Fintech" })).toHaveAttribute("href", "/fintech-ux-designer");
  });
});