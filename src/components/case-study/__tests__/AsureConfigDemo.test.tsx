import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AsureConfigDemo from "../AsureConfigDemo";

const rate = () => screen.getByLabelText(/^Rate/);

describe("AsureConfigDemo", () => {
  it("opens on the CA-SDI draft with its downstream impact", () => {
    render(<AsureConfigDemo />);
    expect(screen.getByRole("heading", { name: "CA-SDI" })).toBeInTheDocument();
    expect(screen.getAllByText("Draft").length).toBeGreaterThan(0);
    expect(screen.getByText("214 employers")).toBeInTheDocument();
  });

  it("warns on an unusual change and hard-stops past the jurisdiction maximum", () => {
    render(<AsureConfigDemo />);
    fireEvent.change(rate(), { target: { value: "1.500" } });
    expect(screen.getByText(/Unusual change/)).toBeInTheDocument();

    fireEvent.change(rate(), { target: { value: "6" } });
    expect(screen.getByText(/can't exceed 5\.000%/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save draft…" })).toBeDisabled();
  });

  it("takes a draft through save, review, lock and release, logging each step", () => {
    render(<AsureConfigDemo />);
    fireEvent.change(rate(), { target: { value: "1.300" } });
    fireEvent.click(screen.getByRole("button", { name: "Save draft…" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(/214 employers/)).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: "Save draft" }));

    fireEvent.click(screen.getByRole("button", { name: "Submit for review" }));
    fireEvent.click(screen.getByRole("button", { name: "Approve as reviewer" }));
    fireEvent.click(screen.getByRole("button", { name: "Release…" }));
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Release v15" }));

    expect(screen.getByRole("button", { name: "Create new revision" })).toBeInTheDocument();
    expect(rate()).toHaveAttribute("readonly");
    fireEvent.click(screen.getByRole("tab", { name: /History/ }));
    expect(screen.getByText(/Released v15/)).toBeInTheDocument();
    expect(screen.getByText(/Edited rate 1\.200% → 1\.300%/)).toBeInTheDocument();
  });

  it("finds agencies and tax codes from search", () => {
    render(<AsureConfigDemo />);
    fireEvent.change(screen.getByLabelText("Search agencies and tax codes"), { target: { value: "texas" } });
    fireEvent.click(screen.getByRole("option", { name: /TX-UI/ }));
    expect(screen.getByRole("heading", { name: "TX-UI" })).toBeInTheDocument();
  });
});
