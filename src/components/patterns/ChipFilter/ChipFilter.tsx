import type { FC } from "react";

import { cx } from "@/lib/shared/classnames/cx";

import type { ChipFilterProps } from "./ChipFilter.types";
import styles from "./ChipFilter.module.scss";

/**
 * ChipFilter: row of pill buttons where exactly one option is selected, used to narrow a list.
 *
 * @param props Component props.
 * @param props.label Accessible name of the group.
 * @param props.options Options with their text.
 * @param props.value Selected option.
 * @param props.onChange Called with the value of the option the user picks.
 * @returns The group of chips.
 */
export const ChipFilter: FC<ChipFilterProps> = ({ label, options, value, onChange }) => (
  <div className={styles.chips} role="group" aria-label={label}>
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        className={cx(styles.chips__chip, option.value === value && styles.chips__chip_active)}
        aria-pressed={option.value === value}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);
