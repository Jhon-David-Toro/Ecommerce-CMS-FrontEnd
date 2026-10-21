import { FieldGroup } from "@/components/patterns/FieldGroup";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";

import type { MediaFieldsProps } from "../AdminProductForm.types";
import { SizeCheckboxes } from "./SizeCheckboxes";

/**
 * ProductForm/Media: pictures, colors and sizes of the product.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @param props.sizes Selected sizes.
 * @param props.onSizesChange Receives the new selection of sizes.
 * @returns The group of fields.
 */
export const MediaFields = ({ field, errors, sizes, onSizesChange }: MediaFieldsProps) => (
  <FieldGroup legend="Pictures, colors and sizes">
    <Input label="Main image address" type="url" error={errors.image} {...field("image")} />
    <TextArea label="Extra images" hint="One address per line." {...field("images")} />
    <TextArea label="Colors" hint="One per line as Name,#hex (for example Navy,#1E3A8A)." error={errors.colors} {...field("colors")} />
    <SizeCheckboxes sizes={sizes} error={errors.sizes} onSizesChange={onSizesChange} />
  </FieldGroup>
);
