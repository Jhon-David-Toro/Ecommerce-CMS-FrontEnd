import type { FC } from "react";

import { Button } from "@/components/ui/Button";

import type { FormActionsProps } from "./FormActions.types";
import styles from "./FormActions.module.scss";

/**
 * FormActions: Cancel and Save buttons at the end of a form.
 *
 * @param props Component props.
 * @param props.submitLabel Text of the save button.
 * @param props.onCancel Called when Cancel is pressed.
 * @returns The buttons.
 */
export const FormActions: FC<FormActionsProps> = ({ submitLabel, onCancel }) => (
  <div className={styles.actions}>
    <Button type="secondary" size="small" text="Cancel" typeAttribute="button" onClick={onCancel} />
    <Button type="primary" size="small" text={submitLabel} typeAttribute="submit" />
  </div>
);
