import type { ButtonHTMLAttributes, ComponentType } from "react";

export type ActionTone = "neutral" | "success" | "danger";

export interface ActionButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  label: string;
  icon?: ComponentType<{ className?: string }>;
  tone?: ActionTone;
}
