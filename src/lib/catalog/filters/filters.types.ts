import type { Product } from "@/lib/catalog/product.types";

export type PriceRange = [number, number];

export interface FilterCriteria {
  category: string[];
  priceRange: PriceRange | null;
  colors: string[];
  sizes: string[];
  dressStyles: string[];
  sortBy?: string;
}

export interface FilterValues {
  category: string[];
  priceRange: PriceRange | null;
  colors: string[];
  sizes: string[];
  dressStyles: string[];
  isFiltersOpen: boolean;
  sortBy: string;
  selectedCategoryName: string;
}

export interface FilterActions {
  setCategory: (category: string[]) => void;
  setPriceRange: (range: PriceRange) => void;
  setColors: (colors: string[]) => void;
  setSizes: (sizes: string[]) => void;
  setDressStyles: (styles: string[]) => void;
  setIsFiltersOpen: (isOpen: boolean) => void;
  setSortBy: (sortBy: string) => void;
  resetFilters: () => void;
}

export interface ColorOption {
  hex: string;
  name: string;
}

export interface FilterOptions {
  categories: string[];
  priceBounds: PriceRange | null;
  colors: ColorOption[];
  sizes: string[];
  dressStyles: string[];
}

export type FilterState = FilterValues & FilterActions;

export type FilterFunction = (product: Product) => boolean;

export type FilterCreator = (criteria: FilterCriteria) => FilterFunction;

export type ProductComparator = (a: Product, b: Product) => number;
