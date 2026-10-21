import type { FC } from "react";

import type { FieldGroupProps } from "./FieldGroup.types";
import styles from "./FieldGroup.module.scss";

/**
 * FieldGroup: a framed set of related form fields with a title.
 *
 * @param props Component props.
 * @param props.legend Title of the group.
 * @param props.children Fields of the group.
 * @returns The group.
 */
export const FieldGroup: FC<FieldGroupProps> = ({ legend, children }) => (
  <fieldset className={styles.group}>
    <legend className={styles.group__legend}>{legend}</legend>
    {children}
  </fieldset>
);
