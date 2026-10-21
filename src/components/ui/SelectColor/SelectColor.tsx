import { FC } from 'react';
import { SelectColorProps } from './SelectColor.types';
import clsx from 'clsx';
import styles from './SelectColor.module.scss';

export const SelectColor: FC<SelectColorProps> = ({ colors, selectedColor, onColorChange }) => {
  return (
    <section className={styles.colors}>
      <p>Select Colors</p>
      <div className={styles.colors__options}>
        {colors.map((color) => (
          <button
            key={color.name}
            className={clsx(styles.colors__options_button, {[styles.selected] : selectedColor === color.name})}
            style={{ backgroundColor: color.hex }}
            aria-label={color.name}
            aria-pressed={selectedColor === color.name}
            onClick={() => onColorChange(color.name)}
          />
        ))}
      </div>
    </section>
  );
};
