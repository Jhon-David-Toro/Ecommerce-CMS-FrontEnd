import type { Errors, FieldProps } from "@/lib/shared/forms/forms.types";

export interface TaxonomyValues {
  name: string;
  slug: string;
  picture: string;
  description: string;
  visible: boolean;
}

export interface TaxonomyFormProps {
  initial: TaxonomyValues;
  imageLabel: string;
  withDescription?: boolean;
  title: string;
  onSubmit: (values: TaxonomyValues) => void;
  onCancel: () => void;
}

export interface TaxonomyFieldsProps {
  field: (name: keyof TaxonomyValues & string) => FieldProps;
  errors: Errors;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  imageLabel: string;
  withDescription: boolean;
}
