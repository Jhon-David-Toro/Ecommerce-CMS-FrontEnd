import { CheckboxFilter } from "@/components/patterns/CheckboxFilter";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";

import type { CategoryFilterProps } from "./CategoryFilter.types";

/**
 * CategoryFilter: checkboxes for the categories the catalog has, connected to the filter store; hidden without categories.
 *
 * @param props Component props.
 * @param props.options Categories to offer.
 * @returns The category filter.
 */
export const CategoryFilter = ({ options }: CategoryFilterProps) => {
  const { category, setCategory } = useFilterStore();

  return options.length ? <CheckboxFilter title="Categories" options={options} selected={category} onChange={setCategory} /> : null;
};
