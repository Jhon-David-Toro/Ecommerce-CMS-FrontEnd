import type { ChangeEvent } from "react";

export type Errors = Record<string, string>;

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export interface FieldProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<FieldElement>) => void;
}
