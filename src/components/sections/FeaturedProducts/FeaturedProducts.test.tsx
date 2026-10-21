import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { Product } from "@/lib/catalog/product.types";

import FeaturedProducts from "./FeaturedProducts";

const buildProducts = (count: number): Product[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: 30,
    discountPrice: null,
    rating: 4,
    image: `/product-${index + 1}.jpg`,
  }));

describe("FeaturedProducts", () => {
  it("shows the section title", () => {
    render(<FeaturedProducts category="Top Picks" products={buildProducts(2)} />);
    expect(screen.getByRole("heading", { level: 2, name: "Top Picks" })).toBeInTheDocument();
  });

  it("shows every product when there are four or fewer, without the View All button", () => {
    render(<FeaturedProducts category="Top Picks" products={buildProducts(4)} />);
    expect(screen.getAllByRole("img", { name: /Product \d/ })).toHaveLength(4);
    expect(screen.queryByRole("button", { name: "View All" })).not.toBeInTheDocument();
  });

  it("shows four products first and the rest after View All", async () => {
    render(<FeaturedProducts category="Top Picks" products={buildProducts(6)} />);
    expect(screen.queryByText("Product 5")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "View All" }));
    expect(screen.getByText("Product 5")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "View All" })).not.toBeInTheDocument();
  });
});
