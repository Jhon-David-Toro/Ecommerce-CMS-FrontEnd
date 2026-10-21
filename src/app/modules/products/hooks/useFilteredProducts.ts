import { useMemo } from 'react';
import type { Product } from '@/app/shared-components/product/interfaces/Product.interface';
import { useFilterStore } from '@/app/store/filtersStore';
import { createFilterPipeline } from '../helpers/ProductsHelpers';
import productsData from '../../../../../public/data/all-products.json';

export const useFilteredProducts = (): Product[] => {
  const { category, priceRange, colors, sizes, dressStyles, sortBy } = useFilterStore();

  return useMemo(() => {
    const { filters, sortedProducts } = createFilterPipeline({ category, priceRange, colors, sizes, dressStyles, sortBy });
    const matching: Product[] = productsData.filter((product) => filters.every((filter) => filter(product)));
    return sortedProducts(matching);
  }, [category, priceRange, colors, sizes, dressStyles, sortBy]);
};
