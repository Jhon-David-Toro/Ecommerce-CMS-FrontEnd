import { FieldGroup } from "@/components/patterns/FieldGroup";
import { TextArea } from "@/components/ui/TextArea";

import type { ContentFieldsProps } from "../AdminContent.types";

/**
 * Content/Footer: the sentence under the logo and the link columns.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @returns The group of fields.
 */
export const FooterFields = ({ field, errors }: ContentFieldsProps) => (
  <FieldGroup legend="Footer">
    <TextArea label="Footer tagline" {...field("footerTagline")} />
    <TextArea
      label="Footer columns"
      hint="Start each column with # Title, then one Label | address per line."
      error={errors.footerColumns}
      {...field("footerColumns")}
    />
  </FieldGroup>
);
