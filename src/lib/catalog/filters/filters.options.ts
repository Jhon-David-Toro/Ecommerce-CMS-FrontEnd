import type { Product } from "@/lib/catalog/product.types";

import { DRESS_STYLE_ORDER, SIZE_ORDER } from "./filters.constants";
import type { ColorOption, FilterOptions, PriceRange } from "./filters.types";

/**
 * Gives the position of a value in a preferred order; values that are not in it go last.
 *
 * @param value Value to place.
 * @param order Preferred order.
 * @returns The position of the value.
 */
const rankOf = (value: string, order: readonly string[]) => {
  const index = order.indexOf(value);
  return index === -1 ? order.length : index;
};

/**
 * Removes repeated and empty values and sorts the rest by a preferred order, then alphabetically.
 *
 * @param values Values to clean.
 * @param order Preferred order.
 * @returns The sorted, unique values.
 */
const sortedUnique = (values: string[], order: readonly string[] = []) =>
  [...new Set(values.filter(Boolean))].sort((a, b) => rankOf(a, order) - rankOf(b, order) || a.localeCompare(b));

/**
 * Finds the lowest and highest price of the catalog, rounded outwards to whole numbers.
 *
 * @param products Published products.
 * @returns The bounds, or null when there is no price range to choose from.
 */
export const getPriceBounds = (products: Product[]): PriceRange | null => {
  if (!products.length) return null;
  const prices = products.map((product) => product.price);
  const bounds: PriceRange = [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  return bounds[0] < bounds[1] ? bounds : null;
};

/**
 * Lists the colors the catalog uses, one per color value, in the order they first appear.
 *
 * @param products Published products.
 * @returns The color options.
 */
export const getColorOptions = (products: Product[]): ColorOption[] => {
  const colors = new Map<string, ColorOption>();
  products
    .flatMap((product) => product.colors)
    .filter(({ hex }) => !colors.has(hex))
    .forEach(({ hex, name }) => colors.set(hex, { hex, name }));
  return [...colors.values()];
};

/**
 * Builds the options of every filter from what the catalog really has.
 *
 * @param products Published products.
 * @returns The categories, price bounds, colors, sizes and dress styles to offer.
 */
export const buildFilterOptions = (products: Product[]): FilterOptions => ({
  categories: sortedUnique(products.map((product) => product.category)),
  priceBounds: getPriceBounds(products),
  colors: getColorOptions(products),
  sizes: sortedUnique(
    products.flatMap((product) => product.sizes),
    SIZE_ORDER,
  ),
  dressStyles: sortedUnique(
    products.map((product) => product.dressStyle),
    DRESS_STYLE_ORDER,
  ),
});
