import type { FC } from "react";

import { ARROW_ICONS } from "./SliderButton.constants";
import type { SliderButtonProps } from "./SliderButton.types";
import styles from "./SliderButton.module.scss";

/**
 * SliderButton: round arrow button that moves a slider left or right.
 *
 * @param props Component props.
 * @param props.direction Side the arrow points to.
 * @param props.onClick Called when the button is pressed.
 * @param props.disabled Disables the button.
 * @returns The arrow button.
 */
export const SliderButton: FC<SliderButtonProps> = ({ direction, onClick, disabled }) => {
  const Icon = ARROW_ICONS[direction];

  return (
    <button className={styles.arrow} onClick={onClick} disabled={disabled} aria-label={`Slide ${direction}`}>
      <Icon className={styles.arrow__size} />
    </button>
  );
};
