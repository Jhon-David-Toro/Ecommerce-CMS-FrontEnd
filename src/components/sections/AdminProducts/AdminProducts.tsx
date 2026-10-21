"use client";

import { useState } from "react";

import { AdminListView } from "@/components/patterns/AdminListView";
import { ChipFilter } from "@/components/patterns/ChipFilter";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { deleteProduct, listProducts } from "@/lib/catalog/catalog.api";
import type { Product } from "@/lib/catalog/product.types";
import { useQuery } from "@/lib/shared/async/useQuery";
import { useConfirmedDelete } from "@/lib/shared/crud/useConfirmedDelete";
import { useTableControls } from "@/lib/shared/table/useTableControls";

import { ALL_PRODUCTS, NO_PRODUCTS, PAGE_SIZE, STATUS_FILTERS } from "./AdminProducts.constants";
import { filterByStatus, matchesProduct } from "./AdminProducts.utils";
import { useProductTable } from "./hooks/useProductTable";
import { ProductDeleteDialog } from "./parts/ProductDeleteDialog";

/**
 * AdminProducts: searchable, paginated list of every product with links to edit and a delete action.
 *
 * @returns The products page content.
 */
export const AdminProducts = () => {
  const { data, isLoading, reload } = useQuery(listProducts, ALL_PRODUCTS);
  const [status, setStatus] = useState("");
  const remove = useConfirmedDelete<Product>({ remove: deleteProduct, reload });
  const controls = useTableControls(filterByStatus(data ?? NO_PRODUCTS, status), { pageSize: PAGE_SIZE, matches: matchesProduct });
  const table = useProductTable(remove.askDelete);

  if (isLoading) return <Spinner label="Loading products" />;

  return (
    <AdminListView
      title="Products"
      description="Everything you sell, published or not."
      actions={<Button type="primary" size="small" text="New product" href="/admin/products/new" typeAttribute="button" />}
      searchLabel="Search products"
      filters={<ChipFilter label="Status" options={STATUS_FILTERS} value={status} onChange={setStatus} />}
      controls={controls}
      table={table}
    >
      <ProductDeleteDialog product={remove.toDelete} onConfirm={remove.confirmDelete} onCancel={remove.cancelDelete} />
    </AdminListView>
  );
};
