import { useId } from "react";

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
      <textarea id={id} className={cx(styles.field__input, error && styles.invalid)} aria-invalid={Boolean(error)} rows={4} {...rest} />
      {error && (
        <p className={styles.field__error} role="alert">
          {error}
        </p>
      )}
      {!error && hint && <p className={styles.field__hint}>{hint}</p>}
    </div>
  );
};
