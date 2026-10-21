import { useState } from "react";

import { getErrorMessage } from "@/lib/auth/auth.utils";
import { createSubmitHandler } from "@/lib/shared/forms/submit";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import { SAVE_FALLBACK } from "../Account.constants";
import type { AccountFormOptions } from "../Account.types";

/**
 * Keeps the state of one account form: validates it, saves it and tells the customer how it went.
 *
 * @param options Form options.
 * @param options.initial Starting values.
 * @param options.validate Finds the errors of the values.
 * @param options.submit Saves the valid values.
 * @param options.success Message shown after saving.
 * @param options.resetOnSuccess Clears the form after saving, for example to empty password fields.
 * @returns The errors, the field helper, the notice and the submit handler.
 */
export const useAccountForm = <V extends object>({ initial, validate, submit, success, resetOnSuccess = false }: AccountFormOptions<V>) => {
  const { values, errors, setErrors, field, reset } = useFormValues(initial);
  const [notice, setNotice] = useState({ message: "", failed: false });

  /**
   * Saves the values and shows the result.
   *
   * @param valid Valid values from the form.
   */
  const save = async (valid: V) => {
    try {
      await submit(valid);
      if (resetOnSuccess) reset();
      setNotice({ message: success, failed: false });
    } catch (error) {
      setNotice({ message: getErrorMessage(error, SAVE_FALLBACK), failed: true });
    }
  };

  const handleSubmit = createSubmitHandler({ values, validate, setErrors, onValid: save });

  return { errors, field, notice, handleSubmit };
};
