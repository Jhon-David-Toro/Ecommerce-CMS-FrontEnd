import { cx } from "@/lib/shared/classnames/cx";

import type { AlertProps } from "./Alert.types";
import styles from "./Alert.module.scss";

/**
 * Alert: highlighted message that tells the user something went right or wrong.
 *
 * @param props Component props.
 * @param props.tone Kind of message.
 * @param props.children Message text.
 * @returns The alert.
 */
export const Alert = ({ tone = "error", children }: AlertProps) => (
  <div className={cx(styles.alert, styles[tone])} role={tone === "error" ? "alert" : "status"}>
    {children}
  </div>
);
