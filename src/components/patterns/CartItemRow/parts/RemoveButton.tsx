import { TrashIcon } from "@heroicons/react/24/outline";

import type { RemoveButtonProps } from "../CartItemRow.types";
import styles from "../CartItemRow.module.scss";

/**
 * CartItemRow/RemoveButton: icon button that removes a line from the cart.
 *
 * @param props Component props.
 * @param props.name Name of the product, for the accessible name of the button.
 * @param props.itemKey Key of the cart line.
 * @param props.onRemove Called with the line key.
 * @returns The button.
 */
export const RemoveButton = ({ name, itemKey, onRemove }: RemoveButtonProps) => (
  <button type="button" className={styles.row__remove} aria-label={`Remove ${name}`} onClick={() => onRemove(itemKey)}>
    <TrashIcon className={styles.row__removeIcon} />
  </button>
);
