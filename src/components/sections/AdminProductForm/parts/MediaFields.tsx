import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { ALL_SIZES } from "@/lib/catalog/catalog.constants";
import { toggleItem } from "@/lib/shared/collections/collections";

import type { MediaFieldsProps } from "../AdminProductForm.types";
import styles from "../AdminProductForm.module.scss";

/**
 * ProductForm/Media: pictures, colors and sizes of the product.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @param props.sizes Selected sizes.
 * @param props.onSizesChange Receives the new selection of sizes.
 * @returns The group of fields.
 */
export const MediaFields = ({ field, errors, sizes, onSizesChange }: MediaFieldsProps) => (
  <fieldset className={styles.group}>
    <legend className={styles.group__legend}>Pictures, colors and sizes</legend>
    <Input label="Main image address" type="url" error={errors.image} {...field("image")} />
    <TextArea label="Extra images" hint="One address per line." {...field("images")} />
    <TextArea label="Colors" hint="One per line as Name,#hex (for example Navy,#1E3A8A)." error={errors.colors} {...field("colors")} />
    <div role="group" aria-label="Sizes" className={styles.group__sizes}>
      {ALL_SIZES.map((size) => (
        <Checkbox key={size} label={size} checked={sizes.includes(size)} onChange={() => onSizesChange(toggleItem(sizes, size))} />
      ))}
    </div>
    {errors.sizes && (
      <p className={styles.group__error} role="alert">
        {errors.sizes}
      </p>
    )}
  </fieldset>
);
