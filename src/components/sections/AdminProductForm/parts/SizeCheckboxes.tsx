import { Checkbox } from "@/components/ui/Checkbox";
import { ALL_SIZES } from "@/lib/catalog/catalog.constants";
import { toggleItem } from "@/lib/shared/collections/collections";

import type { SizeCheckboxesProps } from "../AdminProductForm.types";
import styles from "../AdminProductForm.module.scss";

/**
 * ProductForm/SizeCheckboxes: one checkbox for each size the store sells, with the error of an empty selection.
 *
 * @param props Component props.
 * @param props.sizes Selected sizes.
 * @param props.error Error shown when no size is selected.
 * @param props.onSizesChange Receives the new selection of sizes.
 * @returns The checkboxes.
 */
export const SizeCheckboxes = ({ sizes, error, onSizesChange }: SizeCheckboxesProps) => (
  <>
    <div role="group" aria-label="Sizes" className={styles.sizes}>
      {ALL_SIZES.map((size) => (
        <Checkbox key={size} label={size} checked={sizes.includes(size)} onChange={() => onSizesChange(toggleItem(sizes, size))} />
      ))}
    </div>
    {error && (
      <p className={styles.sizes__error} role="alert">
        {error}
      </p>
    )}
  </>
);
