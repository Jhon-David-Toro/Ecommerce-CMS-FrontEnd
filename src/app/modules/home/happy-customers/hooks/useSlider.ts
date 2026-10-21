import { useState } from "react";

import type { UseSliderParams } from "../HappyCustomers.types";
import { getNextSlide, getPreviousSlide } from "../HappyCustomers.utils";

/**
 * Keeps the position of a looping slider.
 *
 * @param params Slider measurements.
 * @param params.total Number of items.
 * @param params.itemsPerSlide Items visible at once.
 * @returns The current position, the two movers and whether there is nothing to scroll.
 */
export const useSlider = ({ total, itemsPerSlide }: UseSliderParams) => {
  const [position, setPosition] = useState(0);
  const lastIndex = Math.max(total - itemsPerSlide, 0);
  const currentSlide = Math.min(position, lastIndex);

  /**
   * Moves to the next position.
   */
  const next = () => setPosition(getNextSlide(currentSlide, lastIndex));

  /**
   * Moves to the previous position.
   */
  const previous = () => setPosition(getPreviousSlide(currentSlide, lastIndex));

  return { currentSlide, next, previous, isStatic: lastIndex === 0 };
};
