import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

/**
 * OrderHistory/NoOrders: invitation to shop shown when a customer has no orders.
 *
 * @returns The empty state.
 */
export const NoOrders = () => (
  <EmptyState
    title="No orders yet"
    description="When you place an order it will show up here."
    action={<Button type="primary" size="medium" text="Start shopping" href="/products" typeAttribute="button" />}
  />
);
