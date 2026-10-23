import type { FAQ } from "@/lib/catalog/faq.types";
import type { Product, ProductSummary } from "@/lib/catalog/product.types";
import type { ProductDescription } from "@/lib/catalog/productDetails.types";
import type { Review } from "@/lib/catalog/review.types";

export interface ProductTabContentProps {
  activeTab: string;
  productId: number;
  description: ProductDescription;
  reviews: Review[] | null;
  faqs: FAQ[];
}

export interface ProductPageContentProps {
  product: Product;
  reviews: Review[] | null;
  related: ProductSummary[];
}

export interface ProductMainProps {
  product: Product;
}
