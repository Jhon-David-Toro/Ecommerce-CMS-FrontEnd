import { BUTTON_ICONS } from "../Button.constants";
import type { ButtonIconProps } from "../Button.types";
import styles from "../Button.module.scss";

/**
 * Button/Icon: decorative icon placed beside the button text.
 *
 * @param props Component props.
 * @param props.icon Name of the icon to draw.
 * @returns The icon wrapper.
 */
export const ButtonIcon = ({ icon }: ButtonIconProps) => {
  const Icon = BUTTON_ICONS[icon];

  return (
    <span className={styles.icon}>
      <Icon className={styles.iconSvg} />
    </span>
  );
};
