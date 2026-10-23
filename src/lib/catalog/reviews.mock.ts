import { createRepository } from "@/lib/mock/repository";

import { productRepository } from "./catalog.api";
import { REVIEW_STATUSES, REVIEW_STORAGE_KEY } from "./catalog.constants";
import { buildSeedReviews } from "./catalog.seed";
import type { Review, ReviewInput, ReviewListOptions, ReviewStatus } from "./review.types";

export const reviewRepository = createRepository<Review>(REVIEW_STORAGE_KEY, buildSeedReviews);

/**
 * Keeps the rating and review count of a product in sync with its approved reviews.
 *
 * @param productId Product to update.
 */
export const syncProductRating = async (productId: number) => {
  const approved = (await reviewRepository.list()).filter(
    (review) => review.productId === productId && review.status === REVIEW_STATUSES.approved,
  );
  const rating = approved.length ? approved.reduce((sum, review) => sum + review.rating, 0) / approved.length : 0;
  const product = await productRepository.getById(productId);
  if (product) await productRepository.update(productId, { rating: Math.round(rating * 10) / 10, reviewsCount: approved.length });
};

/**
 * Lists reviews, optionally for one product or one moderation status.
 *
 * @param options Filters.
 * @param options.productId Only reviews of this product.
 * @param options.status Only reviews with this status.
 * @returns The matching reviews.
 */
export const listReviews = async ({ productId, status }: ReviewListOptions = {}) =>
  (await reviewRepository.list()).filter(
    (review) => (productId === undefined || review.productId === productId) && (status === undefined || review.status === status),
  );

/**
 * Lists the newest approved reviews of the store, for the home page.
 *
 * @param limit Maximum number of reviews.
 * @returns The reviews, newest first.
 */
export const listLatestReviews = async (limit: number) =>
  (await reviewRepository.list())
    .filter((review) => review.status === REVIEW_STATUSES.approved)
    .sort((a, b) => b.id - a.id)
    .slice(0, limit);

/**
 * Stores a new review, which waits for moderation.
 *
 * @param input Review data.
 * @returns The created review.
 */
export const createReview = (input: ReviewInput) => reviewRepository.create(input);

/**
 * Approves or rejects a review and refreshes the rating of its product.
 *
 * @param id Review id.
 * @param status New status.
 */
export const setReviewStatus = async (id: number, status: ReviewStatus) => {
  const updated = await reviewRepository.update(id, { status });
  await syncProductRating(updated.productId);
};

/**
 * Deletes a review and refreshes the rating of its product.
 *
 * @param id Review id.
 */
export const deleteReview = async (id: number) => {
  const review = await reviewRepository.getById(id);
  await reviewRepository.remove(id);
  if (review) await syncProductRating(review.productId);
};
