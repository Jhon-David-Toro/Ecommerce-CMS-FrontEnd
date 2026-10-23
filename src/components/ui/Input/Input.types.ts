import type { ComponentType, InputHTMLAttributes } from "react";

export type InputIcon = ComponentType<{ className?: string }>;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  icon?: InputIcon;
  revealable?: boolean;
}

export interface InputControlProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: InputIcon;
  revealable?: boolean;
  invalid: boolean;
}

export interface RevealToggleProps {
  isRevealed: boolean;
  onToggle: () => void;
}
