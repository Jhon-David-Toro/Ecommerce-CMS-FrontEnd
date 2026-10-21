import { EmptyState } from "@/components/ui/EmptyState";

import type { DataTableProps } from "./DataTable.types";
import { DataTableBody } from "./parts/DataTableBody";
import { DataTableHead } from "./parts/DataTableHead";
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
        <DataTableHead columns={columns} />
        <DataTableBody columns={columns} rows={rows} getRowKey={getRowKey} />
      </table>
    </div>
  );
};
