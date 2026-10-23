import { isAdminSession } from "@/lib/auth/auth.session";
import { apiRequest } from "@/lib/shared/http/apiClient";

import type { Review, ReviewInput, ReviewListOptions, ReviewStatus } from "./review.types";

/**
 * Builds the query string that filters the admin list of reviews.
 *
 * @param options Filters.
 * @param options.productId Only reviews of this product.
 * @param options.status Only reviews with this status.
 * @returns The query string, empty without filters.
 */
export const buildReviewQuery = ({ productId, status }: ReviewListOptions) => {
  const params = new URLSearchParams();
  if (productId !== undefined) params.set("productId", String(productId));
  if (status !== undefined) params.set("status", status);
  const query = params.toString();
  return query ? `?${query}` : "";
};

/**
 * Lists reviews: administrators see every status, shoppers only the approved reviews of a product.
 *
 * @param options Filters.
 * @returns The matching reviews.
 */
export const listReviews = async (options: ReviewListOptions = {}): Promise<Review[]> => {
  if (isAdminSession()) return apiRequest<Review[]>(`/api/admin/reviews${buildReviewQuery(options)}`);
  if (options.productId === undefined) return [];
  return apiRequest<Review[]>(`/api/public/catalog/${options.productId}/reviews`);
};

/**
 * Lists the newest approved reviews of the store, for the home page.
 *
 * @param limit Maximum number of reviews.
 * @returns The reviews, newest first.
 */
export const listLatestReviews = (limit: number) => apiRequest<Review[]>(`/api/public/reviews?limit=${limit}`);

/**
 * Sends a review, which waits for moderation. The author is the signed-in user.
 *
 * @param input Review data.
 * @returns The created review.
 */
export const createReview = ({ productId, rating, text }: ReviewInput) =>
  apiRequest<Review>(`/api/products/${productId}/reviews`, { method: "POST", body: { rating, text } });

/**
 * Approves, rejects or reopens a review; the server refreshes the rating of the product.
 *
 * @param id Review id.
 * @param status New status.
 */
export const setReviewStatus = async (id: number, status: ReviewStatus) => {
  await apiRequest<Review>(`/api/admin/reviews/${id}/status`, { method: "PATCH", body: { status } });
};

/**
 * Deletes a review; the server refreshes the rating of the product.
 *
 * @param id Review id.
 */
export const deleteReview = (id: number) => apiRequest<void>(`/api/admin/reviews/${id}`, { method: "DELETE" });
