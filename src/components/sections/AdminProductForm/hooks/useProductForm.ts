import { useRouter } from "next/navigation";
import { useState } from "react";

import { saveProduct } from "@/lib/catalog/catalog.api";
import type { Product } from "@/lib/catalog/product.types";
import { createSubmitHandler } from "@/lib/shared/forms/submit";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import { LIST_ROUTE, SAVE_ERROR } from "../AdminProductForm.constants";
import type { ProductFormValues } from "../AdminProductForm.types";
import { toFormValues, toProductInput, validateProduct } from "../AdminProductForm.utils";

/**
 * Keeps the state of the product form and saves the product when the form is valid.
 *
 * @param existing Product being edited; omitted when creating a new one.
 * @returns The values, errors and field helpers, the save state and the submit handler.
 */
export const useProductForm = (existing?: Product) => {
  const router = useRouter();
  const { values, errors, setErrors, setField, field } = useFormValues(toFormValues(existing));
  const [failure, setFailure] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Saves the product and returns to the list, or shows an error.
   *
   * @param valid Valid values from the form.
   */
  const save = async (valid: ProductFormValues) => {
    setIsSaving(true);
    try {
      await saveProduct(toProductInput(valid, existing), existing?.id);
      router.push(LIST_ROUTE);
    } catch {
      setFailure(SAVE_ERROR);
      setIsSaving(false);
    }
  };

  const handleSubmit = createSubmitHandler({ values, validate: validateProduct, setErrors, onValid: save });

  return { values, errors, setField, field, failure, isSaving, handleSubmit };
};
