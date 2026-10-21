import { useState } from "react";

/**
 * Keeps whether the text of a password field is visible.
 *
 * @param type Native type of the input.
 * @param revealable Whether the field offers a show/hide button.
 * @returns The type to give the input, whether the button applies, whether the text is visible and a function that flips it.
 */
export const useReveal = (type: string | undefined, revealable: boolean | undefined) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const canReveal = Boolean(revealable) && type === "password";

  return { inputType: canReveal && isRevealed ? "text" : type, canReveal, isRevealed, toggle: () => setIsRevealed(!isRevealed) };
};
