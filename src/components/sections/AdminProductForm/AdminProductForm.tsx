"use client";

import { RecordGate } from "@/components/patterns/RecordGate";
import { getProduct } from "@/lib/catalog/catalog.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NOT_FOUND } from "./AdminProductForm.constants";
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

  return (
    <RecordGate record={product} isLoading={isLoading} loadingLabel="Loading product" notFound={NOT_FOUND}>
      {(found) => <ProductFormBody key={found.id} existing={found} />}
    </RecordGate>
  );
};
