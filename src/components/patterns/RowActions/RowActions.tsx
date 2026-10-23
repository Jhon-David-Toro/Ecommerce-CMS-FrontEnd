import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { FC } from "react";

import type { RowActionsProps } from "./RowActions.types";
import styles from "./RowActions.module.scss";

/**
 * RowActions: the pencil and trash icon buttons at the end of a table row.
 *
 * @param props Component props.
 * @param props.name Name of the record, used in the accessible names of the buttons.
 * @param props.onEdit Called when the pencil is pressed; omit it when the row has its own link to edit.
 * @param props.editHref Address of the edit page; shows the pencil as a link instead of a button.
 * @param props.onDelete Called when the trash is pressed.
 * @returns The buttons.
 */
export const RowActions: FC<RowActionsProps> = ({ name, onEdit, editHref, onDelete }) => (
  <div className={styles.actions}>
    {editHref && (
      <Link href={editHref} className={styles.actions__button} aria-label={`Edit ${name}`} title="Edit">
        <PencilSquareIcon />
      </Link>
    )}
    {onEdit && (
      <button type="button" className={styles.actions__button} onClick={onEdit} aria-label={`Edit ${name}`} title="Edit">
        <PencilSquareIcon />
      </button>
    )}
    <button type="button" className={styles.actions__danger} onClick={onDelete} aria-label={`Delete ${name}`} title="Delete">
      <TrashIcon />
    </button>
  </div>
);
