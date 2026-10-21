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
import { brandRepository, listBrands } from "@/lib/taxonomy/taxonomy.api";
import type { Brand } from "@/lib/taxonomy/taxonomy.types";

import { NEW_BRAND } from "./AdminBrands.constants";
import { fromValues, toValues } from "./AdminBrands.utils";

/**
 * AdminBrands: list of brands with a form to create, edit and delete them.
 *
 * @returns The brands page content.
 */
export const AdminBrands = () => {
  const { data, isLoading, reload } = useQuery(listBrands, undefined);
  const [editing, setEditing] = useState<Brand | "new" | null>(null);
  const [toDelete, setToDelete] = useState<Brand | null>(null);

  /**
   * Creates or updates the brand being edited.
   *
   * @param values Values from the form.
   */
  const handleSave = async (values: TaxonomyValues) => {
    if (editing === "new") await brandRepository.create(fromValues(values));
    else if (editing) await brandRepository.update(editing.id, fromValues(values));
    setEditing(null);
    reload();
  };

  /**
   * Deletes the brand chosen in the confirmation dialog.
   */
  const confirmDelete = async () => {
    if (toDelete) await brandRepository.remove(toDelete.id);
    setToDelete(null);
    reload();
  };

  if (isLoading) return <Spinner label="Loading brands" />;

  return (
    <>
      <PageHeader
        title="Brands"
        description="Labels that products belong to."
        actions={<Button type="primary" size="small" text="New brand" typeAttribute="button" onClick={() => setEditing("new")} />}
      />
      {editing && (
        <TaxonomyForm
          key={editing === "new" ? "new" : editing.id}
          title={editing === "new" ? "New brand" : `Edit ${editing.name}`}
          initial={editing === "new" ? NEW_BRAND : toValues(editing)}
          imageLabel="Logo address"
          onSubmit={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}
      <DataTable
        caption="Brands"
        emptyTitle="No brands yet"
        rows={data ?? []}
        getRowKey={(brand) => brand.id}
        columns={[
          { key: "name", header: "Name", render: (brand) => brand.name },
          { key: "slug", header: "Slug", render: (brand) => brand.slug },
          {
            key: "visible",
            header: "Visibility",
            render: (brand) => <Badge tone={brand.visible ? "success" : "neutral"}>{brand.visible ? "Visible" : "Hidden"}</Badge>,
          },
          {
            key: "actions",
            header: "",
            align: "right",
            render: (brand) => (
              <>
                <button type="button" onClick={() => setEditing(brand)} aria-label={`Edit ${brand.name}`}>
                  Edit
                </button>{" "}
                <button type="button" onClick={() => setToDelete(brand)} aria-label={`Delete ${brand.name}`}>
                  Delete
                </button>
              </>
            ),
          },
        ]}
      />
      <ConfirmDialog
        open={toDelete !== null}
        title="Delete brand?"
        message={`"${toDelete?.name ?? ""}" will be removed. Products keep their brand name.`}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
};
