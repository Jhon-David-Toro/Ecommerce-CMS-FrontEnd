import { DataTable } from "@/components/patterns/DataTable";

import { LOW_STOCK_COLUMNS, RECENT_ORDER_COLUMNS } from "../AdminDashboard.columns";
import type { DashboardSectionProps } from "../AdminDashboard.types";
import { DashboardPanel } from "./DashboardPanel";
import styles from "../AdminDashboard.module.scss";

/**
 * AdminDashboard/Panels: the table of recent orders next to the table of products that are running out.
 *
 * @param props Component props.
 * @param props.dashboard Numbers and lists of the store.
 * @returns The two panels.
 */
export const DashboardPanels = ({ dashboard }: DashboardSectionProps) => (
  <div className={styles.panels}>
    <DashboardPanel id="recent-orders" title="Recent orders">
      <DataTable
        caption="Recent orders"
        emptyTitle="No orders yet"
        rows={dashboard.recentOrders}
        getRowKey={(order) => order.id}
        columns={RECENT_ORDER_COLUMNS}
      />
    </DashboardPanel>
    <DashboardPanel id="low-stock" title="Low stock">
      <DataTable
        caption="Low stock"
        emptyTitle="Everything is well stocked"
        rows={dashboard.lowStock}
        getRowKey={(product) => product.id}
        columns={LOW_STOCK_COLUMNS}
      />
    </DashboardPanel>
  </div>
);
