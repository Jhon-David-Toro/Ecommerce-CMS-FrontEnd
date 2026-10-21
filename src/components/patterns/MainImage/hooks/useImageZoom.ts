import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";

import { useFrameScheduler } from "@/lib/shared/dom/useFrameScheduler";

import { ZERO_POSITION } from "../MainImage.constants";
import { getLensPosition, subscribeTouchMove } from "../MainImage.utils";

/**
 * Drives the zoom lens of the main image with the mouse (desktop) and touches (mobile).
 *
 * @param isMobile True on small screens, where mouse movement is ignored.
 * @returns The image ref, the zoom state and the event handlers for the image container.
 */
export const useImageZoom = (isMobile: boolean) => {
  const [isZooming, setIsZooming] = useState(false);
  const [lensPosition, setLensPosition] = useState(ZERO_POSITION);
  const imageRef = useRef<HTMLDivElement>(null);
  const frame = useFrameScheduler();

  /**
   * Moves the lens under the pointer and turns the zoom on.
   *
   * @param clientX Pointer X in viewport coordinates.
   * @param clientY Pointer Y in viewport coordinates.
   */
  const showLens = useCallback((clientX: number, clientY: number) => {
    const position = getLensPosition(imageRef.current, clientX, clientY);
    if (!position) return;
    setLensPosition(position);
    setIsZooming(true);
  }, []);

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
   * Follows a dragging finger once per animation frame.
   *
   * @param event Native touch move event.
   */
  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      const { clientX, clientY } = event.touches[0];
      frame.schedule(() => showLens(clientX, clientY));
    },
    [frame, showLens],
  );

  /**
   * Turns the zoom off and drops any pending frame.
   */
  const stopZoom = () => {
    setIsZooming(false);
    frame.cancel();
  };

  useEffect(() => {
    const unsubscribe = subscribeTouchMove(imageRef.current, onTouchMove);
    return () => {
      unsubscribe?.();
      frame.cancel();
    };
  }, [onTouchMove, frame]);

  return { imageRef, isZooming, lensPosition, onMouseMove, onTouchStart, onMouseLeave: stopZoom, onTouchEnd: stopZoom };
};
