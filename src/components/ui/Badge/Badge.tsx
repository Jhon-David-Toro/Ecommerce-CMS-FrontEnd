import { cx } from "@/lib/shared/classnames/cx";

import type { BadgeProps } from "./Badge.types";
import styles from "./Badge.module.scss";

/**
 * Badge: small colored label for statuses.
 *
 * @param props Component props.
 * @param props.tone Color family of the badge.
 * @param props.children Text of the badge.
 * @returns The badge.
 */
export const Badge = ({ tone = "neutral", children }: BadgeProps) => <span className={cx(styles.badge, styles[tone])}>{children}</span>;
