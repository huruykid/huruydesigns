import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import OneAsurePortalDemo from "../OneAsurePortalDemo";

describe("OneAsurePortalDemo", () => {
  it("moves between modules from the portal navigation", async () => {
    render(<OneAsurePortalDemo layout="mobile" initial="Benefits" />);
    expect(screen.getByRole("button", { name: /Benefits/, current: "page" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^Time/ }));
    expect(await screen.findByText("This week")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^Home/ }));
    fireEvent.click(await screen.findByRole("button", { name: "Next paycheck, go to Pay" }));
    expect(await screen.findByRole("button", { name: /^Pay/, current: "page" })).toBeInTheDocument();
  });
});
