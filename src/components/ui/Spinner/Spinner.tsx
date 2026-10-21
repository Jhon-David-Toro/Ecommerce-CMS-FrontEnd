import type { SpinnerProps } from "./Spinner.types";
import styles from "./Spinner.module.scss";

/**
 * Spinner: loading indicator announced to screen readers.
 *
 * @param props Component props.
 * @param props.label Text announced while loading.
 * @returns The indicator.
 */
export const Spinner = ({ label = "Loading..." }: SpinnerProps) => (
  <div className={styles.spinner} role="status">
    <span className={styles.spinner__ring} aria-hidden="true" />
    <span className={styles.spinner__label}>{label}</span>
  </div>
);
