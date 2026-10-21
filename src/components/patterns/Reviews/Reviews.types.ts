import type { Review } from "@/lib/catalog/review.types";

export interface ReviewsProps {
  review: Review[];
}

export interface ReviewsHeaderProps {
  total: number;
  sortOrder: string;
  onSortChange: (order: string) => void;
}
