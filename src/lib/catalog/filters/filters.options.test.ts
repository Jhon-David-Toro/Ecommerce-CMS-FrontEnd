import { describe, expect, it } from "vitest";

import { buildFilterOptions, getPriceBounds } from "./filters.options";
import { buildProduct } from "@/test/factories";

const products = [
  buildProduct({
    id: 1,
    price: 49.5,
    category: "Jeans",
    dressStyle: "Party",
    sizes: ["Large", "Small"],
    colors: [{ name: "Navy", hex: "#001" }],
  }),
  buildProduct({
    id: 2,
    price: 120.2,
    category: "Hoodie",
    dressStyle: "Casual",
    sizes: ["Small", "XX-Small", "Custom"],
    colors: [
      { name: "Navy", hex: "#001" },
      { name: "Red", hex: "#f00" },
    ],
  }),
  buildProduct({ id: 3, price: 80, category: "Jeans", dressStyle: "", sizes: [], colors: [] }),
];

describe("buildFilterOptions", () => {
  it("offers only what the catalog has, sorted", () => {
    const options = buildFilterOptions(products);
    expect(options.categories).toEqual(["Hoodie", "Jeans"]);
    expect(options.dressStyles).toEqual(["Casual", "Party"]);
    expect(options.sizes).toEqual(["XX-Small", "Small", "Large", "Custom"]);
    expect(options.colors).toEqual([
      { hex: "#001", name: "Navy" },
      { hex: "#f00", name: "Red" },
    ]);
    expect(options.priceBounds).toEqual([49, 121]);
  });

  it("offers nothing for an empty catalog", () => {
    expect(buildFilterOptions([])).toEqual({ categories: [], priceBounds: null, colors: [], sizes: [], dressStyles: [] });
  });
});

describe("getPriceBounds", () => {
  it("has no bounds when every product costs the same", () => {
    expect(getPriceBounds([buildProduct({ price: 30 }), buildProduct({ price: 30 })])).toBeNull();
  });
});
