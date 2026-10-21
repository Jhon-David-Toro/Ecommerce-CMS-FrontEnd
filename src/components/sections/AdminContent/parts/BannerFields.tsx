import { FieldGroup, FieldRow } from "@/components/patterns/FieldGroup";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";

import type { BannerFieldsProps } from "../AdminContent.types";

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
  <FieldGroup legend="Top banner">
    <Checkbox label="Show the banner" checked={enabled} onChange={(event) => onEnabledChange(event.target.checked)} />
    <Input label="Banner text" error={errors.bannerText} {...field("bannerText")} />
    <FieldRow>
      <Input label="Banner link text" {...field("bannerLinkText")} />
      <Input label="Banner link address" {...field("bannerLinkHref")} />
    </FieldRow>
  </FieldGroup>
);
