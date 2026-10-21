import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";

import type { TaxonomyFieldsProps } from "../TaxonomyForm.types";

/**
 * TaxonomyForm/Fields: the inputs of the taxonomy form.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @param props.visible Whether the record shows in the store.
 * @param props.onVisibleChange Called when the visibility checkbox changes.
 * @param props.imageLabel Label of the picture field.
 * @param props.withDescription Adds a description field.
 * @returns The fields.
 */
export const TaxonomyFields = ({ field, errors, visible, onVisibleChange, imageLabel, withDescription }: TaxonomyFieldsProps) => (
  <>
    <Input label="Name" error={errors.name} {...field("name")} />
    <Input label="Slug" hint="Leave empty to build it from the name." {...field("slug")} />
    <Input label={imageLabel} type="url" {...field("picture")} />
    {withDescription && <TextArea label="Description" {...field("description")} />}
    <Checkbox label="Visible in the store" checked={visible} onChange={(event) => onVisibleChange(event.target.checked)} />
  </>
);
