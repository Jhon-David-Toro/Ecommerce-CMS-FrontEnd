export interface RatingProps {
  rating: number;
  size: "small" | "medium" | "extra-medium";
  numbers?: boolean;
}

export type StarKind = "full" | "half" | "empty";
