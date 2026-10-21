"use client";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

/**
 * Page shown when something fails while rendering.
 *
 * @param props Component props.
 * @param props.reset Tries to render the page again.
 * @returns The error message with a retry button.
 */
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <EmptyState
      title="Something went wrong"
      description="An unexpected error happened. You can try again."
      action={<Button type="primary" size="medium" text="Try again" typeAttribute="button" onClick={reset} />}
    />
  );
}
