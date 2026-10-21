export interface PageFormValues {
  title: string;
  slug: string;
  body: string;
  published: boolean;
}

export interface PageFormProps {
  initial: PageFormValues;
  heading: string;
  onSubmit: (values: PageFormValues) => void;
  onCancel: () => void;
}
