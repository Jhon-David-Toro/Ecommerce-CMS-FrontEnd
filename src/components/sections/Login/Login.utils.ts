import type { Credentials } from "@/lib/auth/auth.types";
import { compact, email, required } from "@/lib/shared/forms/validators";

/**
 * Checks the sign in form.
 *
 * @param values Email and password typed by the user.
 * @returns The errors by field; empty when everything is valid.
 */
export const validateLogin = (values: Credentials) =>
  compact({ email: required(values.email) ?? email(values.email), password: required(values.password) });
