import { FilterSection } from "@/components/patterns/FilterSection";
import { Button } from "@/components/ui/Button";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";
import { cx } from "@/lib/shared/classnames/cx";
import { toggleItem } from "@/lib/shared/collections/collections";

import { FILTER_SIZES } from "./SizeFilter.constants";
import styles from "./SizeFilter.module.scss";

/**
 * SizeFilter: size buttons connected to the filter store.
 *
 * @returns The size filter.
 */
export const SizeFilter = () => {
  const { sizes, setSizes } = useFilterStore();

  return (
    <FilterSection title="Size">
      {FILTER_SIZES.map((size) => (
        <Button
          key={size}
          className={cx(styles.sizeButton, { [styles.selected]: sizes.includes(size) })}
          onClick={() => setSizes(toggleItem(sizes, size))}
          text={size}
          type="tertiary"
          size="extra-small-filter"
          typeAttribute="button"
          ariaPressed={sizes.includes(size)}
        />
      ))}
    </FilterSection>
  );
};
