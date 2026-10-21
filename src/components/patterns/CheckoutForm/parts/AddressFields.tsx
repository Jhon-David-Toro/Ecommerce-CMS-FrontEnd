import { FieldGroup, FieldRow } from "@/components/patterns/FieldGroup";
import { Input } from "@/components/ui/Input";

import type { CheckoutFieldsProps } from "../CheckoutForm.types";

/**
 * CheckoutForm/Address: name and delivery address of the order.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @returns The group of fields.
 */
export const AddressFields = ({ field, errors }: CheckoutFieldsProps) => (
  <FieldGroup legend="Delivery address">
    <Input label="Full name" autoComplete="name" error={errors.fullName} {...field("fullName")} />
    <Input label="Street address" autoComplete="street-address" error={errors.street} {...field("street")} />
    <FieldRow>
      <Input label="City" autoComplete="address-level2" error={errors.city} {...field("city")} />
      <Input label="State / Province" autoComplete="address-level1" {...field("state")} />
    </FieldRow>
    <FieldRow>
      <Input label="Postal code" autoComplete="postal-code" error={errors.postalCode} {...field("postalCode")} />
      <Input label="Country" autoComplete="country-name" error={errors.country} {...field("country")} />
    </FieldRow>
  </FieldGroup>
);
