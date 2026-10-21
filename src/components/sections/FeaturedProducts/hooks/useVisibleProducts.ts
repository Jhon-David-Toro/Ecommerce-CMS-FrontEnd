import { useState } from "react";

import type { ProductSummary } from "@/lib/catalog/product.types";

import { INITIAL_VISIBLE_PRODUCTS } from "../FeaturedProducts.constants";

/**
 * Limits a product list to the first few items until the user asks for all of them.
 *
 * @param products Full product list.
 * @returns The visible products, whether there is more to show and the action that shows all.
 */
export const useVisibleProducts = (products: ProductSummary[]) => {
  const [showAll, setShowAll] = useState(false);

  return {
    visibleProducts: showAll ? products : products.slice(0, INITIAL_VISIBLE_PRODUCTS),
    canShowMore: !showAll && products.length > INITIAL_VISIBLE_PRODUCTS,
    showAll: () => setShowAll(true),
  };
};
