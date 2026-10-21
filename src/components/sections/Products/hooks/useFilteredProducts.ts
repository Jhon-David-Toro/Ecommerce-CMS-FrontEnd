import { useMemo } from "react";

import { listProducts } from "@/lib/catalog/catalog.api";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NO_OPTIONS } from "../Products.constants";
import { filterProducts } from "../Products.utils";

/**
 * Loads the published products and applies the filters and sort order of the filter store.
 *
 * @returns The products that match, in display order, and whether they are still loading.
 */
export const useFilteredProducts = () => {
  const { category, priceRange, colors, sizes, dressStyles, sortBy } = useFilterStore();
  const { data, isLoading } = useQuery(listProducts, NO_OPTIONS);

  const products = useMemo(
    () => filterProducts(data ?? [], { category, priceRange, colors, sizes, dressStyles, sortBy }),
    [data, category, priceRange, colors, sizes, dressStyles, sortBy],
  );

  return { products, isLoading };
};
