import type { TaxonomyValues } from "@/components/patterns/TaxonomyForm";
import type { Brand, BrandInput } from "@/lib/taxonomy/taxonomy.types";

/**
 * Builds the form values of a brand.
 *
 * @param brand Brand to edit.
 * @returns The form values.
 */
export const toValues = (brand: Brand): TaxonomyValues => ({
  name: brand.name,
  slug: brand.slug,
  picture: brand.logo,
  description: "",
  visible: brand.visible,
});

/**
 * Turns the form values into the data of a brand.
 *
 * @param values Values from the form.
 * @returns The brand input.
 */
export const fromValues = (values: TaxonomyValues): BrandInput => ({
  name: values.name.trim(),
  slug: values.slug,
  logo: values.picture.trim(),
  visible: values.visible,
});
