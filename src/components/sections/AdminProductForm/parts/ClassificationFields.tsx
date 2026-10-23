"use client";

import { FieldRow } from "@/components/patterns/FieldGroup";
import { SelectInput } from "@/components/ui/SelectInput";
import { useQuery } from "@/lib/shared/async/useQuery";
import { listBrands, listCategories } from "@/lib/taxonomy/taxonomy.api";
import { DRESS_STYLE_OPTIONS } from "@/lib/taxonomy/taxonomy.constants";

import { NO_ARGS } from "../AdminProductForm.constants";
import type { FieldGroupProps } from "../AdminProductForm.types";
import { toOptions } from "../AdminProductForm.utils";

/**
 * ProductForm/Classification: category, brand and dress style, with the categories and brands loaded from the catalog.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @returns The row of selects.
 */
export const ClassificationFields = ({ field, errors }: FieldGroupProps) => {
  const { data: categories } = useQuery(listCategories, NO_ARGS);
  const { data: brands } = useQuery(listBrands, NO_ARGS);

  return (
    <FieldRow>
      <SelectInput label="Category" options={toOptions(categories)} error={errors.category} {...field("category")} />
      <SelectInput label="Brand" options={toOptions(brands)} error={errors.brand} {...field("brand")} />
      <SelectInput label="Dress style" options={toOptions(DRESS_STYLE_OPTIONS.map((name) => ({ name })))} {...field("dressStyle")} />
    </FieldRow>
  );
};
