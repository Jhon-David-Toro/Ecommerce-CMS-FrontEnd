import { Button } from "@/components/ui/Button";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";

/**
 * ResetFilterButton: clears every product filter.
 *
 * @returns The reset button.
 */
export const ResetFilterButton = () => {
  const { resetFilters } = useFilterStore();

  return <Button text="Reset filter" onClick={resetFilters} type="primary" typeAttribute="button" size="filter" />;
};
