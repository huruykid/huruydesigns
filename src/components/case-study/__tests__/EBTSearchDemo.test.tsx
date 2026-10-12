import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EBTSearchDemo from "../EBTSearchDemo";

const settle = () => new Promise((r) => setTimeout(r, 400));

describe("EBTSearchDemo", () => {
  it("lists every store until a filter is chosen", () => {
    render(<EBTSearchDemo />);
    expect(screen.getByText("Break Time Mini Mart")).toBeInTheDocument();
    expect(screen.getByText("Midtown Fresh Market")).toBeInTheDocument();
    expect(screen.getByText("Found 5 stores within 5 miles")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All Nearby" })).toHaveAttribute("aria-pressed", "true");
  });

  it("filters the results when a category tab is pressed", async () => {
    render(<EBTSearchDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Hot Meals" }));

    expect(screen.getByRole("button", { name: "Hot Meals" })).toHaveAttribute("aria-pressed", "true");
    expect(await screen.findByText("Found 1 store within 5 miles")).toBeInTheDocument();
    expect(screen.getByText("Taqueria La Esperanza")).toBeInTheDocument();
    expect(screen.getByText("RMP")).toBeInTheDocument();
    // Exit animations run in AnimatePresence; wait for the grocery card to leave.
    await settle();
    expect(screen.queryByText("Midtown Fresh Market")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "All Nearby" }));
    expect(await screen.findByText("Found 5 stores within 5 miles")).toBeInTheDocument();
  });

  it("hides closed stores when Open Now is switched on", async () => {
    render(<EBTSearchDemo />);
    const toggle = screen.getByRole("switch", { name: /open now/i });
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(await screen.findByText("Found 3 stores within 5 miles")).toBeInTheDocument();
    await settle();
    expect(screen.queryByText("Sunrise Bakery & Donuts")).not.toBeInTheDocument();
  });
});
