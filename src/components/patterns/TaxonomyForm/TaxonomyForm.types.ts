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
