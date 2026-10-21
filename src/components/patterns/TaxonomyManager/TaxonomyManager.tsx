"use client";

import { DataTable } from "@/components/patterns/DataTable";
import { Spinner } from "@/components/ui/Spinner";
import { useQuery } from "@/lib/shared/async/useQuery";
import { useRecordEditor } from "@/lib/shared/crud/useRecordEditor";

import { NO_ARGS, NO_ROWS } from "./TaxonomyManager.constants";
import type { TaxonomyManagerProps, TaxonomyRecord } from "./TaxonomyManager.types";
import { useTaxonomyColumns } from "./hooks/useTaxonomyColumns";
import { TaxonomyDeleteDialog } from "./parts/TaxonomyDeleteDialog";
import { TaxonomyEditor } from "./parts/TaxonomyEditor";
import { TaxonomyHeader } from "./parts/TaxonomyHeader";

/**
 * TaxonomyManager: list of categories or brands with a form to create, edit and delete them.
 *
 * @param props Component props.
 * @param props.config Texts, storage and conversions of the kind of record being managed.
 * @returns The manager.
 */
export const TaxonomyManager = <T extends TaxonomyRecord>({ config }: TaxonomyManagerProps<T>) => {
  const { data, isLoading, reload } = useQuery(config.load, NO_ARGS);
  const editor = useRecordEditor({ repository: config.repository, toInput: config.toInput, reload });
  const columns = useTaxonomyColumns({ onEdit: editor.startEdit, onDelete: editor.askDelete });

  if (isLoading) return <Spinner label={`Loading ${config.title.toLowerCase()}`} />;

  return (
    <>
      <TaxonomyHeader title={config.title} description={config.description} singular={config.singular} onNew={editor.startNew} />
      <TaxonomyEditor config={config} editing={editor.editing} onSubmit={editor.save} onCancel={editor.cancelEdit} />
      <DataTable
        caption={config.title}
        emptyTitle={`No ${config.title.toLowerCase()} yet`}
        rows={data ?? NO_ROWS}
        getRowKey={(record) => record.id}
        columns={columns}
      />
      <TaxonomyDeleteDialog
        record={editor.toDelete}
        singular={config.singular}
        note={config.deleteNote}
        onConfirm={editor.confirmDelete}
        onCancel={editor.cancelDelete}
      />
    </>
  );
};
