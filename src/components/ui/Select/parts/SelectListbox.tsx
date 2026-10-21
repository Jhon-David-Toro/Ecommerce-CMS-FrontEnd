import { cx } from "@/lib/shared/classnames/cx";

import type { SelectListboxProps } from "../Select.types";
import styles from "../Select.module.scss";

/**
 * Select/Listbox: list of options shown while the select is open.
 *
 * @param props Component props.
 * @param props.value Selected option.
 * @param props.options Available options.
 * @param props.onSelect Called with the option the user picks.
 * @returns The listbox.
 */
export const SelectListbox = ({ value, options, onSelect }: SelectListboxProps) => (
  <ul className={styles.select__options} role="listbox">
    {options.map((option) => (
      <li
        key={option}
        role="option"
        aria-selected={option === value}
        className={cx(styles.select__option, option === value && styles["select__option--active"])}
        onClick={() => onSelect(option)}
      >
        {option}
      </li>
    ))}
  </ul>
);
