import type { FC } from "react";

import type { RowActionsProps } from "./RowActions.types";
import styles from "./RowActions.module.scss";

/**
 * RowActions: the Edit and Delete buttons at the end of a table row.
 *
 * @param props Component props.
 * @param props.name Name of the record, used in the accessible names of the buttons.
 * @param props.onEdit Called when Edit is pressed; omit it when the row has its own link to edit.
 * @param props.onDelete Called when Delete is pressed.
 * @returns The buttons.
 */
export const RowActions: FC<RowActionsProps> = ({ name, onEdit, onDelete }) => (
  <div className={styles.actions}>
    {onEdit && (
      <button type="button" className={styles.actions__button} onClick={onEdit} aria-label={`Edit ${name}`}>
        Edit
      </button>
    )}
    <button type="button" className={styles.actions__danger} onClick={onDelete} aria-label={`Delete ${name}`}>
      Delete
    </button>
  </div>
);
