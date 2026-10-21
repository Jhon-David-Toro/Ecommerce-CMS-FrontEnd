import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";

import type { ContentFieldsProps } from "../AdminContent.types";
import styles from "../AdminContent.module.scss";

/**
 * Content/Hero: headline, text, button, pictures and numbers of the home page hero.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @returns The group of fields.
 */
export const HeroFields = ({ field, errors }: ContentFieldsProps) => (
  <fieldset className={styles.group}>
    <legend className={styles.group__legend}>Home hero</legend>
    <Input label="Headline" error={errors.heroTitle} {...field("heroTitle")} />
    <TextArea label="Paragraph" {...field("heroParagraph")} />
    <div className={styles.group__row}>
      <Input label="Button text" {...field("heroCtaText")} />
      <Input label="Button address" error={errors.heroCtaHref} {...field("heroCtaHref")} />
    </div>
    <div className={styles.group__row}>
      <Input label="Desktop picture address" type="url" {...field("heroDesktopImage")} />
      <Input label="Mobile picture address" type="url" {...field("heroMobileImage")} />
    </div>
    <TextArea label="Numbers" hint="One per line as number | label." error={errors.stats} {...field("stats")} />
  </fieldset>
);
