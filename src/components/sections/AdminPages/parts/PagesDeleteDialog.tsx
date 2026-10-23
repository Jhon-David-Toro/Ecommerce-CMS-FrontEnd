import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

import type { PagesDeleteDialogProps } from "../AdminPages.types";

/**
 * Pages/DeleteDialog: asks for confirmation before a page is removed.
 *
 * @param props Component props.
 * @param props.page Page about to be deleted, or null when the dialog is closed.
 * @param props.onConfirm Called when the admin confirms.
 * @param props.onCancel Called when the admin cancels.
 * @returns The dialog.
 */
export const PagesDeleteDialog = ({ page, onConfirm, onCancel }: PagesDeleteDialogProps) => (
  <ConfirmDialog
    open={page !== null}
    title="Delete page?"
    message={`"${page?.title ?? ""}" will no longer be available in the store.`}
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);
