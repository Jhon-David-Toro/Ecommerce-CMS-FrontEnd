import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ProductPage from "./page";

describe("ProductPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: () => Promise.resolve([]) }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the product details", async () => {
    render(<ProductPage />);
    expect(screen.getByRole("heading", { level: 2, name: "One Life Graphic T-Shirt" })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "YOU MIGHT ALSO LIKE" })).toBeInTheDocument();
  });
});
