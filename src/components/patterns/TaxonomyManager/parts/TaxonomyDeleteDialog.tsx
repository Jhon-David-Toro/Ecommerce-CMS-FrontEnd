import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

import type { TaxonomyDeleteDialogProps, TaxonomyRecord } from "../TaxonomyManager.types";

/**
 * TaxonomyManager/DeleteDialog: asks for confirmation before a record is removed.
 *
 * @param props Component props.
 * @param props.record Record about to be deleted, or null when the dialog is closed.
 * @param props.singular Name of one record.
 * @param props.note Sentence that explains what happens to the products.
 * @param props.onConfirm Called when the admin confirms.
 * @param props.onCancel Called when the admin cancels.
 * @returns The dialog.
 */
export const TaxonomyDeleteDialog = <T extends TaxonomyRecord>({
  record,
  singular,
  note,
  onConfirm,
  onCancel,
}: TaxonomyDeleteDialogProps<T>) => (
  <ConfirmDialog
    open={record !== null}
    title={`Delete ${singular}?`}
    message={`"${record?.name ?? ""}" will be removed. ${note}`}
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);
