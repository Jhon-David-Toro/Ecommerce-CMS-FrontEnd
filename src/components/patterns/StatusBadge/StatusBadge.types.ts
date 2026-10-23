import type { BadgeTone } from "@/components/ui/Badge/Badge.types";

export interface StatusBadgeProps {
  active: boolean;
  activeLabel: string;
  inactiveLabel: string;
  inactiveTone?: BadgeTone;
}
