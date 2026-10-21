import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";

import type { GateFallbackProps } from "../AuthGate.types";

/**
 * AuthGate/Fallback: spinner while the session is checked, or an access denied message for the wrong role.
 *
 * @param props Component props.
 * @param props.status Why the content is not shown.
 * @returns The spinner or the message.
 */
export const GateFallback = ({ status }: GateFallbackProps) =>
  status === "checking" ? (
    <Spinner label="Checking your session" />
  ) : (
    <EmptyState
      title="Access denied"
      description="Your account does not have permission to see this page."
      action={<Button type="primary" size="medium" text="Go home" href="/" typeAttribute="button" />}
    />
  );
