"use client";

import { useParams } from "next/navigation";

import { RecordGate } from "@/components/patterns/RecordGate";
import { getOrder, setOrderStatus } from "@/lib/orders/orders.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NOT_FOUND } from "./AdminOrder.constants";
import { toOrderStatus } from "./AdminOrder.utils";
import { OrderContent } from "./parts/OrderContent";

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
   * @param id Order id.
   * @param value Status value picked.
   */
  const handleStatusChange = async (id: number, value: string) => {
    await setOrderStatus(id, toOrderStatus(value));
    reload();
  };

  return (
    <RecordGate record={order} isLoading={isLoading} loadingLabel="Loading order" notFound={NOT_FOUND}>
      {(found) => <OrderContent order={found} onStatusChange={handleStatusChange} />}
    </RecordGate>
  );
};
