import type { ReactNode } from "react";

import type { CartTotals } from "@/lib/cart/cart.types";

export interface OrderSummaryProps {
  totals: CartTotals;
  discountPercent: number;
  children?: ReactNode;
}

export interface SummaryRowsProps {
  totals: CartTotals;
  discountPercent: number;
}

export type SummaryRowTone = "normal" | "discount" | "total";

export interface SummaryRowProps {
  label: string;
  value: string;
  tone?: SummaryRowTone;
}
