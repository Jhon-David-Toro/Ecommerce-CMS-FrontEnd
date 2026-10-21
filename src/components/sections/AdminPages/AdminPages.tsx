"use client";

import { DataTable } from "@/components/patterns/DataTable";
import { Spinner } from "@/components/ui/Spinner";
import { listPages, pageRepository } from "@/lib/content/content.api";
import { useQuery } from "@/lib/shared/async/useQuery";
import { useRecordEditor } from "@/lib/shared/crud/useRecordEditor";

import { NO_ARGS, NO_ROWS } from "./AdminPages.constants";
import { toPageInput } from "./AdminPages.utils";
import { usePageColumns } from "./hooks/usePageColumns";
import { PagesDeleteDialog } from "./parts/PagesDeleteDialog";
import { PagesEditor } from "./parts/PagesEditor";
import { PagesHeader } from "./parts/PagesHeader";

/**
 * AdminPages: list of static pages (about, shipping, ...) with a form to create, edit and delete them.
 *
 * @returns The pages manager content.
 */
export const AdminPages = () => {
  const { data, isLoading, reload } = useQuery(listPages, NO_ARGS);
  const editor = useRecordEditor({ repository: pageRepository, toInput: toPageInput, reload });
  const columns = usePageColumns({ onEdit: editor.startEdit, onDelete: editor.askDelete });

  if (isLoading) return <Spinner label="Loading pages" />;

  return (
    <>
      <PagesHeader onNew={editor.startNew} />
      <PagesEditor editing={editor.editing} onSubmit={editor.save} onCancel={editor.cancelEdit} />
      <DataTable caption="Pages" emptyTitle="No pages yet" rows={data ?? NO_ROWS} getRowKey={(page) => page.id} columns={columns} />
      <PagesDeleteDialog page={editor.toDelete} onConfirm={editor.confirmDelete} onCancel={editor.cancelDelete} />
    </>
  );
};
