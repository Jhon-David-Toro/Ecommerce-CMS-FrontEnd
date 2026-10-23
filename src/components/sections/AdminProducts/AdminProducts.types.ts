import type { Product } from "@/lib/catalog/product.types";

export interface ProductDeleteDialogProps {
  product: Product | null;
  onConfirm: () => void;
  onCancel: () => void;
}
