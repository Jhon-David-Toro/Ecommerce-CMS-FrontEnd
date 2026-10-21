import { useState } from "react";

/**
 * Tracks whether an image has finished loading, to swap a placeholder for the picture.
 *
 * @returns The loaded flag and the callback to pass to the image `onLoad`.
 */
export const useImageLoaded = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Marks the image as loaded.
   */
  const onLoad = () => setIsLoaded(true);

  return { isLoaded, onLoad };
};
