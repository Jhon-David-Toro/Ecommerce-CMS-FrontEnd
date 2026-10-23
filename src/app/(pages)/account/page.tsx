import { AuthGate } from "@/components/patterns/AuthGate";
import { Account } from "@/components/sections/Account";

/**
 * Account page, only for signed-in users.
 *
 * @returns The customer account.
 */
const AccountPage = () => (
  <AuthGate>
    <Account />
  </AuthGate>
);

export default AccountPage;

export const metadata = { title: "My account" };
