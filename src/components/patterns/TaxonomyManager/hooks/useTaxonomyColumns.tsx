import { AdminThumb } from "@/components/patterns/AdminThumb";
import type { Column } from "@/components/patterns/DataTable/DataTable.types";
import { RowActions } from "@/components/patterns/RowActions";
import { StatusBadge } from "@/components/patterns/StatusBadge";

import type { TaxonomyColumnHandlers, TaxonomyRecord } from "../TaxonomyManager.types";

/**
 * Builds the last column of a taxonomy list, with the pencil and trash icons.
 *
 * @param onEdit Called with the record to edit.
 * @param onDelete Called with the record to delete.
 * @returns The actions column.
 */
const buildActionsColumn = <T extends TaxonomyRecord>(onEdit: (record: T) => void, onDelete: (record: T) => void): Column<T> => ({
  key: "actions",
  header: "",
  align: "right",
  render: (record) => <RowActions name={record.name} onEdit={() => onEdit(record)} onDelete={() => onDelete(record)} />,
});

/**
 * Builds the table columns of a taxonomy list.
 *
 * @param handlers Actions of the Edit and Delete buttons.
 * @param handlers.onEdit Called with the record to edit.
 * @param handlers.onDelete Called with the record to delete.
 * @returns The columns: name, slug, visibility and actions.
 */
export const useTaxonomyColumns = <T extends TaxonomyRecord>({ getImage, onEdit, onDelete }: TaxonomyColumnHandlers<T>): Column<T>[] => [
  { key: "image", header: "", render: (record) => <AdminThumb src={getImage(record)} name={record.name} /> },
  { key: "name", header: "Name", render: (record) => record.name },
  { key: "slug", header: "Slug", render: (record) => record.slug },
  {
    key: "visible",
    header: "Visibility",
    align: "center",
    render: (record) => <StatusBadge active={record.visible} activeLabel="Visible" inactiveLabel="Hidden" />,
  },
  buildActionsColumn(onEdit, onDelete),
];
