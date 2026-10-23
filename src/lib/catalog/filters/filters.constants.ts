import { DRESS_STYLE_OPTIONS } from "@/lib/taxonomy/taxonomy.constants";

import type { FilterOptions, FilterValues } from "./filters.types";

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
  priceRange: null,
  colors: [],
  sizes: [],
  dressStyles: [],
  isFiltersOpen: false,
  sortBy: DEFAULT_SORT,
  selectedCategoryName: "",
};

export const SIZE_ORDER = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large"] as const;

export const DRESS_STYLE_ORDER = DRESS_STYLE_OPTIONS;

export const NO_FILTER_OPTIONS: FilterOptions = { categories: [], priceBounds: null, colors: [], sizes: [], dressStyles: [] };
