import { render, screen } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SearchResults } from "./SearchResults";

describe("SearchResults", () => {
  beforeEach(() => window.localStorage.clear());

  it("lists the products that match the query", async () => {
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams("q=jeans") as never);
    render(<SearchResults />);
    expect(await screen.findByRole("heading", { level: 1, name: 'RESULTS FOR "JEANS"' })).toBeInTheDocument();
    expect((await screen.findAllByRole("heading", { level: 3 })).length).toBeGreaterThan(0);
  });

  it("says when nothing matches", async () => {
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams("q=zzzzzz") as never);
    render(<SearchResults />);
    expect(await screen.findByRole("heading", { name: "No products found" })).toBeInTheDocument();
  });

  it("shows a generic title without a query", async () => {
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as never);
    render(<SearchResults />);
    expect(await screen.findByRole("heading", { level: 1, name: "SEARCH" })).toBeInTheDocument();
  });
});
