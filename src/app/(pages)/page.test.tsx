import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import Home from "./page";

describe("Home page", () => {
  beforeEach(() => window.localStorage.clear());

  it("renders the hero headline", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("shows the new arrivals and top selling sections with products from the catalog", async () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 2, name: "New Arrivals" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Top Selling" })).toBeInTheDocument();
    expect((await screen.findAllByRole("heading", { level: 3 })).length).toBeGreaterThan(0);
  });
});
