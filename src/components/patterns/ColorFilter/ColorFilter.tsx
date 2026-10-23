import { FilterSection } from "@/components/patterns/FilterSection";
import { useFilterStore } from "@/lib/catalog/filters/filtersStore";
import { toggleItem } from "@/lib/shared/collections/collections";

import type { ColorFilterProps } from "./ColorFilter.types";
import { ColorSwatch } from "./parts/ColorSwatch";
import styles from "./ColorFilter.module.scss";

/**
 * ColorFilter: swatches for the colors the catalog has, connected to the filter store; hidden without colors.
 *
 * @param props Component props.
 * @param props.options Colors to offer.
 * @returns The color filter.
 */
export const ColorFilter = ({ options }: ColorFilterProps) => {
  const { colors, setColors } = useFilterStore();

  if (!options.length) return null;

  return (
    <FilterSection title="Colors">
      <section className={styles.color}>
        {options.map((color) => (
          <ColorSwatch
            key={color.hex}
            color={color}
            isSelected={colors.includes(color.hex)}
            onToggle={() => setColors(toggleItem(colors, color.hex))}
          />
        ))}
      </section>
    </FilterSection>
  );
};
