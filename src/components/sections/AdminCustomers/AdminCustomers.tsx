"use client";

import { DataTable } from "@/components/patterns/DataTable";
import { PageHeader } from "@/components/patterns/PageHeader";
import { Pagination } from "@/components/patterns/Pagination";
import { TableToolbar } from "@/components/patterns/TableToolbar";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { listUsers, userRepository } from "@/lib/auth/auth.api";
import { ROLES } from "@/lib/auth/auth.constants";
import { useQuery } from "@/lib/shared/async/useQuery";
import { formatDate } from "@/lib/shared/format/format";
import { useTableControls } from "@/lib/shared/table/useTableControls";

import { NO_ARGS, PAGE_SIZE } from "./AdminCustomers.constants";
import { matchesUser } from "./AdminCustomers.utils";

/**
 * AdminCustomers: searchable list of registered users where customers can be blocked or unblocked.
 *
 * @returns The customers page content.
 */
export const AdminCustomers = () => {
  const { data, isLoading, reload } = useQuery(listUsers, NO_ARGS);
  const { query, setQuery, page, setPage, totalPages, pageRows } = useTableControls(data ?? [], {
    pageSize: PAGE_SIZE,
    matches: matchesUser,
  });

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

  if (isLoading) return <Spinner label="Loading customers" />;

  return (
    <>
      <PageHeader title="Customers" description="People with an account in your store." />
      <TableToolbar query={query} onQueryChange={setQuery} placeholder="Search customers" />
      <DataTable
        caption="Customers"
        emptyTitle="No customers found"
        rows={pageRows}
        getRowKey={(user) => user.id}
        columns={[
          { key: "name", header: "Name", render: (user) => user.name },
          { key: "email", header: "Email", render: (user) => user.email },
          {
            key: "role",
            header: "Role",
            render: (user) => <Badge tone="neutral">{user.role === ROLES.admin ? "Admin" : "Customer"}</Badge>,
          },
          { key: "joined", header: "Joined", render: (user) => formatDate(new Date(user.createdAt).toISOString()) },
          {
            key: "status",
            header: "Status",
            render: (user) => <Badge tone={user.blocked ? "danger" : "success"}>{user.blocked ? "Blocked" : "Active"}</Badge>,
          },
          {
            key: "actions",
            header: "",
            align: "right",
            render: (user) =>
              user.role === ROLES.admin ? null : (
                <button
                  type="button"
                  onClick={() => setBlocked(user.id, !user.blocked)}
                  aria-label={`${user.blocked ? "Unblock" : "Block"} ${user.name}`}
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              ),
          },
        ]}
      />
      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </>
  );
};
