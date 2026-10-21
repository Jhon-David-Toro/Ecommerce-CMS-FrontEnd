import type { ReactNode } from "react";

import type { ActionEmptyStateProps } from "@/components/patterns/ActionEmptyState/ActionEmptyState.types";

export interface EmptyGateProps {
  count: number;
  empty: ActionEmptyStateProps;
  children: ReactNode;
}
