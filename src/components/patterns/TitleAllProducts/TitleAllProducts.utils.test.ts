import { describe, expect, it } from "vitest";

import { getShowingText, getTitle } from "./TitleAllProducts.utils";

describe("getShowingText", () => {
  it("reports when there are no products", () => {
    expect(getShowingText({ currentPage: 1, productsPerPage: 9, totalProducts: 0 })).toBe("No Products Found");
  });

  it("shows the range of the first page", () => {
    expect(getShowingText({ currentPage: 1, productsPerPage: 9, totalProducts: 20 })).toBe("Showing 1-9 of 20 Products");
  });

  it("cuts the range at the total on the last page", () => {
    expect(getShowingText({ currentPage: 3, productsPerPage: 9, totalProducts: 20 })).toBe("Showing 19-20 of 20 Products");
  });
});

describe("getTitle", () => {
  it("uses the category name when there is one", () => {
    expect(getTitle("Jeans")).toBe("Jeans");
  });

  it("falls back to the generic title for an empty or blank name", () => {
    expect(getTitle("")).toBe("All Products");
    expect(getTitle("   ")).toBe("All Products");
  });
});
