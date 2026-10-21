import { useFilterStore } from '@/lib/catalog/filters/filtersStore';
import { Button } from "@/components/ui/Button";

export const ResetFilterButton = () => {
  const { resetFilters } = useFilterStore();

  return (
    <Button text='Reset filter' onClick={resetFilters} type='primary' typeAttribute='button' size='filter'/>
  );
};
