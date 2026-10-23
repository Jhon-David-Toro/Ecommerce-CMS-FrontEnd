import { FilterSection } from "@/components/patterns/FilterSection";
import { Button } from "@/components/ui/Button";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";
import { cx } from "@/lib/shared/classnames/cx";
import { toggleItem } from "@/lib/shared/collections/collections";

import type { SizeFilterProps } from "./SizeFilter.types";
import styles from "./SizeFilter.module.scss";

/**
 * SizeFilter: buttons for the sizes the catalog has, connected to the filter store; hidden without sizes.
 *
 * @param props Component props.
 * @param props.options Sizes to offer.
 * @returns The size filter.
 */
export const SizeFilter = ({ options }: SizeFilterProps) => {
  const { sizes, setSizes } = useFilterStore();

  if (!options.length) return null;

  return (
    <FilterSection title="Size">
      <div className={styles.sizes}>
        {options.map((size) => (
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
      </div>
    </FilterSection>
  );
};
