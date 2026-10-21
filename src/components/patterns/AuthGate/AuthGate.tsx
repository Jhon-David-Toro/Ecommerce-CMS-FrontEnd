"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/lib/auth/useAuth";

import type { AuthGateProps } from "./AuthGate.types";
import { buildLoginHref } from "./AuthGate.utils";

/**
 * AuthGate: shows its content only to signed-in users (optionally of one role) and sends everyone else to sign in.
 *
 * @param props Component props.
 * @param props.role Role required to see the content; any signed-in user when omitted.
 * @param props.children Protected content.
 * @returns The protected content, a spinner while checking, or an access denied message.
 */
export const AuthGate = ({ role, children }: AuthGateProps) => {
  const { user, isReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isReady && !user) router.replace(buildLoginHref(pathname));
  }, [isReady, user, router, pathname]);

  if (!isReady || !user) return <Spinner label="Checking your session" />;

  if (role && user.role !== role) {
    return (
      <EmptyState
        title="Access denied"
        description="Your account does not have permission to see this page."
        action={<Button type="primary" size="medium" text="Go home" href="/" typeAttribute="button" />}
      />
    );
  }

  return <>{children}</>;
};
