import { useState } from "react";

import { readJson, writeJson } from "@/lib/shared/storage/storage";

import { ALERTS_KEY, DEFAULT_ALERTS } from "../AdminAccount.constants";
import type { AlertKey, AlertPreferences } from "../AdminAccount.types";

/**
 * Keeps the email alerts the admin wants, saved in the browser.
 *
 * @returns The alerts and a function that flips one of them.
 */
export const useAlertPreferences = () => {
  const [alerts, setAlerts] = useState<AlertPreferences>(() => ({ ...DEFAULT_ALERTS, ...readJson(ALERTS_KEY, {}) }));

  /**
   * Turns an alert on or off and saves the choice.
   *
   * @param key Alert to flip.
   */
  const toggle = (key: AlertKey) => {
    const next = { ...alerts, [key]: !alerts[key] };
    setAlerts(next);
    writeJson(ALERTS_KEY, next);
  };

  return { alerts, toggle };
};
