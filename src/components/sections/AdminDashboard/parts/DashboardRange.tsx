import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { DASHBOARD_RANGES } from "../AdminDashboard.constants";
import type { DashboardRangeProps } from "../AdminDashboard.types";
import styles from "../AdminDashboard.module.scss";

/**
 * AdminDashboard/Range: pill that picks how far back the orders are counted.
 *
 * @param props Component props.
 * @param props.value Selected range.
 * @param props.onChange Called with the new range.
 * @returns The select.
 */
export const DashboardRange = ({ value, onChange }: DashboardRangeProps) => (
  <div className={styles.range}>
    <select className={styles.range__select} aria-label="Time range" value={value} onChange={(event) => onChange(event.target.value)}>
      {DASHBOARD_RANGES.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDownIcon className={styles.range__chevron} aria-hidden="true" />
  </div>
);
