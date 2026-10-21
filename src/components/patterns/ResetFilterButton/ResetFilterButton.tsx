import { useFilterStore } from '@/lib/catalog/filters/filtersStore';
import Button from '@/components/ui/Button/Button';

const ResetFilterButton = () => {
  const { resetFilters } = useFilterStore();

  return (
    <Button text='Reset filter' onClick={resetFilters} type='primary' typeAttribute='button' size='filter'/>
  );
};

export default ResetFilterButton;