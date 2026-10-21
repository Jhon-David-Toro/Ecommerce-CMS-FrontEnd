import { compact, required } from "@/lib/shared/forms/validators";
import { slugify } from "@/lib/shared/text/text";

import type { TaxonomyValues } from "./TaxonomyForm.types";

/**
 * Checks the taxonomy form.
 *
 * @param values Values from the form.
 * @returns The errors by field; empty when the form is valid.
 */
export const validateTaxonomy = (values: TaxonomyValues) => compact({ name: required(values.name) });

/**
 * Completes the values before they leave the form.
 *
 * @param values Valid values from the form.
 * @returns The values with a slug built from the name when none was typed.
 */
export const toSubmittedValues = (values: TaxonomyValues): TaxonomyValues => ({
  ...values,
  slug: slugify(values.slug || values.name),
});
