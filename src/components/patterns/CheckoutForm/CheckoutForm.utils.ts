import { compact, email, required } from "@/lib/shared/forms/validators";

import { EMPTY_CHECKOUT } from "./CheckoutForm.constants";
import type { CheckoutValues } from "./CheckoutForm.types";

/**
 * Builds the starting values of the checkout form.
 *
 * @param defaultEmail Email to prefill.
 * @returns The initial values.
 */
export const buildInitialValues = (defaultEmail: string): CheckoutValues => ({ ...EMPTY_CHECKOUT, email: defaultEmail });

/**
 * Checks the checkout form.
 *
 * @param values Values typed by the shopper.
 * @returns The errors by field; empty when everything is valid.
 */
export const validateCheckout = (values: CheckoutValues) =>
  compact({
    email: required(values.email) ?? email(values.email),
    phone: required(values.phone),
    fullName: required(values.fullName),
    street: required(values.street),
    city: required(values.city),
    postalCode: required(values.postalCode),
    country: required(values.country),
  });
