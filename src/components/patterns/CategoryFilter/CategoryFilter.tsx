import { CheckboxFilter } from "@/components/patterns/CheckboxFilter";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";

import { CATEGORIES } from "./CategoryFilter.constants";

/**
 * CategoryFilter: product category checkboxes connected to the filter store.
 *
 * @returns The category filter.
 */
export const CategoryFilter = () => {
  const { category, setCategory } = useFilterStore();

  return <CheckboxFilter title="Categories" options={CATEGORIES} selected={category} onChange={setCategory} />;
};
