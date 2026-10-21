"use client";

import type { ProductFormBodyProps } from "../AdminProductForm.types";
import { getFormTitle } from "../AdminProductForm.utils";
import { useProductForm } from "../hooks/useProductForm";
import { BasicsFields } from "./BasicsFields";
import { DescriptionFields } from "./DescriptionFields";
import { MediaFields } from "./MediaFields";
import { ProductFormHeader } from "./ProductFormHeader";
import styles from "../AdminProductForm.module.scss";

/**
 * ProductForm/Body: the form that creates a product or edits an existing one.
 *
 * @param props Component props.
 * @param props.existing Product being edited; omitted for a new product.
 * @returns The form.
 */
export const ProductFormBody = ({ existing }: ProductFormBodyProps) => {
  const form = useProductForm(existing);

  return (
    <form onSubmit={form.handleSubmit} noValidate aria-label="Product">
      <ProductFormHeader title={getFormTitle(existing)} isSaving={form.isSaving} failure={form.failure} />
      <div className={styles.form}>
        <BasicsFields field={form.field} errors={form.errors} />
        <MediaFields
          field={form.field}
          errors={form.errors}
          sizes={form.values.sizes}
          onSizesChange={(sizes) => form.setField("sizes", sizes)}
        />
        <DescriptionFields field={form.field} errors={form.errors} />
      </div>
    </form>
  );
};
