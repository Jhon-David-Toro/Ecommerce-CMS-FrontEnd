export type AlertKey = "newOrder" | "lowStock" | "newReview";

export type AlertPreferences = Record<AlertKey, boolean>;

export interface AlertOption {
  key: AlertKey;
  label: string;
}
