import type { TaxonomyValues } from "@/components/patterns/TaxonomyForm";
import type { EditTarget } from "@/lib/shared/crud/crud.types";

import type { EditorView, TaxonomyConfig, TaxonomyRecord } from "./TaxonomyManager.types";

/**
 * Works out what the form should show for the record being edited.
 *
 * @param editing A record, "new" or nothing.
 * @param config Settings of the manager.
 * @returns The key, title and starting values of the form, or null when no form should show.
 */
export const describeEditing = <T extends TaxonomyRecord>(editing: EditTarget<T>, config: TaxonomyConfig<T>): EditorView | null => {
  if (!editing) return null;
  if (editing === "new") return { key: "new", title: `New ${config.singular}`, initial: config.emptyValues };
  return { key: editing.id, title: `Edit ${editing.name}`, initial: config.toValues(editing) };
};

/**
 * Builds the starting values of an empty taxonomy form.
 *
 * @returns Empty values, visible by default.
 */
export const buildEmptyValues = (): TaxonomyValues => ({ name: "", slug: "", picture: "", description: "", visible: true });
