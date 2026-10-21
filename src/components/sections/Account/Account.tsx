"use client";

import { Spinner } from "@/components/ui/Spinner";
import { Tabs } from "@/components/ui/Tabs";

import { ACCOUNT_TABS, TAB_ORDERS } from "./Account.constants";
import { useAccount } from "./hooks/useAccount";
import { AccountHeader } from "./parts/AccountHeader";
import { AccountProfile } from "./parts/AccountProfile";
import { AccountTabContent } from "./parts/AccountTabContent";
import styles from "./Account.module.scss";

/**
 * Account: profile of the signed-in customer with their orders and account settings. Meant to be shown inside an auth gate.
 *
 * @returns The account page content.
 */
export const Account = () => {
  const { user, orders, tab, setTab, handleSignOut } = useAccount();

  if (!user) return <Spinner label="Loading your account" />;

  return (
    <section className={styles.account}>
      <AccountHeader />
      <AccountProfile user={user} onSignOut={handleSignOut} />
      <Tabs tabs={ACCOUNT_TABS} initialTab={TAB_ORDERS} onTabChange={setTab} />
      <AccountTabContent tab={tab} orders={orders} user={user} />
    </section>
  );
};
