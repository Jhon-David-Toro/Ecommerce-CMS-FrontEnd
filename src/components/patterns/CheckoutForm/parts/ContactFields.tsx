import { FieldGroup } from "@/components/patterns/FieldGroup";
import { Input } from "@/components/ui/Input";

import type { CheckoutFieldsProps } from "../CheckoutForm.types";

/**
 * CheckoutForm/Contact: email and phone of the shopper.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @returns The group of fields.
 */
export const ContactFields = ({ field, errors }: CheckoutFieldsProps) => (
  <FieldGroup legend="Contact">
    <Input label="Email" type="email" autoComplete="email" error={errors.email} {...field("email")} />
    <Input label="Phone" type="tel" autoComplete="tel" error={errors.phone} {...field("phone")} />
  </FieldGroup>
);
