import { useState } from "react";

/**
 * Keeps a boolean that flips between true and false.
 *
 * @param initial Starting value.
 * @returns The value and the function that flips it.
 */
export const useToggle = (initial = false) => {
  const [value, setValue] = useState(initial);

  /**
   * Flips the value.
   */
  const toggle = () => setValue((current) => !current);

  return [value, toggle] as const;
};
