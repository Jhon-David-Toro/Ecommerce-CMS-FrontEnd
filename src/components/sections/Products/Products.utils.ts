import { DEFAULT_SORT } from "@/lib/catalog/filters/filters.constants";
import type { FilterCreator, FilterCriteria } from "@/lib/catalog/filters/filters.types";
import type { Product } from "@/lib/catalog/product.types";

import { SORT_COMPARATORS } from "./Products.constants";

/**
 * Tells whether a value passes a multi-select filter: an empty selection lets everything through.
 *
 * @param selected Values the user picked.
 * @param value Value of the product, when it has one.
 * @returns True when the product matches.
 */
export const matchesSelection = (selected: string[], value?: string) =>
  selected.length === 0 || (value !== undefined && selected.includes(value));

/**
 * Tells whether any value of the product is selected: an empty selection lets everything through.
 *
 * @param selected Values the user picked.
 * @param values Values of the product.
 * @returns True when the product matches.
 */
export const matchesAny = (selected: string[], values: string[]) =>
  selected.length === 0 || values.some((value) => selected.includes(value));

export const filterCreators: Record<keyof Omit<FilterCriteria, "sortBy">, FilterCreator> = {
  category:
    ({ category }) =>
    (product) =>
      matchesSelection(category, product.category),
  priceRange:
    ({ priceRange }) =>
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1],
  colors:
    ({ colors }) =>
    (product) =>
      matchesAny(
        colors,
        product.colors.map((color) => color.hex),
      ),
  sizes:
    ({ sizes }) =>
    (product) =>
      matchesAny(sizes, product.sizes),
  dressStyles:
    ({ dressStyles }) =>
    (product) =>
      matchesSelection(dressStyles, product.dressStyle),
};

/**
 * Keeps the products that satisfy every filter and sorts them.
 *
 * @param products Products to filter.
 * @param criteria Filters and sort order chosen by the user.
 * @returns A new, sorted list.
 */
export const filterProducts = (products: Product[], criteria: FilterCriteria) => {
  const filters = Object.values(filterCreators).map((create) => create(criteria));
  const comparator = SORT_COMPARATORS[criteria.sortBy ?? DEFAULT_SORT] ?? SORT_COMPARATORS[DEFAULT_SORT];

  return products.filter((product) => filters.every((matches) => matches(product))).sort(comparator);
};
