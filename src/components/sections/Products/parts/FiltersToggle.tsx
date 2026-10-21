import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

import type { FiltersToggleProps } from "../Products.types";
import styles from "../Products.module.scss";

/**
 * Products/FiltersToggle: button that opens the filter panel on small screens.
 *
 * @param props Component props.
 * @param props.onOpen Called when the button is pressed.
 * @returns The button.
 */
export const FiltersToggle = ({ onOpen }: FiltersToggleProps) => (
  <button type="button" className={styles.products__toggle} onClick={onOpen}>
    <AdjustmentsHorizontalIcon /> Filters
  </button>
);
