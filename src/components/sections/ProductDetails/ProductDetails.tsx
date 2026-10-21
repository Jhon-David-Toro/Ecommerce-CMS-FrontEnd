"use client";

import { RecordGate } from "@/components/patterns/RecordGate";

import { NOT_FOUND } from "./ProductDetails.constants";
import { useProductPage } from "./hooks/useProductPage";
import { ProductPageContent } from "./parts/ProductPageContent";

/**
 * Product details: gallery, purchase info, tabbed content and recommendations.
 *
 * @returns The product page content.
 */
export const ProductDetails = () => {
  const { product, reviews, related, isLoading } = useProductPage();

  return (
    <RecordGate record={product} isLoading={isLoading} loadingLabel="Loading product" notFound={NOT_FOUND}>
      {(found) => <ProductPageContent product={found} reviews={reviews} related={related} />}
    </RecordGate>
  );
};
