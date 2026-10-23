import { CategoryFilter } from "@/components/patterns/CategoryFilter";
import { ColorFilter } from "@/components/patterns/ColorFilter";
import { DressStyleFilter } from "@/components/patterns/DressStyleFilter";
import { PriceFilter } from "@/components/patterns/PriceFilter";
import { ResetFilterButton } from "@/components/patterns/ResetFilterButton";
import { SizeFilter } from "@/components/patterns/SizeFilter";

import type { FiltersProps } from "./Filters.types";
import styles from "./Filters.module.scss";

/**
 * Filters: the product filters built from what the catalog has, followed by the reset button.
 *
 * @param props Component props.
 * @param props.options Categories, price bounds, colors, sizes and dress styles to offer.
 * @returns The filter panel.
 */
export const Filters = ({ options }: FiltersProps) => (
  <section className={styles.filters}>
    <h2>Filters</h2>
    <CategoryFilter options={options.categories} />
    <PriceFilter bounds={options.priceBounds} />
    <ColorFilter options={options.colors} />
    <SizeFilter options={options.sizes} />
    <DressStyleFilter options={options.dressStyles} />
    <ResetFilterButton />
  </section>
);
