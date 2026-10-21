import { cx } from "@/lib/shared/classnames/cx";

import type { OrderActionButtonProps } from "../OrderActions.types";
import styles from "../OrderActions.module.scss";

/**
 * OrderActions/Button: one action, as an icon with text, or as text only in table rows.
 *
 * @param props Component props.
 * @param props.label Text of the action.
 * @param props.icon Icon of the action.
 * @param props.tone Style of the button.
 * @param props.compact Shows the text without the icon.
 * @param props.onClick Called when the button is pressed.
 * @returns The button.
 */
export const OrderActionButton = ({ label, icon: Icon, tone, compact, onClick }: OrderActionButtonProps) => (
  <button type="button" className={cx(styles.button, styles[`button_${tone}`], compact && styles.button_compact)} onClick={onClick}>
    {!compact && <Icon className={styles.button__icon} />}
    {label}
  </button>
);
