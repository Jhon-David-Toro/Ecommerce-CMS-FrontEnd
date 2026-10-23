import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { createSubmitHandler } from "@/lib/shared/forms/submit";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import type { AuthFormOptions } from "./auth.types";
import { getErrorMessage, getPostLoginHref } from "./auth.utils";

/**
 * Keeps the state of a sign in or sign up form: validates it, authenticates and sends the user where they were going.
 *
 * @param options Form options.
 * @param options.initial Starting values of the form.
 * @param options.validate Finds the errors of the values.
 * @param options.authenticate Signs the user in or up with the valid values.
 * @param options.fallbackError Message shown when the failure has none of its own.
 * @returns The errors, the field helper, the failure message, the submitting flag and the submit handler.
 */
export const useAuthForm = <V extends object>({ initial, validate, authenticate, fallbackError }: AuthFormOptions<V>) => {
  const router = useRouter();
  const next = useSearchParams().get("next");
  const { values, errors, setErrors, field } = useFormValues(initial);
  const [failure, setFailure] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Authenticates with the valid values and redirects, or shows why it failed.
   *
   * @param valid Valid values from the form.
   */
  const submit = async (valid: V) => {
    setIsSubmitting(true);
    try {
      router.replace(getPostLoginHref(await authenticate(valid), next));
    } catch (error) {
      setFailure(getErrorMessage(error, fallbackError));
      setIsSubmitting(false);
    }
  };

  const handleSubmit = createSubmitHandler({ values, validate, setErrors, onValid: submit });

  return { errors, field, failure, isSubmitting, handleSubmit };
};
