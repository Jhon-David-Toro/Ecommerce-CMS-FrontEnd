import { useParams } from "next/navigation";
import { useMemo } from "react";

import { getProduct, listProducts } from "@/lib/catalog/catalog.api";
import { PRODUCT_STATUSES, RELATED_PRODUCTS_LIMIT } from "@/lib/catalog/catalog.constants";
import { getRelated } from "@/lib/catalog/catalog.utils";
import { listReviews } from "@/lib/catalog/reviews.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NO_OPTIONS } from "../ProductDetails.constants";

/**
 * Loads everything the product page needs from the id in the URL: the product, its approved reviews and related products.
 *
 * @returns The product (null when missing or unpublished), its reviews, related products and the loading flag.
 */
export const useProductPage = () => {
  const params = useParams<{ id: string }>();
  const productId = Number(params.id);
  const { data: found, isLoading } = useQuery(getProduct, productId);
  const { data: reviews } = useQuery(listReviews, { productId, status: "approved" as const });
  const { data: products } = useQuery(listProducts, NO_OPTIONS);

  const product = found?.status === PRODUCT_STATUSES.published ? found : null;
  const related = useMemo(() => getRelated(products ?? [], productId, RELATED_PRODUCTS_LIMIT), [products, productId]);

  return { product, reviews, related, isLoading };
};
