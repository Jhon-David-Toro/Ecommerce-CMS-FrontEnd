import { FieldGroup } from "@/components/patterns/FieldGroup";
import { Input } from "@/components/ui/Input";
import { SelectInput } from "@/components/ui/SelectInput";

import { STATUS_OPTIONS } from "../AdminProductForm.constants";
import type { FieldGroupProps } from "../AdminProductForm.types";
import { ClassificationFields } from "./ClassificationFields";
import { PricingFields } from "./PricingFields";

/**
 * ProductForm/Basics: name, classification, price, stock and publication status.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @returns The group of fields.
 */
export const BasicsFields = ({ field, errors }: FieldGroupProps) => (
  <FieldGroup legend="Basics">
    <Input label="Name" error={errors.name} {...field("name")} />
    <Input label="Slug" hint="Leave empty to build it from the name." {...field("slug")} />
    <ClassificationFields field={field} errors={errors} />
    <PricingFields field={field} errors={errors} />
    <SelectInput label="Status" options={STATUS_OPTIONS} {...field("status")} />
  </FieldGroup>
);
