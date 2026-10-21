import type { Product } from "@/lib/catalog/product.types";

export interface ProductsGridProps {
  products: Product[];
}

export interface ProductsFiltersProps {
  isOpen: boolean;
}
