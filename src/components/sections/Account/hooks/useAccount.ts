import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/lib/auth/useAuth";
import { listOrders } from "@/lib/orders/orders.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NO_USER_ID, TAB_ORDERS } from "../Account.constants";

/**
 * Loads the signed-in customer with their orders, remembers the open tab and offers a way to sign out.
 *
 * @returns The user, their orders (null while loading) with a way to reload them, the tab with its setter and the sign out handler.
 */
export const useAccount = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { data: orders, reload } = useQuery(listOrders, { userId: user?.id ?? NO_USER_ID });
  const [tab, setTab] = useState(TAB_ORDERS);

  /**
   * Ends the session and goes back to the home page.
   */
  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  return { user, orders, reload, tab, setTab, handleSignOut };
};
