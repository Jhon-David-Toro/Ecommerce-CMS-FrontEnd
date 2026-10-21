import type { ReviewStatus } from "@/lib/catalog/review.types";
import type { Review } from "@/lib/catalog/review.types";

export interface ReviewActionHandlers {
  onModerate: (id: number, status: ReviewStatus) => void;
  onRemove: (id: number) => void;
}

export interface ReviewActionsProps extends ReviewActionHandlers {
  review: Review;
}
