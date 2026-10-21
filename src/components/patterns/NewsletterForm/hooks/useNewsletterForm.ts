import { useState } from "react";

import { subscribe } from "@/lib/newsletter/newsletter.api";
import { createSubmitHandler } from "@/lib/shared/forms/submit";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import { ALREADY_MESSAGE, INITIAL_NEWSLETTER, THANKS_MESSAGE } from "../NewsletterForm.constants";
import type { NewsletterValues } from "../NewsletterForm.types";
import { validateNewsletter } from "../NewsletterForm.utils";

/**
 * Keeps the state of the newsletter form and subscribes the email when it is valid.
 *
 * @returns The errors, the field helper, the confirmation message and the submit handler.
 */
export const useNewsletterForm = () => {
  const { values, errors, setErrors, field, reset } = useFormValues(INITIAL_NEWSLETTER);
  const [message, setMessage] = useState("");

  /**
   * Subscribes the email, clears the field and tells the shopper what happened.
   *
   * @param valid Valid values from the form.
   */
  const send = async (valid: NewsletterValues) => {
    const added = await subscribe(valid.email);
    reset();
    setMessage(added ? THANKS_MESSAGE : ALREADY_MESSAGE);
  };

  const handleSubmit = createSubmitHandler({ values, validate: validateNewsletter, setErrors, onValid: send });

  return { errors, field, message, handleSubmit };
};
