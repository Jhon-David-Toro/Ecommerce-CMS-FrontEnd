
import { useFilterStore } from '@/lib/catalog/filters/filtersStore';
import { Button } from "@/components/ui/Button";
import { FilterSection } from "@/components/patterns/FilterSection";
import clsx from 'clsx';
import styles from './SizeFilter.module.scss';

const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large'];

export const SizeFilter = () => {
  const { sizes: selectedSizes, setSizes } = useFilterStore();

  const toggleSelection = (item: string) => {
    setSizes(
      selectedSizes.includes(item)
        ? selectedSizes.filter((i) => i !== item)
        : [...selectedSizes, item]
    );
  };

  return (
    <FilterSection title="Size">
      {sizes.map((size) => (
        <Button
          key={size}
          className={clsx(styles.sizeButton, {
            [styles.selected]: selectedSizes.includes(size),
          })}
          onClick={() => toggleSelection(size)}
          text={size}
          type='tertiary'
          size='extra-small-filter'
          typeAttribute='button'
        />
      ))}
    </FilterSection>
  );
};
