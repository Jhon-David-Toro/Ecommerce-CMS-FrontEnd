import { FieldGroup, FieldRow } from "@/components/patterns/FieldGroup";
import { Input } from "@/components/ui/Input";

import type { SettingsFieldsProps } from "../AdminSettings.types";

/**
 * Settings/Store: name, contact details and currency of the store.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @returns The group of fields.
 */
export const StoreFields = ({ field, errors }: SettingsFieldsProps) => (
  <FieldGroup legend="Store">
    <Input label="Store name" error={errors.storeName} {...field("storeName")} />
    <FieldRow>
      <Input label="Contact email" type="email" error={errors.contactEmail} {...field("contactEmail")} />
      <Input label="Contact phone" {...field("contactPhone")} />
      <Input label="Currency" error={errors.currency} {...field("currency")} />
    </FieldRow>
  </FieldGroup>
);
