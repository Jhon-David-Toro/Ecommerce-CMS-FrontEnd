import type { Column } from "@/components/patterns/DataTable/DataTable.types";
import { RowActions } from "@/components/patterns/RowActions";
import { StatusBadge } from "@/components/patterns/StatusBadge";

import type { TaxonomyColumnHandlers, TaxonomyRecord } from "../TaxonomyManager.types";

/**
 * Builds the table columns of a taxonomy list.
 *
 * @param handlers Actions of the Edit and Delete buttons.
 * @param handlers.onEdit Called with the record to edit.
 * @param handlers.onDelete Called with the record to delete.
 * @returns The columns: name, slug, visibility and actions.
 */
export const useTaxonomyColumns = <T extends TaxonomyRecord>({ onEdit, onDelete }: TaxonomyColumnHandlers<T>): Column<T>[] => [
  { key: "name", header: "Name", render: (record) => record.name },
  { key: "slug", header: "Slug", render: (record) => record.slug },
  {
    key: "visible",
    header: "Visibility",
    render: (record) => <StatusBadge active={record.visible} activeLabel="Visible" inactiveLabel="Hidden" />,
  },
  {
    key: "actions",
    header: "",
    align: "right",
    render: (record) => <RowActions name={record.name} onEdit={() => onEdit(record)} onDelete={() => onDelete(record)} />,
  },
];
