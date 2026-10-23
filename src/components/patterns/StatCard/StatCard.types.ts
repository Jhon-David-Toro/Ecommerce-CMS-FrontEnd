import type { ComponentType } from "react";

export interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  icon?: ComponentType<{ className?: string }>;
}
