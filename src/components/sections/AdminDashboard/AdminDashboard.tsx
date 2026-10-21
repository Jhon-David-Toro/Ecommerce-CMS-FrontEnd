"use client";

import Link from "next/link";

import { DataTable } from "@/components/patterns/DataTable";
import { PageHeader } from "@/components/patterns/PageHeader";
import { StatCard } from "@/components/patterns/StatCard";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { ORDER_STATUSES } from "@/lib/orders/order.constants";
import { getStatusTone } from "@/lib/orders/order.utils";
import { formatPrice } from "@/lib/shared/format/format";

import { useDashboard } from "./hooks/useDashboard";
import styles from "./AdminDashboard.module.scss";

/**
 * AdminDashboard: revenue, counters, latest orders and products that need restocking.
 *
 * @returns The dashboard page content.
 */
export const AdminDashboard = () => {
  const dashboard = useDashboard();

  if (!dashboard) return <Spinner label="Loading dashboard" />;

  return (
    <>
      <PageHeader title="Dashboard" description="How the store is doing." />
      <div className={styles.stats}>
        <StatCard label="Revenue" value={formatPrice(dashboard.revenue)} hint="Paid, shipped and delivered orders" />
        <StatCard label="Orders" value={String(dashboard.orderCount)} hint={`${dashboard.pendingOrders} pending`} />
        <StatCard label="Products" value={String(dashboard.productCount)} hint={`${dashboard.draftCount} drafts`} />
        <StatCard label="Customers" value={String(dashboard.customerCount)} hint={`${dashboard.pendingReviews} reviews to moderate`} />
      </div>
      <div className={styles.panels}>
        <section aria-labelledby="recent-orders">
          <h2 id="recent-orders" className={styles.panels__title}>
            Recent orders
          </h2>
          <DataTable
            caption="Recent orders"
            emptyTitle="No orders yet"
            rows={dashboard.recentOrders}
            getRowKey={(order) => order.id}
            columns={[
              { key: "number", header: "Order", render: (order) => <Link href={`/admin/orders/${order.id}`}>{order.number}</Link> },
              {
                key: "status",
                header: "Status",
                render: (order) => <Badge tone={getStatusTone(order.status)}>{ORDER_STATUSES[order.status]}</Badge>,
              },
              { key: "total", header: "Total", align: "right", render: (order) => formatPrice(order.total) },
            ]}
          />
        </section>
        <section aria-labelledby="low-stock">
          <h2 id="low-stock" className={styles.panels__title}>
            Low stock
          </h2>
          <DataTable
            caption="Low stock"
            emptyTitle="Everything is well stocked"
            rows={dashboard.lowStock}
            getRowKey={(product) => product.id}
            columns={[
              { key: "name", header: "Product", render: (product) => <Link href={`/admin/products/${product.id}`}>{product.name}</Link> },
              { key: "stock", header: "Stock", align: "right", render: (product) => <Badge tone="danger">{String(product.stock)}</Badge> },
            ]}
          />
        </section>
      </div>
    </>
  );
};
