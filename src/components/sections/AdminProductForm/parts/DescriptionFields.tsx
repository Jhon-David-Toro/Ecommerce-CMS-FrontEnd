import { FieldGroup, FieldRow } from "@/components/patterns/FieldGroup";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";

import type { FieldGroupProps } from "../AdminProductForm.types";

/**
 * ProductForm/Description: overview, features, origin, company, care instructions and FAQs.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @returns The group of fields.
 */
export const DescriptionFields = ({ field }: FieldGroupProps) => (
  <FieldGroup legend="Description">
    <TextArea label="Overview" {...field("overview")} />
    <TextArea label="Key features" hint="One per line." {...field("features")} />
    <Input label="Origin" {...field("origin")} />
    <FieldRow>
      <Input label="Company name" {...field("companyName")} />
      <Input label="Company description" {...field("companyDescription")} />
    </FieldRow>
    <TextArea label="Care instructions" {...field("careInstructions")} />
    <TextArea label="Frequently asked questions" hint="One per line as Question | Answer." {...field("faqs")} />
  </FieldGroup>
);
