import { readJson, writeJson } from "@/lib/shared/storage/storage";

import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from "./settings.constants";
import type { StoreSettings } from "./settings.types";

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
