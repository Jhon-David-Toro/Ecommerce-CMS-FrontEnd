"use client";

import { FormActions } from "@/components/patterns/FormActions";
import { createSubmitHandler } from "@/lib/shared/forms/submit";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import type { PageFormProps } from "../AdminPages.types";
import { validatePage } from "../AdminPages.utils";
import { PageFields } from "./PageFields";
import styles from "../AdminPages.module.scss";

/**
 * Pages/Form: title, slug, text and visibility of a static page.
 *
 * @param props Component props.
 * @param props.initial Starting values.
 * @param props.heading Title of the form.
 * @param props.onSubmit Called with the validated values.
 * @param props.onCancel Called when the admin cancels.
 * @returns The form.
 */
export const PageForm = ({ initial, heading, onSubmit, onCancel }: PageFormProps) => {
  const { values, errors, setErrors, setField, field } = useFormValues(initial);
  const handleSubmit = createSubmitHandler({ values, validate: validatePage, setErrors, onValid: onSubmit });

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label={heading}>
      <h2 className={styles.form__title}>{heading}</h2>
      <PageFields
        field={field}
        errors={errors}
        published={values.published}
        onPublishedChange={(published) => setField("published", published)}
      />
      <FormActions submitLabel="Save page" onCancel={onCancel} />
    </form>
  );
};
