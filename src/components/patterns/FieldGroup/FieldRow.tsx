import type { FC } from "react";

import type { FieldRowProps } from "./FieldGroup.types";
import styles from "./FieldGroup.module.scss";

/**
 * FieldRow: places a few short fields side by side, wrapping on small screens.
 *
 * @param props Component props.
 * @param props.children Fields of the row.
 * @returns The row.
 */
export const FieldRow: FC<FieldRowProps> = ({ children }) => <div className={styles.row}>{children}</div>;
