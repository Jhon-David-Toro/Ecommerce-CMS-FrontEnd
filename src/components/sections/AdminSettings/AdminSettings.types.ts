import type { StoreSettings } from "@/lib/settings/settings.types";

export interface SettingsFormValues {
  storeName: string;
  contactEmail: string;
  contactPhone: string;
  currency: string;
  shippingFee: string;
  freeShippingOver: string;
  lowStockThreshold: string;
  promoCodes: string;
}

export interface SettingsFormBodyProps {
  settings: StoreSettings;
}
