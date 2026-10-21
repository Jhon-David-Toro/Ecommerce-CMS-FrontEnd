import { OrderActions } from "@/components/patterns/OrderActions";
import { OrderDetails } from "@/components/patterns/OrderDetails";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

import { ORDER_TRAIL_ROOT } from "../AdminOrder.constants";
import type { OrderContentProps } from "../AdminOrder.types";

/**
 * AdminOrder/Content: breadcrumb, details of the order and the buttons that move it along.
 *
 * @param props Component props.
 * @param props.order Order to show.
 * @param props.onStatusChange Called with the order id and the new status.
 * @returns The content.
 */
export const OrderContent = ({ order, onStatusChange }: OrderContentProps) => (
  <section>
    <Breadcrumb items={[ORDER_TRAIL_ROOT, { label: order.number }]} />
    <OrderDetails order={order}>
      <OrderActions order={order} onChange={onStatusChange} />
    </OrderDetails>
  </section>
);
