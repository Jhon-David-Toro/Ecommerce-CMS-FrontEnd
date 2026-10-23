"use client";

import type { AuthGateProps } from "./AuthGate.types";
import { useGateStatus } from "./hooks/useGateStatus";
import { GateFallback } from "./parts/GateFallback";

/**
 * AuthGate: shows its content only to signed-in users (optionally of one role) and sends everyone else to sign in.
 *
 * @param props Component props.
 * @param props.role Role required to see the content; any signed-in user when omitted.
 * @param props.children Protected content.
 * @returns The protected content, a spinner while checking, or an access denied message.
 */
export const AuthGate = ({ role, children }: AuthGateProps) => {
  const status = useGateStatus(role);

  if (status !== "allowed") return <GateFallback status={status} />;

  return <>{children}</>;
};
