"use client";

import { useParams } from "next/navigation";

import { OrderDetails } from "@/components/patterns/OrderDetails";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/lib/auth/useAuth";
import { getOrder } from "@/lib/orders/orders.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import styles from "./AccountOrder.module.scss";

/**
 * AccountOrder: details of one order of the signed-in customer; orders of other customers are treated as missing.
 *
 * @returns The order page content.
 */
export const AccountOrder = () => {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: order, isLoading } = useQuery(getOrder, Number(params.id));

  if (isLoading || !user) return <Spinner label="Loading your order" />;

  if (!order || order.userId !== user.id) {
    return (
      <EmptyState
        title="Order not found"
        description="We could not find that order in your account."
        action={<Button type="primary" size="medium" text="Back to my account" href="/account" typeAttribute="button" />}
      />
    );
  }

  return (
    <section className={styles.order}>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My account", href: "/account" }, { label: order.number }]} />
      <OrderDetails order={order} />
    </section>
  );
};
