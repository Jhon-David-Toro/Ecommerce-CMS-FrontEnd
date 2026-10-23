import { cx } from "@/lib/shared/classnames/cx";
import { KEYS } from "@/lib/shared/dom/keys.constants";

import type { ColorSwatchProps } from "../ColorFilter.types";
import styles from "../ColorFilter.module.scss";

/**
 * ColorFilter/Swatch: round button that selects or clears one color.
 *
 * @param props Component props.
 * @param props.color Color the swatch shows.
 * @param props.isSelected Whether the color is selected.
 * @param props.onToggle Called when the swatch is pressed.
 * @returns The swatch.
 */
export const ColorSwatch = ({ color, isSelected, onToggle }: ColorSwatchProps) => (
  <article
    className={cx(styles.color__circle, { [styles.selected]: isSelected })}
    style={{ backgroundColor: color.hex }}
    data-color={color.hex}
    onClick={onToggle}
    role="button"
    aria-label={color.name}
    title={color.name}
    aria-pressed={isSelected}
    tabIndex={0}
    onKeyDown={(event) => event.key === KEYS.enter && onToggle()}
  />
);
