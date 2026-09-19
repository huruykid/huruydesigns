import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EBTSearchDemo from "../EBTSearchDemo";

describe("EBTSearchDemo", () => {
  it("lists every store until a filter is chosen", () => {
    render(<EBTSearchDemo />);
    expect(screen.getByText("Dalle Kitchen")).toBeInTheDocument();
    expect(screen.getByText("Green Valley Market")).toBeInTheDocument();
    expect(screen.getByText("4 places near you")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
  });

  it("filters the results when a category pill is pressed", async () => {
    render(<EBTSearchDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Hot Food" }));

    expect(screen.getByRole("button", { name: "Hot Food" })).toHaveAttribute("aria-pressed", "true");
    expect(await screen.findByText("1 place near you")).toBeInTheDocument();
    expect(screen.getByText("Dalle Kitchen")).toBeInTheDocument();
    // Exit animations run in AnimatePresence; wait for the grocery card to leave.
    await new Promise((r) => setTimeout(r, 400));
    expect(screen.queryByText("Green Valley Market")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(await screen.findByText("4 places near you")).toBeInTheDocument();
  });
});
