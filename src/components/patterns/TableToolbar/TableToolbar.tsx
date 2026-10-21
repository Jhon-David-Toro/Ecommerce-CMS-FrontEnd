import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";

import type { TableToolbarProps } from "./TableToolbar.types";
import styles from "./TableToolbar.module.scss";

/**
 * TableToolbar: search box with a magnifier and room for filters above a table.
 *
 * @param props Component props.
 * @param props.query Search text.
 * @param props.onQueryChange Called with the new search text.
 * @param props.placeholder Hint inside the search box.
 * @param props.children Extra filters shown beside the search box.
 * @returns The toolbar.
 */
export const TableToolbar: FC<TableToolbarProps> = ({ query, onQueryChange, placeholder = "Search...", children }) => (
  <div className={styles.toolbar} role="search">
    <label className={styles.toolbar__field}>
      <MagnifyingGlassIcon className={styles.toolbar__icon} />
      <input
        className={styles.toolbar__search}
        type="search"
        value={query}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => onQueryChange(event.target.value)}
      />
    </label>
    {children}
  </div>
);
