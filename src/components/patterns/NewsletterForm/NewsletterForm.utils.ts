import { compact, email, required } from "@/lib/shared/forms/validators";

import type { NewsletterValues } from "./NewsletterForm.types";

/**
 * Checks the newsletter form.
 *
 * @param values Values typed by the shopper.
 * @returns The errors by field; empty when the form is valid.
 */
export const validateNewsletter = (values: NewsletterValues) => compact({ email: required(values.email) ?? email(values.email) });
