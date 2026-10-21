import type { FC } from "react";

import { DEFAULT_TYPE_ATTRIBUTE, ICON_POSITIONS } from "./Button.constants";
import type { ButtonProps } from "./Button.types";
import { buildButtonClassName } from "./Button.utils";
import { ButtonIcon } from "./parts/ButtonIcon";
import styles from "./Button.module.scss";

/**
 * Button: action button that renders as a link when it receives an `href`.
 *
 * @param props Component props.
 * @param props.type Visual variant.
 * @param props.text Label of the button.
 * @param props.onClick Called when the button is pressed.
 * @param props.className Extra class names.
 * @param props.size Size preset.
 * @param props.margin Margin preset.
 * @param props.icon Icon drawn beside the label.
 * @param props.iconPosition Side where the icon sits.
 * @param props.disabled Disables the button (ignored for links).
 * @param props.href Turns the button into a link.
 * @param props.typeAttribute Native `type` of the button.
 * @param props.id Element id.
 * @param props.ariaPressed Pressed state for toggle buttons.
 * @returns The button or link.
 */
export const Button: FC<ButtonProps> = ({
  type,
  text,
  onClick,
  className,
  size,
  margin,
  icon,
  iconPosition,
  disabled,
  href,
  typeAttribute = DEFAULT_TYPE_ATTRIBUTE,
  id,
  ariaPressed,
}) => {
  const classes = buildButtonClassName({ type, size, margin, iconPosition, className });
  const iconNode = icon && <ButtonIcon icon={icon} />;
  const content = (
    <>
      {iconPosition === ICON_POSITIONS.left && iconNode}
      <span className={styles.text}>{text}</span>
      {iconPosition === ICON_POSITIONS.right && iconNode}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} id={id}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={typeAttribute}
      className={classes}
      onClick={onClick}
      id={id}
      disabled={disabled}
      aria-pressed={ariaPressed}
    >
      {content}
    </button>
  );
};
