import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";

import type { PageFieldsProps } from "../AdminPages.types";

/**
 * Pages/Fields: the inputs of the page form.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @param props.published Whether the page is public.
 * @param props.onPublishedChange Called when the checkbox changes.
 * @returns The fields.
 */
export const PageFields = ({ field, errors, published, onPublishedChange }: PageFieldsProps) => (
  <>
    <Input label="Title" error={errors.title} {...field("title")} />
    <Input label="Slug" hint="Leave empty to build it from the title. The page lives at /p/slug." {...field("slug")} />
    <TextArea label="Text" hint="Leave a blank line between paragraphs." error={errors.body} {...field("body")} />
    <Checkbox label="Published" checked={published} onChange={(event) => onPublishedChange(event.target.checked)} />
  </>
);
