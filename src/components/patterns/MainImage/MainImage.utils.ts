import { IMAGE_CONFIG } from "@/lib/catalog/imageConfig.constants";
import type { Position } from "@/lib/shared/geometry/position.types";
import type { Rect } from "@/lib/shared/geometry/rect.types";

import type { ImageSize } from "./MainImage.types";

/**
 * Keeps the zoom lens inside the image around the pointer.
 *
 * @param clientX Pointer X in viewport coordinates.
 * @param clientY Pointer Y in viewport coordinates.
 * @param rect Bounds of the image in viewport coordinates.
 * @returns The center of the lens inside the image.
 */
export const calculateLensPosition = (clientX: number, clientY: number, rect: Rect): Position => {
  const half = IMAGE_CONFIG.LENS_SIZE / 2;
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  return {
    x: Math.max(half, Math.min(rect.width - half, x)),
    y: Math.max(half, Math.min(rect.height - half, y)),
  };
};

/**
 * Measures how far the enlarged image must be shifted to show the area under the lens.
 *
 * @param lensPosition Center of the lens inside the image.
 * @param width Width of the unzoomed image in pixels.
 * @param height Height of the unzoomed image in pixels.
 * @returns The horizontal and vertical shift in pixels.
 */
export const calculateZoomedImageTranslate = (lensPosition: Position, width: number, height: number): Position => {
  const half = IMAGE_CONFIG.LENS_SIZE / 2;

  return {
    x: Math.min(Math.max(0, (lensPosition.x - half) * IMAGE_CONFIG.ZOOM_FACTOR), width * IMAGE_CONFIG.ZOOM_FACTOR - width),
    y: Math.min(Math.max(0, (lensPosition.y - half) * IMAGE_CONFIG.ZOOM_FACTOR), height * IMAGE_CONFIG.ZOOM_FACTOR - height),
  };
};

/**
 * Chooses the image size for the current viewport.
 *
 * @param isMobile True on small screens.
 * @returns Width and height in pixels.
 */
export const getImageSize = (isMobile: boolean): ImageSize =>
  isMobile
    ? { width: IMAGE_CONFIG.ZOOMED_IMAGE_WIDTH_MOBILE, height: IMAGE_CONFIG.ZOOMED_IMAGE_HEIGHT_MOBILE }
    : { width: IMAGE_CONFIG.ZOOMED_IMAGE_WIDTH, height: IMAGE_CONFIG.ZOOMED_IMAGE_HEIGHT };

/**
 * Computes the lens position for a pointer over an element.
 *
 * @param element Element that shows the image, or null before it mounts.
 * @param clientX Pointer X in viewport coordinates.
 * @param clientY Pointer Y in viewport coordinates.
 * @returns The lens position, or null when there is no element.
 */
export const getLensPosition = (element: HTMLElement | null, clientX: number, clientY: number) =>
  element ? calculateLensPosition(clientX, clientY, element.getBoundingClientRect()) : null;

/**
 * Listens to non-passive touch moves so the page does not scroll while zooming.
 *
 * @param element Element that receives the touches, or null before it mounts.
 * @param listener Called on every touch move.
 * @returns A function that removes the listener.
 */
export const subscribeTouchMove = (element: HTMLElement | null, listener: (event: TouchEvent) => void) => {
  if (!element) return undefined;
  element.addEventListener("touchmove", listener, { passive: false });
  return () => element.removeEventListener("touchmove", listener);
};
