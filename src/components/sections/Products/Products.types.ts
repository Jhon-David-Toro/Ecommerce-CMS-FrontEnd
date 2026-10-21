import { Product } from "@/lib/catalog/product.types";

export type FilterCriteria = {
  category: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  dressStyles: string[];
  sortBy?: string;
};

export type FilterFunction = (product: Product) => boolean;

export type FilterCreator = (criteria: FilterCriteria) => FilterFunction;