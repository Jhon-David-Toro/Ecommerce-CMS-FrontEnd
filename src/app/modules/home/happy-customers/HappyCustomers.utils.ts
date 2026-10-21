import { ITEMS_PER_SLIDE, MOBILE_MAX_WIDTH, TABLET_MAX_WIDTH } from "./HappyCustomers.constants";

/**
 * Chooses how many reviews fit in the slider for a window width.
 *
 * @param width Window width in pixels.
 * @returns Number of reviews shown at once.
 */
export const getItemsPerSlide = (width: number) => {
  if (width < MOBILE_MAX_WIDTH) return ITEMS_PER_SLIDE.mobile;
  return width < TABLET_MAX_WIDTH ? ITEMS_PER_SLIDE.tablet : ITEMS_PER_SLIDE.desktop;
};

/**
 * Moves one slide forward, wrapping to the start after the last position.
 *
 * @param current Current slide index.
 * @param lastIndex Highest valid slide index.
 * @returns The next slide index.
 */
export const getNextSlide = (current: number, lastIndex: number) => (current >= lastIndex ? 0 : current + 1);

/**
 * Moves one slide back, wrapping to the end before the first position.
 *
 * @param current Current slide index.
 * @param lastIndex Highest valid slide index.
 * @returns The previous slide index.
 */
export const getPreviousSlide = (current: number, lastIndex: number) => (current <= 0 ? lastIndex : current - 1);
