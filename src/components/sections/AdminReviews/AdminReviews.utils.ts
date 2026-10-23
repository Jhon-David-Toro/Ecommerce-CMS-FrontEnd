import type { Product } from "@/lib/catalog/product.types";
import type { Review } from "@/lib/catalog/review.types";

/**
 * Tells whether a review matches the text typed in the search box.
 *
 * @param review Review to check.
 * @param text Search text, already lowercase.
 * @returns True when the author or the text contains the search text.
 */
export const matchesReview = (review: Review, text: string) =>
  [review.author, review.text].some((value) => value.toLowerCase().includes(text));

/**
 * Keeps the reviews with a given moderation status.
 *
 * @param reviews Reviews to filter.
 * @param status Status to keep; empty keeps everything.
 * @returns The matching reviews.
 */
export const filterByStatus = (reviews: Review[], status: string) =>
  status ? reviews.filter((review) => review.status === status) : reviews;

/**
 * Finds the name of the product a review belongs to.
 *
 * @param products Known products.
 * @param productId Product id of the review.
 * @returns The product name, or a placeholder when the product was deleted.
 */
export const getProductName = (products: Product[], productId: number) =>
  products.find((product) => product.id === productId)?.name ?? `Product #${productId}`;
