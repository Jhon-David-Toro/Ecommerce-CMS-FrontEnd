import featuredProduct from "@/assets/mockProduct.json";
import { slugify } from "@/lib/shared/text/text";
import { BRAND_SEEDS } from "@/lib/taxonomy/taxonomy.constants";

import legacyProducts from "../../../public/data/all-products.json";
import faqs from "../../../public/data/faqs.json";
import reviews from "../../../public/data/reviews.json";
import { ALL_SIZES, COLOR_PALETTE, DEFAULT_STOCK, PRODUCT_STATUSES, REVIEW_STATUSES } from "./catalog.constants";
import type { Product } from "./product.types";
import type { Review } from "./review.types";

const DAY_MS = 24 * 60 * 60 * 1000;
const SEED_START = Date.UTC(2025, 0, 1);

/**
 * Builds the starting catalog from the legacy mock files.
 *
 * @returns The seed products.
 */
export const buildSeedProducts = (): Product[] =>
  legacyProducts.map((legacy, index) => {
    const isFeatured = legacy.id === Number(featuredProduct.id);
    const color = COLOR_PALETTE[legacy.color] ?? COLOR_PALETTE.black;

    return {
      id: legacy.id,
      name: isFeatured ? featuredProduct.name : legacy.name,
      slug: slugify(legacy.name),
      brand: BRAND_SEEDS[index % BRAND_SEEDS.length].name,
      category: legacy.category,
      dressStyle: legacy.dressStyle,
      price: legacy.price,
      discountPrice: legacy.discountPrice,
      discount: legacy.discountPrice ? Math.round(100 - (legacy.discountPrice / legacy.price) * 100) : 0,
      rating: legacy.rating,
      reviewsCount: 0,
      image: legacy.image,
      images: isFeatured ? featuredProduct.additionalImages : [],
      colors: isFeatured ? featuredProduct.colors : [color],
      sizes: isFeatured ? featuredProduct.sizes : [legacy.size, ...ALL_SIZES.filter((size) => size !== legacy.size).slice(0, 2)],
      stock: DEFAULT_STOCK + legacy.id,
      status: PRODUCT_STATUSES.published,
      createdAt: SEED_START + index * DAY_MS,
      description: isFeatured
        ? featuredProduct.description
        : {
            overview: `${legacy.name} is made for everyday comfort and a clean fit.`,
            features: ["Soft and breathable fabric", "Reinforced stitching", "Machine washable"],
            origin: "Ethically manufactured.",
            company: { name: "Shop.co", description: "Fashion that suits your style." },
            careInstructions: "Machine wash cold, tumble dry low.",
          },
      faqs,
    };
  });

/**
 * Builds the starting reviews, all attached to the featured product.
 *
 * @returns The seed reviews.
 */
export const buildSeedReviews = (): Review[] =>
  reviews.map((review, index) => ({
    id: index + 1,
    productId: Number(featuredProduct.id),
    author: review.author,
    rating: review.rating,
    text: review.text,
    date: new Date(review.date).toISOString(),
    verified: review.verified,
    status: REVIEW_STATUSES.approved,
  }));
