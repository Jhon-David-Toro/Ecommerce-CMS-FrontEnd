import { describe, expect, it } from "vitest";

import type { FilterCriteria } from "@/lib/catalog/filters/filters.types";
import type { Product } from "@/lib/catalog/product.types";

import { filterProducts, matchesSelection } from "./Products.utils";

const criteria: FilterCriteria = { category: [], priceRange: [0, 250], colors: [], sizes: [], dressStyles: [] };

const products: Product[] = [
  { id: 1, name: "Cheap", price: 20, rating: 3, image: "/1.png", category: "Jeans", color: "black", date: 1 },
  { id: 2, name: "Pricey", price: 200, rating: 5, image: "/2.png", category: "Hoodie", color: "white", date: 3 },
  { id: 3, name: "Middle", price: 100, rating: 4, image: "/3.png", category: "Jeans", color: "white", date: 2 },
];

const names = (list: Product[]) => list.map((product) => product.name);

describe("matchesSelection", () => {
  it("lets everything through without a selection", () => {
    expect(matchesSelection([])).toBe(true);
  });

  it("requires the product value to be selected", () => {
    expect(matchesSelection(["black"], "black")).toBe(true);
    expect(matchesSelection(["black"], "white")).toBe(false);
    expect(matchesSelection(["black"], undefined)).toBe(false);
  });
});

describe("filterProducts", () => {
  it("sorts by popularity by default", () => {
    expect(names(filterProducts(products, criteria))).toEqual(["Pricey", "Middle", "Cheap"]);
  });

  it("filters by category and color together", () => {
    const result = filterProducts(products, { ...criteria, category: ["Jeans"], colors: ["white"] });
    expect(names(result)).toEqual(["Middle"]);
  });

  it("filters by price range", () => {
    expect(names(filterProducts(products, { ...criteria, priceRange: [50, 150] }))).toEqual(["Middle"]);
  });

  it.each([
    ["Price: Low to High", ["Cheap", "Middle", "Pricey"]],
    ["Price: High to Low", ["Pricey", "Middle", "Cheap"]],
    ["Newest", ["Pricey", "Middle", "Cheap"]],
  ])("sorts by %s", (sortBy, expected) => {
    expect(names(filterProducts(products, { ...criteria, sortBy }))).toEqual(expected);
  });

  it("falls back to popularity for an unknown sort", () => {
    expect(names(filterProducts(products, { ...criteria, sortBy: "Unknown" }))[0]).toBe("Pricey");
  });
});
