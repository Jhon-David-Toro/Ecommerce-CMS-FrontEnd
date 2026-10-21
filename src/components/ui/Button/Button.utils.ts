import { cx } from "@/lib/shared/classnames/cx";

import type { ButtonClassParams } from "./Button.types";
import styles from "./Button.module.scss";

/**
 * Builds the class attribute of a button from its visual options.
 *
 * @param params Visual options of the button.
 * @param params.type Visual variant.
 * @param params.size Size preset.
 * @param params.margin Margin preset.
 * @param params.iconPosition Side where the icon sits.
 * @param params.className Extra class names from the caller.
 * @returns The class attribute value.
 */
export const buildButtonClassName = ({ type, size, margin, iconPosition, className }: ButtonClassParams) =>
  cx(
    styles.button,
    styles[`button--${type}`],
    styles[`button--${size}`],
    margin && styles[`button--${margin}`],
    iconPosition && styles[`button--icon-${iconPosition}`],
    className,
  );
