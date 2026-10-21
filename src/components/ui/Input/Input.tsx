import { useId } from "react";

import { FieldMessage, getDescribedBy } from "@/components/ui/FieldMessage";
import { cx } from "@/lib/shared/classnames/cx";

import type { InputProps } from "./Input.types";
import { InputControl } from "./parts/InputControl";
import styles from "./Input.module.scss";

/**
 * Input: labelled text field with an optional leading icon, a show/hide button for passwords, a hint and an error message.
 *
 * @param props Component props.
 * @param props.label Visible label of the field.
 * @param props.error Error message shown under the field.
 * @param props.hint Help text shown under the field.
 * @param props.icon Icon drawn at the start of the field.
 * @param props.revealable Adds a button that shows or hides the text of a password field.
 * @param props.className Extra class names for the wrapper.
 * @param props.rest Remaining properties, forwarded to the native input.
 * @returns The field.
 */
export const Input = ({ label, error, hint, icon, revealable, className, ...rest }: InputProps) => {
  const id = useId();

  return (
    <div className={cx(styles.field, className)}>
      <label className={styles.field__label} htmlFor={id}>
        {label}
      </label>
      <InputControl
        id={id}
        icon={icon}
        revealable={revealable}
        invalid={Boolean(error)}
        aria-describedby={getDescribedBy(id, error, hint)}
        {...rest}
      />
      <FieldMessage id={id} error={error} hint={hint} />
    </div>
  );
};
