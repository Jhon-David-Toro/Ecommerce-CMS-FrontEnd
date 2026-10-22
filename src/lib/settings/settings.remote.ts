import { isAdminSession } from "@/lib/auth/auth.session";
import { apiRequest } from "@/lib/shared/http/apiClient";
import { nullWhenMissing } from "@/lib/shared/http/remoteRepository";

import { DEFAULT_SETTINGS } from "./settings.constants";
import type { PromoCode, StoreSettings } from "./settings.types";

/**
 * Reads the store settings: administrators get all of them, shoppers the public ones (without promo codes).
 * When the API cannot be reached the defaults are used so the store keeps working.
 *
 * @returns The settings.
 */
export const getSettings = async (): Promise<StoreSettings> => {
  try {
    const data = await apiRequest<Partial<StoreSettings>>(isAdminSession() ? "/api/admin/settings" : "/api/public/settings");
    return { ...DEFAULT_SETTINGS, promoCodes: [], ...data };
  } catch {
    return { ...DEFAULT_SETTINGS, promoCodes: [] };
  }
};

/**
 * Saves the store settings (administrators only).
 *
 * @param settings Settings to store.
 * @returns The settings as the API saved them.
 */
export const saveSettings = (settings: StoreSettings) =>
  apiRequest<StoreSettings>("/api/admin/settings", { method: "PUT", body: settings });

/**
 * Asks the API for the discount of a promo code.
 *
 * @param code Code typed by the customer.
 * @returns The discount percentage, or 0 when the code is empty or unknown.
 */
export const lookupPromoPercent = async (code: string) => {
  if (code.trim() === "") return 0;
  const promo = await apiRequest<PromoCode>(`/api/public/promo-codes/${encodeURIComponent(code.trim())}`).catch(nullWhenMissing);
  return promo?.percent ?? 0;
};
