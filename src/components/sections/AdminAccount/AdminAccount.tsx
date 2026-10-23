"use client";

import { PageHeader } from "@/components/patterns/PageHeader";
import { AccountSettings } from "@/components/sections/Account";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/lib/auth/useAuth";

import { AlertPreferences } from "./parts/AlertPreferences";

/**
 * AdminAccount: the administrator changes their own details and password and the alerts they receive.
 *
 * @returns The account page content.
 */
export const AdminAccount = () => {
  const { user } = useAuth();

  if (!user) return <Spinner label="Loading account" />;

  return (
    <>
      <PageHeader title="Account settings" description="Manage your profile and sign-in details." />
      <AccountSettings user={user} />
      <AlertPreferences />
    </>
  );
};
