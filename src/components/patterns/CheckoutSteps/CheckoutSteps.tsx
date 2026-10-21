import type { FC } from "react";

import { STEP_LABELS } from "./CheckoutSteps.constants";
import type { CheckoutStepsProps } from "./CheckoutSteps.types";
import { StepItem } from "./parts/StepItem";
import styles from "./CheckoutSteps.module.scss";

/**
 * CheckoutSteps: the three stages of buying (cart, details, confirmation) with the finished ones ticked.
 *
 * @param props Component props.
 * @param props.current Number of the stage the shopper is on, from 1 to 3; 4 marks every stage as done.
 * @returns The ordered list of stages.
 */
export const CheckoutSteps: FC<CheckoutStepsProps> = ({ current }) => (
  <ol className={styles.steps} aria-label="Checkout progress">
    {STEP_LABELS.map((label, index) => (
      <StepItem key={label} number={index + 1} label={label} current={current} isLast={index === STEP_LABELS.length - 1} />
    ))}
  </ol>
);
