import type { ListTable } from "@/components/patterns/AdminListView";
import type { Product } from "@/lib/catalog/product.types";
import type { Review } from "@/lib/catalog/review.types";

import { REVIEW_COLUMNS, buildActionsColumn, buildProductColumn } from "../AdminReviews.columns";
import type { ReviewActionHandlers } from "../AdminReviews.types";

/**
 * Describes the reviews table: product, author, rating, text, status and moderation buttons.
 *
 * @param products Known products, to show the name of the product of each review.
 * @param handlers Actions that moderate or remove a review.
 * @returns The table description.
 */
export const useReviewTable = (products: Product[], handlers: ReviewActionHandlers): ListTable<Review> => ({
  caption: "Reviews",
  emptyTitle: "No reviews found",
  getRowKey: (review) => review.id,
  columns: [buildProductColumn(products), ...REVIEW_COLUMNS, buildActionsColumn(handlers)],
});
