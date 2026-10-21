import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProductsPage from "./page";

describe("ProductsPage", () => {
  it("renders the products listing", () => {
    render(<ProductsPage />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
