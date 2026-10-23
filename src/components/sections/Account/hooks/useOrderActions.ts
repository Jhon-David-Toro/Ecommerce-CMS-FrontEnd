import { useRouter } from "next/navigation";

import { useCartStore } from "@/lib/cart/cartStore";
import { getProduct } from "@/lib/catalog/catalog.api";
import type { Order } from "@/lib/orders/order.types";
import { setOrderStatus } from "@/lib/orders/orders.api";

/**
 * Builds the actions of the order cards: cancel a pending order and put a past order back in the cart.
 *
 * @param reload Refreshes the list of orders.
 * @returns The cancel and buy again handlers.
 */
export const useOrderActions = (reload: () => void) => {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  /**
   * Cancels an order and refreshes the list.
   *
   * @param order Order to cancel.
   */
  const cancel = async (order: Order) => {
    await setOrderStatus(order.id, "cancelled");
    reload();
  };

  /**
   * Adds every product of an order that is still in stock to the cart and opens the cart.
   *
   * @param order Order to buy again.
   */
  const buyAgain = async (order: Order) => {
    for (const item of order.items) {
      const product = await getProduct(item.productId);
      if (product && product.stock > 0) addItem({ ...item, stock: product.stock });
    }
    router.push("/cart");
  };

  return { cancel, buyAgain };
};
