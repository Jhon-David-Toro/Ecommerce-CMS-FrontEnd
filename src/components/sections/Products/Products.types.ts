import type { Product } from "@/lib/catalog/product.types";

export interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
}

export interface ProductsFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FiltersToggleProps {
  onOpen: () => void;
}

export interface CatalogScope {
  query: string;
  view: string;
  brand: string;
  category: string;
}
