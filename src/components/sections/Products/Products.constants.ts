import { SORT_LABELS } from "@/lib/catalog/filters/filters.constants";
import type { ProductComparator } from "@/lib/catalog/filters/filters.types";

export const PRODUCTS_PER_PAGE = 9;

export const SORT_COMPARATORS: Record<string, ProductComparator> = {
  [SORT_LABELS.priceAscending]: (a, b) => a.price - b.price,
  [SORT_LABELS.priceDescending]: (a, b) => b.price - a.price,
  [SORT_LABELS.newest]: (a, b) => (b.date ?? 0) - (a.date ?? 0),
  [SORT_LABELS.popular]: (a, b) => b.rating - a.rating,
};
