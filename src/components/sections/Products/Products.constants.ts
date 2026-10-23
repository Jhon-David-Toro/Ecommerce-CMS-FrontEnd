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

export const VIEWS = { sale: "sale", newest: "new" } as const;

export const NEW_ARRIVALS_LIMIT = 12;

export const VIEW_TITLES: Record<string, string> = { [VIEWS.sale]: "On Sale", [VIEWS.newest]: "New Arrivals" };

export const PRODUCTS_EMPTY = {
  title: "No products found",
  description: "Nothing matches what you are looking for. Try other filters or browse the whole catalog.",
  actionLabel: "View all products",
  actionHref: "/products",
} as const;
