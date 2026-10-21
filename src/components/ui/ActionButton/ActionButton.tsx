import { cx } from "@/lib/shared/classnames/cx";

import type { ActionButtonProps } from "./ActionButton.types";
import styles from "./ActionButton.module.scss";

/**
 * ActionButton: small pill button with an optional icon for the actions of a table row.
 *
 * @param props Component props.
 * @param props.label Text of the button.
 * @param props.icon Icon drawn before the text.
 * @param props.tone Look of the button: neutral, success or danger.
 * @param props.className Extra class names.
 * @param props.rest Remaining properties, forwarded to the native button.
 * @returns The button.
 */
export const ActionButton = ({ label, icon: Icon, tone = "neutral", className, ...rest }: ActionButtonProps) => (
  <button type="button" className={cx(styles.action, styles[`action_${tone}`], className)} {...rest}>
    {Icon && <Icon className={styles.action__icon} />}
    {label}
  </button>
);
