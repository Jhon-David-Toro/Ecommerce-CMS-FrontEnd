import { useSearchParams } from "next/navigation";

import { listProducts } from "@/lib/catalog/catalog.api";
import { searchProducts } from "@/lib/catalog/catalog.utils";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NO_OPTIONS } from "../SearchResults.constants";

/**
 * Reads the search text from the address and finds the published products that match it.
 *
 * @returns The search text, the matching products and the loading flag.
 */
export const useSearchResults = () => {
  const query = useSearchParams().get("q") ?? "";
  const { data, isLoading } = useQuery(listProducts, NO_OPTIONS);

  return { query, results: searchProducts(data ?? [], query), isLoading };
};
