import { ICON_POSITIONS } from "../Button.constants";
import type { ButtonContentProps } from "../Button.types";
import styles from "../Button.module.scss";
import { ButtonIcon } from "./ButtonIcon";

/**
 * Button/Content: label with an optional icon on the left or right.
 *
 * @param props Component props.
 * @param props.text Label of the button.
 * @param props.icon Icon drawn beside the label.
 * @param props.iconPosition Side where the icon sits.
 * @returns The label and the icon.
 */
export const ButtonContent = ({ text, icon, iconPosition }: ButtonContentProps) => {
  const iconNode = icon && <ButtonIcon icon={icon} />;

  return (
    <>
      {iconPosition === ICON_POSITIONS.left && iconNode}
      <span className={styles.text}>{text}</span>
      {iconPosition === ICON_POSITIONS.right && iconNode}
    </>
  );
};
