import type { CustomerReview } from "./HappyCustomers.types";

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "I’m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I’ve bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    rating: 5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    name: "James L.",
    rating: 5,
    text: "As someone who’s always on the lookout for unique fashion pieces, I’m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    name: "Monica P.",
    rating: 5,
    text: "Shop.co has become my go-to for all things fashion. The quality is top-notch, and the variety keeps me coming back for more!",
  },
];

export const MOBILE_MAX_WIDTH = 767;

export const TABLET_MAX_WIDTH = 1024;

export const ITEMS_PER_SLIDE = { mobile: 1, tablet: 2, desktop: 3 } as const;
