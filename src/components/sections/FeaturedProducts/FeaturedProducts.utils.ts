import type { FeaturedProductsProps } from "./FeaturedProducts.types";

/**
 * Tells whether the section has nothing to show and nothing to say, so it should not be drawn.
 *
 * @param props Section props.
 * @param props.products Products of the section.
 * @param props.isLoading Whether the products are still loading.
 * @param props.emptyMessage Sentence shown when there are no products.
 * @returns True when the section should be hidden.
 */
export const isSectionHidden = ({
  products,
  isLoading,
  emptyMessage,
}: Pick<FeaturedProductsProps, "products" | "isLoading" | "emptyMessage">) => !products.length && !isLoading && !emptyMessage;
