import { HALF_STAR_THRESHOLD, MAX_RATING } from "./Rating.constants";
import type { StarKind } from "./Rating.types";

/**
 * Lists the kind of each of the five stars for a rating.
 *
 * @param rating Rating value between 0 and 5.
 * @returns One entry per star: full, then at most one half, then empty ones.
 */
export const buildStars = (rating: number): StarKind[] => {
  const full = Math.floor(rating);
  const half = rating % 1 >= HALF_STAR_THRESHOLD ? 1 : 0;
  const empty = Math.max(MAX_RATING - full - half, 0);

  return [...Array<StarKind>(full).fill("full"), ...Array<StarKind>(half).fill("half"), ...Array<StarKind>(empty).fill("empty")];
};
