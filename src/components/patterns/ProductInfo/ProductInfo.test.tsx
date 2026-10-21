import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import mockProduct from "@/assets/mockProduct.json";

import { ProductInfo } from "./ProductInfo";

describe("ProductInfo", () => {
  it("shows the name, the overview and the call to action", () => {
    render(<ProductInfo product={mockProduct} />);
    expect(screen.getByRole("heading", { level: 2, name: mockProduct.name })).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description.overview)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to Cart" })).toBeInTheDocument();
  });

  it("preselects the first color and the first size", () => {
    render(<ProductInfo product={mockProduct} />);
    expect(screen.getByRole("button", { name: mockProduct.colors[0].name, pressed: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: mockProduct.sizes[0], pressed: true })).toBeInTheDocument();
  });

  it("changes the selected color", async () => {
    render(<ProductInfo product={mockProduct} />);
    await userEvent.click(screen.getByRole("button", { name: mockProduct.colors[1].name }));
    expect(screen.getByRole("button", { name: mockProduct.colors[1].name, pressed: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: mockProduct.colors[0].name, pressed: false })).toBeInTheDocument();
  });

  it("changes the selected size", async () => {
    render(<ProductInfo product={mockProduct} />);
    await userEvent.click(screen.getByRole("button", { name: mockProduct.sizes[1] }));
    expect(screen.getByRole("button", { name: mockProduct.sizes[1], pressed: true })).toBeInTheDocument();
  });
});
