import { useSyncExternalStore } from "react";

import { SERVER_WINDOW_WIDTH } from "./dom.constants";

/**
 * Subscribes to window resizes.
 *
 * @param onChange Called after every resize.
 * @returns A function that removes the listener.
 */
export const subscribeResize = (onChange: () => void) => {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
};

/**
 * Reads the current window width.
 *
 * @returns The inner width of the window in pixels.
 */
export const getWindowWidth = () => window.innerWidth;

/**
 * Reads the width assumed while rendering on the server.
 *
 * @returns A desktop width in pixels.
 */
export const getServerWindowWidth = () => SERVER_WINDOW_WIDTH;

/**
 * Tracks the window width without effects or extra state.
 *
 * @returns The inner width of the window in pixels.
 */
export const useWindowWidth = () => useSyncExternalStore(subscribeResize, getWindowWidth, getServerWindowWidth);
