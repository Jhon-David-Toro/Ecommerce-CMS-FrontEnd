import { FilterSection } from "@/components/patterns/FilterSection";

import { PRICE_BOUNDS } from "../PriceFilter.constants";
import type { UsePriceFilterParams } from "../PriceFilter.types";
import { usePriceFilter } from "../hooks/usePriceFilter";
import styles from "../PriceFilter.module.scss";
import { PriceSlider } from "./PriceSlider";

/**
 * PriceFilter/Range: the two sliders and the labels of the selected range.
 *
 * @param props Component props.
 * @param props.bounds Lowest and highest price of the catalog.
 * @returns The price filter block.
 */
export const PriceFilterRange = ({ bounds }: UsePriceFilterParams) => {
  const { priceRange, activate, deactivate, handleChange } = usePriceFilter({ bounds });

  return (
    <FilterSection title="Price">
      <section className={styles.price}>
        <section className={styles.price__range}>
          {PRICE_BOUNDS.map((bound) => (
            <PriceSlider
              key={bound}
              bound={bound}
              priceRange={priceRange}
              bounds={bounds}
              onActivate={activate}
              onDeactivate={deactivate}
              onChange={handleChange}
            />
          ))}
        </section>
        <div className={styles.price__labels}>
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </section>
    </FilterSection>
  );
};
