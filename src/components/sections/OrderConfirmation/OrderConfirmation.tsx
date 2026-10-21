"use client";

import { useParams } from "next/navigation";

import { RecordGate } from "@/components/patterns/RecordGate";
import { getOrder } from "@/lib/orders/orders.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NOT_FOUND } from "./OrderConfirmation.constants";
import { ConfirmationContent } from "./parts/ConfirmationContent";

/**
 * OrderConfirmation: thank you message and the details of the order that was just placed.
 *
 * @returns The confirmation page content.
 */
export const OrderConfirmation = () => {
  const params = useParams<{ id: string }>();
  const { data: order, isLoading } = useQuery(getOrder, Number(params.id));

  return (
    <RecordGate record={order} isLoading={isLoading} loadingLabel="Loading your order" notFound={NOT_FOUND}>
      {(found) => <ConfirmationContent order={found} />}
    </RecordGate>
  );
};
