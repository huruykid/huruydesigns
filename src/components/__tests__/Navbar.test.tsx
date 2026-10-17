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

describe("App Store service navigation", () => {
  it.each(["/appstore", "/appstore/rescue", "/appstore/examples", "/guides"])("keeps navigation in the service from %s", (path) => {
    render(<MemoryRouter initialEntries={[path]}><Navbar /></MemoryRouter>);
    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(within(primary).getByRole("link", { name: "App Store Launch, service home" })).toHaveAttribute("href", "/appstore");
    expect(within(primary).queryByRole("link", { name: "Resume" })).not.toBeInTheDocument();
    expect(within(primary).getByRole("link", { name: "Services & Pricing" })).toHaveAttribute("href", "/appstore/pricing");
    expect(within(primary).getByRole("link", { name: "Get a Quote" })).toHaveAttribute("href", "/appstore/quote");
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
    fireEvent.click(within(screen.getByRole("navigation", { name: "Mobile" })).getByRole("link", { name: "Services & Pricing" }));
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
    expect(within(primary).getByRole("link", { name: "Services & Pricing" })).toHaveAttribute("aria-current", "page");
  });
  it("keeps the portfolio home identity and navigation", () => {
    render(<MemoryRouter initialEntries={["/"]}><Navbar /></MemoryRouter>);
    expect(screen.getByRole("link", { name: "Huruy Kidanemariam, home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("href", "/resume");
    expect(screen.queryByRole("link", { name: "Get a Quote" })).not.toBeInTheDocument();
  });
});
