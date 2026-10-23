import { FieldRow } from "@/components/patterns/FieldGroup";
import { Input } from "@/components/ui/Input";

import type { ContentFieldsProps } from "../AdminContent.types";

/**
 * Content/HeroPictures: addresses of the desktop and mobile pictures of the hero.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @returns The row of fields.
 */
export const HeroPictures = ({ field }: ContentFieldsProps) => (
  <FieldRow>
    <Input label="Desktop picture address" type="url" {...field("heroDesktopImage")} />
    <Input label="Mobile picture address" type="url" {...field("heroMobileImage")} />
  </FieldRow>
);
