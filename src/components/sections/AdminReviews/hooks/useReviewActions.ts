import type { ReviewStatus } from "@/lib/catalog/review.types";
import { deleteReview, setReviewStatus } from "@/lib/catalog/reviews.api";

import type { ReviewActionHandlers } from "../AdminReviews.types";

/**
 * Builds the actions that moderate a review and refresh the list afterwards.
 *
 * @param reload Refreshes the list.
 * @returns The handlers to moderate and to remove a review.
 */
export const useReviewActions = (reload: () => void): ReviewActionHandlers => ({
  onModerate: async (id: number, status: ReviewStatus) => {
    await setReviewStatus(id, status);
    reload();
  },
  onRemove: async (id: number) => {
    await deleteReview(id);
    reload();
  },
});
