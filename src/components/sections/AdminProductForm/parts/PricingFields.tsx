import { FieldRow } from "@/components/patterns/FieldGroup";
import { Input } from "@/components/ui/Input";

import type { FieldGroupProps } from "../AdminProductForm.types";

/**
 * ProductForm/Pricing: price, offer price and stock.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @returns The row of number fields.
 */
export const PricingFields = ({ field, errors }: FieldGroupProps) => (
  <FieldRow>
    <Input label="Price" type="number" min="0" step="0.01" error={errors.price} {...field("price")} />
    <Input label="Offer price" type="number" min="0" step="0.01" hint="Optional" error={errors.discountPrice} {...field("discountPrice")} />
    <Input label="Stock" type="number" min="0" error={errors.stock} {...field("stock")} />
  </FieldRow>
);
