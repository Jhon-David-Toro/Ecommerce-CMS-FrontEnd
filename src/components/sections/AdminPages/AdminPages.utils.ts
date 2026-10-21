import type { StaticPage, StaticPageInput } from "@/lib/content/content.types";
import { slugify } from "@/lib/shared/text/text";

import type { PageFormValues } from "./AdminPages.types";

/**
 * Builds the form values of a page.
 *
 * @param page Page to edit.
 * @returns The form values.
 */
export const toFormValues = (page: StaticPage): PageFormValues => ({
  title: page.title,
  slug: page.slug,
  body: page.body,
  published: page.published,
});

/**
 * Turns the form values into the data of a page.
 *
 * @param values Values from the form.
 * @returns The page input, with a slug built from the title when none was typed.
 */
export const toPageInput = (values: PageFormValues): StaticPageInput => ({
  title: values.title.trim(),
  slug: slugify(values.slug || values.title),
  body: values.body.trim(),
  published: values.published,
  updatedAt: Date.now(),
});
