"use client";

import Link from "next/link";
import { useState } from "react";

import { DataTable } from "@/components/patterns/DataTable";
import { PageHeader } from "@/components/patterns/PageHeader";
import { Pagination } from "@/components/patterns/Pagination";
import { TableToolbar } from "@/components/patterns/TableToolbar";
import { Badge } from "@/components/ui/Badge";
import { SelectInput } from "@/components/ui/SelectInput";
import { Spinner } from "@/components/ui/Spinner";
import { ORDER_STATUSES } from "@/lib/orders/order.constants";
import { getStatusTone } from "@/lib/orders/order.utils";
import { listOrders } from "@/lib/orders/orders.api";
import { useQuery } from "@/lib/shared/async/useQuery";
import { formatDate, formatPrice } from "@/lib/shared/format/format";
import { useTableControls } from "@/lib/shared/table/useTableControls";

import { NO_FILTERS, PAGE_SIZE, STATUS_FILTERS } from "./AdminOrders.constants";
import { filterByStatus, matchesOrder } from "./AdminOrders.utils";

/**
 * AdminOrders: searchable, paginated list of every order with a status filter.
 *
 * @returns The orders page content.
 */
export const AdminOrders = () => {
  const { data, isLoading } = useQuery(listOrders, NO_FILTERS);
  const [status, setStatus] = useState("");
  const rows = filterByStatus(data ?? [], status);
  const { query, setQuery, page, setPage, totalPages, pageRows } = useTableControls(rows, { pageSize: PAGE_SIZE, matches: matchesOrder });

  if (isLoading) return <Spinner label="Loading orders" />;

  return (
    <>
      <PageHeader title="Orders" description="Follow every purchase from payment to delivery." />
      <TableToolbar query={query} onQueryChange={setQuery} placeholder="Search orders">
        <SelectInput label="Status" options={STATUS_FILTERS} value={status} onChange={(event) => setStatus(event.target.value)} />
      </TableToolbar>
      <DataTable
        caption="Orders"
        emptyTitle="No orders found"
        rows={pageRows}
        getRowKey={(order) => order.id}
        columns={[
          { key: "number", header: "Order", render: (order) => <Link href={`/admin/orders/${order.id}`}>{order.number}</Link> },
          { key: "date", header: "Date", render: (order) => formatDate(new Date(order.createdAt).toISOString()) },
          { key: "customer", header: "Customer", render: (order) => order.address.fullName || order.email },
          {
            key: "status",
            header: "Status",
            render: (order) => <Badge tone={getStatusTone(order.status)}>{ORDER_STATUSES[order.status]}</Badge>,
          },
          { key: "total", header: "Total", align: "right", render: (order) => formatPrice(order.total) },
        ]}
      />
      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </>
  );
};
