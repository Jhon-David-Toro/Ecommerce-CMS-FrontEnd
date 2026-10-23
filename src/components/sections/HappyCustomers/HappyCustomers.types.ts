import type { Review } from "@/lib/catalog/review.types";

export interface UseSliderParams {
  total: number;
  itemsPerSlide: number;
}

export interface HappyCustomersHeaderProps {
  onPrevious: () => void;
  onNext: () => void;
  disabled: boolean;
}

export interface HappyCustomersTrackProps {
  reviews: Review[];
  offsetPercent: number;
}
