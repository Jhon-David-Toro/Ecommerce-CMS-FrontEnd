import type { Product } from "./product.types";

/**
 * Picks the most recently added products.
 *
 * @param products Products to choose from.
 * @param limit Number of products to return.
 * @returns The newest products first.
 */
export const getNewArrivals = (products: Product[], limit: number) =>
  [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, limit);

/**
 * Picks the best rated products.
 *
 * @param products Products to choose from.
 * @param limit Number of products to return.
 * @returns The highest rated products first.
 */
export const getTopSelling = (products: Product[], limit: number) => [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);

/**
 * Picks products to recommend next to another one.
 *
 * @param products Products to choose from.
 * @param currentId Product the visitor is looking at, which is left out.
 * @param limit Number of products to return.
 * @returns Best rated products other than the current one.
 */
export const getRelated = (products: Product[], currentId: number, limit: number) =>
  getTopSelling(
    products.filter((product) => product.id !== currentId),
    limit,
  );

/**
 * Tells whether a product is low on stock.
 *
 * @param product Product to check.
 * @param threshold Stock at or under which the product counts as low.
 * @returns True when the stock is at or below the threshold.
 */
export const isLowStock = (product: Product, threshold: number) => product.stock <= threshold;

/**
 * Finds the products whose name, category, brand, dress style or overview contain every word of a query.
 *
 * @param products Products to search.
 * @param query Text typed by the shopper.
 * @returns The matching products; all of them for an empty query.
 */
export const searchProducts = (products: Product[], query: string) => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return products.filter((product) => {
    const haystack = [product.name, product.category, product.brand, product.dressStyle, product.description.overview]
      .join(" ")
      .toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
};
