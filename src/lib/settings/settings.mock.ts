import { readJson, writeJson } from "@/lib/shared/storage/storage";

import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from "./settings.constants";
import type { StoreSettings } from "./settings.types";
import { findPromoPercent } from "./settings.utils";

/**
 * Reads the store settings.
 *
 * @returns The saved settings merged over the defaults.
 */
export const getSettings = async (): Promise<StoreSettings> => ({
  ...DEFAULT_SETTINGS,
  ...readJson<Partial<StoreSettings>>(SETTINGS_STORAGE_KEY, {}),
});

/**
 * Saves the store settings.
 *
 * @param settings Settings to store.
 * @returns The saved settings.
 */
export const saveSettings = async (settings: StoreSettings) => {
  writeJson(SETTINGS_STORAGE_KEY, settings);
  return settings;
};

/**
 * Looks up the discount of a promo code among the saved ones.
 *
 * @param code Code typed by the customer.
 * @returns The discount percentage, or 0 when the code is unknown.
 */
export const lookupPromoPercent = async (code: string) => findPromoPercent((await getSettings()).promoCodes, code);
