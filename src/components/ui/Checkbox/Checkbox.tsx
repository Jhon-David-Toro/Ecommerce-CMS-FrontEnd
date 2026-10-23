import { cx } from "@/lib/shared/classnames/cx";

import type { CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.scss";

/**
 * Checkbox: native checkbox with its label.
 *
 * @param props Component props.
 * @param props.label Text next to the checkbox.
 * @param props.className Extra class names for the wrapper.
 * @param props.rest Remaining properties, forwarded to the native input.
 * @returns The checkbox.
 */
export const Checkbox = ({ label, className, ...rest }: CheckboxProps) => (
  <label className={cx(styles.checkbox, className)}>
    <input type="checkbox" className={styles.checkbox__input} {...rest} />
    <span>{label}</span>
  </label>
);
