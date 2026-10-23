import { Faqs } from "@/components/patterns/Faqs";
import { ProductDescription } from "@/components/patterns/ProductDescription";
import { ReviewForm } from "@/components/patterns/ReviewForm";
import { Reviews } from "@/components/patterns/Reviews";

import { PRODUCT_TABS } from "../ProductDetails.constants";
import type { ProductTabContentProps } from "../ProductDetails.types";

/**
 * ProductDetails/TabContent: content that belongs to the active tab.
 *
 * @param props Component props.
 * @param props.activeTab Label of the active tab.
 * @param props.productId Id of the product, used by the review form.
 * @param props.description Description of the product.
 * @param props.reviews Approved reviews of the product, once loaded.
 * @param props.faqs Questions about the product.
 * @returns The content of the active tab.
 */
export const ProductTabContent = ({ activeTab, productId, description, reviews, faqs }: ProductTabContentProps) => {
  const content = {
    [PRODUCT_TABS.details]: <ProductDescription description={description} />,
    [PRODUCT_TABS.reviews]: (
      <>
        <Reviews review={reviews ?? []} />
        <ReviewForm productId={productId} />
      </>
    ),
    [PRODUCT_TABS.faqs]: <Faqs faqs={faqs} />,
  };

  return content[activeTab as keyof typeof content];
};
