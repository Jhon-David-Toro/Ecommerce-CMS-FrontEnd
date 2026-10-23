import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

import type { ProductDeleteDialogProps } from "../AdminProducts.types";

/**
 * Products/DeleteDialog: asks for confirmation before a product is removed.
 *
 * @param props Component props.
 * @param props.product Product about to be deleted, or null when the dialog is closed.
 * @param props.onConfirm Called when the admin confirms.
 * @param props.onCancel Called when the admin cancels.
 * @returns The dialog.
 */
export const ProductDeleteDialog = ({ product, onConfirm, onCancel }: ProductDeleteDialogProps) => (
  <ConfirmDialog
    open={product !== null}
    title="Delete product?"
    message={`"${product?.name ?? ""}" will disappear from the store and cannot be recovered.`}
    onConfirm={onConfirm}
    onCancel={onCancel}
  />
);
