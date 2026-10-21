import { useMemo } from 'react';
import type { Product } from '@/lib/catalog/product.types';
import { useFilterStore } from '@/lib/catalog/filters/filtersStore';
import { createFilterPipeline } from '../Products.utils';
import productsData from '../../../../../public/data/all-products.json';

export const useFilteredProducts = (): Product[] => {
  const { category, priceRange, colors, sizes, dressStyles, sortBy } = useFilterStore();

  return useMemo(() => {
    const { filters, sortedProducts } = createFilterPipeline({ category, priceRange, colors, sizes, dressStyles, sortBy });
    const matching: Product[] = productsData.filter((product) => filters.every((filter) => filter(product)));
    return sortedProducts(matching);
  }, [category, priceRange, colors, sizes, dressStyles, sortBy]);
};
