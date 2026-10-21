/**
 * Builds the element ids that link a question to its answer.
 *
 * @param id Id of the FAQ.
 * @returns The ids of the question button and the answer region.
 */
export const getFaqIds = (id: string) => ({ question: `question-${id}`, answer: `answer-${id}` });
