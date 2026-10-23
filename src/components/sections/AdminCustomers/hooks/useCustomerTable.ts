import type { ListTable } from "@/components/patterns/AdminListView";
import type { PublicUser } from "@/lib/auth/auth.types";

import { CUSTOMER_COLUMNS, buildActionsColumn } from "../AdminCustomers.columns";

/**
 * Describes the customers table: the user columns followed by the block button.
 *
 * @param onBlockedChange Called with the user id and the new blocked state.
 * @returns The table description.
 */
export const useCustomerTable = (onBlockedChange: (id: number, blocked: boolean) => void): ListTable<PublicUser> => ({
  caption: "Customers",
  emptyTitle: "No customers found",
  getRowKey: (user) => user.id,
  columns: [...CUSTOMER_COLUMNS, buildActionsColumn(onBlockedChange)],
});
