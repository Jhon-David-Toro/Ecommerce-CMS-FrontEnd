export const SORT_ORDERS = {
  latest: "Latest",
  oldest: "Oldest",
} as const;

export const SORT_OPTIONS = [SORT_ORDERS.latest, SORT_ORDERS.oldest] as const;

export const REVIEWS_PAGE_SIZE = 6;
