import { Input } from "@/components/ui/Input";
import { SelectInput } from "@/components/ui/SelectInput";
import { DRESS_STYLE_OPTIONS } from "@/lib/taxonomy/taxonomy.constants";

import { STATUS_OPTIONS } from "../AdminProductForm.constants";
import type { BasicsFieldsProps } from "../AdminProductForm.types";
import styles from "../AdminProductForm.module.scss";

const toOptions = (names: readonly string[]) => [{ value: "", label: "Choose..." }, ...names.map((name) => ({ value: name, label: name }))];

/**
 * ProductForm/Basics: name, classification, price, stock and publication status.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @param props.brands Brands to choose from.
 * @param props.categories Categories to choose from.
 * @returns The group of fields.
 */
export const BasicsFields = ({ field, errors, brands, categories }: BasicsFieldsProps) => (
  <fieldset className={styles.group}>
    <legend className={styles.group__legend}>Basics</legend>
    <Input label="Name" error={errors.name} {...field("name")} />
    <Input label="Slug" hint="Leave empty to build it from the name." {...field("slug")} />
    <div className={styles.group__row}>
      <SelectInput
        label="Category"
        options={toOptions(categories.map((category) => category.name))}
        error={errors.category}
        {...field("category")}
      />
      <SelectInput label="Brand" options={toOptions(brands.map((brand) => brand.name))} error={errors.brand} {...field("brand")} />
      <SelectInput label="Dress style" options={toOptions(DRESS_STYLE_OPTIONS)} {...field("dressStyle")} />
    </div>
    <div className={styles.group__row}>
      <Input label="Price" type="number" min="0" step="0.01" error={errors.price} {...field("price")} />
      <Input
        label="Offer price"
        type="number"
        min="0"
        step="0.01"
        hint="Optional"
        error={errors.discountPrice}
        {...field("discountPrice")}
      />
      <Input label="Stock" type="number" min="0" error={errors.stock} {...field("stock")} />
    </div>
    <SelectInput label="Status" options={STATUS_OPTIONS} {...field("status")} />
  </fieldset>
);
