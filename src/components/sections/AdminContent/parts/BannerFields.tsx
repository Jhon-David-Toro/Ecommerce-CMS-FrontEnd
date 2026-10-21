import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";

import type { BannerFieldsProps } from "../AdminContent.types";
import styles from "../AdminContent.module.scss";

/**
 * Content/Banner: the promotional strip at the top of the store.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @param props.enabled Whether the banner is shown.
 * @param props.onEnabledChange Called when the checkbox changes.
 * @returns The group of fields.
 */
export const BannerFields = ({ field, errors, enabled, onEnabledChange }: BannerFieldsProps) => (
  <fieldset className={styles.group}>
    <legend className={styles.group__legend}>Top banner</legend>
    <Checkbox label="Show the banner" checked={enabled} onChange={(event) => onEnabledChange(event.target.checked)} />
    <Input label="Banner text" error={errors.bannerText} {...field("bannerText")} />
    <div className={styles.group__row}>
      <Input label="Banner link text" {...field("bannerLinkText")} />
      <Input label="Banner link address" {...field("bannerLinkHref")} />
    </div>
  </fieldset>
);
