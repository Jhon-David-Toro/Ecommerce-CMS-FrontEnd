import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";

import type { FieldGroupProps } from "../AdminProductForm.types";
import styles from "../AdminProductForm.module.scss";

/**
 * ProductForm/Description: overview, features, origin, company, care instructions and FAQs.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @returns The group of fields.
 */
export const DescriptionFields = ({ field }: FieldGroupProps) => (
  <fieldset className={styles.group}>
    <legend className={styles.group__legend}>Description</legend>
    <TextArea label="Overview" {...field("overview")} />
    <TextArea label="Key features" hint="One per line." {...field("features")} />
    <Input label="Origin" {...field("origin")} />
    <div className={styles.group__row}>
      <Input label="Company name" {...field("companyName")} />
      <Input label="Company description" {...field("companyDescription")} />
    </div>
    <TextArea label="Care instructions" {...field("careInstructions")} />
    <TextArea label="Frequently asked questions" hint="One per line as Question | Answer." {...field("faqs")} />
  </fieldset>
);
