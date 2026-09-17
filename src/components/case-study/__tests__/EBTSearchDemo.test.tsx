import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EBTSearchDemo from "../EBTSearchDemo";

describe("EBTSearchDemo", () => {
  it("renders the store list initially", () => {
    render(<EBTSearchDemo />);
    expect(screen.getByText("Dalle Kitchen")).toBeInTheDocument();
    expect(screen.getByText("Green Valley Market")).toBeInTheDocument();
  });

  it("navigates to a store's details and back", async () => {
    render(<EBTSearchDemo />);
    fireEvent.click(screen.getAllByText("VIEW DETAILS")[0]);

    // The detail view animates in; wait for it rather than asserting synchronously.
    expect(await screen.findByText("Open Now")).toBeInTheDocument();
    expect(screen.queryByText("VIEW DETAILS")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /back to results/i }));
    expect((await screen.findAllByText("VIEW DETAILS")).length).toBeGreaterThan(0);
  });
});
