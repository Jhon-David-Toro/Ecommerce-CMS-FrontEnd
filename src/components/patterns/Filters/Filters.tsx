import { CategoryFilter } from "@/components/patterns/CategoryFilter";
import { ColorFilter } from "@/components/patterns/ColorFilter";
import { DressStyleFilter } from "@/components/patterns/DressStyleFilter";
import { PriceFilter } from "@/components/patterns/PriceFilter";
import { ResetFilterButton } from "@/components/patterns/ResetFilterButton";
import { SizeFilter } from "@/components/patterns/SizeFilter";

import styles from "./Filters.module.scss";

/**
 * Filters: all product filters followed by the reset button.
 *
 * @returns The filter panel.
 */
export const Filters = () => (
  <section className={styles.filters}>
    <h2>Filters</h2>
    <CategoryFilter />
    <PriceFilter />
    <ColorFilter />
    <SizeFilter />
    <DressStyleFilter />
    <ResetFilterButton />
  </section>
);
