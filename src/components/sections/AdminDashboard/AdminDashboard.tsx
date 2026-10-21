"use client";

import { PageHeader } from "@/components/patterns/PageHeader";
import { Spinner } from "@/components/ui/Spinner";

import { useDashboard } from "./hooks/useDashboard";
import { DashboardPanels } from "./parts/DashboardPanels";
import { DashboardStats } from "./parts/DashboardStats";

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
      <DashboardStats dashboard={dashboard} />
      <DashboardPanels dashboard={dashboard} />
    </>
  );
};
