import type { DataTableBodyProps } from "../DataTable.types";

/**
 * DataTable/Body: one row for each record, one cell for each column.
 *
 * @param props Component props.
 * @param props.columns Columns of the table.
 * @param props.rows Records to show.
 * @param props.getRowKey Gives a unique key for a record.
 * @returns The table body.
 */
export const DataTableBody = <T,>({ columns, rows, getRowKey }: DataTableBodyProps<T>) => (
  <tbody>
    {rows.map((row) => (
      <tr key={getRowKey(row)}>
        {columns.map((column) => (
          <td key={column.key} data-align={column.align}>
            {column.render(row)}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);
