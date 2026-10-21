"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { DataTable } from "@/components/patterns/DataTable";
import { PageHeader } from "@/components/patterns/PageHeader";
import { Pagination } from "@/components/patterns/Pagination";
import { TableToolbar } from "@/components/patterns/TableToolbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { SelectInput } from "@/components/ui/SelectInput";
import { Spinner } from "@/components/ui/Spinner";
import { deleteProduct, listProducts } from "@/lib/catalog/catalog.api";
import type { Product } from "@/lib/catalog/product.types";
import { useQuery } from "@/lib/shared/async/useQuery";
import { formatPrice } from "@/lib/shared/format/format";
import { useTableControls } from "@/lib/shared/table/useTableControls";

import { ALL_PRODUCTS, PAGE_SIZE, STATUS_FILTERS, THUMBNAIL_SIZE } from "./AdminProducts.constants";
import { filterByStatus, matchesProduct } from "./AdminProducts.utils";
import styles from "./AdminProducts.module.scss";

/**
 * AdminProducts: searchable, paginated list of every product with links to edit and a delete action.
 *
 * @returns The products page content.
 */
export const AdminProducts = () => {
  const { data, isLoading, reload } = useQuery(listProducts, ALL_PRODUCTS);
  const [status, setStatus] = useState("");
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const rows = filterByStatus(data ?? [], status);
  const { query, setQuery, page, setPage, totalPages, pageRows } = useTableControls(rows, { pageSize: PAGE_SIZE, matches: matchesProduct });

  /**
   * Deletes the product chosen in the confirmation dialog and refreshes the list.
   */
  const confirmDelete = async () => {
    if (toDelete) await deleteProduct(toDelete.id);
    setToDelete(null);
    reload();
  };

  if (isLoading) return <Spinner label="Loading products" />;

  return (
    <>
      <PageHeader
        title="Products"
        description="Everything you sell, published or not."
        actions={<Button type="primary" size="small" text="New product" href="/admin/products/new" typeAttribute="button" />}
      />
      <TableToolbar query={query} onQueryChange={setQuery} placeholder="Search products">
        <SelectInput label="Status" options={STATUS_FILTERS} value={status} onChange={(event) => setStatus(event.target.value)} />
      </TableToolbar>
      <DataTable
        caption="Products"
        emptyTitle="No products found"
        rows={pageRows}
        getRowKey={(product) => product.id}
        columns={[
          {
            key: "image",
            header: "",
            render: (product) => <Image src={product.image} alt="" {...THUMBNAIL_SIZE} className={styles.thumb} />,
          },
          { key: "name", header: "Name", render: (product) => <Link href={`/admin/products/${product.id}`}>{product.name}</Link> },
          { key: "category", header: "Category", render: (product) => product.category },
          { key: "price", header: "Price", align: "right", render: (product) => formatPrice(product.discountPrice ?? product.price) },
          {
            key: "stock",
            header: "Stock",
            align: "right",
            render: (product) => <Badge tone={product.stock <= 10 ? "danger" : "neutral"}>{String(product.stock)}</Badge>,
          },
          {
            key: "status",
            header: "Status",
            render: (product) => (
              <Badge tone={product.status === "published" ? "success" : "warning"}>
                {product.status === "published" ? "Published" : "Draft"}
              </Badge>
            ),
          },
          {
            key: "actions",
            header: "",
            align: "right",
            render: (product) => (
              <button type="button" className={styles.remove} onClick={() => setToDelete(product)} aria-label={`Delete ${product.name}`}>
                Delete
              </button>
            ),
          },
        ]}
      />
      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
      <ConfirmDialog
        open={toDelete !== null}
        title="Delete product?"
        message={`"${toDelete?.name ?? ""}" will disappear from the store and cannot be recovered.`}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
};
