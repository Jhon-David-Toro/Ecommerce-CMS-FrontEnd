"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import { CHEVRON_ROTATION } from "./FilterSection.constants";
import type { FilterSectionProps } from "./FilterSection.types";
import styles from "./FilterSection.module.scss";

/**
 * FilterSection: collapsible block with a title that wraps the options of one filter.
 *
 * @param props Component props.
 * @param props.title Title of the filter.
 * @param props.children Options of the filter.
 * @returns The filter block.
 */
export const FilterSection = ({ title, children }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.filter}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.filter__toggleButton} aria-expanded={isOpen}>
        <span className={styles.filter__toggleButton__title}>{title}</span>
        <ChevronDownIcon
          className={styles.filter__toggleButton__chevronIcon}
          style={{ transform: isOpen ? CHEVRON_ROTATION.open : CHEVRON_ROTATION.closed }}
        />
      </button>
      {isOpen && <div className={styles.filter__options}>{children}</div>}
    </div>
  );
};
