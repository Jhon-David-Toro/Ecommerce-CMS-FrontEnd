import { useState } from "react";

import { createReview } from "@/lib/catalog/reviews.api";
import { createSubmitHandler } from "@/lib/shared/forms/submit";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import { INITIAL_REVIEW, SAVE_ERROR, THANKS_MESSAGE } from "../ReviewForm.constants";
import type { ReviewFormBodyProps, ReviewFormValues } from "../ReviewForm.types";
import { toReviewInput, validateReview } from "../ReviewForm.utils";

/**
 * Keeps the state of the review form and sends the review for moderation when it is valid.
 *
 * @param props Hook inputs.
 * @param props.productId Product being reviewed.
 * @param props.user Signed-in shopper.
 * @returns The errors, the field helper, the message to show and the submit handler.
 */
export const useReviewForm = ({ productId, user }: ReviewFormBodyProps) => {
  const { values, errors, setErrors, field, reset } = useFormValues(INITIAL_REVIEW);
  const [notice, setNotice] = useState({ message: "", failed: false });

  /**
   * Sends the review and clears the form, or shows why it failed.
   *
   * @param valid Valid values from the form.
   */
  const send = async (valid: ReviewFormValues) => {
    try {
      await createReview(toReviewInput(valid, productId, user.name));
      reset();
      setNotice({ message: THANKS_MESSAGE, failed: false });
    } catch {
      setNotice({ message: SAVE_ERROR, failed: true });
    }
  };

  const handleSubmit = createSubmitHandler({ values, validate: validateReview, setErrors, onValid: send });

  return { errors, field, notice, handleSubmit };
};
