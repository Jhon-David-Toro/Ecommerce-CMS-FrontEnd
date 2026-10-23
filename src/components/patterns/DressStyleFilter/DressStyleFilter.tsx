import { CheckboxFilter } from "@/components/patterns/CheckboxFilter";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";

import type { DressStyleFilterProps } from "./DressStyleFilter.types";

/**
 * DressStyleFilter: checkboxes for the dress styles the catalog has, connected to the filter store; hidden without styles.
 *
 * @param props Component props.
 * @param props.options Dress styles to offer.
 * @returns The dress style filter.
 */
export const DressStyleFilter = ({ options }: DressStyleFilterProps) => {
  const { dressStyles, setDressStyles } = useFilterStore();

  return options.length ? <CheckboxFilter title="Dress Style" options={options} selected={dressStyles} onChange={setDressStyles} /> : null;
};
