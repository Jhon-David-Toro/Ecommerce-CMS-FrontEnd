import type { StaticPage, StaticPageInput } from "@/lib/content/content.types";
import type { EditTarget } from "@/lib/shared/crud/crud.types";
import { compact, required } from "@/lib/shared/forms/validators";
import { slugify } from "@/lib/shared/text/text";

import { NEW_PAGE } from "./AdminPages.constants";
import type { PageEditorView, PageFormValues } from "./AdminPages.types";

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

/**
 * Checks the page form.
 *
 * @param values Values from the form.
 * @returns The errors by field; empty when the form is valid.
 */
export const validatePage = (values: PageFormValues) => compact({ title: required(values.title), body: required(values.body) });

/**
 * Works out what the form should show for the page being edited.
 *
 * @param editing A page, "new" or nothing.
 * @returns The key, heading and starting values of the form, or null when no form should show.
 */
export const describeEditing = (editing: EditTarget<StaticPage>): PageEditorView | null => {
  if (!editing) return null;
  if (editing === "new") return { key: "new", heading: "New page", initial: NEW_PAGE };
  return { key: editing.id, heading: `Edit ${editing.title}`, initial: toFormValues(editing) };
};
