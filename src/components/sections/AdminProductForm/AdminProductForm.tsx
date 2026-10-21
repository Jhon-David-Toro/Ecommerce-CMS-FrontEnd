"use client";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { getProduct } from "@/lib/catalog/catalog.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import type { AdminProductFormProps } from "./AdminProductForm.types";
import { ProductFormBody } from "./parts/ProductFormBody";

/**
 * AdminProductForm: creates a product, or edits the one with the given id once it has loaded.
 *
 * @param props Component props.
 * @param props.productId Id of the product to edit; omitted to create a new one.
 * @returns The product form, a spinner while loading or a not found message.
 */
export const AdminProductForm = ({ productId }: AdminProductFormProps) => {
  const { data: product, isLoading } = useQuery(getProduct, productId ?? 0);

  if (productId === undefined) return <ProductFormBody />;
  if (isLoading) return <Spinner label="Loading product" />;

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        action={<Button type="primary" size="medium" text="Back to products" href="/admin/products" typeAttribute="button" />}
      />
    );
  }

  return <ProductFormBody key={product.id} existing={product} />;
};
