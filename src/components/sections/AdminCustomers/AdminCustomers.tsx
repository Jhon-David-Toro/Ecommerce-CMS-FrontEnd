"use client";

import { AdminListView } from "@/components/patterns/AdminListView";
import { Spinner } from "@/components/ui/Spinner";
import { listUsers, userRepository } from "@/lib/auth/auth.api";
import { useQuery } from "@/lib/shared/async/useQuery";
import { useTableControls } from "@/lib/shared/table/useTableControls";

import { NO_ARGS, NO_ROWS, PAGE_SIZE } from "./AdminCustomers.constants";
import { matchesUser } from "./AdminCustomers.utils";
import { useCustomerTable } from "./hooks/useCustomerTable";

/**
 * AdminCustomers: searchable list of registered users where customers can be blocked or unblocked.
 *
 * @returns The customers page content.
 */
export const AdminCustomers = () => {
  const { data, isLoading, reload } = useQuery(listUsers, NO_ARGS);
  const controls = useTableControls(data ?? NO_ROWS, { pageSize: PAGE_SIZE, matches: matchesUser });

  /**
   * Blocks or unblocks a user and refreshes the list.
   *
   * @param id User id.
   * @param blocked New blocked state.
   */
  const setBlocked = async (id: number, blocked: boolean) => {
    await userRepository.update(id, { blocked });
    reload();
  };

  const table = useCustomerTable(setBlocked);

  if (isLoading) return <Spinner label="Loading customers" />;

  return (
    <AdminListView
      title="Customers"
      description="People with an account in your store."
      searchLabel="Search customers"
      controls={controls}
      table={table}
    />
  );
};
