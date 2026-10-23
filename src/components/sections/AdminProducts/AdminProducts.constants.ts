import type { Product } from "@/lib/catalog/product.types";

export const ALL_PRODUCTS = { includeDrafts: true };

export const NO_PRODUCTS: Product[] = [];

export const PAGE_SIZE = 10;

export const THUMBNAIL_SIZE = { width: 40, height: 40 } as const;

export const LOW_STOCK_LIMIT = 10;

export const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];
