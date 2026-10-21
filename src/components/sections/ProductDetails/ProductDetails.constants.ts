export const PRODUCT_TABS = {
  details: "Product Details",
  reviews: "Rating & Reviews",
  faqs: "FAQs",
} as const;

export const TAB_LABELS = [PRODUCT_TABS.details, PRODUCT_TABS.reviews, PRODUCT_TABS.faqs];

export const DEFAULT_TAB = PRODUCT_TABS.reviews;

export const TAB_SWITCH_DELAY_MS = 50;

export const NO_OPTIONS = {};
