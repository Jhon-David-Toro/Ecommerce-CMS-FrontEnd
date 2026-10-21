import type { AlertOption, AlertPreferences } from "./AdminAccount.types";

export const ALERTS_KEY = "adminAlerts";

export const ALERT_OPTIONS: AlertOption[] = [
  { key: "newOrder", label: "New order placed" },
  { key: "lowStock", label: "Product running low on stock" },
  { key: "newReview", label: "Review waiting for moderation" },
];

export const DEFAULT_ALERTS: AlertPreferences = { newOrder: true, lowStock: true, newReview: false };
