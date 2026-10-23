import { useSearchParams } from "next/navigation";

import type { CatalogScope } from "../Products.types";

/**
 * Reads what the address asks the catalog to show: the search text, the view, the brand and the category.
 *
 * @returns The scope of the products page.
 */
export const useCatalogScope = (): CatalogScope => {
  const params = useSearchParams();

  return {
    query: params.get("q") ?? "",
    view: params.get("view") ?? "",
    brand: params.get("brand") ?? "",
    category: params.get("category") ?? "",
  };
};
