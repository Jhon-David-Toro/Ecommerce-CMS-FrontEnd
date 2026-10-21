import { useId } from "react";

import { cx } from "@/lib/shared/classnames/cx";

import type { SelectInputProps } from "./SelectInput.types";
import styles from "./SelectInput.module.scss";

/**
 * SelectInput: labelled native select.
 *
 * @param props Component props.
 * @param props.label Visible label of the field.
 * @param props.options Options to choose from.
 * @param props.error Error message shown under the field.
 * @param props.className Extra class names for the wrapper.
 * @param props.rest Remaining properties, forwarded to the native select.
 * @returns The field.
 */
export const SelectInput = ({ label, options, error, className, ...rest }: SelectInputProps) => {
  const id = useId();

  return (
    <div className={cx(styles.field, className)}>
      <label className={styles.field__label} htmlFor={id}>
        {label}
      </label>
      <select id={id} className={cx(styles.field__input, error && styles.invalid)} aria-invalid={Boolean(error)} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className={styles.field__error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
