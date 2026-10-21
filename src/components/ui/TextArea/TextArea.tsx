import { useId } from "react";

import { FieldMessage, getDescribedBy } from "@/components/ui/FieldMessage";
import { cx } from "@/lib/shared/classnames/cx";

import type { TextAreaProps } from "./TextArea.types";
import styles from "./TextArea.module.scss";

/**
 * TextArea: labelled multi-line field with an optional hint and error message.
 *
 * @param props Component props.
 * @param props.label Visible label of the field.
 * @param props.error Error message shown under the field.
 * @param props.hint Help text shown under the field.
 * @param props.className Extra class names for the wrapper.
 * @param props.rest Remaining properties, forwarded to the native textarea.
 * @returns The field.
 */
export const TextArea = ({ label, error, hint, className, ...rest }: TextAreaProps) => {
  const id = useId();

  return (
    <div className={cx(styles.field, className)}>
      <label className={styles.field__label} htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className={cx(styles.field__input, error && styles.invalid)}
        aria-invalid={Boolean(error)}
        aria-describedby={getDescribedBy(id, error, hint)}
        rows={4}
        {...rest}
      />
      <FieldMessage id={id} error={error} hint={hint} />
    </div>
  );
};
