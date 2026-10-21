"use client";

import type { FC, SubmitEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { useFormValues } from "@/lib/shared/forms/useFormValues";
import { compact, required } from "@/lib/shared/forms/validators";
import { slugify } from "@/lib/shared/text/text";

import type { TaxonomyFormProps } from "./TaxonomyForm.types";
import styles from "./TaxonomyForm.module.scss";

/**
 * TaxonomyForm: name, slug, picture and visibility of a category or a brand.
 *
 * @param props Component props.
 * @param props.initial Starting values.
 * @param props.imageLabel Label of the picture field, for example "Image address" or "Logo address".
 * @param props.withDescription Adds a description field (categories have one, brands do not).
 * @param props.title Title of the form.
 * @param props.onSubmit Called with the validated values.
 * @param props.onCancel Called when the admin cancels.
 * @returns The form.
 */
export const TaxonomyForm: FC<TaxonomyFormProps> = ({ initial, imageLabel, withDescription = false, title, onSubmit, onCancel }) => {
  const { values, errors, setErrors, setField, field } = useFormValues(initial);

  /**
   * Validates the form and sends the values.
   *
   * @param event Submit event of the form.
   */
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = compact({ name: required(values.name) });
    setErrors(found);
    if (!Object.keys(found).length) onSubmit({ ...values, slug: slugify(values.slug || values.name) });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label={title}>
      <h2 className={styles.form__title}>{title}</h2>
      <Input label="Name" error={errors.name} {...field("name")} />
      <Input label="Slug" hint="Leave empty to build it from the name." {...field("slug")} />
      <Input label={imageLabel} type="url" {...field("picture")} />
      {withDescription && <TextArea label="Description" {...field("description")} />}
      <Checkbox label="Visible in the store" checked={values.visible} onChange={(event) => setField("visible", event.target.checked)} />
      <div className={styles.form__actions}>
        <Button type="secondary" size="small" text="Cancel" typeAttribute="button" onClick={onCancel} />
        <Button type="primary" size="small" text="Save" typeAttribute="submit" />
      </div>
    </form>
  );
};
