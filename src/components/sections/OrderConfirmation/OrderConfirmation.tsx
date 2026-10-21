"use client";

import { useParams } from "next/navigation";

import { OrderDetails } from "@/components/patterns/OrderDetails";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { getOrder } from "@/lib/orders/orders.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import styles from "./OrderConfirmation.module.scss";

/**
 * OrderConfirmation: thank you message and the details of the order that was just placed.
 *
 * @returns The confirmation page content.
 */
export const OrderConfirmation = () => {
  const params = useParams<{ id: string }>();
  const { data: order, isLoading } = useQuery(getOrder, Number(params.id));

  if (isLoading) return <Spinner label="Loading your order" />;

  if (!order) {
    return (
      <EmptyState
        title="Order not found"
        description="We could not find that order."
        action={<Button type="primary" size="medium" text="Continue shopping" href="/products" typeAttribute="button" />}
      />
    );
  }

  return (
    <section className={styles.confirmation}>
      <h1 className={styles.confirmation__title}>THANK YOU FOR YOUR ORDER!</h1>
      <p className={styles.confirmation__text}>We sent the details to {order.email}. We will let you know when your order ships.</p>
      <OrderDetails order={order} />
      <Button type="primary" size="medium" text="Continue shopping" href="/products" typeAttribute="button" />
    </section>
  );
};
