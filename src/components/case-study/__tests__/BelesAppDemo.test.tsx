import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BelesAppDemo from "../BelesAppDemo";

describe("BelesAppDemo", () => {
  it("shows Hiwet's profile in Dating mode with heart likes", () => {
    render(<BelesAppDemo />);
    expect(screen.getByRole("article", { name: "Hiwet, 31" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dating" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Like Hiwet's main photo" })).toBeInTheDocument();
  });

  it("switches the react affordance to kemay in Friends mode", () => {
    render(<BelesAppDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Friends" }));
    expect(screen.getByRole("button", { name: "Friends" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Say kemay to Hiwet's main photo" })).toBeInTheDocument();
  });

  it("lands the match moment with the Shmagele's suggestion after a like", async () => {
    render(<BelesAppDemo />);
    fireEvent.click(screen.getByRole("button", { name: "Like Hiwet's bio" }));

    expect(await screen.findByRole("dialog", { name: "It's a match" }, { timeout: 2000 })).toBeInTheDocument();
    expect(screen.getByText("Aster might have been onto something")).toBeInTheDocument();
    expect(screen.getByText("Aster suggested them")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Keep looking" }));
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "It's a match" })).not.toBeInTheDocument(), { timeout: 3000 });
  });
});
