import type { Column } from "@/components/patterns/DataTable/DataTable.types";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import type { Product } from "@/lib/catalog/product.types";
import type { Review } from "@/lib/catalog/review.types";

import { REVIEW_TONES } from "./AdminReviews.constants";
import type { ReviewActionHandlers } from "./AdminReviews.types";
import { getProductName } from "./AdminReviews.utils";
import { ReviewActions } from "./parts/ReviewActions";

export const REVIEW_COLUMNS: Column<Review>[] = [
  { key: "author", header: "Author", render: (review) => review.author },
  { key: "rating", header: "Rating", render: (review) => <Rating rating={review.rating} size="small" /> },
  { key: "text", header: "Review", render: (review) => review.text },
  { key: "status", header: "Status", render: (review) => <Badge tone={REVIEW_TONES[review.status]}>{review.status}</Badge> },
];

/**
 * Builds the first column of the reviews table, with the name of the product of each review.
 *
 * @param products Known products.
 * @returns The product column.
 */
export const buildProductColumn = (products: Product[]): Column<Review> => ({
  key: "product",
  header: "Product",
  render: (review) => getProductName(products, review.productId),
});

/**
 * Builds the last column of the reviews table, with the moderation buttons.
 *
 * @param handlers Actions that moderate or remove a review.
 * @returns The actions column.
 */
export const buildActionsColumn = (handlers: ReviewActionHandlers): Column<Review> => ({
  key: "actions",
  header: "",
  align: "right",
  render: (review) => <ReviewActions review={review} {...handlers} />,
});
