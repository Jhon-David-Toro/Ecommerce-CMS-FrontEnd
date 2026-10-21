"use client";

import type { SubmitEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { useFormValues } from "@/lib/shared/forms/useFormValues";
import { compact, required } from "@/lib/shared/forms/validators";

import type { PageFormProps } from "../AdminPages.types";
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

  /**
   * Validates the form and sends the values.
   *
   * @param event Submit event of the form.
   */
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = compact({ title: required(values.title), body: required(values.body) });
    setErrors(found);
    if (!Object.keys(found).length) onSubmit(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label={heading}>
      <h2 className={styles.form__title}>{heading}</h2>
      <Input label="Title" error={errors.title} {...field("title")} />
      <Input label="Slug" hint="Leave empty to build it from the title. The page lives at /p/slug." {...field("slug")} />
      <TextArea label="Text" hint="Leave a blank line between paragraphs." error={errors.body} {...field("body")} />
      <Checkbox label="Published" checked={values.published} onChange={(event) => setField("published", event.target.checked)} />
      <div className={styles.form__actions}>
        <Button type="secondary" size="small" text="Cancel" typeAttribute="button" onClick={onCancel} />
        <Button type="primary" size="small" text="Save page" typeAttribute="submit" />
      </div>
    </form>
  );
};
