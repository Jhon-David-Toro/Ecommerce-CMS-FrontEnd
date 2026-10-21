import { OrderDetails } from "@/components/patterns/OrderDetails";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SelectInput } from "@/components/ui/SelectInput";

import { STATUS_OPTIONS } from "../AdminOrder.constants";
import type { OrderContentProps } from "../AdminOrder.types";

/**
 * AdminOrder/Content: breadcrumb, details of the order and the control that changes its status.
 *
 * @param props Component props.
 * @param props.order Order to show.
 * @param props.onStatusChange Called with the order id and the new status.
 * @returns The content.
 */
export const OrderContent = ({ order, onStatusChange }: OrderContentProps) => (
  <section>
    <Breadcrumb items={[{ label: "Orders", href: "/admin/orders" }, { label: order.number }]} />
    <OrderDetails order={order}>
      <SelectInput
        label="Order status"
        options={STATUS_OPTIONS}
        value={order.status}
        onChange={(event) => onStatusChange(order.id, event.target.value)}
      />
    </OrderDetails>
  </section>
);
