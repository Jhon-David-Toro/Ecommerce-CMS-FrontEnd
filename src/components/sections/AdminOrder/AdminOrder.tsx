"use client";

import { useParams } from "next/navigation";

import { OrderDetails } from "@/components/patterns/OrderDetails";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SelectInput } from "@/components/ui/SelectInput";
import { Spinner } from "@/components/ui/Spinner";
import { getOrder, setOrderStatus } from "@/lib/orders/orders.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import { STATUS_OPTIONS } from "./AdminOrder.constants";
import { toOrderStatus } from "./AdminOrder.utils";

/**
 * AdminOrder: details of one order with a control to move it to another status.
 *
 * @returns The order page content.
 */
export const AdminOrder = () => {
  const params = useParams<{ id: string }>();
  const { data: order, isLoading, reload } = useQuery(getOrder, Number(params.id));

  /**
   * Saves the status picked in the select and refreshes the order.
   *
   * @param value Status value picked.
   */
  const handleStatusChange = async (value: string) => {
    if (order) await setOrderStatus(order.id, toOrderStatus(value));
    reload();
  };

  if (isLoading) return <Spinner label="Loading order" />;

  if (!order) {
    return (
      <EmptyState
        title="Order not found"
        description="That order does not exist."
        action={<Button type="primary" size="medium" text="Back to orders" href="/admin/orders" typeAttribute="button" />}
      />
    );
  }

  return (
    <section>
      <Breadcrumb items={[{ label: "Orders", href: "/admin/orders" }, { label: order.number }]} />
      <OrderDetails order={order}>
        <SelectInput
          label="Order status"
          options={STATUS_OPTIONS}
          value={order.status}
          onChange={(event) => handleStatusChange(event.target.value)}
        />
      </OrderDetails>
    </section>
  );
};
