/**
 * Builds the id of the error message of a field.
 *
 * @param id Id of the field.
 * @returns The id of its error message.
 */
export const getErrorId = (id: string) => `${id}-error`;

/**
 * Builds the id of the hint of a field.
 *
 * @param id Id of the field.
 * @returns The id of its hint.
 */
export const getHintId = (id: string) => `${id}-hint`;

/**
 * Tells a field which message describes it.
 *
 * @param id Id of the field.
 * @param error Error message, if any.
 * @param hint Help text, if any.
 * @returns The id of the error, else of the hint, else undefined.
 */
export const getDescribedBy = (id: string, error?: string, hint?: string) => {
  if (error) return getErrorId(id);
  return hint ? getHintId(id) : undefined;
};
