import { StatCard } from "@/components/patterns/StatCard";
import { formatPrice } from "@/lib/shared/format/format";

import type { DashboardSectionProps } from "../AdminDashboard.types";
import styles from "../AdminDashboard.module.scss";

/**
 * AdminDashboard/Stats: revenue and the counters of orders, products and customers.
 *
 * @param props Component props.
 * @param props.dashboard Numbers of the store.
 * @returns The row of stat cards.
 */
export const DashboardStats = ({ dashboard }: DashboardSectionProps) => (
  <div className={styles.stats}>
    <StatCard label="Revenue" value={formatPrice(dashboard.revenue)} hint="Paid, shipped and delivered orders" />
    <StatCard label="Orders" value={String(dashboard.orderCount)} hint={`${dashboard.pendingOrders} pending`} />
    <StatCard label="Products" value={String(dashboard.productCount)} hint={`${dashboard.draftCount} drafts`} />
    <StatCard label="Customers" value={String(dashboard.customerCount)} hint={`${dashboard.pendingReviews} reviews to moderate`} />
  </div>
);
