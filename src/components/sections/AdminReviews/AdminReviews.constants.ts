import type { Product } from "@/lib/catalog/product.types";
import type { Review } from "@/lib/catalog/review.types";

export const NO_FILTERS = {};

export const ALL_PRODUCTS = { includeDrafts: true };

export const NO_REVIEWS: Review[] = [];

export const NO_PRODUCTS: Product[] = [];

export const PAGE_SIZE = 10;

export const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export const REVIEW_TONES = { pending: "warning", approved: "success", rejected: "danger" } as const;
