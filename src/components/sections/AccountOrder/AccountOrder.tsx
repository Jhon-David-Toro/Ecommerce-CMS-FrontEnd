"use client";

import { useParams } from "next/navigation";

import { RecordGate } from "@/components/patterns/RecordGate";
import { useAuth } from "@/lib/auth/useAuth";
import { getOrder } from "@/lib/orders/orders.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NOT_FOUND } from "./AccountOrder.constants";
import { getOwnOrder } from "./AccountOrder.utils";
import { OrderContent } from "./parts/OrderContent";

/**
 * AccountOrder: details of one order of the signed-in customer; orders of other customers are treated as missing.
 *
 * @returns The order page content.
 */
export const AccountOrder = () => {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: order, isLoading } = useQuery(getOrder, Number(params.id));

  return (
    <RecordGate record={getOwnOrder(order, user)} isLoading={isLoading || !user} loadingLabel="Loading your order" notFound={NOT_FOUND}>
      {(found) => <OrderContent order={found} />}
    </RecordGate>
  );
};
