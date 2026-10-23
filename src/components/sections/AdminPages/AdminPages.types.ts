import type { StaticPage } from "@/lib/content/content.types";
import type { EditTarget } from "@/lib/shared/crud/crud.types";
import type { Errors, FieldProps } from "@/lib/shared/forms/forms.types";

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

export interface PageFieldsProps {
  field: (name: keyof PageFormValues & string) => FieldProps;
  errors: Errors;
  published: boolean;
  onPublishedChange: (published: boolean) => void;
}

export interface PagesHeaderProps {
  onNew: () => void;
}

export interface PagesEditorProps {
  editing: EditTarget<StaticPage>;
  onSubmit: (values: PageFormValues) => void;
  onCancel: () => void;
}

export interface PagesDeleteDialogProps {
  page: StaticPage | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface PageColumnHandlers {
  onEdit: (page: StaticPage) => void;
  onDelete: (page: StaticPage) => void;
}

export interface PageEditorView {
  key: string | number;
  heading: string;
  initial: PageFormValues;
}
