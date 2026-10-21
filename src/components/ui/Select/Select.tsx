"use client";

import { useRef, useState } from "react";

import { useClickOutside } from "@/lib/shared/dom/useClickOutside";

import { SelectProps } from "./Select.types";
import styles from "./Select.module.scss";

/**
 * Select: button that opens a listbox of options.
 *
 * @param props Component props.
 * @param props.value Selected option.
 * @param props.options Available options.
 * @param props.onChange Called with the option the user picks.
 * @returns The select.
 */
const Select = ({ value, options, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  /**
   * Reports the picked option and closes the listbox.
   *
   * @param option Option the user picked.
   */
  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.select} ref={containerRef}>
      <button
        type="button"
        className={styles.select__trigger}
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{value}</span>
        <span className={styles.select__arrow} />
      </button>

      {isOpen && (
        <ul className={styles.select__options} role="listbox">
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={option === value}
              className={`${styles.select__option} ${option === value ? styles["select__option--active"] : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
