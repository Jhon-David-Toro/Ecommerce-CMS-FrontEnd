import type { ReactNode } from "react";

import type { CartTotals } from "@/lib/cart/cart.types";

export interface OrderSummaryProps {
  totals: CartTotals;
  discountPercent: number;
  children?: ReactNode;
}
