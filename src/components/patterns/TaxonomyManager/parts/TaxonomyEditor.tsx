import { TaxonomyForm } from "@/components/patterns/TaxonomyForm";

import type { TaxonomyEditorProps, TaxonomyRecord } from "../TaxonomyManager.types";
import { describeEditing } from "../TaxonomyManager.utils";

/**
 * TaxonomyManager/Editor: the form for the record being created or edited, or nothing when none is.
 *
 * @param props Component props.
 * @param props.config Settings of the manager.
 * @param props.editing A record, "new" or nothing.
 * @param props.onSubmit Called with the validated values.
 * @param props.onCancel Called when the admin cancels.
 * @returns The form, or null.
 */
export const TaxonomyEditor = <T extends TaxonomyRecord>({ config, editing, onSubmit, onCancel }: TaxonomyEditorProps<T>) => {
  const view = describeEditing(editing, config);

  if (!view) return null;

  return (
    <TaxonomyForm
      key={view.key}
      title={view.title}
      initial={view.initial}
      imageLabel={config.imageLabel}
      withDescription={config.withDescription}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};
