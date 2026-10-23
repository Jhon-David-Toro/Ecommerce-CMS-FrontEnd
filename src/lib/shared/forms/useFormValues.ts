import { useState } from "react";
import type { ChangeEvent } from "react";

import type { Errors, FieldElement, FieldProps } from "./forms.types";

/**
 * Keeps the values and errors of a form and builds the props of its text fields.
 *
 * @param initial Starting values.
 * @returns The values, the errors, a setter for any field, the props of a text field and a reset.
 */
export const useFormValues = <T extends object>(initial: T) => {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});

  /**
   * Sets one field and clears its error.
   *
   * @param name Field name.
   * @param value New value.
   */
  const setField = <K extends keyof T>(name: K, value: T[K]) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name as string]: "" }));
  };

  /**
   * Builds the props that connect a text field to the form.
   *
   * @param name Field name; its value must be text.
   * @returns Name, value and change handler for the field.
   */
  const field = (name: keyof T & string): FieldProps => ({
    name,
    value: String(values[name] ?? ""),
    onChange: (event: ChangeEvent<FieldElement>) => setField(name, event.target.value as T[keyof T & string]),
  });

  /**
   * Puts the form back to its starting values.
   *
   * @param next Values to start from, defaulting to the initial ones.
   */
  const reset = (next: T = initial) => {
    setValues(next);
    setErrors({});
  };

  return { values, errors, setErrors, setField, field, reset };
};
