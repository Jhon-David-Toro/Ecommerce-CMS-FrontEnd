import { useState } from "react";

import type { Entity } from "@/lib/mock/repository.types";

import type { ConfirmedDeleteOptions } from "./crud.types";

/**
 * Keeps the record that waits for a delete confirmation and removes it once the admin confirms.
 *
 * @param options Delete options.
 * @param options.remove Deletes a record by id.
 * @param options.reload Refreshes the list after the deletion.
 * @returns The record to delete and the actions that ask, confirm or cancel the deletion.
 */
export const useConfirmedDelete = <T extends Entity>({ remove, reload }: ConfirmedDeleteOptions) => {
  const [toDelete, setToDelete] = useState<T | null>(null);

  /**
   * Deletes the record that waits for confirmation and refreshes the list.
   */
  const confirmDelete = async () => {
    if (toDelete) await remove(toDelete.id);
    setToDelete(null);
    reload();
  };

  return { toDelete, confirmDelete, askDelete: (record: T) => setToDelete(record), cancelDelete: () => setToDelete(null) };
};
