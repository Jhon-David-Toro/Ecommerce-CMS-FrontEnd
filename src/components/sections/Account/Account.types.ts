import type { PublicUser } from "@/lib/auth/auth.types";
import type { Order } from "@/lib/orders/order.types";
import type { Errors, FieldProps } from "@/lib/shared/forms/forms.types";

export interface AccountProfileProps {
  user: PublicUser;
  onSignOut: () => void;
}

export interface AccountOrdersProps {
  orders: Order[] | null;
}

export interface AccountTabContentProps {
  tab: string;
  orders: Order[] | null;
  user: PublicUser;
}

export interface AccountSettingsProps {
  user: PublicUser;
}

export interface ProfileValues {
  name: string;
  email: string;
}

export interface PasswordValues {
  current: string;
  next: string;
  confirm: string;
}

export interface AccountFormOptions<V> {
  initial: V;
  validate: (values: V) => Errors;
  submit: (values: V) => Promise<void>;
  success: string;
  resetOnSuccess?: boolean;
}

export interface AccountNoticeProps {
  notice: { message: string; failed: boolean };
}

export interface PasswordFieldsProps {
  field: (name: keyof PasswordValues & string) => FieldProps;
  errors: Errors;
}
