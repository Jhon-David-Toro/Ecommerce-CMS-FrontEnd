"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitEvent } from "react";

import { PageHeader } from "@/components/patterns/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { saveProduct } from "@/lib/catalog/catalog.api";
import type { Product } from "@/lib/catalog/product.types";
import { useQuery } from "@/lib/shared/async/useQuery";
import { useFormValues } from "@/lib/shared/forms/useFormValues";
import { listBrands, listCategories } from "@/lib/taxonomy/taxonomy.api";

import { toFormValues, toProductInput, validateProduct } from "../AdminProductForm.utils";
import { BasicsFields } from "./BasicsFields";
import { DescriptionFields } from "./DescriptionFields";
import { MediaFields } from "./MediaFields";
import styles from "../AdminProductForm.module.scss";

/**
 * ProductForm/Body: the form that creates a product or edits an existing one.
 *
 * @param props Component props.
 * @param props.existing Product being edited; omitted for a new product.
 * @returns The form.
 */
export const ProductFormBody = ({ existing }: { existing?: Product }) => {
  const router = useRouter();
  const { values, errors, setErrors, setField, field } = useFormValues(toFormValues(existing));
  const { data: brands } = useQuery(listBrands, undefined);
  const { data: categories } = useQuery(listCategories, undefined);
  const [failure, setFailure] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Validates the form and saves the product.
   *
   * @param event Submit event of the form.
   */
  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateProduct(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setIsSaving(true);
    try {
      await saveProduct(toProductInput(values, existing), existing?.id);
      router.push("/admin/products");
    } catch {
      setFailure("The product could not be saved.");
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Product">
      <PageHeader
        title={existing ? `Edit ${existing.name}` : "New product"}
        actions={
          <>
            <Link href="/admin/products">Cancel</Link>
            <Button type="primary" size="small" text={isSaving ? "Saving..." : "Save product"} typeAttribute="submit" disabled={isSaving} />
          </>
        }
      />
      {failure && <Alert>{failure}</Alert>}
      <div className={styles.form}>
        <BasicsFields field={field} errors={errors} brands={brands ?? []} categories={categories ?? []} />
        <MediaFields field={field} errors={errors} sizes={values.sizes} onSizesChange={(sizes) => setField("sizes", sizes)} />
        <DescriptionFields field={field} errors={errors} />
      </div>
    </form>
  );
};
