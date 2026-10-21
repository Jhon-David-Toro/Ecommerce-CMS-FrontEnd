import { useCallback, useEffect } from "react";
import type { RefObject } from "react";

import { useFrameScheduler } from "@/lib/shared/dom/useFrameScheduler";

import { subscribeTouchMove } from "../MainImage.utils";

/**
 * Follows a finger dragging over an element, once per animation frame, without scrolling the page.
 *
 * @param elementRef Reference to the element that receives the touches.
 * @param onMove Called with the finger position on every frame.
 * @returns A function that drops the pending frame.
 */
export const useTouchZoom = (elementRef: RefObject<HTMLElement | null>, onMove: (clientX: number, clientY: number) => void) => {
  const frame = useFrameScheduler();

  /**
   * Schedules the lens move for the next frame.
   *
   * @param event Native touch move event.
   */
  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      const { clientX, clientY } = event.touches[0];
      frame.schedule(() => onMove(clientX, clientY));
    },
    [frame, onMove],
  );

  useEffect(() => {
    const unsubscribe = subscribeTouchMove(elementRef.current, onTouchMove);
    return () => {
      unsubscribe?.();
      frame.cancel();
    };
  }, [elementRef, onTouchMove, frame]);

  return frame.cancel;
};
