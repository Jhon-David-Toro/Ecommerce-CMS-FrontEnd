import { useState } from "react";

import type { Entity } from "@/lib/mock/repository.types";

import type { EditTarget, RecordEditorOptions } from "./crud.types";

/**
 * Keeps the record that is being deleted, which the confirmation dialog shows.
 *
 * @returns The record and the actions that set or clear it.
 */
const useDeleteTarget = <T extends Entity>() => {
  const [toDelete, setToDelete] = useState<T | null>(null);

  return { toDelete, askDelete: (record: T) => setToDelete(record), cancelDelete: () => setToDelete(null) };
};

/**
 * Keeps the record that is being edited, or "new" while a record is being created.
 *
 * @returns The target and the actions that change it.
 */
const useEditTarget = <T extends Entity>() => {
  const [editing, setEditing] = useState<EditTarget<T>>(null);

  return {
    editing,
    startNew: () => setEditing("new"),
    startEdit: (record: T) => setEditing(record),
    cancelEdit: () => setEditing(null),
  };
};

/**
 * Keeps the state of a create, edit and delete screen for one kind of record.
 *
 * @param options Editor options.
 * @param options.repository Where the records are stored.
 * @param options.toInput Turns the form values into the data of a record.
 * @param options.reload Refreshes the list after a change.
 * @returns The record being edited or deleted and the actions that change them.
 */
export const useRecordEditor = <T extends Entity, V>({ repository, toInput, reload }: RecordEditorOptions<T, V>) => {
  const edit = useEditTarget<T>();
  const remove = useDeleteTarget<T>();

  /**
   * Creates or updates the record being edited and refreshes the list.
   *
   * @param values Values from the form.
   */
  const save = async (values: V) => {
    if (edit.editing === "new") await repository.create(toInput(values));
    else if (edit.editing) await repository.update(edit.editing.id, toInput(values));
    edit.cancelEdit();
    reload();
  };

  /**
   * Deletes the record chosen in the confirmation dialog and refreshes the list.
   */
  const confirmDelete = async () => {
    if (remove.toDelete) await repository.remove(remove.toDelete.id);
    remove.cancelDelete();
    reload();
  };

  return { ...edit, ...remove, save, confirmDelete };
};
