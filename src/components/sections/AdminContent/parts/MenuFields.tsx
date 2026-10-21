import { TextArea } from "@/components/ui/TextArea";

import type { ContentFieldsProps } from "../AdminContent.types";
import styles from "../AdminContent.module.scss";

/**
 * Content/Menus: links of the top bar and of the mobile menu.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @returns The group of fields.
 */
export const MenuFields = ({ field, errors }: ContentFieldsProps) => (
  <fieldset className={styles.group}>
    <legend className={styles.group__legend}>Menus</legend>
    <TextArea label="Top bar links" hint="One per line as Label | address." error={errors.navbar} {...field("navbar")} />
    <TextArea label="Mobile menu links" hint="One per line as Label | address." error={errors.sidebar} {...field("sidebar")} />
  </fieldset>
);
