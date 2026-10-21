"use client";

import type { ContentFormBodyProps } from "../AdminContent.types";
import { useContentForm } from "../hooks/useContentForm";
import { BannerFields } from "./BannerFields";
import { ContentHeader } from "./ContentHeader";
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
  const form = useContentForm(content);

  return (
    <form onSubmit={form.handleSubmit} noValidate aria-label="Site content">
      <ContentHeader notice={form.notice} onReset={form.handleReset} />
      <div className={styles.form}>
        <BannerFields
          field={form.field}
          errors={form.errors}
          enabled={form.values.bannerEnabled}
          onEnabledChange={(enabled) => form.setField("bannerEnabled", enabled)}
        />
        <HeroFields field={form.field} errors={form.errors} />
        <MenuFields field={form.field} errors={form.errors} />
        <FooterFields field={form.field} errors={form.errors} />
      </div>
    </form>
  );
};
