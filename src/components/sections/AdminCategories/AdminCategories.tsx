"use client";

import { useState } from "react";

import { DataTable } from "@/components/patterns/DataTable";
import { PageHeader } from "@/components/patterns/PageHeader";
import { TaxonomyForm } from "@/components/patterns/TaxonomyForm";
import type { TaxonomyValues } from "@/components/patterns/TaxonomyForm";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Spinner } from "@/components/ui/Spinner";
import { useQuery } from "@/lib/shared/async/useQuery";
import { categoryRepository, listCategories } from "@/lib/taxonomy/taxonomy.api";
import type { Category } from "@/lib/taxonomy/taxonomy.types";

import { NEW_CATEGORY } from "./AdminCategories.constants";
import { fromValues, toValues } from "./AdminCategories.utils";

/**
 * AdminCategories: list of product categories with a form to create, edit and delete them.
 *
 * @returns The categories page content.
 */
export const AdminCategories = () => {
  const { data, isLoading, reload } = useQuery(listCategories, undefined);
  const [editing, setEditing] = useState<Category | "new" | null>(null);
  const [toDelete, setToDelete] = useState<Category | null>(null);

  /**
   * Creates or updates the category being edited.
   *
   * @param values Values from the form.
   */
  const handleSave = async (values: TaxonomyValues) => {
    if (editing === "new") await categoryRepository.create(fromValues(values));
    else if (editing) await categoryRepository.update(editing.id, fromValues(values));
    setEditing(null);
    reload();
  };

  /**
   * Deletes the category chosen in the confirmation dialog.
   */
  const confirmDelete = async () => {
    if (toDelete) await categoryRepository.remove(toDelete.id);
    setToDelete(null);
    reload();
  };

  if (isLoading) return <Spinner label="Loading categories" />;

  return (
    <>
      <PageHeader
        title="Categories"
        description="Groups that shoppers use to browse the catalog."
        actions={<Button type="primary" size="small" text="New category" typeAttribute="button" onClick={() => setEditing("new")} />}
      />
      {editing && (
        <TaxonomyForm
          key={editing === "new" ? "new" : editing.id}
          title={editing === "new" ? "New category" : `Edit ${editing.name}`}
          initial={editing === "new" ? NEW_CATEGORY : toValues(editing)}
          imageLabel="Image address"
          withDescription
          onSubmit={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}
      <DataTable
        caption="Categories"
        emptyTitle="No categories yet"
        rows={data ?? []}
        getRowKey={(category) => category.id}
        columns={[
          { key: "name", header: "Name", render: (category) => category.name },
          { key: "slug", header: "Slug", render: (category) => category.slug },
          {
            key: "visible",
            header: "Visibility",
            render: (category) => <Badge tone={category.visible ? "success" : "neutral"}>{category.visible ? "Visible" : "Hidden"}</Badge>,
          },
          {
            key: "actions",
            header: "",
            align: "right",
            render: (category) => (
              <>
                <button type="button" onClick={() => setEditing(category)} aria-label={`Edit ${category.name}`}>
                  Edit
                </button>{" "}
                <button type="button" onClick={() => setToDelete(category)} aria-label={`Delete ${category.name}`}>
                  Delete
                </button>
              </>
            ),
          },
        ]}
      />
      <ConfirmDialog
        open={toDelete !== null}
        title="Delete category?"
        message={`"${toDelete?.name ?? ""}" will be removed. Products keep their category name.`}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
};
