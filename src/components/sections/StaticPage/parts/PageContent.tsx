import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { toParagraphs } from "@/lib/shared/text/text";

import type { PageContentProps } from "../StaticPage.types";
import styles from "../StaticPage.module.scss";

/**
 * StaticPage/Content: title and paragraphs of a published page, with a breadcrumb.
 *
 * @param props Component props.
 * @param props.page Page to show.
 * @returns The article.
 */
export const PageContent = ({ page }: PageContentProps) => (
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
