"use client";

import { Button } from "@/components/ui/Button";
import { useEscKey } from "@/lib/shared/dom/useEscKey";

import type { ConfirmDialogProps } from "./ConfirmDialog.types";
import styles from "./ConfirmDialog.module.scss";

/**
 * ConfirmDialog: modal that asks the user to confirm a risky action.
 *
 * @param props Component props.
 * @param props.open Shows the dialog.
 * @param props.title Headline of the question.
 * @param props.message Explanation of what will happen.
 * @param props.confirmLabel Text of the confirm button.
 * @param props.onConfirm Called when the user confirms.
 * @param props.onCancel Called when the user cancels or presses Escape.
 * @returns The dialog, or nothing while closed.
 */
export const ConfirmDialog = ({ open, title, message, confirmLabel = "Delete", onConfirm, onCancel }: ConfirmDialogProps) => {
  useEscKey(null, onCancel, open);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div
        className={styles.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <h2 id="confirm-title" className={styles.dialog__title}>
          {title}
        </h2>
        <p id="confirm-message" className={styles.dialog__message}>
          {message}
        </p>
        <div className={styles.dialog__actions}>
          <Button type="secondary" size="small" text="Cancel" typeAttribute="button" onClick={onCancel} />
          <Button type="primary" size="small" text={confirmLabel} typeAttribute="button" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};
