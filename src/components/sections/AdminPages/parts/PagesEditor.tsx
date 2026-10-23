import type { PagesEditorProps } from "../AdminPages.types";
import { describeEditing } from "../AdminPages.utils";
import { PageForm } from "./PageForm";

/**
 * Pages/Editor: the form for the page being created or edited, or nothing when none is.
 *
 * @param props Component props.
 * @param props.editing A page, "new" or nothing.
 * @param props.onSubmit Called with the validated values.
 * @param props.onCancel Called when the admin cancels.
 * @returns The form, or null.
 */
export const PagesEditor = ({ editing, onSubmit, onCancel }: PagesEditorProps) => {
  const view = describeEditing(editing);

  if (!view) return null;

  return <PageForm key={view.key} heading={view.heading} initial={view.initial} onSubmit={onSubmit} onCancel={onCancel} />;
};
