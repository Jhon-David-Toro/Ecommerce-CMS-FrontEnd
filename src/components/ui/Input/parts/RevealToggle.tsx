import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import type { RevealToggleProps } from "../Input.types";
import styles from "../Input.module.scss";

/**
 * Input/RevealToggle: button that shows or hides the text of a password field.
 *
 * @param props Component props.
 * @param props.isRevealed Whether the text is visible.
 * @param props.onToggle Called when the button is pressed.
 * @returns The button.
 */
export const RevealToggle = ({ isRevealed, onToggle }: RevealToggleProps) => (
  <button type="button" className={styles.field__toggle} aria-label={isRevealed ? "Hide password" : "Show password"} onClick={onToggle}>
    {isRevealed ? <EyeSlashIcon /> : <EyeIcon />}
  </button>
);
