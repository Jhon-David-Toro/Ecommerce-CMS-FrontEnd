import { SORT_LABELS } from "@/lib/catalog/filters/filters.constants";
import type { ProductComparator } from "@/lib/catalog/filters/filters.types";

export const PRODUCTS_PER_PAGE = 9;

export const NO_OPTIONS = {};

export const SORT_COMPARATORS: Record<string, ProductComparator> = {
  [SORT_LABELS.priceAscending]: (a, b) => a.price - b.price,
  [SORT_LABELS.priceDescending]: (a, b) => b.price - a.price,
  [SORT_LABELS.newest]: (a, b) => b.createdAt - a.createdAt,
  [SORT_LABELS.popular]: (a, b) => b.rating - a.rating,
};
