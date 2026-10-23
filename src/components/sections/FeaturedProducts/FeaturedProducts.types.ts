import type { ProductSummary } from "@/lib/catalog/product.types";

export interface FeaturedProductsProps {
  products: ProductSummary[];
  category: string;
  isLoading?: boolean;
  emptyMessage?: string;
}

export interface FeaturedProductsListProps {
  products: ProductSummary[];
  isLoading?: boolean;
  emptyMessage?: string;
}
