import { useState } from "react";

import { resetContent, saveContent } from "@/lib/content/content.api";
import type { SiteContent } from "@/lib/content/content.types";
import { createSubmitHandler } from "@/lib/shared/forms/submit";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import { RESET_NOTICE, SAVED_NOTICE } from "../AdminContent.constants";
import type { ContentFormValues } from "../AdminContent.types";
import { toContent, toFormValues, validateContent } from "../AdminContent.utils";

/**
 * Keeps the state of the site content form, saves it when valid and restores the original content on request.
 *
 * @param content Saved content, used as the starting values.
 * @returns The values, errors and field helpers, the notice to show and the submit and reset handlers.
 */
export const useContentForm = (content: SiteContent) => {
  const { values, errors, setErrors, setField, field, reset } = useFormValues(toFormValues(content));
  const [notice, setNotice] = useState("");

  /**
   * Hides the notice and checks the values.
   *
   * @param candidate Values from the form.
   * @returns The errors by field.
   */
  const validate = (candidate: ContentFormValues) => {
    setNotice("");
    return validateContent(candidate);
  };

  /**
   * Saves the content and tells the admin.
   *
   * @param valid Valid values from the form.
   */
  const save = async (valid: ContentFormValues) => {
    await saveContent(toContent(valid));
    setNotice(SAVED_NOTICE);
  };

  /**
   * Puts every text back to the original one that ships with the store.
   */
  const handleReset = async () => {
    reset(toFormValues(await resetContent()));
    setNotice(RESET_NOTICE);
  };

  const handleSubmit = createSubmitHandler({ values, validate, setErrors, onValid: save });

  return { values, errors, setField, field, notice, handleSubmit, handleReset };
};
