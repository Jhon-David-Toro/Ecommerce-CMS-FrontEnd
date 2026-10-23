import type { FC } from "react";

import type { FieldMessageProps } from "./FieldMessage.types";
import { getErrorId, getHintId } from "./FieldMessage.utils";
import styles from "./FieldMessage.module.scss";

/**
 * FieldMessage: the error of a form field, or its hint when there is no error.
 *
 * @param props Component props.
 * @param props.id Id of the field, used to link the message to it.
 * @param props.error Error message; it wins over the hint.
 * @param props.hint Help text.
 * @returns The message, or nothing when there is neither.
 */
export const FieldMessage: FC<FieldMessageProps> = ({ id, error, hint }) => {
  if (error) {
    return (
      <p id={getErrorId(id)} className={styles.error} role="alert">
        {error}
      </p>
    );
  }

  return hint ? (
    <p id={getHintId(id)} className={styles.hint}>
      {hint}
    </p>
  ) : null;
};
