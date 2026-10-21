import type { FC } from "react";

import { STEP_LABELS } from "./CheckoutSteps.constants";
import type { CheckoutStepsProps } from "./CheckoutSteps.types";
import { StepItem } from "./parts/StepItem";
import styles from "./CheckoutSteps.module.scss";

/**
 * CheckoutSteps: numbered stages (by default cart, details and confirmation) with the finished ones ticked.
 *
 * @param props Component props.
 * @param props.labels Names of the stages.
 * @param props.label Accessible name of the list.
 * @param props.current Number of the stage the shopper is on, from 1 to 3; 4 marks every stage as done.
 * @returns The ordered list of stages.
 */
export const CheckoutSteps: FC<CheckoutStepsProps> = ({ current, labels = STEP_LABELS, label = "Checkout progress" }) => (
  <ol className={styles.steps} aria-label={label}>
    {labels.map((name, index) => (
      <StepItem key={name} number={index + 1} label={name} current={current} isLast={index === labels.length - 1} />
    ))}
  </ol>
);
