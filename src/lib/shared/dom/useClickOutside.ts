import { useEffect } from "react";
import type { RefObject } from "react";

import { OUTSIDE_EVENTS } from "./dom.constants";

/**
 * Calls `handler` when a press starts outside of `element`.
 *
 * @param element Element that counts as "inside".
 * @param handler Called when the press starts outside of `element`.
 * @returns A function that removes the listeners.
 */
export const listenOutsidePress = (element: HTMLElement | null, handler: () => void) => {
  /**
   * Forwards presses whose target is not inside `element`.
   *
   * @param event Mouse or touch event received by the document.
   */
  const onPress = (event: Event) => {
    if (element && !element.contains(event.target as Node)) handler();
  };

  OUTSIDE_EVENTS.forEach((name) => document.addEventListener(name, onPress));
  return () => OUTSIDE_EVENTS.forEach((name) => document.removeEventListener(name, onPress));
};

/**
 * Runs `handler` when the user presses outside of the referenced element.
 *
 * @param ref Reference to the element that counts as "inside".
 * @param handler Called when the press starts outside of the element.
 */
export const useClickOutside = (ref: RefObject<HTMLElement | null>, handler: () => void) => {
  useEffect(() => listenOutsidePress(ref.current, handler), [ref, handler]);
};
