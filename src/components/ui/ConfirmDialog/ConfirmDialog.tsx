"use client";

import { useEscKey } from "@/lib/shared/dom/useEscKey";

import type { ConfirmDialogProps } from "./ConfirmDialog.types";
import { ConfirmDialogBody } from "./parts/ConfirmDialogBody";
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
export const ConfirmDialog = ({ open, ...body }: ConfirmDialogProps) => {
  useEscKey(null, body.onCancel, open);

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
        <ConfirmDialogBody {...body} />
      </div>
    </div>
  );
};
