import { XMarkIcon } from "@heroicons/react/24/outline";
import { forwardRef } from "react";

import { Filters } from "@/components/patterns/Filters";
import { cx } from "@/lib/shared/classnames/cx";

import type { ProductsFiltersProps } from "../Products.types";
import styles from "../Products.module.scss";

/**
 * Products/Filters: side panel that holds the filters and slides in on small screens, where it has a close button.
 *
 * @param props Component props.
 * @param props.isOpen Shows the panel on small screens.
 * @param props.onClose Called when the close button is pressed.
 * @param ref Ref to the panel, used to detect presses outside of it.
 * @returns The filter panel.
 */
export const ProductsFilters = forwardRef<HTMLElement, ProductsFiltersProps>(({ isOpen, onClose }, ref) => (
  <section ref={ref} className={cx(styles.products__filters, { [styles.filtersOpen]: isOpen })}>
    <button type="button" className={styles.products__close} aria-label="Close filters" onClick={onClose}>
      <XMarkIcon />
    </button>
    <Filters />
  </section>
));

ProductsFilters.displayName = "ProductsFilters";
