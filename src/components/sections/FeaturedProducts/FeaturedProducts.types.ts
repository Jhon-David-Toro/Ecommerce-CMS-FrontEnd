import type { ProductSummary } from "@/lib/catalog/product.types";

export interface FeaturedProductsProps {
  products: ProductSummary[];
  category: string;
}
