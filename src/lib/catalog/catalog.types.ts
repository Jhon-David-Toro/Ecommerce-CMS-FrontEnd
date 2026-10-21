import type { Product } from "@/lib/catalog/product.types";

export interface Catalog {
  newArrivals: Product[];
  topSelling: Product[];
}
