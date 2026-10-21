"use client";

import { useState } from "react";

import { AdminListView } from "@/components/patterns/AdminListView";
import { ChipFilter } from "@/components/patterns/ChipFilter";
import { Spinner } from "@/components/ui/Spinner";
import { listOrders } from "@/lib/orders/orders.api";
import { useQuery } from "@/lib/shared/async/useQuery";
import { useTableControls } from "@/lib/shared/table/useTableControls";

import { NO_FILTERS, NO_ROWS, PAGE_SIZE } from "./AdminOrders.constants";
import { buildStatusChips, filterByStatus, matchesOrder } from "./AdminOrders.utils";
import { useOrderStatusChange } from "./hooks/useOrderStatusChange";
import { useOrderTable } from "./hooks/useOrderTable";

/**
 * AdminOrders: searchable, paginated list of every order with a status filter.
 *
 * @returns The orders page content.
 */
export const AdminOrders = () => {
  const { data, isLoading, reload } = useQuery(listOrders, NO_FILTERS);
  const [status, setStatus] = useState("");
  const controls = useTableControls(filterByStatus(data ?? NO_ROWS, status), { pageSize: PAGE_SIZE, matches: matchesOrder });
  const table = useOrderTable(useOrderStatusChange(reload));

  if (isLoading) return <Spinner label="Loading orders" />;

  return (
    <AdminListView
      title="Orders"
      description="Follow every purchase from payment to delivery."
      searchLabel="Search orders"
      filters={<ChipFilter label="Status" options={buildStatusChips(data ?? NO_ROWS)} value={status} onChange={setStatus} />}
      controls={controls}
      table={table}
    />
  );
};
