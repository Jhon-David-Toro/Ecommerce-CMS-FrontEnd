import type { StepState } from "./CheckoutSteps.types";

/**
 * Tells how a stage should look.
 *
 * @param number Position of the stage, starting at 1.
 * @param current Stage the shopper is on; a number past the last stage marks everything as done.
 * @returns "done" before the current stage, "active" on it and "todo" after it.
 */
export const getStepState = (number: number, current: number): StepState => {
  if (number < current) return "done";
  return number === current ? "active" : "todo";
};
