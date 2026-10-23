import { OrderDetails } from "@/components/patterns/OrderDetails";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

import { ORDER_TRAIL_ROOT } from "../AdminOrder.constants";
import type { OrderContentProps } from "../AdminOrder.types";
import { NextStepCard } from "./NextStepCard";
import { OrderProgress } from "./OrderProgress";

/**
 * AdminOrder/Content: breadcrumb, progress line, details of the order and the dark card with the next step.
 *
 * @param props Component props.
 * @param props.order Order to show.
 * @param props.onStatusChange Called with the order id and the new status.
 * @returns The content.
 */
export const OrderContent = ({ order, onStatusChange }: OrderContentProps) => (
  <section>
    <Breadcrumb items={[ORDER_TRAIL_ROOT, { label: order.number }]} />
    <OrderProgress status={order.status} />
    <OrderDetails order={order}>
      <NextStepCard order={order} onStatusChange={onStatusChange} />
    </OrderDetails>
  </section>
);
