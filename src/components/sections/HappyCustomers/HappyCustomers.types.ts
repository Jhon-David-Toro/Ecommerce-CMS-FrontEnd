export interface CustomerReview {
  name: string;
  rating: number;
  text: string;
}

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
  offsetPercent: number;
}
