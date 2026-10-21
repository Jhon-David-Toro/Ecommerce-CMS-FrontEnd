import { useMemo } from "react";

import { useFilterStore } from "@/lib/catalog/filters/filtersStore";
import type { Product } from "@/lib/catalog/product.types";

import productsData from "../../../../../public/data/all-products.json";
import { filterProducts } from "../Products.utils";

/**
 * Applies the filters and sort order of the filter store to the product catalog.
 *
 * @returns The products that match, in display order.
 */
export const useFilteredProducts = (): Product[] => {
  const { category, priceRange, colors, sizes, dressStyles, sortBy } = useFilterStore();

  return useMemo(
    () => filterProducts(productsData, { category, priceRange, colors, sizes, dressStyles, sortBy }),
    [category, priceRange, colors, sizes, dressStyles, sortBy],
  );
};
