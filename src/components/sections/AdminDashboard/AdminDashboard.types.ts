import type { ReactNode } from "react";

import type { DashboardData } from "@/lib/admin/dashboard.types";

export interface DashboardSectionProps {
  dashboard: DashboardData;
}

export interface DashboardPanelProps {
  id: string;
  title: string;
  children: ReactNode;
}

export interface DashboardRangeProps {
  value: string;
  onChange: (value: string) => void;
}
