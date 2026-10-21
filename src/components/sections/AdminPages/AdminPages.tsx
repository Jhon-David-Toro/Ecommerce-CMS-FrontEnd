"use client";

import { useState } from "react";

import { DataTable } from "@/components/patterns/DataTable";
import { PageHeader } from "@/components/patterns/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Spinner } from "@/components/ui/Spinner";
import { listPages, pageRepository } from "@/lib/content/content.api";
import type { StaticPage } from "@/lib/content/content.types";
import { useQuery } from "@/lib/shared/async/useQuery";
import { formatDate } from "@/lib/shared/format/format";

import { NEW_PAGE, NO_ARGS } from "./AdminPages.constants";
import type { PageFormValues } from "./AdminPages.types";
import { toFormValues, toPageInput } from "./AdminPages.utils";
import { PageForm } from "./parts/PageForm";

/**
 * AdminPages: list of static pages (about, shipping, ...) with a form to create, edit and delete them.
 *
 * @returns The pages manager content.
 */
export const AdminPages = () => {
  const { data, isLoading, reload } = useQuery(listPages, NO_ARGS);
  const [editing, setEditing] = useState<StaticPage | "new" | null>(null);
  const [toDelete, setToDelete] = useState<StaticPage | null>(null);

  /**
   * Creates or updates the page being edited.
   *
   * @param values Values from the form.
   */
  const handleSave = async (values: PageFormValues) => {
    if (editing === "new") await pageRepository.create(toPageInput(values));
    else if (editing) await pageRepository.update(editing.id, toPageInput(values));
    setEditing(null);
    reload();
  };

  /**
   * Deletes the page chosen in the confirmation dialog.
   */
  const confirmDelete = async () => {
    if (toDelete) await pageRepository.remove(toDelete.id);
    setToDelete(null);
    reload();
  };

  if (isLoading) return <Spinner label="Loading pages" />;

  return (
    <>
      <PageHeader
        title="Pages"
        description="Text pages linked from the footer and the menus."
        actions={<Button type="primary" size="small" text="New page" typeAttribute="button" onClick={() => setEditing("new")} />}
      />
      {editing && (
        <PageForm
          key={editing === "new" ? "new" : editing.id}
          heading={editing === "new" ? "New page" : `Edit ${editing.title}`}
          initial={editing === "new" ? NEW_PAGE : toFormValues(editing)}
          onSubmit={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}
      <DataTable
        caption="Pages"
        emptyTitle="No pages yet"
        rows={data ?? []}
        getRowKey={(page) => page.id}
        columns={[
          { key: "title", header: "Title", render: (page) => page.title },
          { key: "slug", header: "Address", render: (page) => `/p/${page.slug}` },
          { key: "updated", header: "Updated", render: (page) => formatDate(new Date(page.updatedAt).toISOString()) },
          {
            key: "status",
            header: "Status",
            render: (page) => <Badge tone={page.published ? "success" : "warning"}>{page.published ? "Published" : "Draft"}</Badge>,
          },
          {
            key: "actions",
            header: "",
            align: "right",
            render: (page) => (
              <>
                <button type="button" onClick={() => setEditing(page)} aria-label={`Edit ${page.title}`}>
                  Edit
                </button>{" "}
                <button type="button" onClick={() => setToDelete(page)} aria-label={`Delete ${page.title}`}>
                  Delete
                </button>
              </>
            ),
          },
        ]}
      />
      <ConfirmDialog
        open={toDelete !== null}
        title="Delete page?"
        message={`"${toDelete?.title ?? ""}" will no longer be available in the store.`}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
};
