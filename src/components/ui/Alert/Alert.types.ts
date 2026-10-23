import type { ReactNode } from "react";

export type AlertTone = "error" | "success" | "info";

export interface AlertProps {
  tone?: AlertTone;
  children: ReactNode;
}
