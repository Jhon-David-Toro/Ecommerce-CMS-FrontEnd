import { FieldGroup, FieldRow } from "@/components/patterns/FieldGroup";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";

import type { ContentFieldsProps } from "../AdminContent.types";
import { HeroPictures } from "./HeroPictures";

/**
 * Content/Hero: headline, text, button, pictures and numbers of the home page hero.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @returns The group of fields.
 */
export const HeroFields = ({ field, errors }: ContentFieldsProps) => (
  <FieldGroup legend="Home hero">
    <Input label="Headline" error={errors.heroTitle} {...field("heroTitle")} />
    <TextArea label="Paragraph" {...field("heroParagraph")} />
    <FieldRow>
      <Input label="Button text" {...field("heroCtaText")} />
      <Input label="Button address" error={errors.heroCtaHref} {...field("heroCtaHref")} />
    </FieldRow>
    <HeroPictures field={field} errors={errors} />
    <TextArea label="Numbers" hint="One per line as number | label." error={errors.stats} {...field("stats")} />
  </FieldGroup>
);
