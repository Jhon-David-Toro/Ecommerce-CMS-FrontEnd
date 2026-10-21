import { MIN_PASSWORD_LENGTH } from "@/lib/auth/auth.constants";
import { compact, email, minLength, required } from "@/lib/shared/forms/validators";

import type { PasswordValues, ProfileValues } from "./Account.types";

/**
 * Checks the profile form.
 *
 * @param values Name and email typed by the customer.
 * @returns The errors by field; empty when everything is valid.
 */
export const validateProfile = (values: ProfileValues) =>
  compact({ name: required(values.name), email: required(values.email) ?? email(values.email) });

/**
 * Checks the password form.
 *
 * @param values Current, new and repeated password.
 * @returns The errors by field; empty when everything is valid.
 */
export const validatePassword = (values: PasswordValues) =>
  compact({
    current: required(values.current),
    next: required(values.next) ?? minLength(values.next, MIN_PASSWORD_LENGTH),
    confirm: values.confirm === values.next ? undefined : "The passwords do not match.",
  });
