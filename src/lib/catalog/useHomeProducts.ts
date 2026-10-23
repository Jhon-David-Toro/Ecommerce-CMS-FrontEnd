import { useMemo } from "react";

import { useQuery } from "@/lib/shared/async/useQuery";

import { listProducts } from "./catalog.api";
import { HOME_PRODUCTS_LIMIT } from "./catalog.constants";
import { getNewArrivals, getTopSelling } from "./catalog.utils";

const NO_OPTIONS = {};

/**
 * Loads the published products and picks the ones the home page highlights.
 *
 * @returns The newest and the best rated products.
 */
export const useHomeProducts = () => {
  const { data } = useQuery(listProducts, NO_OPTIONS);

  return useMemo(
    () => ({ newArrivals: getNewArrivals(data ?? [], HOME_PRODUCTS_LIMIT), topSelling: getTopSelling(data ?? [], HOME_PRODUCTS_LIMIT) }),
    [data],
  );
};
