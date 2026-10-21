"use client";

import { PageHeader } from "@/components/patterns/PageHeader";
import { Spinner } from "@/components/ui/Spinner";

import { useDashboard } from "./hooks/useDashboard";
import { DashboardPanels } from "./parts/DashboardPanels";
import { DashboardRange } from "./parts/DashboardRange";
import { DashboardStats } from "./parts/DashboardStats";

/**
 * AdminDashboard: revenue and orders for a time range, counters, latest orders and products that need restocking.
 *
 * @returns The dashboard page content.
 */
export const AdminDashboard = () => {
  const { dashboard, range, setRange } = useDashboard();

  if (!dashboard) return <Spinner label="Loading dashboard" />;

  return (
    <>
      <PageHeader title="Dashboard" description="How the store is doing." actions={<DashboardRange value={range} onChange={setRange} />} />
      <DashboardStats dashboard={dashboard} />
      <DashboardPanels dashboard={dashboard} />
    </>
  );
};
