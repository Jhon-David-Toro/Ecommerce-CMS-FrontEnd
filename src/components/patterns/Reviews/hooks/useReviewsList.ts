import { useState } from "react";

import type { Review } from "@/lib/catalog/review.types";

import { REVIEWS_PAGE_SIZE, SORT_ORDERS } from "../Reviews.constants";
import { sortReviews } from "../Reviews.utils";

/**
 * Sorts a list of reviews and reveals them a page at a time.
 *
 * @param reviews All the reviews.
 * @returns The sort order and its setter, the visible reviews and the pagination controls.
 */
export const useReviewsList = (reviews: Review[]) => {
  const [sortOrder, setSortOrder] = useState<string>(SORT_ORDERS.latest);
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PAGE_SIZE);

  return {
    sortOrder,
    setSortOrder,
    visibleReviews: sortReviews(reviews, sortOrder).slice(0, visibleCount),
    canLoadMore: visibleCount < reviews.length,
    loadMore: () => setVisibleCount((count) => count + REVIEWS_PAGE_SIZE),
  };
};
