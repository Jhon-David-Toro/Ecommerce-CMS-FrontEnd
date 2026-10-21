import type { Product } from "@/lib/catalog/product.types";
import type { Review } from "@/lib/catalog/review.types";

/**
 * Builds a complete product for tests.
 *
 * @param overrides Fields to change.
 * @returns A published product.
 */
export const buildProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  name: "Test shirt",
  slug: "test-shirt",
  brand: "Zara",
  category: "T-Shirts",
  dressStyle: "Casual",
  price: 100,
  discountPrice: null,
  discount: 0,
  rating: 4,
  reviewsCount: 0,
  image: "/product.png",
  images: [],
  colors: [{ name: "Black", hex: "black" }],
  sizes: ["Small", "Medium"],
  stock: 20,
  status: "published",
  createdAt: 1,
  description: {
    overview: "A shirt for tests.",
    features: ["Soft"],
    origin: "Somewhere",
    company: { name: "Shop", description: "A shop" },
    careInstructions: "Wash cold",
  },
  faqs: [],
  ...overrides,
});

/**
 * Builds an approved review for tests.
 *
 * @param overrides Fields to change.
 * @returns A review.
 */
export const buildReview = (overrides: Partial<Review> = {}): Review => ({
  id: 1,
  productId: 1,
  author: "Jane Doe",
  rating: 4,
  text: "Very nice product!",
  date: "2024-04-10T00:00:00.000Z",
  verified: true,
  status: "approved",
  ...overrides,
});
