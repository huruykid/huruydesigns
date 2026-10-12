import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ComplianceWorkflow from "../ComplianceWorkflow";

describe("configuration workflow illustration", () => {
  it("lets readers explore review and history without implying a real release", () => {
    render(<ComplianceWorkflow interactive />);
    fireEvent.click(screen.getByRole("button", { name: "2. Review" }));
    expect(screen.getByRole("button", { name: "2. Review" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Make the release decision explicit")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "3. History" }));
    expect(screen.getByText("Keep a traceable revision")).toBeVisible();
    expect(screen.getByText(/Not a production screen or a live compliance tool/)).toBeVisible();
  });
});
