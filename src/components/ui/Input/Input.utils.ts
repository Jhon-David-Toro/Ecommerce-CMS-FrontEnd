import { cx } from "@/lib/shared/classnames/cx";

import styles from "./Input.module.scss";

/**
 * Builds the class names of the native input from what the field shows around it.
 *
 * @param state Look of the field.
 * @param state.invalid Whether the field has an error.
 * @param state.hasIcon Whether a leading icon takes space on the left.
 * @param state.hasToggle Whether the show/hide button takes space on the right.
 * @returns The class names.
 */
export const getControlClass = ({ invalid, hasIcon, hasToggle }: { invalid: boolean; hasIcon: boolean; hasToggle: boolean }) =>
  cx(styles.field__input, invalid && styles.invalid, hasIcon && styles.withIcon, hasToggle && styles.withToggle);
