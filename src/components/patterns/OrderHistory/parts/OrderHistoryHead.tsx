import { HEADERS } from "../OrderHistory.constants";

/**
 * OrderHistory/Head: header row of the orders table.
 *
 * @returns The table head.
 */
export const OrderHistoryHead = () => (
  <thead>
    <tr>
      {HEADERS.map((header) => (
        <th key={header} scope="col">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);
