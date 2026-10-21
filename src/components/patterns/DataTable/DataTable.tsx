import { EmptyState } from "@/components/ui/EmptyState";

import type { DataTableProps } from "./DataTable.types";
import styles from "./DataTable.module.scss";

/**
 * DataTable: table of rows with typed columns and an empty state.
 *
 * @param props Component props.
 * @param props.caption Accessible name of the table.
 * @param props.columns Columns, each with a header and a function that draws its cell.
 * @param props.rows Rows to show.
 * @param props.getRowKey Gives a unique key for a row.
 * @param props.emptyTitle Message shown when there are no rows.
 * @returns The table.
 */
export const DataTable = <T,>({ caption, columns, rows, getRowKey, emptyTitle = "Nothing to show" }: DataTableProps<T>) => {
  if (rows.length === 0) return <EmptyState title={emptyTitle} />;

  return (
    <div className={styles.wrapper}>
      <table className={styles.table} aria-label={caption}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" className={column.align === "right" ? styles.right : undefined}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <td key={column.key} className={column.align === "right" ? styles.right : undefined}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
