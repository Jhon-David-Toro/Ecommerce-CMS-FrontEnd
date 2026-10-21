"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";

import { PageHeader } from "@/components/patterns/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { resetContent, saveContent } from "@/lib/content/content.api";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import type { ContentFormBodyProps } from "../AdminContent.types";
import { toContent, toFormValues, validateContent } from "../AdminContent.utils";
import { BannerFields } from "./BannerFields";
import { FooterFields } from "./FooterFields";
import { HeroFields } from "./HeroFields";
import { MenuFields } from "./MenuFields";
import styles from "../AdminContent.module.scss";

/**
 * Content/Body: the form that edits the banner, hero, menus and footer of the store.
 *
 * @param props Component props.
 * @param props.content Saved storefront content.
 * @returns The content form.
 */
export const ContentFormBody = ({ content }: ContentFormBodyProps) => {
  const { values, errors, setErrors, setField, field, reset } = useFormValues(toFormValues(content));
  const [notice, setNotice] = useState("");

  /**
   * Validates the form and saves the content.
   *
   * @param event Submit event of the form.
   */
  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice("");
    const found = validateContent(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    await saveContent(toContent(values));
    setNotice("Changes saved. The store shows them right away.");
  };

  /**
   * Puts every text back to the original one that ships with the store.
   */
  const handleReset = async () => {
    reset(toFormValues(await resetContent()));
    setNotice("Original content restored.");
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Site content">
      <PageHeader
        title="Site content"
        description="Edit what shoppers read on the banner, home page, menus and footer."
        actions={
          <>
            <Button type="secondary" size="small" text="Restore original" typeAttribute="button" onClick={handleReset} />
            <Button type="primary" size="small" text="Save changes" typeAttribute="submit" />
          </>
        }
      />
      {notice && <Alert tone="success">{notice}</Alert>}
      <div className={styles.form}>
        <BannerFields
          field={field}
          errors={errors}
          enabled={values.bannerEnabled}
          onEnabledChange={(enabled) => setField("bannerEnabled", enabled)}
        />
        <HeroFields field={field} errors={errors} />
        <MenuFields field={field} errors={errors} />
        <FooterFields field={field} errors={errors} />
      </div>
    </form>
  );
};
