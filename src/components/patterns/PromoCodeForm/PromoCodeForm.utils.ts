import type { PromoStatus } from "./PromoCodeForm.types";

/**
 * Works out whether the code in use is valid.
 *
 * @param appliedCode Code currently applied to the cart.
 * @param discountPercent Discount that the applied code gives; 0 means the code is not valid.
 * @returns "none" without a code, "invalid" when the code gives no discount, otherwise "valid".
 */
export const getPromoStatus = (appliedCode: string, discountPercent: number): PromoStatus => {
  if (!appliedCode) return "none";
  return discountPercent > 0 ? "valid" : "invalid";
};
