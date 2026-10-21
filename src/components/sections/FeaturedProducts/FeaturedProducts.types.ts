import type { Product } from "@/lib/catalog/product.types";

export interface FeaturedProductsProps {
  products: Product[];
  category: string;
}