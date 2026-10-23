import { useMemo } from "react";

import { listProducts } from "@/lib/catalog/catalog.api";
import { buildFilterOptions } from "@/lib/catalog/filters/filters.options";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NO_OPTIONS } from "../Products.constants";
import type { CatalogScope } from "../Products.types";
import { filterProducts, scopeProducts } from "../Products.utils";

/**
 * Loads the published products, narrows them to the scope of the address and applies the filters and sort order.
 *
 * @param scope Search text, view and brand taken from the address.
 * @returns The products that match, in display order, whether they are still loading, and the filter options the catalog offers.
 */
export const useFilteredProducts = (scope: CatalogScope) => {
  const { category, priceRange, colors, sizes, dressStyles, sortBy } = useFilterStore();
  const { data, isLoading } = useQuery(listProducts, NO_OPTIONS);
  const { query, view, brand } = scope;

  const products = useMemo(
    () => filterProducts(scopeProducts(data ?? [], { query, view, brand }), { category, priceRange, colors, sizes, dressStyles, sortBy }),
    [data, query, view, brand, category, priceRange, colors, sizes, dressStyles, sortBy],
  );

  const filterOptions = useMemo(() => buildFilterOptions(data ?? []), [data]);

  return { products, isLoading, filterOptions };
};
