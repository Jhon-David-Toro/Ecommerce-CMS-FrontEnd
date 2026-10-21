import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";

import { useLens } from "./useLens";
import { useTouchZoom } from "./useTouchZoom";

/**
 * Drives the zoom lens of the main image with the mouse (desktop) and touches (mobile).
 *
 * @param isMobile True on small screens, where mouse movement is ignored.
 * @returns The image ref, the zoom state and the event handlers for the image container.
 */
export const useImageZoom = (isMobile: boolean) => {
  const { imageRef, isZooming, lensPosition, showLens, hideLens } = useLens();
  const cancelPendingMove = useTouchZoom(imageRef, showLens);

  /**
   * Follows the mouse on desktop.
   *
   * @param event Mouse event of the image container.
   */
  const onMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!isMobile) showLens(event.clientX, event.clientY);
  };

  /**
   * Starts the zoom where a touch begins.
   *
   * @param event Touch event of the image container.
   */
  const onTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event.touches[0];
    showLens(clientX, clientY);
  };

  /**
   * Turns the zoom off and drops any pending frame.
   */
  const stopZoom = () => {
    hideLens();
    cancelPendingMove();
  };

  return { imageRef, isZooming, lensPosition, onMouseMove, onTouchStart, onMouseLeave: stopZoom, onTouchEnd: stopZoom };
};
