import { useEffect } from "react";

import { getSettings } from "@/lib/settings/settings.api";
import { findPromoPercent } from "@/lib/settings/settings.utils";
import { useQuery } from "@/lib/shared/async/useQuery";

import type { CartTotals } from "./cart.types";
import { calculateTotals, countItems } from "./cart.utils";
import { useCartStore } from "./cartStore";

/**
 * Gives the cart with its totals, restoring the saved cart the first time it is used.
 *
 * @returns The cart lines, promo state, totals, unit count and cart actions.
 */
export const useCart = () => {
  const { items, promoCode, isReady, hydrate, addItem, setQuantity, removeItem, applyPromo, clear } = useCartStore();
  const { data: settings } = useQuery(getSettings, undefined);

  useEffect(() => {
    if (!isReady) hydrate();
  }, [isReady, hydrate]);

  const discountPercent = settings ? findPromoPercent(settings.promoCodes, promoCode) : 0;
  const totals: CartTotals = calculateTotals({
    items,
    shippingFee: settings?.shippingFee ?? 0,
    freeShippingOver: settings?.freeShippingOver ?? Infinity,
    discountPercent,
  });

  return {
    items,
    promoCode,
    discountPercent,
    isReady,
    totals,
    count: countItems(items),
    addItem,
    setQuantity,
    removeItem,
    applyPromo,
    clear,
  };
};
