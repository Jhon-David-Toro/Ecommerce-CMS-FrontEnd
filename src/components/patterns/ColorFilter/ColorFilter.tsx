import { FilterSection } from "@/components/patterns/FilterSection";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";
import { cx } from "@/lib/shared/classnames/cx";
import { toggleItem } from "@/lib/shared/collections/collections";
import { KEYS } from "@/lib/shared/dom/keys.constants";

import { FILTER_COLORS } from "./ColorFilter.constants";
import styles from "./ColorFilter.module.scss";

/**
 * ColorFilter: color swatches connected to the filter store.
 *
 * @returns The color filter.
 */
export const ColorFilter = () => {
  const { colors, setColors } = useFilterStore();

  return (
    <FilterSection title="Colors">
      <section className={styles.color}>
        {FILTER_COLORS.map((color) => (
          <article
            key={color}
            className={cx(styles.color__circle, { [styles.selected]: colors.includes(color) })}
            style={{ backgroundColor: color }}
            data-color={color}
            onClick={() => setColors(toggleItem(colors, color))}
            role="button"
            aria-label={color}
            aria-pressed={colors.includes(color)}
            tabIndex={0}
            onKeyDown={(event) => event.key === KEYS.enter && setColors(toggleItem(colors, color))}
          />
        ))}
      </section>
    </FilterSection>
  );
};
