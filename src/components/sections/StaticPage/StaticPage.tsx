"use client";

import { useParams } from "next/navigation";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { getPublishedPage } from "@/lib/content/content.api";
import { useQuery } from "@/lib/shared/async/useQuery";
import { toParagraphs } from "@/lib/shared/text/text";

import styles from "./StaticPage.module.scss";

/**
 * StaticPage: content page written in the admin panel and found by the slug of the address.
 *
 * @returns The page content, or a not found message.
 */
export const StaticPage = () => {
  const params = useParams<{ slug: string }>();
  const { data: page, isLoading } = useQuery(getPublishedPage, params.slug);

  if (isLoading) return <Spinner />;

  if (!page) {
    return (
      <EmptyState
        title="Page not found"
        description="This page does not exist or is not published."
        action={<Button type="primary" size="medium" text="Back to the store" href="/" typeAttribute="button" />}
      />
    );
  }

  return (
    <article className={styles.page}>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: page.title }]} />
      <h1 className={styles.page__title}>{page.title.toUpperCase()}</h1>
      {toParagraphs(page.body).map((paragraph) => (
        <p key={paragraph} className={styles.page__text}>
          {paragraph}
        </p>
      ))}
    </article>
  );
};
