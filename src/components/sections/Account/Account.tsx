"use client";

import { useRouter } from "next/navigation";

import { OrderHistory } from "@/components/patterns/OrderHistory";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/lib/auth/useAuth";
import { listOrders } from "@/lib/orders/orders.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import styles from "./Account.module.scss";

/**
 * Account: profile of the signed-in customer with their order history. Meant to be shown inside an auth gate.
 *
 * @returns The account page content.
 */
export const Account = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { data: orders } = useQuery(listOrders, { userId: user?.id ?? -1 });

  /**
   * Ends the session and goes back to the home page.
   */
  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  if (!user) return <Spinner label="Loading your account" />;

  return (
    <section className={styles.account}>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My account" }]} />
      <h1 className={styles.account__title}>MY ACCOUNT</h1>
      <div className={styles.account__profile}>
        <div>
          <p className={styles.account__name}>{user.name}</p>
          <p className={styles.account__email}>{user.email}</p>
        </div>
        <Badge tone="info">{user.role === "admin" ? "Administrator" : "Customer"}</Badge>
        <Button type="secondary" size="small" text="Sign out" typeAttribute="button" onClick={handleSignOut} />
      </div>
      <h2 className={styles.account__subtitle}>Order history</h2>
      {orders ? <OrderHistory orders={orders} /> : <Spinner label="Loading your orders" />}
    </section>
  );
};
