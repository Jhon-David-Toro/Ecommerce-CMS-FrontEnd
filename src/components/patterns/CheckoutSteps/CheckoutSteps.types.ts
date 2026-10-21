export type StepState = "done" | "active" | "todo";

export interface CheckoutStepsProps {
  current: number;
}

export interface StepItemProps {
  number: number;
  label: string;
  current: number;
  isLast: boolean;
}
