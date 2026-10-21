import { useRef, useState } from "react";

import { useClickOutside } from "@/lib/shared/dom/useClickOutside";

import type { UseSelectParams } from "../Select.types";

/**
 * Keeps the open state of a select and closes it when the user presses outside.
 *
 * @param params Select options.
 * @param params.onChange Called with the option the user picks.
 * @returns The container ref, the open state and the two actions.
 */
export const useSelect = ({ onChange }: UseSelectParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpen(false));

  /**
   * Opens the listbox when closed and closes it when open.
   */
  const toggle = () => setIsOpen((open) => !open);

  /**
   * Reports the picked option and closes the listbox.
   *
   * @param option Option the user picked.
   */
  const select = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return { containerRef, isOpen, toggle, select };
};
