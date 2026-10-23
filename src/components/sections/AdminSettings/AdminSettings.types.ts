import type { StoreSettings } from "@/lib/settings/settings.types";
import type { Errors, FieldProps } from "@/lib/shared/forms/forms.types";

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

export interface SettingsHeaderProps {
  isSaved: boolean;
}

export interface SettingsFieldsProps {
  field: (name: keyof SettingsFormValues & string) => FieldProps;
  errors: Errors;
}
