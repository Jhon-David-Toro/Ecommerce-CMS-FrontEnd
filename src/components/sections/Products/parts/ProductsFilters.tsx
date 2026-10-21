import { forwardRef } from "react";

import { Filters } from "@/components/patterns/Filters";
import { cx } from "@/lib/shared/classnames/cx";

import type { ProductsFiltersProps } from "../Products.types";
import styles from "../Products.module.scss";

/**
 * Products/Filters: side panel that holds the filters and slides in on small screens.
 *
 * @param props Component props.
 * @param props.isOpen Shows the panel on small screens.
 * @param ref Ref to the panel, used to detect presses outside of it.
 * @returns The filter panel.
 */
export const ProductsFilters = forwardRef<HTMLElement, ProductsFiltersProps>(({ isOpen }, ref) => (
  <section ref={ref} className={cx(styles.products__filters, { [styles.filtersOpen]: isOpen })}>
    <Filters />
  </section>
));

ProductsFilters.displayName = "ProductsFilters";
