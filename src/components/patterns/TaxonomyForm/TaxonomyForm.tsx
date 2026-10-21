"use client";

import { FormActions } from "@/components/patterns/FormActions";
import { createSubmitHandler } from "@/lib/shared/forms/submit";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import type { TaxonomyFormProps } from "./TaxonomyForm.types";
import { toSubmittedValues, validateTaxonomy } from "./TaxonomyForm.utils";
import { TaxonomyFields } from "./parts/TaxonomyFields";
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
export const TaxonomyForm = ({ initial, imageLabel, withDescription = false, title, onSubmit, onCancel }: TaxonomyFormProps) => {
  const { values, errors, setErrors, setField, field } = useFormValues(initial);
  const handleSubmit = createSubmitHandler({
    values,
    validate: validateTaxonomy,
    setErrors,
    onValid: (valid) => onSubmit(toSubmittedValues(valid)),
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label={title}>
      <h2 className={styles.form__title}>{title}</h2>
      <TaxonomyFields
        field={field}
        errors={errors}
        visible={values.visible}
        onVisibleChange={(visible) => setField("visible", visible)}
        imageLabel={imageLabel}
        withDescription={withDescription}
      />
      <FormActions submitLabel="Save" onCancel={onCancel} />
    </form>
  );
};
