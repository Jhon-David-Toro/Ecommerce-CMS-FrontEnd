import { MIN_PASSWORD_LENGTH } from "@/lib/auth/auth.constants";
import { compact, email, minLength, required } from "@/lib/shared/forms/validators";

import type { RegisterValues } from "./Register.types";

/**
 * Checks the registration form.
 *
 * @param values Values typed by the user.
 * @returns The errors by field; empty when everything is valid.
 */
export const validateRegister = (values: RegisterValues) =>
  compact({
    name: required(values.name),
    email: required(values.email) ?? email(values.email),
    password: required(values.password) ?? minLength(values.password, MIN_PASSWORD_LENGTH),
    confirm: values.confirm === values.password ? undefined : "The passwords do not match.",
  });
