import { FieldGroup } from "@/components/patterns/FieldGroup";
import { TextArea } from "@/components/ui/TextArea";

import type { SettingsFieldsProps } from "../AdminSettings.types";

/**
 * Settings/Promo: the discount codes shoppers can use at checkout.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @returns The group of fields.
 */
export const PromoFields = ({ field, errors }: SettingsFieldsProps) => (
  <FieldGroup legend="Promo codes">
    <TextArea label="Codes" hint="One per line as CODE | percent." error={errors.promoCodes} {...field("promoCodes")} />
  </FieldGroup>
);
