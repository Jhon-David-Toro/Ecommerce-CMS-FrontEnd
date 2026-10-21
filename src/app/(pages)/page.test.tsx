import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Home from "./page";

const catalog = {
  newArrivals: [{ id: 1, name: "New jacket", price: 100, rating: 4, image: "/new.png" }],
  topSelling: [{ id: 2, name: "Top shirt", price: 50, rating: 5, image: "/top.png" }],
};

describe("Home page", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: () => Promise.resolve(catalog) }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("requests the catalog on mount", async () => {
    render(<Home />);
    await waitFor(() => expect(fetch).toHaveBeenCalledWith("/data/products.json"));
  });

  it("renders the hero and both product sections", async () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(await screen.findByText("New jacket")).toBeInTheDocument();
    expect(await screen.findByText("Top shirt")).toBeInTheDocument();
  });
});
