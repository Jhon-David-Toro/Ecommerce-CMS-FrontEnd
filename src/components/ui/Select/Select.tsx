"use client";

import type { SelectProps } from "./Select.types";
import { useSelect } from "./hooks/useSelect";
import { SelectListbox } from "./parts/SelectListbox";
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
export const Select = ({ value, options, onChange }: SelectProps) => {
  const { containerRef, isOpen, toggle, select } = useSelect({ onChange });

  return (
    <div className={styles.select} ref={containerRef}>
      <button type="button" className={styles.select__trigger} onClick={toggle} aria-haspopup="listbox" aria-expanded={isOpen}>
        <span>{value}</span>
        <span className={styles.select__arrow} />
      </button>
      {isOpen && <SelectListbox value={value} options={options} onSelect={select} />}
    </div>
  );
};
