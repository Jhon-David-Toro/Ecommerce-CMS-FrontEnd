import type { FilterValues } from "./filters.types";

export const SORT_LABELS = {
  popular: "Most Popular",
  priceAscending: "Price: Low to High",
  priceDescending: "Price: High to Low",
  newest: "Newest",
} as const;

export const SORT_OPTIONS = [SORT_LABELS.popular, SORT_LABELS.priceAscending, SORT_LABELS.priceDescending, SORT_LABELS.newest] as const;

export const DEFAULT_SORT = SORT_LABELS.popular;

export const INITIAL_FILTERS: FilterValues = {
  category: [],
  priceRange: [50, 200],
  colors: [],
  sizes: [],
  dressStyles: [],
  isFiltersOpen: true,
  sortBy: DEFAULT_SORT,
  selectedCategoryName: "",
};
