import { Button } from "@/components/ui/Button";

import { DEFAULT_CONFIRM_LABEL } from "../ConfirmDialog.constants";
import type { ConfirmDialogBodyProps } from "../ConfirmDialog.types";
import styles from "../ConfirmDialog.module.scss";

/**
 * ConfirmDialog/Body: question, explanation and the Cancel and confirm buttons.
 *
 * @param props Component props.
 * @param props.title Headline of the question.
 * @param props.message Explanation of what will happen.
 * @param props.confirmLabel Text of the confirm button.
 * @param props.onConfirm Called when the user confirms.
 * @param props.onCancel Called when the user cancels.
 * @returns The content of the dialog.
 */
export const ConfirmDialogBody = ({
  title,
  message,
  confirmLabel = DEFAULT_CONFIRM_LABEL,
  onConfirm,
  onCancel,
}: ConfirmDialogBodyProps) => (
  <>
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
  </>
);
