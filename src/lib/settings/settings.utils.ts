import type { PromoCode } from "./settings.types";

/**
 * Looks up the discount of a promo code.
 *
 * @param promoCodes Valid codes.
 * @param code Code typed by the customer.
 * @returns The discount percentage, or 0 when the code is unknown.
 */
export const findPromoPercent = (promoCodes: PromoCode[], code: string) =>
  promoCodes.find((promo) => promo.code.toLowerCase() === code.trim().toLowerCase())?.percent ?? 0;
