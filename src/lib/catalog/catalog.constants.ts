import type { Color } from "./color.types";

export const CATALOG_URLS = {
  products: "/data/products.json",
  reviews: "/data/reviews.json",
  faqs: "/data/faqs.json",
} as const;

export const PRODUCT_STORAGE_KEY = "products";

export const REVIEW_STORAGE_KEY = "reviews";

export const PRODUCT_STATUSES = { draft: "draft", published: "published" } as const;

export const REVIEW_STATUSES = { pending: "pending", approved: "approved", rejected: "rejected" } as const;

export const COLOR_PALETTE: Record<string, Color> = {
  green: { name: "Green", hex: "#00C12B" },
  red: { name: "Red", hex: "#F50606" },
  yellow: { name: "Yellow", hex: "#F5DD06" },
  orange: { name: "Orange", hex: "#F57906" },
  cyan: { name: "Cyan", hex: "#06CAF5" },
  blue: { name: "Blue", hex: "#063AF5" },
  purple: { name: "Purple", hex: "#7D06F5" },
  pink: { name: "Pink", hex: "#F506A4" },
  white: { name: "White", hex: "white" },
  black: { name: "Black", hex: "black" },
};

export const ALL_SIZES = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large"] as const;

export const DEFAULT_STOCK = 25;

export const RELATED_PRODUCTS_LIMIT = 4;

export const HOME_PRODUCTS_LIMIT = 8;

export const EMPTY_DESCRIPTION = {
  overview: "",
  features: [],
  origin: "",
  company: { name: "", description: "" },
  careInstructions: "",
};
