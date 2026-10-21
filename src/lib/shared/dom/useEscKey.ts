import { useEffect } from "react";
import type { RefObject } from "react";

import { KEYS } from "./keys.constants";

/**
 * Calls `handler` when Escape is pressed while focus is inside `scope` (or anywhere when no scope is given).
 *
 * @param scope Element that must contain the focus, or null for the whole document.
 * @param handler Called on Escape.
 * @returns A function that removes the listener.
 */
export const listenEscape = (scope: HTMLElement | null, handler: () => void) => {
  /**
   * Handles a key press on the document.
   *
   * @param event Keyboard event received by the document.
   */
  const onKeyDown = (event: KeyboardEvent) => {
    const isOutsideScope = scope && !scope.contains(document.activeElement);
    if (event.key === KEYS.escape && !isOutsideScope) handler();
  };

  document.addEventListener("keydown", onKeyDown);
  return () => document.removeEventListener("keydown", onKeyDown);
};

/**
 * Runs `handler` when Escape is pressed while the referenced element holds the focus.
 *
 * @param ref Reference to the element that scopes the shortcut, or null for the whole document.
 * @param handler Called on Escape.
 * @param isActive Turns the shortcut on or off.
 */
export const useEscKey = (ref: RefObject<HTMLElement | null> | null, handler: () => void, isActive = true) => {
  useEffect(() => (isActive ? listenEscape(ref?.current ?? null, handler) : undefined), [ref, handler, isActive]);
};
