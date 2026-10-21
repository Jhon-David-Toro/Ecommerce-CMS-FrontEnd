import type { FC } from "react";

import { Badge } from "@/components/ui/Badge";

import type { StatusBadgeProps } from "./StatusBadge.types";

/**
 * StatusBadge: green badge when something is on, and a muted or colored one when it is off.
 *
 * @param props Component props.
 * @param props.active Whether the thing is on.
 * @param props.activeLabel Text when on.
 * @param props.inactiveLabel Text when off.
 * @param props.inactiveTone Color when off; neutral by default.
 * @returns The badge.
 */
export const StatusBadge: FC<StatusBadgeProps> = ({ active, activeLabel, inactiveLabel, inactiveTone = "neutral" }) => (
  <Badge tone={active ? "success" : inactiveTone}>{active ? activeLabel : inactiveLabel}</Badge>
);
