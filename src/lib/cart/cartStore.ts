import { create } from "zustand";

import { readJson, writeJson } from "@/lib/shared/storage/storage";

import { CART_STORAGE_KEY } from "./cart.constants";
import type { CartState, CartValues } from "./cart.types";
import { addToItems, removeFromItems, setItemQuantity } from "./cart.utils";

const EMPTY_CART: Pick<CartValues, "items" | "promoCode"> = { items: [], promoCode: "" };

/**
 * Saves the cart so it survives page reloads.
 *
 * @param state Cart values to persist.
 */
const persist = ({ items, promoCode }: Pick<CartValues, "items" | "promoCode">) => writeJson(CART_STORAGE_KEY, { items, promoCode });

/**
 * Store with the shopping cart. Call `hydrate` once on the client to restore the saved cart.
 */
export const useCartStore = create<CartState>((set, get) => {
  /**
   * Applies a change to the cart and persists it.
   *
   * @param change Partial cart values to set.
   */
  const update = (change: Partial<Pick<CartValues, "items" | "promoCode">>) => {
    set(change);
    persist({ items: get().items, promoCode: get().promoCode });
  };

  return {
    ...EMPTY_CART,
    isReady: false,
    hydrate: () => set({ ...readJson(CART_STORAGE_KEY, EMPTY_CART), isReady: true }),
    addItem: (item) => update({ items: addToItems(get().items, item) }),
    setQuantity: (key, quantity) => update({ items: setItemQuantity(get().items, key, quantity) }),
    removeItem: (key) => update({ items: removeFromItems(get().items, key) }),
    applyPromo: (promoCode) => update({ promoCode }),
    clear: () => update(EMPTY_CART),
  };
});
