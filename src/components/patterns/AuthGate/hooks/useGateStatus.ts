import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import type { Role } from "@/lib/auth/auth.types";
import { useAuth } from "@/lib/auth/useAuth";

import { getGateStatus, redirectToLogin } from "../AuthGate.utils";

/**
 * Checks the session, sends visitors to the sign in page and tells what the gate should show.
 *
 * @param role Role required to see the content; any signed-in user when omitted.
 * @returns "checking" while the session loads or the visitor is redirected, "denied" for the wrong role, otherwise "allowed".
 */
export const useGateStatus = (role?: Role) => {
  const { user, isReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => redirectToLogin({ isReady, user, router, pathname }), [isReady, user, router, pathname]);

  return getGateStatus({ isReady, user, role });
};
