import type { Product } from "@/lib/catalog/product.types";

/**
 * Tells whether a product matches the text typed in the search box.
 *
 * @param product Product to check.
 * @param text Search text, already lowercase.
 * @returns True when the name, category or brand contains the text.
 */
export const matchesProduct = (product: Product, text: string) =>
  [product.name, product.category, product.brand].some((value) => value.toLowerCase().includes(text));

/**
 * Keeps the products with a given status.
 *
 * @param products Products to filter.
 * @param status Status to keep; empty keeps everything.
 * @returns The matching products.
 */
export const filterByStatus = (products: Product[], status: string) =>
  status ? products.filter((product) => product.status === status) : products;
