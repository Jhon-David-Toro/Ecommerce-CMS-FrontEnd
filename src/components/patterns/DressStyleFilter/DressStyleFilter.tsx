import { CheckboxFilter } from "@/components/patterns/CheckboxFilter";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";

import { DRESS_STYLES } from "./DressStyleFilter.constants";

/**
 * DressStyleFilter: dress style checkboxes connected to the filter store.
 *
 * @returns The dress style filter.
 */
export const DressStyleFilter = () => {
  const { dressStyles, setDressStyles } = useFilterStore();

  return <CheckboxFilter title="Dress Style" options={DRESS_STYLES} selected={dressStyles} onChange={setDressStyles} />;
};
