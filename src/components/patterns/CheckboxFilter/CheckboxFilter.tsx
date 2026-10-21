import type { FC } from "react";

import { FilterSection } from "@/components/patterns/FilterSection";
import { cx } from "@/lib/shared/classnames/cx";
import { toggleItem } from "@/lib/shared/collections/collections";

import type { CheckboxFilterProps } from "./CheckboxFilter.types";
import styles from "./CheckboxFilter.module.scss";

/**
 * CheckboxFilter: collapsible list of checkboxes for a multi-select filter.
 *
 * @param props Component props.
 * @param props.title Title of the filter section.
 * @param props.options Options to offer.
 * @param props.selected Options currently selected.
 * @param props.onChange Receives the new selection after the user toggles an option.
 * @returns The filter section.
 */
export const CheckboxFilter: FC<CheckboxFilterProps> = ({ title, options, selected, onChange }) => (
  <FilterSection title={title}>
    <section className={styles.list}>
      {options.map((option) => {
        const isSelected = selected.includes(option);

        return (
          <label key={option} className={cx(styles.list__option, { [styles.selected]: isSelected })}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onChange(toggleItem(selected, option))}
              className={cx(styles.checkbox, { [styles.selected]: isSelected })}
            />
            <span className={styles.list__label}>{option}</span>
          </label>
        );
      })}
    </section>
  </FilterSection>
);
