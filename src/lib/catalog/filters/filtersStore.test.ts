import { beforeEach, describe, expect, it } from "vitest";

import { INITIAL_FILTERS } from "./filters.constants";
import { getSelectedCategoryName, useFilterStore } from "./filtersStore";

describe("getSelectedCategoryName", () => {
  it("names the category only when one is selected", () => {
    expect(getSelectedCategoryName([])).toBe("");
    expect(getSelectedCategoryName(["Jeans"])).toBe("Jeans");
    expect(getSelectedCategoryName(["Jeans", "Shorts"])).toBe("");
  });
});

describe("useFilterStore", () => {
  beforeEach(() => {
    useFilterStore.setState(INITIAL_FILTERS);
  });

  it("starts with the initial filters", () => {
    expect(useFilterStore.getState()).toMatchObject(INITIAL_FILTERS);
  });

  it("keeps the category name in sync with the selected categories", () => {
    useFilterStore.getState().setCategory(["Hoodie"]);
    expect(useFilterStore.getState().selectedCategoryName).toBe("Hoodie");
  });

  it("restores everything on reset", () => {
    const { setColors, setSortBy, resetFilters } = useFilterStore.getState();
    setColors(["black"]);
    setSortBy("Newest");
    resetFilters();
    expect(useFilterStore.getState()).toMatchObject(INITIAL_FILTERS);
  });
});
