import type { ReviewInput } from "@/lib/catalog/review.types";
import { compact, required } from "@/lib/shared/forms/validators";

import { TEXT_REQUIRED } from "./ReviewForm.constants";
import type { ReviewFormValues } from "./ReviewForm.types";

/**
 * Checks the review form.
 *
 * @param values Values typed by the shopper.
 * @returns The errors by field; empty when the form is valid.
 */
export const validateReview = (values: ReviewFormValues) => compact({ text: required(values.text, TEXT_REQUIRED) });

/**
 * Builds a review that waits for moderation.
 *
 * @param values Valid values from the form.
 * @param productId Product being reviewed.
 * @param author Name of the signed-in shopper.
 * @returns The review data.
 */
export const toReviewInput = (values: ReviewFormValues, productId: number, author: string): ReviewInput => ({
  productId,
  author,
  rating: Number(values.rating),
  text: values.text.trim(),
  date: new Date().toISOString(),
  verified: false,
  status: "pending",
});
