import { create } from "zustand";

import { INITIAL_FILTERS } from "./filters.constants";
import type { FilterState } from "./filters.types";

/**
 * Names the category in the page title only when exactly one category is selected.
 *
 * @param category Selected categories.
 * @returns The category name, or an empty string.
 */
export const getSelectedCategoryName = (category: string[]) => (category.length === 1 ? category[0] : "");

/**
 * Store with the product filters and their setters.
 */
export const useFilterStore = create<FilterState>((set) => ({
  ...INITIAL_FILTERS,
  setCategory: (category) => set({ category, selectedCategoryName: getSelectedCategoryName(category) }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setColors: (colors) => set({ colors }),
  setSizes: (sizes) => set({ sizes }),
  setDressStyles: (dressStyles) => set({ dressStyles }),
  setIsFiltersOpen: (isFiltersOpen) => set({ isFiltersOpen }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () => set(INITIAL_FILTERS),
}));
