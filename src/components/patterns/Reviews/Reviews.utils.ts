import type { Review } from "@/lib/catalog/review.types";

import { SORT_ORDERS } from "./Reviews.constants";

/**
 * Sorts reviews by date without touching the original list.
 *
 * @param reviews Reviews to sort.
 * @param order Sort order: latest or oldest first.
 * @returns A new sorted list.
 */
export const sortReviews = (reviews: Review[], order: string) => {
  const direction = order === SORT_ORDERS.latest ? -1 : 1;
  return [...reviews].sort((a, b) => direction * (new Date(a.date).getTime() - new Date(b.date).getTime()));
};
