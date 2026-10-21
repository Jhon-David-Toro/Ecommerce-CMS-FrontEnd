import type { FC } from "react";

import { cx } from "@/lib/shared/classnames/cx";

import type { SelectColorProps } from "./SelectColor.types";
import styles from "./SelectColor.module.scss";

/**
 * SelectColor: row of color swatches that behave as toggle buttons.
 *
 * @param props Component props.
 * @param props.colors Available colors.
 * @param props.selectedColor Name of the selected color.
 * @param props.onColorChange Called with the name of the color the user picks.
 * @returns The color selector.
 */
export const SelectColor: FC<SelectColorProps> = ({ colors, selectedColor, onColorChange }) => (
  <section className={styles.colors}>
    <p>Select Colors</p>
    <div className={styles.colors__options}>
      {colors.map((color) => (
        <button
          key={color.name}
          className={cx(styles.colors__options_button, { [styles.selected]: selectedColor === color.name })}
          style={{ backgroundColor: color.hex }}
          aria-label={color.name}
          aria-pressed={selectedColor === color.name}
          onClick={() => onColorChange(color.name)}
        />
      ))}
    </div>
  </section>
);
