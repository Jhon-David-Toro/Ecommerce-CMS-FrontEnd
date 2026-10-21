import { cx } from "@/lib/shared/classnames/cx";

import type { SpinnerProps } from "./Spinner.types";
import styles from "./Spinner.module.scss";

/**
 * Spinner: thin black ring over a light track with a short label, announced to screen readers.
 *
 * @param props Component props.
 * @param props.label Text announced while loading.
 * @param props.size "block" fills a section with a big ring over its label; "inline" sits next to text or inside a button.
 * @returns The indicator.
 */
export const Spinner = ({ label = "Loading...", size = "block" }: SpinnerProps) => (
  <div className={cx(styles.spinner, styles[`spinner_${size}`])} role="status">
    <span className={styles.spinner__ring} aria-hidden="true" />
    <span className={styles.spinner__label}>{label}</span>
  </div>
);
