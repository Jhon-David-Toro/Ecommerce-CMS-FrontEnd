import { Faqs } from "@/components/patterns/Faqs";
import { ProductDescription } from "@/components/patterns/ProductDescription";
import { Reviews } from "@/components/patterns/Reviews";

import { PRODUCT_TABS } from "../ProductDetails.constants";
import type { ProductTabContentProps } from "../ProductDetails.types";

/**
 * ProductDetails/TabContent: content that belongs to the active tab.
 *
 * @param props Component props.
 * @param props.activeTab Label of the active tab.
 * @param props.description Description of the product.
 * @param props.reviews Reviews of the product, once loaded.
 * @param props.faqs Questions about the product, once loaded.
 * @returns The content of the active tab.
 */
export const ProductTabContent = ({ activeTab, description, reviews, faqs }: ProductTabContentProps) => {
  const content = {
    [PRODUCT_TABS.details]: <ProductDescription description={description} />,
    [PRODUCT_TABS.reviews]: <Reviews review={reviews ?? []} />,
    [PRODUCT_TABS.faqs]: <Faqs faqs={faqs ?? []} />,
  };

  return content[activeTab as keyof typeof content];
};
