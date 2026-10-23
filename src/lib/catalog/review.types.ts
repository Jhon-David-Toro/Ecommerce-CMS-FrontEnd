export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  status: ReviewStatus;
}

export type ReviewInput = Omit<Review, "id">;

export interface ReviewListOptions {
  productId?: number;
  status?: ReviewStatus;
}
