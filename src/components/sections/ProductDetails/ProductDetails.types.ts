import type { FAQ } from "@/lib/catalog/faq.types";
import type { ProductDescription } from "@/lib/catalog/productDetails.types";
import type { Review } from "@/lib/catalog/review.types";

export interface ProductTabContentProps {
  activeTab: string;
  description: ProductDescription;
  reviews: Review[] | null;
  faqs: FAQ[] | null;
}
