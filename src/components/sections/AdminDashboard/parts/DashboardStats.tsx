import { BanknotesIcon, ShoppingBagIcon, TruckIcon, UsersIcon } from "@heroicons/react/24/outline";

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
    <StatCard icon={BanknotesIcon} label="Revenue" value={formatPrice(dashboard.revenue)} hint="Paid, shipped and delivered orders" />
    <StatCard icon={TruckIcon} label="Orders" value={String(dashboard.orderCount)} hint={`${dashboard.pendingOrders} pending`} />
    <StatCard icon={ShoppingBagIcon} label="Products" value={String(dashboard.productCount)} hint={`${dashboard.draftCount} drafts`} />
    <StatCard
      icon={UsersIcon}
      label="Customers"
      value={String(dashboard.customerCount)}
      hint={`${dashboard.pendingReviews} reviews to moderate`}
    />
  </div>
);
