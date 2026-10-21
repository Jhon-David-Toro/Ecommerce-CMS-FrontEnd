import type { Product } from "@/app/shared-components/product/interfaces/Product.interface";

export interface Catalog {
  newArrivals: Product[];
  topSelling: Product[];
}
