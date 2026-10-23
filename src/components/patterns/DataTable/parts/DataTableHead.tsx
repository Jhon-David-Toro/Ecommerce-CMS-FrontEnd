import type { DataTableHeadProps } from "../DataTable.types";

/**
 * DataTable/Head: the header row, one cell per column.
 *
 * @param props Component props.
 * @param props.columns Columns of the table.
 * @returns The table head.
 */
export const DataTableHead = <T,>({ columns }: DataTableHeadProps<T>) => (
  <thead>
    <tr>
      {columns.map((column) => (
        <th key={column.key} scope="col" data-align={column.align}>
          {column.header}
        </th>
      ))}
    </tr>
  </thead>
);
