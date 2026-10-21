import { useState } from "react";

import { saveSettings } from "@/lib/settings/settings.api";
import type { StoreSettings } from "@/lib/settings/settings.types";
import { createSubmitHandler } from "@/lib/shared/forms/submit";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import type { SettingsFormValues } from "../AdminSettings.types";
import { toFormValues, toSettings, validateSettings } from "../AdminSettings.utils";

/**
 * Keeps the state of the settings form and saves the settings when the form is valid.
 *
 * @param settings Saved settings, used as the starting values.
 * @returns The errors, the field helper, whether the last save worked and the submit handler.
 */
export const useSettingsForm = (settings: StoreSettings) => {
  const { values, errors, setErrors, field } = useFormValues(toFormValues(settings));
  const [isSaved, setIsSaved] = useState(false);

  /**
   * Hides the saved notice and checks the values.
   *
   * @param candidate Values from the form.
   * @returns The errors by field.
   */
  const validate = (candidate: SettingsFormValues) => {
    setIsSaved(false);
    return validateSettings(candidate);
  };

  /**
   * Saves the settings and tells the admin.
   *
   * @param valid Valid values from the form.
   */
  const save = async (valid: SettingsFormValues) => {
    await saveSettings(toSettings(valid));
    setIsSaved(true);
  };

  const handleSubmit = createSubmitHandler({ values, validate, setErrors, onValid: save });

  return { errors, field, isSaved, handleSubmit };
};
