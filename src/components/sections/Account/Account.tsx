"use client";

import { Spinner } from "@/components/ui/Spinner";

import { useAccount } from "./hooks/useAccount";
import { AccountHeader } from "./parts/AccountHeader";
import { AccountOrders } from "./parts/AccountOrders";
import { AccountProfile } from "./parts/AccountProfile";
import styles from "./Account.module.scss";

/**
 * Account: profile of the signed-in customer with their order history. Meant to be shown inside an auth gate.
 *
 * @returns The account page content.
 */
export const Account = () => {
  const { user, orders, handleSignOut } = useAccount();

  if (!user) return <Spinner label="Loading your account" />;

  return (
    <section className={styles.account}>
      <AccountHeader />
      <AccountProfile user={user} onSignOut={handleSignOut} />
      <AccountOrders orders={orders} />
    </section>
  );
};
