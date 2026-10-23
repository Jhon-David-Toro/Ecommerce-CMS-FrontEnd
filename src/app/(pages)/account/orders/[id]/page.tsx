import { AuthGate } from "@/components/patterns/AuthGate";
import { AccountOrder } from "@/components/sections/AccountOrder";

/**
 * Order page of the account, only for signed-in users.
 *
 * @returns The details of one order.
 */
const AccountOrderPage = () => (
  <AuthGate>
    <AccountOrder />
  </AuthGate>
);

export default AccountOrderPage;
