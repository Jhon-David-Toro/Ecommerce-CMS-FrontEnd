"use client";

import type { InputControlProps } from "../Input.types";
import { getControlClass } from "../Input.utils";
import { useReveal } from "../hooks/useReveal";
import { RevealToggle } from "./RevealToggle";
import styles from "../Input.module.scss";

/**
 * Input/Control: the native input with its leading icon and, for passwords, the button that reveals the text.
 *
 * @param props Component props.
 * @param props.icon Icon drawn at the start of the field.
 * @param props.revealable Adds the show/hide button when the field is a password.
 * @param props.invalid Marks the field as invalid.
 * @param props.type Native input type.
 * @param props.rest Remaining properties, forwarded to the native input.
 * @returns The control.
 */
export const InputControl = ({ icon: Icon, revealable, invalid, type, ...rest }: InputControlProps) => {
  const { inputType, canReveal, isRevealed, toggle } = useReveal(type, revealable);

  return (
    <div className={styles.field__control}>
      {Icon && <Icon className={styles.field__icon} />}
      <input
        className={getControlClass({ invalid, hasIcon: Boolean(Icon), hasToggle: canReveal })}
        aria-invalid={invalid}
        type={inputType}
        {...rest}
      />
      {canReveal && <RevealToggle isRevealed={isRevealed} onToggle={toggle} />}
    </div>
  );
};
