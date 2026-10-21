import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

/**
 * Page shown when no route matches the address.
 *
 * @returns The not found message.
 */
export default function NotFound() {
  return (
    <EmptyState
      title="Page not found"
      description="The page you are looking for does not exist or was moved."
      action={<Button type="primary" size="medium" text="Back to the store" href="/" typeAttribute="button" />}
    />
  );
}
