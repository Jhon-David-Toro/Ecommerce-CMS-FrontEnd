import { IS_API_ENABLED } from "@/lib/shared/http/api.constants";

import * as mock from "./reviews.mock";
import * as remote from "./reviews.remote";

const source = IS_API_ENABLED ? remote : mock;

export const reviewRepository = mock.reviewRepository;
export const syncProductRating = mock.syncProductRating;
export const listReviews = source.listReviews;
export const listLatestReviews = source.listLatestReviews;
export const createReview = source.createReview;
export const setReviewStatus = source.setReviewStatus;
export const deleteReview = source.deleteReview;
