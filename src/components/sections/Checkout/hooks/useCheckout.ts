import { useRouter } from "next/navigation";
import { useState } from "react";

import type { CheckoutSubmission } from "@/components/patterns/CheckoutForm";
import { useAuth } from "@/lib/auth/useAuth";
import { useCart } from "@/lib/cart/useCart";
import { createOrder } from "@/lib/orders/orders.api";

import { ORDER_ERROR } from "../Checkout.constants";
import { buildOrderInput } from "../Checkout.utils";

/**
 * Gathers the user and the cart, and places the order when the checkout form is submitted.
 *
 * @returns The user, the cart, the order error, the submitting flag, the ready flag and the submit handler.
 */
export const useCheckout = () => {
  const router = useRouter();
  const { user, isReady: isAuthReady } = useAuth();
  const cart = useCart();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Places the order, empties the cart and opens the confirmation.
   *
   * @param values Checkout form values.
   */
  const handleSubmit = async (values: CheckoutSubmission) => {
    setIsSubmitting(true);
    setError("");
    try {
      const order = await createOrder(buildOrderInput({ values, items: cart.items, totals: cart.totals, userId: user?.id ?? null }));
      cart.clear();
      router.push(`/checkout/success/${order.id}`);
    } catch {
      setError(ORDER_ERROR);
      setIsSubmitting(false);
    }
  };

  return { user, cart, error, isSubmitting, isReady: cart.isReady && isAuthReady, handleSubmit };
};
