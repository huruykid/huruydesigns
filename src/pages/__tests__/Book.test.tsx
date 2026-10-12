import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Book from "../Book";
import { book } from "@/lib/book";

const renderBook = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/book"]}>
        <Book />
      </MemoryRouter>
    </HelmetProvider>,
  );

const originalUrls = book.formats.map((f) => f.url);
afterEach(() => book.formats.forEach((f, i) => (f.url = originalUrls[i])));

describe("Book page", () => {
  it("renders the title, the unofficial-biography note and every format", () => {
    renderBook();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(book.title);
    expect(screen.getByText(/not written, authorized or endorsed by Curtis Carroll/)).toBeInTheDocument();
    const store = screen.getByRole("region", { name: "Get a copy" });
    for (const f of book.formats) expect(within(store).getByRole("heading", { name: f.label })).toBeInTheDocument();
  });

  it("never links to a retailer before a format has a live URL", () => {
    book.formats.forEach((f) => (f.url = undefined));
    renderBook();
    expect(screen.queryByRole("link", { name: /buy on/i })).toBeNull();
    expect(screen.getAllByText(/coming soon to amazon/i)).toHaveLength(book.formats.length);
  });

  it("switches a format's button on once its URL is set", () => {
    book.formats[0].url = "https://www.amazon.com/dp/TEST000000";
    renderBook();
    const link = screen.getByRole("link", { name: /buy on amazon/i });
    expect(link).toHaveAttribute("href", "https://www.amazon.com/dp/TEST000000");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
