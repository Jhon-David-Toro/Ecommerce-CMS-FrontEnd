import type { StoreSettings } from "./settings.types";

export const SETTINGS_STORAGE_KEY = "settings";

export const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "SHOP.CO",
  contactEmail: "support@shop.test",
  contactPhone: "+1 555 0100",
  currency: "USD",
  shippingFee: 15,
  freeShippingOver: 200,
  lowStockThreshold: 10,
  promoCodes: [{ code: "SHOP20", percent: 20 }],
};
