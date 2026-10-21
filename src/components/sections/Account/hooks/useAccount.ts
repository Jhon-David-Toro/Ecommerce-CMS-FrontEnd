import { useRouter } from "next/navigation";

import { useAuth } from "@/lib/auth/useAuth";
import { listOrders } from "@/lib/orders/orders.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NO_USER_ID } from "../Account.constants";

/**
 * Loads the signed-in customer with their orders and offers a way to sign out.
 *
 * @returns The user, their orders (null while loading) and the sign out handler.
 */
export const useAccount = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { data: orders } = useQuery(listOrders, { userId: user?.id ?? NO_USER_ID });

  /**
   * Ends the session and goes back to the home page.
   */
  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  return { user, orders, handleSignOut };
};
