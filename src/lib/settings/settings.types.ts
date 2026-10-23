export interface PromoCode {
  code: string;
  percent: number;
}

export interface StoreSettings {
  storeName: string;
  contactEmail: string;
  contactPhone: string;
  currency: string;
  shippingFee: number;
  freeShippingOver: number;
  lowStockThreshold: number;
  promoCodes: PromoCode[];
}
