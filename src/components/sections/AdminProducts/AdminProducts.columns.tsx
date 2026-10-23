import Image from "next/image";
import Link from "next/link";

import type { Column } from "@/components/patterns/DataTable/DataTable.types";
import { RowActions } from "@/components/patterns/RowActions";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/lib/catalog/product.types";
import { formatPrice } from "@/lib/shared/format/format";

import { LOW_STOCK_LIMIT, THUMBNAIL_SIZE } from "./AdminProducts.constants";
import styles from "./AdminProducts.module.scss";

export const PRODUCT_COLUMNS: Column<Product>[] = [
  { key: "image", header: "", render: (product) => <Image src={product.image} alt="" {...THUMBNAIL_SIZE} className={styles.thumb} /> },
  { key: "name", header: "Name", render: (product) => <Link href={`/admin/products/${product.id}`}>{product.name}</Link> },
  { key: "category", header: "Category", render: (product) => product.category },
  { key: "price", header: "Price", align: "right", render: (product) => formatPrice(product.discountPrice ?? product.price) },
  {
    key: "stock",
    header: "Stock",
    align: "center",
    render: (product) => <Badge tone={product.stock <= LOW_STOCK_LIMIT ? "danger" : "neutral"}>{String(product.stock)}</Badge>,
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (product) => (
      <StatusBadge active={product.status === "published"} activeLabel="Published" inactiveLabel="Draft" inactiveTone="warning" />
    ),
  },
];

/**
 * Builds the last column of the products table, with the delete button.
 *
 * @param onDelete Called with the product the admin wants to delete.
 * @returns The actions column.
 */
export const buildActionsColumn = (onDelete: (product: Product) => void): Column<Product> => ({
  key: "actions",
  header: "",
  align: "right",
  render: (product) => <RowActions name={product.name} editHref={`/admin/products/${product.id}`} onDelete={() => onDelete(product)} />,
});
