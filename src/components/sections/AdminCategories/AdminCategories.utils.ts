import type { TaxonomyValues } from "@/components/patterns/TaxonomyForm";
import type { Category, CategoryInput } from "@/lib/taxonomy/taxonomy.types";

/**
 * Builds the form values of a category.
 *
 * @param category Category to edit.
 * @returns The form values.
 */
export const toValues = (category: Category): TaxonomyValues => ({
  name: category.name,
  slug: category.slug,
  picture: category.image,
  description: category.description,
  visible: category.visible,
});

/**
 * Turns the form values into the data of a category.
 *
 * @param values Values from the form.
 * @returns The category input.
 */
export const fromValues = (values: TaxonomyValues): CategoryInput => ({
  name: values.name.trim(),
  slug: values.slug,
  image: values.picture.trim(),
  description: values.description.trim(),
  visible: values.visible,
});
