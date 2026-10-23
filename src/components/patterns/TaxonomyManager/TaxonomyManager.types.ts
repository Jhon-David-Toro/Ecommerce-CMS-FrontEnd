import type { TaxonomyValues } from "@/components/patterns/TaxonomyForm";
import type { Entity, NewEntity, Repository } from "@/lib/mock/repository.types";
import type { EditTarget } from "@/lib/shared/crud/crud.types";

export interface TaxonomyRecord extends Entity {
  name: string;
  slug: string;
  visible: boolean;
}

export interface TaxonomyConfig<T extends TaxonomyRecord> {
  title: string;
  description: string;
  singular: string;
  deleteNote: string;
  imageLabel: string;
  withDescription?: boolean;
  getImage: (record: T) => string;
  load: () => Promise<T[]>;
  repository: Repository<T>;
  emptyValues: TaxonomyValues;
  toValues: (record: T) => TaxonomyValues;
  toInput: (values: TaxonomyValues) => NewEntity<T>;
}

export interface TaxonomyManagerProps<T extends TaxonomyRecord> {
  config: TaxonomyConfig<T>;
}

export interface TaxonomyHeaderProps {
  title: string;
  description: string;
  singular: string;
  onNew: () => void;
}

export interface TaxonomyEditorProps<T extends TaxonomyRecord> {
  config: TaxonomyConfig<T>;
  editing: EditTarget<T>;
  onSubmit: (values: TaxonomyValues) => void;
  onCancel: () => void;
}

export interface TaxonomyDeleteDialogProps<T extends TaxonomyRecord> {
  record: T | null;
  singular: string;
  note: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface TaxonomyColumnHandlers<T> {
  getImage: (record: T) => string;
  onEdit: (record: T) => void;
  onDelete: (record: T) => void;
}

export interface EditorView {
  key: string | number;
  title: string;
  initial: TaxonomyValues;
}
