import { describe, expect, it } from "vitest";

import type { FilterCriteria } from "@/lib/catalog/filters/filters.types";
import type { Product } from "@/lib/catalog/product.types";
import { buildProduct } from "@/test/factories";

import { filterProducts, getScopeTitle, matchesAny, matchesSelection, scopeProducts } from "./Products.utils";

const criteria: FilterCriteria = { category: [], priceRange: [0, 250], colors: [], sizes: [], dressStyles: [] };

const black = [{ name: "Black", hex: "black" }];
const white = [{ name: "White", hex: "white" }];

const products: Product[] = [
  buildProduct({ id: 1, name: "Cheap", price: 20, rating: 3, category: "Jeans", colors: black, createdAt: 1 }),
  buildProduct({ id: 2, name: "Pricey", price: 200, rating: 5, category: "Hoodie", colors: white, createdAt: 3 }),
  buildProduct({ id: 3, name: "Middle", price: 100, rating: 4, category: "Jeans", colors: white, createdAt: 2 }),
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

describe("matchesAny", () => {
  it("lets everything through without a selection", () => {
    expect(matchesAny([], [])).toBe(true);
  });

  it("needs at least one selected value", () => {
    expect(matchesAny(["a"], ["a", "b"])).toBe(true);
    expect(matchesAny(["c"], ["a", "b"])).toBe(false);
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

describe("scopeProducts", () => {
  const scope = { query: "", view: "", brand: "", category: "" };

  it("keeps the whole catalog without a scope", () => {
    expect(scopeProducts(products, scope)).toHaveLength(3);
  });

  it("narrows the catalog to one category and names the page after it", () => {
    const jeans = { ...scope, category: "Jeans" };
    expect(names(scopeProducts(products, jeans))).toEqual(["Cheap", "Middle"]);
    expect(getScopeTitle(jeans)).toBe("Jeans");
  });
});
