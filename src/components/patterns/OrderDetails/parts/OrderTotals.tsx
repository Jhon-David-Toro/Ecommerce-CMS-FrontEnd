import { OrderSummary } from "@/components/patterns/OrderSummary";
import { getDiscountPercent } from "@/lib/orders/order.utils";

import type { OrderTotalsProps } from "../OrderDetails.types";

/**
 * OrderDetails/Totals: the summary card with the amounts of an order and room for admin controls.
 *
 * @param props Component props.
 * @param props.order Order to show.
 * @param props.children Controls shown under the totals.
 * @returns The summary.
 */
export const OrderTotals = ({ order, children }: OrderTotalsProps) => (
  <OrderSummary
    totals={{ subtotal: order.subtotal, discount: order.discount, shipping: order.shipping, total: order.total }}
    discountPercent={getDiscountPercent(order.subtotal, order.discount)}
  >
    {children}
  </OrderSummary>
);
