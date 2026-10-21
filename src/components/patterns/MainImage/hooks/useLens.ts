import { useCallback, useRef, useState } from "react";

import { ZERO_POSITION } from "../MainImage.constants";
import { getLensPosition } from "../MainImage.utils";

/**
 * Keeps the position of the zoom lens over an element and whether the zoom is on.
 *
 * @returns The element ref, the zoom state and the two actions.
 */
export const useLens = () => {
  const [isZooming, setIsZooming] = useState(false);
  const [lensPosition, setLensPosition] = useState(ZERO_POSITION);
  const imageRef = useRef<HTMLDivElement>(null);

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
   * Turns the zoom off.
   */
  const hideLens = useCallback(() => setIsZooming(false), []);

  return { imageRef, isZooming, lensPosition, showLens, hideLens };
};
