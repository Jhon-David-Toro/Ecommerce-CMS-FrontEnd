import type { SubmitEvent } from "react";

import type { SubmitHandlerOptions } from "./forms.types";

/**
 * Builds the submit handler of a form: it validates the values and only sends them when there are no errors.
 *
 * @param options Handler options.
 * @param options.values Current values of the form.
 * @param options.validate Finds the errors of the values.
 * @param options.setErrors Shows the errors in the form.
 * @param options.onValid Called with the values when they are valid.
 * @returns The handler for the `onSubmit` of the form.
 */
export const createSubmitHandler =
  <V>({ values, validate, setErrors, onValid }: SubmitHandlerOptions<V>) =>
  (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (!Object.keys(found).length) onValid(values);
  };
