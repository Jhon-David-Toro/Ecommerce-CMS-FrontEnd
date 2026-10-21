import { FieldGroup, FieldRow } from "@/components/patterns/FieldGroup";
import { Input } from "@/components/ui/Input";

import type { SettingsFieldsProps } from "../AdminSettings.types";

/**
 * Settings/Shipping: shipping fee, free shipping threshold and low stock alert.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @returns The group of fields.
 */
export const ShippingFields = ({ field, errors }: SettingsFieldsProps) => (
  <FieldGroup legend="Shipping and stock">
    <FieldRow>
      <Input label="Shipping fee" type="number" error={errors.shippingFee} {...field("shippingFee")} />
      <Input label="Free shipping over" type="number" error={errors.freeShippingOver} {...field("freeShippingOver")} />
      <Input label="Low stock alert at" type="number" error={errors.lowStockThreshold} {...field("lowStockThreshold")} />
    </FieldRow>
  </FieldGroup>
);
