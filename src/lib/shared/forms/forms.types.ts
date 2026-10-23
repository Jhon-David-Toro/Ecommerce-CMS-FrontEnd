import type { ChangeEvent } from "react";

export type Errors = Record<string, string>;

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export interface SubmitHandlerOptions<V> {
  values: V;
  validate: (values: V) => Errors;
  setErrors: (errors: Errors) => void;
  onValid: (values: V) => void | Promise<void>;
}

export interface FieldProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<FieldElement>) => void;
}
