import type { ListTable } from "@/components/patterns/AdminListView";
import type { Product } from "@/lib/catalog/product.types";

import { PRODUCT_COLUMNS, buildActionsColumn } from "../AdminProducts.columns";

/**
 * Describes the products table: the product columns followed by the delete button.
 *
 * @param onDelete Called with the product the admin wants to delete.
 * @returns The table description.
 */
export const useProductTable = (onDelete: (product: Product) => void): ListTable<Product> => ({
  caption: "Products",
  emptyTitle: "No products found",
  getRowKey: (product) => product.id,
  columns: [...PRODUCT_COLUMNS, buildActionsColumn(onDelete)],
});
