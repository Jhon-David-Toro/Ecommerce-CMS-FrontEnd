import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { buildProduct } from "@/test/factories";

import { ProductsGrid } from "./ProductsGrid";

describe("ProductsGrid", () => {
  it("shows a spinner while the products load", () => {
    render(<ProductsGrid products={[]} isLoading />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("offers the whole catalog when nothing matches", () => {
    render(<ProductsGrid products={[]} isLoading={false} />);
    expect(screen.getByText("No products found")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View all products" })).toHaveAttribute("href", "/products");
  });

  it("shows a card for every product", () => {
    render(<ProductsGrid products={[buildProduct({ id: 1, name: "Tee" }), buildProduct({ id: 2, name: "Hoodie" })]} isLoading={false} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
  });
});
